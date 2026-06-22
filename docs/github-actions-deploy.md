# GitHub Actions 自动部署

当前站点部署目标：

- 服务器：`124.220.3.16`
- 用户：`ubuntu`
- 站点目录：`/var/www/kxzs-pms`
- 访问域名：`https://开小灶.xyz/`

## GitHub Secrets

在 GitHub 仓库中进入：

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

添加：

| Name | Value |
| --- | --- |
| `DEPLOY_HOST` | `124.220.3.16` |
| `DEPLOY_USER` | `ubuntu` |
| `DEPLOY_SSH_KEY` | `D:\下载\codex.pem` 文件里的完整私钥内容 |

## 触发部署

推送到 `main` 分支会自动执行：

1. `npm ci`
2. `npm run build`
3. `rsync dist/` 到服务器 `/var/www/kxzs-pms/`
4. 重载 `Nginx`

也可以在 GitHub 的 `Actions` 页面手动点击 `Run workflow`。

## 服务器要求

服务器已配置：

- `Nginx`
- `/var/www/kxzs-pms`
- `rsync`
- `ubuntu` 用户 SSH 登录
- `sudo nginx -t && sudo systemctl reload nginx`

