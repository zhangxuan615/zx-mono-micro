import { AppInfoType, AppStatusEn, InternalAppInfoType } from "../types";

/**
 * 存储注册子应用的映射表
 */
export const appListMap = new Map<string, InternalAppInfoType>();

export default function setAppListMap(appList: AppInfoType[]) {
  if (!Array.isArray(appList)) {
    throw Error("appList must be a array!");
  }

  appList.forEach((appItem) => {
    const curAppInfo = {
      sandboxConfig: {
        enabled: true,
        css: false,
      },
      ...appItem,

      status: AppStatusEn.NOT_LOADED,
      pageBody: "",
      loadedURLs: [],
      scripts: [],
      styles: [],
      isFirstLoad: true,
    };

    appListMap.set(curAppInfo.name, curAppInfo);
  });
}

// 获取子应用信息
export const getAppInfo = (appName: string) => {
  return appListMap.get(appName);
};
