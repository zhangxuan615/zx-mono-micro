import { loadApps } from "../application/apps";

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;

export async function loadApps() {
  // 先卸载所有失活的子应用
  const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED);
  await Promise.all(toUnMountApp.map(unMountApp));

  // 初始化所有刚注册的子应用
  const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP);
  await Promise.all(toLoadApp.map(bootstrapApp));

  const toMountApp = [
    ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
    ...getAppsWithStatus(AppStatus.UNMOUNTED),
  ];
  // 加载所有符合条件的子应用
  await toMountApp.map(mountApp);
}

export default function listenRoute() {
  // 1. 重写 pushState 以及 replaceState 方法
  window.history.pushState = function (data: any, unused: string, url: string) {
    originalPushState.call(this, data, unused, url);
    url && reRoute(url);
  };

  window.history.replaceState = function (
    data: any,
    unused: string,
    url: string
  ) {
    originalReplaceState.call(this, data, unused, url);
    url && reRoute(url);
  };

  // 2. 监听 popstate 事件
  window.addEventListener(
    "popstate",
    (e) => reRoute(location.pathname, e),
    true
  );
}
