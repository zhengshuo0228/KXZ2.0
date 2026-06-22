import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma.js";
import { authMiddleware, requireAuth, signToken } from "./lib/auth.js";
import { ok, toPosition, toUser } from "./lib/format.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(authMiddleware);

app.get("/api/health", (_req, res) => {
  res.json(ok({ status: "ok", service: "kxzs-api", time: new Date().toISOString() }));
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  const user = await prisma.user.findUnique({
    where: { username },
    include: { positions: { include: { position: true } } },
  });

  if (!user || user.status !== "active") {
    return res.status(401).json({ code: 401, data: null, message: "账号或密码错误" });
  }

  const matched = await bcrypt.compare(password || "", user.passwordHash);
  if (!matched) {
    return res.status(401).json({ code: 401, data: null, message: "账号或密码错误" });
  }

  res.json(ok({
    token: signToken(user),
    user: toUser(user),
    positions: user.positions.map((item) => toPosition(item.position)),
  }));
});

app.post("/api/logout", (_req, res) => {
  res.json(ok(true));
});

app.get("/api/user/info", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { positions: { include: { position: true } } },
  });

  if (!user) {
    return res.status(404).json({ code: 404, data: null, message: "账号不存在" });
  }

  res.json(ok({ user: toUser(user), positions: user.positions.map((item) => toPosition(item.position)) }));
});

app.put("/api/user/password", requireAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body || {};
  if (!oldPassword || !newPassword || String(newPassword).length < 6) {
    return res.status(400).json({ code: 400, data: null, message: "请填写原密码和至少 6 位新密码" });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ code: 404, data: null, message: "账号不存在" });
  }

  const matched = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!matched) {
    return res.status(400).json({ code: 400, data: null, message: "原密码错误" });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  res.json(ok(true));
});

app.post("/api/register", async (req, res) => {
  const { username, password, realName, storeId, departmentId, positionId, remark } = req.body || {};
  if (!username || !password || !realName || !storeId || !departmentId || !positionId) {
    return res.status(400).json({ code: 400, data: null, message: "缺少必填字段" });
  }

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return res.status(409).json({ code: 409, data: null, message: "用户名已存在" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const registration = await prisma.registration.create({
    data: { username, passwordHash, realName, storeId, departmentId, positionId, remark },
  });

  await prisma.notification.create({
    data: {
      type: "account_review",
      title: "账号审批",
      content: `新账号注册申请：${realName}`,
      linkType: "registration",
      linkId: registration.id,
    },
  });

  res.json(ok(registration));
});

app.get("/api/stores", async (_req, res) => {
  const stores = await prisma.store.findMany({ orderBy: { id: "asc" } });
  res.json(ok(stores));
});

app.get("/api/departments", async (req, res) => {
  const storeId = req.query.storeId ? String(req.query.storeId) : undefined;
  const departments = await prisma.department.findMany({
    where: storeId ? { storeId } : undefined,
    orderBy: { id: "asc" },
  });
  res.json(ok(departments));
});

app.get("/api/positions", async (_req, res) => {
  const positions = await prisma.position.findMany({ orderBy: [{ department: "asc" }, { rank: "asc" }] });
  res.json(ok(positions.map(toPosition)));
});

app.get("/api/stats/summary", requireAuth, async (req, res) => {
  const range = String(req.query.range || "today");
  const now = new Date();
  const start = new Date(now);
  if (range === "yesterday") {
    start.setDate(now.getDate() - 1);
    start.setHours(0, 0, 0, 0);
  } else if (range === "week") {
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  } else if (range === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  } else {
    start.setHours(0, 0, 0, 0);
  }
  const end = new Date(start);
  if (range === "yesterday") end.setDate(start.getDate() + 1);
  else end.setTime(now.getTime());

  const createdAt = { gte: start, lt: end };
  const orderWhere = req.user.username === "000" ? { createdAt } : { createdAt, storeId: req.user.storeId };
  const [totalOrders, approvedOrders, rejectedOrders, pendingOrders, ingredients, activeUsers, unreadNotifications] = await Promise.all([
    prisma.purchaseOrder.count({ where: orderWhere }),
    prisma.purchaseOrder.count({ where: { ...orderWhere, status: "approved" } }),
    prisma.purchaseOrder.count({ where: { ...orderWhere, status: "rejected" } }),
    prisma.purchaseOrder.count({ where: { ...orderWhere, status: "pending" } }),
    prisma.ingredient.count(),
    prisma.user.count({ where: req.user.username === "000" ? { status: "active" } : { status: "active", storeId: req.user.storeId } }),
    prisma.notification.count({ where: { OR: [{ recipientId: req.user.id }, { recipientId: null }], read: false } }),
  ]);

  res.json(ok({
    range,
    purchase: {
      total: totalOrders,
      approved: approvedOrders,
      rejected: rejectedOrders,
      pending: pendingOrders,
      completionRate: totalOrders ? Math.round((approvedOrders / totalOrders) * 100) : 0,
    },
    ingredient: { total: ingredients },
    account: { activeUsers },
    notification: { unread: unreadNotifications },
    performance: { applied: 0, approved: 0 },
    schedule: { onLeave: 0, onDuty: activeUsers },
  }));
});

app.get("/api/notifications", async (req, res) => {
  const recipientId = req.user?.id;
  const notifications = await prisma.notification.findMany({
    where: recipientId ? { OR: [{ recipientId }, { recipientId: null }] } : { recipientId: null },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(ok(notifications.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))));
});

app.put("/api/notifications/:id/read", async (req, res) => {
  await prisma.notification.update({ where: { id: req.params.id }, data: { read: true } });
  res.json(ok(true));
});

app.put("/api/notifications/read-all", async (req, res) => {
  await prisma.notification.updateMany({ where: { recipientId: req.user?.id || null }, data: { read: true } });
  res.json(ok(true));
});

app.get("/api/purchase/menu", async (_req, res) => {
  const menu = await prisma.ingredient.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
  res.json(ok(menu));
});

app.get("/api/purchase/menu/template", (_req, res) => {
  const csv = "\uFEFF\u5206\u7c7b,\u5b50\u5206\u7c7b,\u54c1\u540d,\u9ed8\u8ba4\u6570\u91cf,\u5355\u4f4d\n\u852c\u83dc,\u53f6\u83dc\u7c7b,\u9752\u6912,30,\u65a4\n\u79bd\u8089,\u9e21\u8089,\u9e21\u817f,20,\u65a4\n";
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=ingredient-template.csv");
  res.send(csv);
});

app.post("/api/purchase/menu/upload", requireAuth, async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) {
    return res.status(400).json({ code: 400, data: null, message: "\u8bf7\u4e0a\u4f20\u98df\u6750\u6570\u636e" });
  }

  const errors = [];
  const normalized = [];
  const seen = new Set();

  items.forEach((item, index) => {
    const row = index + 2;
    const category = String(item.category || "").trim();
    const subCategory = String(item.subCategory || "").trim();
    const name = String(item.name || "").trim();
    const defaultQty = Number(item.defaultQty || 0);
    const unit = String(item.unit || "").trim() || "\u65a4";

    if (!category) errors.push(`\u7b2c${row}\u884c\uff1a\u5206\u7c7b\u4e3a\u7a7a`);
    if (!name) errors.push(`\u7b2c${row}\u884c\uff1a\u54c1\u540d\u4e3a\u7a7a`);
    if (!Number.isFinite(defaultQty) || defaultQty < 0) errors.push(`\u7b2c${row}\u884c\uff1a\u9ed8\u8ba4\u6570\u91cf\u683c\u5f0f\u9519\u8bef`);
    if (!category || !name || !Number.isFinite(defaultQty) || defaultQty < 0) return;

    if (seen.has(name)) errors.push(`\u7b2c${row}\u884c\uff1a\u54c1\u540d\u91cd\u590d\uff0c\u5c06\u6309\u6700\u540e\u4e00\u6761\u66f4\u65b0`);
    seen.add(name);
    normalized.push({ category, subCategory, name, defaultQty, unit });
  });

  if (errors.some((error) => error.includes("\u4e3a\u7a7a") || error.includes("\u683c\u5f0f\u9519\u8bef"))) {
    return res.status(400).json({ code: 400, data: { errors }, message: "\u4e0a\u4f20\u6570\u636e\u6821\u9a8c\u5931\u8d25" });
  }

  const deduped = Array.from(new Map(normalized.map((item) => [item.name, item])).values());
  const saved = [];

  for (const item of deduped) {
    const existing = await prisma.ingredient.findFirst({ where: { name: item.name } });
    const data = {
      category: item.category,
      subCategory: item.subCategory,
      name: item.name,
      defaultQty: Math.round(item.defaultQty),
      unit: item.unit,
    };
    if (existing) {
      saved.push(await prisma.ingredient.update({ where: { id: existing.id }, data }));
    } else {
      saved.push(await prisma.ingredient.create({ data: { id: `m_${Date.now()}_${saved.length}`, ...data } }));
    }
  }

  res.json(ok({ count: saved.length, warnings: errors.filter((error) => error.includes("\u91cd\u590d")), items: saved }));
});

app.get("/api/purchase/orders", async (req, res) => {
  const status = req.query.status ? String(req.query.status) : undefined;
  const orders = await prisma.purchaseOrder.findMany({
    where: status ? { status } : undefined,
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(ok(orders.map((order) => ({
    ...order,
    user: toUser(order.user),
    createdAt: order.createdAt.toISOString(),
  }))));
});

app.post("/api/purchase/orders", requireAuth, async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) {
    return res.status(400).json({ code: 400, data: null, message: "\u8bf7\u9009\u62e9\u98df\u6750" });
  }

  const order = await prisma.purchaseOrder.create({
    data: {
      userId: req.user.id,
      storeId: req.user.storeId,
      items: {
        create: items.map((item) => ({
          menuId: item.menuId,
          name: item.name,
          qty: Number(item.qty),
          unit: item.unit,
        })),
      },
    },
    include: { items: true, user: true },
  });

  await prisma.notification.create({
    data: {
      type: "purchase_submit",
      title: "\u7533\u8d2d\u786e\u8ba4",
      content: `\u7533\u8d2d\u5355\u5df2\u63d0\u4ea4\uff0c\u5171 ${items.length} \u9879`,
      recipientId: req.user.id,
      linkType: "history",
      linkId: order.id,
    },
  });

  res.json(ok({ ...order, user: toUser(order.user), createdAt: order.createdAt.toISOString() }));
});

app.put("/api/purchase/orders/:id", requireAuth, async (req, res) => {
  const { approved } = req.body || {};
  const status = approved ? "approved" : "rejected";
  const order = await prisma.purchaseOrder.update({
    where: { id: req.params.id },
    data: { status },
    include: { items: true, user: true },
  });

  const itemSummary = order.items.map((item) => `${item.name}${item.qty}${item.unit}`).join("\uff0c");
  await prisma.notification.create({
    data: {
      type: "purchase_review",
      title: "\u7533\u8d2d\u5ba1\u6838",
      content: `\u4f60\u7684\u7533\u8d2d\u5355\u300c${itemSummary}\u300d\u5df2${approved ? "\u901a\u8fc7" : "\u9a73\u56de"}`,
      recipientId: order.userId,
      linkType: "history",
      linkId: order.id,
    },
  });

  res.json(ok({ ...order, user: toUser(order.user), createdAt: order.createdAt.toISOString() }));
});

app.get("/api/admin/registrations", requireAuth, async (_req, res) => {
  const list = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });
  res.json(ok(list));
});

app.get("/api/admin/users", requireAuth, async (_req, res) => {
  const users = await prisma.user.findMany({
    include: {
      store: true,
      department: true,
      positions: { include: { position: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(ok(users.map((user) => ({
    ...toUser(user),
    storeName: user.store.name,
    departmentName: user.department.name,
    positions: user.positions.map((item) => toPosition(item.position)),
    createdAt: user.createdAt.toISOString(),
  }))));
});

app.post("/api/admin/users", requireAuth, async (req, res) => {
  const { username, password, realName, storeId, departmentId, positionIds } = req.body || {};
  if (!username || !password || !realName || !storeId || !departmentId || !Array.isArray(positionIds) || positionIds.length === 0) {
    return res.status(400).json({ code: 400, data: null, message: "缺少必填字段" });
  }

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return res.status(409).json({ code: 409, data: null, message: "用户名已存在" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      id: `u_${Date.now()}`,
      username,
      passwordHash,
      realName,
      storeId,
      departmentId,
      status: "active",
      positions: { create: positionIds.map((positionId) => ({ positionId })) },
    },
    include: { store: true, department: true, positions: { include: { position: true } } },
  });

  res.json(ok({
    ...toUser(user),
    storeName: user.store.name,
    departmentName: user.department.name,
    positions: user.positions.map((item) => toPosition(item.position)),
    createdAt: user.createdAt.toISOString(),
  }));
});

app.put("/api/admin/users/:id/positions", requireAuth, async (req, res) => {
  const positionIds = Array.isArray(req.body?.positionIds) ? req.body.positionIds : [];
  if (positionIds.length === 0) {
    return res.status(400).json({ code: 400, data: null, message: "请选择岗位" });
  }
  const target = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!target) {
    return res.status(404).json({ code: 404, data: null, message: "账号不存在" });
  }
  if (target.username === "000") {
    return res.status(403).json({ code: 403, data: null, message: "内置超管账号不可修改" });
  }

  await prisma.userPosition.deleteMany({ where: { userId: target.id } });
  for (const positionId of positionIds) {
    await prisma.userPosition.create({ data: { userId: target.id, positionId } });
  }

  const user = await prisma.user.findUnique({
    where: { id: target.id },
    include: { store: true, department: true, positions: { include: { position: true } } },
  });

  res.json(ok({
    ...toUser(user),
    storeName: user.store.name,
    departmentName: user.department.name,
    positions: user.positions.map((item) => toPosition(item.position)),
    createdAt: user.createdAt.toISOString(),
  }));
});

app.put("/api/admin/registrations/:id", requireAuth, async (req, res) => {
  const { approved } = req.body || {};
  const registration = await prisma.registration.findUnique({ where: { id: req.params.id } });
  if (!registration) {
    return res.status(404).json({ code: 404, data: null, message: "申请不存在" });
  }

  if (!approved) {
    const updated = await prisma.registration.update({ where: { id: registration.id }, data: { status: "rejected" } });
    return res.json(ok(updated));
  }

  const user = await prisma.user.create({
    data: {
      id: `u_${Date.now()}`,
      username: registration.username,
      passwordHash: registration.passwordHash,
      realName: registration.realName,
      storeId: registration.storeId,
      departmentId: registration.departmentId,
      status: "active",
      positions: { create: { positionId: registration.positionId } },
    },
  });

  await prisma.registration.update({ where: { id: registration.id }, data: { status: "approved" } });
  await prisma.notification.create({
    data: {
      type: "account_review",
      title: "账号审批",
      content: "账号申请已通过",
      recipientId: user.id,
    },
  });

  res.json(ok(user));
});

app.listen(port, () => {
  console.log(`kxzs-api listening on ${port}`);
});
