// 原始 window、document 对象
export const originalWindow = window;
export const originalDocument = document;

// 原始 history 操作路由方法
export const originalPushState = window.history.pushState;
export const originalReplaceState = window.history.replaceState;

// 原始 DOM2 级事件处理程序
export const originalWindowAddEventListener = window.addEventListener;
export const originalWindowRemoveEventListener = window.removeEventListener;
export const originalDocumentAddEventListener = document.addEventListener;
export const originalDocumentRemoveEventListener = document.removeEventListener;
