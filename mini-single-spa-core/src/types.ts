/**
 * app 的状态集合
 */
export enum AppStatusEn {
  NOT_LOADED = "NOT_LOADED", // BEFORE_BOOTSTRAP 子应用初始化的资源未加载状态

  LOADING = "LOADING", // 开始加载子应用资源
  LOADED = "LOADED", // 子应用资源加载完成

  BOOTSTRAPPING = "BOOTSTRAPPING", // BOOTSTRAPPED 子应用首次触发加载
  NOT_MOUNTED = "NOT_MOUNTED", // BEFORE_MOUNT 子应用未挂载

  MOUNTING = "MOUNTING", // 开始挂载子应用
  MOUNTED = "MOUNTED", // 子应用挂载完成

  UNMOUNTING = "UNMOUNTING", // BEFORE_UNMOUNT 卸载前
  UNMOUNTED = "UNMOUNTED",

  // 异常错误处理状态
  BOOTSTRAP_ERROR = "BOOTSTRAP_ERROR",
  MOUNT_ERROR = "MOUNT_ERROR",
  UNMOUNT_ERROR = "UNMOUNT_ERROR",
}

/**
 * 子应用类型
 */
// 对外暴露的子应用属性
export interface AppInfoType {
  name: string; // 子应用名称
  //   entry: string; // 子应用的资源入口
  /**
   * 激活规则，例如传入 /vue，当 url 的路径变为 /vue 时，激活当前子应用。
   * 如果 activeRule 为函数，则会传入 location 作为参数，activeRule(location) 返回 true 时，激活当前子应用。
   */
  activeRule:
    | string
    | ((location: string) => boolean)
    | Array<string | ((location: string) => boolean)>; // 在哪些路由下渲染该子应用
  /**
   * loadApp() 必须返回一个 Promise，resolve() 后得到一个对象：
   * {
   *   bootstrap: () => Promise<any>
   *   mount: (props: AnyObject) => Promise<any>
   *   unmount: (props: AnyObject) => Promise<any>
   * }
   */
  loadApp: () => Promise<any>;
}
// 内部维护的子应用属性
export interface InternalAppInfoType extends AppInfoType {
  status: AppStatusEn; // 子应用状态
}

// 主子应用生命周期函数类型
export type LifeCycleType = (app: AppInfoType) => Promise<any>;
// 主应用生命周期函数
export interface LifeCycleInfoType {
  beforeLoad?: LifeCycleType | LifeCycleType[]; // 加载资源前
  beforeMount?: LifeCycleType | LifeCycleType[]; // 挂载子应用前
  afterMount?: LifeCycleType | LifeCycleType[]; // 挂载子应用完成
  beforeUnmount?: LifeCycleType | LifeCycleType[]; // 卸载子应用前
  afterUnmount?: LifeCycleType | LifeCycleType[]; // 卸载子应用完成
}

// js 沙箱类型
export interface FakeWindow extends Window {
  [key: PropertyKey]: any;
}
