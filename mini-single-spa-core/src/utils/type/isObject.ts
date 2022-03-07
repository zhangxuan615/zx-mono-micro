export const isObject = (val: any) => {
  const valType = typeof val;

  return (valType !== null && valType === "object") || valType === "function";
};
