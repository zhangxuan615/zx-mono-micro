import { appListMap } from "../appList";
import { AppInfoType, AppStatusEn, InternalAppInfoType } from "../types";

/**
 * 判断当前路由是否激活子应用
 */
function getAppIsActive(app: AppInfoType, curPathname: string) {
  const { activeRule } = app;

  let isActive = false;
  if (typeof activeRule === "string") {
    isActive = curPathname.startsWith(activeRule); // 路由前缀匹配
  } else if (typeof activeRule === "function") {
    isActive = activeRule(curPathname);
  } else if (Array.isArray(activeRule)) {
    activeRule.some((itemRule) => {
      if (typeof itemRule === "string") {
        return (isActive = curPathname.startsWith(itemRule));
      } else if (typeof itemRule === "function") {
        return (isActive = itemRule(curPathname));
      }

      return false;
    });
  }

  return isActive;
}

/**
 * 根据状态获取子应用
 */
function getAppsWithStatus(status: AppStatusEn) {
  const resAppInfoArr: InternalAppInfoType[] = [];

  appListMap.forEach((appInfo) => {
    // 如果 app 路由规则匹配 to bootstrap or to mount
    if (
      getAppIsActive(appInfo, window.location.pathname) &&
      appInfo.status === status
    ) {
      switch (app.status) {
        case AppStatus.BEFORE_BOOTSTRAP:
        case AppStatus.BOOTSTRAPPED:
        case AppStatus.UNMOUNTED:
          result.push(app);
          break;
      }
    } else if (
      app.status === AppStatus.MOUNTED &&
      status === AppStatus.MOUNTED
    ) {
      // 如果路由规则不匹配 to unmount
      result.push(app);
    }
  });

  return result;
}
