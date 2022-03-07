export const isType = (val, type) =>
  Object.prototype.toString.call(val) === `[object ${type}]`;
