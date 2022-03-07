import { originalWindow } from "../utils/originalEnv";
import { isFunction } from "../utils/type";

/** 捞取 window.onxxx 所有变量 */
export const onEventTypes: string[] = [];
for (const key of Object.keys(originalWindow)) {
  if (typeof key === "string" && key.startsWith("on")) {
    onEventTypes.push(key.slice(2));
  }
}

/**
 * 构造函数：Array、Object、String...
 * 构造器：class A {}
 */
// 构造函数、类都需要绑定到原始 window 上
export function needToBindOriginalWindowFunc(fn: Function) {
  if (
    isFunction(fn) &&
    ((/^[A-Z][\w_]+$/.test(fn.name) && fn.prototype?.constructor === fn) ||
      fn.toString().startsWith("class"))
  ) {
    return true;
  }

  return false;
}
