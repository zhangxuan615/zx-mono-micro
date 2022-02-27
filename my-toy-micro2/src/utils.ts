import { match } from 'path-to-regexp';
import { getAppList } from './appList';
import { AppStatusEn, IInternalAppInfo } from './types';
import { importEntry } from 'import-html-entry';
import { getCache, setCache } from './cache';

/**
 * 获取子应用状态
 * 1. axtiveApps： 当前被激活的子应用
 * 2. unmountApps：当前卸载的子应用
 */
export const getAppListStatus = (curPathname: string = location.pathname) => {
  const activeApps: IInternalAppInfo[] = [];
  const unmountApps: IInternalAppInfo[] = [];

  const appList = getAppList();
  appList.forEach((app) => {
    // 判断 子应用路由 是否为当前页面路由
    const isActive = match(app.activeRule, { end: false })(curPathname);
    switch (app.status) {
      case AppStatusEn.NOT_LOADED:
      case AppStatusEn.LOADING:
      case AppStatusEn.LOADED:
      case AppStatusEn.BOOTSTRAPPING:
      case AppStatusEn.NOT_MOUNTED:
        isActive && activeApps.push(app);
        break;
      case AppStatusEn.MOUNTED:
        !isActive && unmountApps.push(app);
        break;
    }
  });

  return { activeApps, unmountApps };
};

export const fetchResource = async (url: string, appName: string) => {
  if (getCache(appName, url)) return getCache(appName, url);
  const data = await fetch(url).then(async (res) => await res.text());
  setCache(appName, url, data);
  return data;
};

export function getCompletionURL(src: string | null, baseURI: string) {
  if (!src) return src;
  if (/^(https|http)/.test(src)) return src;

  return new URL(src, getCompletionBaseURL(baseURI)).toString();
}

export function getCompletionBaseURL(url: string) {
  return url.startsWith('//') ? `${location.protocol}${url}` : url;
}

export const prefetch = async (app: IInternalAppInfo) => {
  requestIdleCallback(async () => {
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(
      app.entry
    );
    requestIdleCallback(getExternalStyleSheets);
    requestIdleCallback(getExternalScripts);
  });
};
