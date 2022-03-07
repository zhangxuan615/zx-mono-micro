// 深拷贝 终极版本
export function deepClone(target: any, weakMap = new WeakMap()) {
  // 当拷贝目标是基本类型时候
  if (!(target !== null && target === "object") || target === "function") {
    return target;
  }

  // 处理对象的循环引用
  if (weakMap.has(target)) {
    return weakMap.get(target);
  }

  // 基本包装类型：Number / Boolean / String
  if (
    target instanceof Number ||
    target instanceof Boolean ||
    target instanceof String
  ) {
    const res = new Object(target.valueOf());
    return res;
  }
  // Date
  if (target instanceof Date) {
    const res = new Date(target.valueOf());
    return res;
  }
  // 正则表达式
  if (target instanceof RegExp) {
    const res = new RegExp(target);
    return res;
  }
  // 函数
  if (target instanceof Function) {
    const res = new Function("return " + target.toString())();
    return res;
  }

  // Set / Map / Array
  if (target instanceof Set) {
    const res = new Set();
    weakMap.set(target, res);
    target.forEach((ele) => {
      res.add(deepClone(ele, weakMap));
    });
    return res;
  }
  if (target instanceof Map) {
    const res = new Map();
    weakMap.set(target, res);
    target.forEach((ele, key) => {
      res.set(key, deepClone(ele, weakMap));
    });
    return res;
  }
  if (target instanceof Array) {
    const res = [];
    weakMap.set(target, res);
    target.forEach((ele) => {
      res.push(deepClone(ele, weakMap));
    });
    return res;
  }

  // 剩下的就是纯对象的情况
  const res = {};
  weakMap.set(target, res);
  // 1. 处理 Symbol 属性
  const symbolKeys = Object.getOwnPropertySymbols(target);
  for (const symbolKey of symbolKeys) {
    res[symbolKey] = deepClone(target[symbolKey], weakMap);
  }
  // 2. 处理非 Symbol 属性
  const keys = Object.getOwnPropertyNames(target);
  for (const key of keys) {
    res[key] = deepClone(target[key], weakMap);
  }
  return res;
}
