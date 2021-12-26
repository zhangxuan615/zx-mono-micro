module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 如果不确定ESM转换是否被禁用，我们还可以手动禁用，确保webpack最终打包的是ESM的代码。
        // babel-loader 包含一个 caller data 指明了此处的 auto 应该自适应为保留 es 模块化语法
        modules: 'auto', // 很重要，保证在过一遍 babel 的时候保持 es 模块化语法，用于 webpack tree shaking
        targets: { chrome: '90' }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
      }
    ]
  ]
};
