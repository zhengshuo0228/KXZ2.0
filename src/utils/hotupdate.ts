import { Preferences } from "@capacitor/preferences";

// 热更新版本管理
const VERSION_KEY = "app_version";
const APP_VERSION = "1.0.0";

// 检查更新（Mock - 对接服务端接口）
export async function checkForUpdate(): Promise<{ hasUpdate: boolean; version: string; description: string }> {
  // 检查本地版本
  const { value } = await Preferences.get({ key: VERSION_KEY });
  const localVersion = value || "0.0.0";

  // 模拟从服务端检查更新
  // 实际应调用: fetch('/api/app/update-check', { method: 'POST', body: JSON.stringify({ version: localVersion }) })
  const hasUpdate = localVersion < APP_VERSION;

  return {
    hasUpdate,
    version: APP_VERSION,
    description: hasUpdate ? "版本更新：新增多门店支持、绩效看板、排休管理等功能" : "已是最新版本",
  };
}

// 更新本地版本号
export async function updateVersion() {
  await Preferences.set({ key: VERSION_KEY, value: APP_VERSION });
}

// 获取本地版本
export async function getLocalVersion(): Promise<string> {
  const { value } = await Preferences.get({ key: VERSION_KEY });
  return value || "0.0.0";
}
