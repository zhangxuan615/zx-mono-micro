import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev, isProduction } from './env';

export default {
  rules: [
    /**
     * 需要优先执行的 loader
     * {
     *   test: 'xxx',
     *   exclude: 'xxx',
     *   enforce: 'pre',
     *       ** pre 优先处理  normal 正常处理（默认） inline 其次处理 post 最后处理
     *       ** 相同级别的按照顺序执行
     *   loader: 'xxx',
     *   options: {}
     * }
     */
    {
      oneOf: [
        // 这里的 loader 每个文件只会按照顺序匹配第一个
        // 处理 ts/tsx 文件
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader', // 默认使用 babel.config.js 配置文件
          options: {
            presets: [],
            plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
            configFile: './babel.config.js'
          }
        },
        // 处理样式 css 文件
        {
          // 处理less资源
          test: /\.css$/,
          use: [
            isDev && 'style-loader',
            isProduction && MiniCssExtractPlugin.loader,
            'css-loader'
          ].filter(Boolean)
        },
        // 处理样式 less 文件
        {
          // 处理less资源
          test: /\.less$/,
          // exclude: /node_modules/,  // 不需要在这里排除 node_modules 中的 less 样式
          use: [
            isDev && 'style-loader',
            isProduction && MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: resourcePath => !resourcePath.includes('node_modules'), // 区别 node_modules 与 自己代码
                  localIdentName: '_[local]__[hash:base64:5]'
                }
              }
            },
            'postcss-loader', // 默认使用 postcss.config.js 配置文件
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ].filter(Boolean)
        },
        // 处理图片资源
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024, // 8 kb
            esModule: true,
            outputPath: './assets/img',
            name: '[name]_[contenthash:5].[ext]',
            publicPath: '/assets/img/'
          }
        },
        // 处理文件资源
        {
          test: /\.(ttf)$/,
          loader: 'file-loader',
          options: {
            limit: 1,
            esModule: true,
            outputPath: './assets/fonts',
            name: '[name]_[contenthash:5].[ext]',
            publicPath: '/assets/fonts/'
          }
        }
      ]
    }
  ]
};
