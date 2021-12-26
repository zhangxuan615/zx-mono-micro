module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')()
    // require("postcss-modules")({
    //   // 样式小驼峰转化,
    //   // css: goods-list => tsx: goodsList
    //   // scopeBehaviour: 'global',
    //   generateScopedName: "_[local]__[hash:base64:6]",
    //   hashPrefix: "zx",
    //   localsConvention: "camelCase",
    // }),
  ]
  // ident: 'postcss',
  // sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
  // sourceMap: isProduction && shouldUseSourceMap,
};
