import { getAppList, setAppList } from './appList';
import { setLifeCycle } from './lifeCycle';
import { IAppInfo, IInternalAppInfo, ILifeCycle, AppStatusEn } from './types';
import { hijackRoute, reroute } from './route';
import { prefetch } from './utils';

/**
 *
 * @param appList 子应用列表
 * @param lifeCycle 主应用生命周期函数
 *   1. beforeLoad  挂载子应用前
 *   2. mounted  挂载子应用后
 *   3. unmounted  卸载子应用后
 */
export const registerMicroApps = (
  appList: IAppInfo[],
  lifeCycle?: ILifeCycle
) => {
  setAppList(appList);
  lifeCycle && setLifeCycle(lifeCycle);
};

/**
 * 启动微前端
 */
export const start = () => {
  const list = getAppList();
  if (!list.length) {
    throw new Error('请先注册应用');
  }

  // 1. 路由劫持
  hijackRoute();
  reroute(window.location.href);

  // 2. 预获取子应用资源
  list.forEach((app) => {
    if (app.status === AppStatusEn.NOT_LOADED) {
      prefetch(app as IInternalAppInfo);
    }
  });
};
