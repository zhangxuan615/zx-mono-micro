import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { absolutePath, isProduction, isBundleAnalyze, isDev } from './env';

export default [
  new HtmlWebpackPlugin({
    // 提取 html 文件
    template: absolutePath('./public/index.html'),
    minify: isProduction
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      : false
  }),
  new ReactRefreshPlugin({
    exclude: /node_modules/,
    include: absolutePath('./src'),
    overlay: false
  }), // react-refresh 添加
  new ProgressBarPlugin({
    // 显示打包进度
    summary: isDev
  }),
  //   isDevelopment && new webpack.HotModuleReplacementPlugin(), // 开发 hmr
  isProduction &&
    new MiniCssExtractPlugin({
      // 单独抽取 css 文件
      filename: 'css/[name]_[chunkhash:5].css'
    }),
  isProduction && isBundleAnalyze && new BundleAnalyzerPlugin() // 生产打包启动分析
].filter(Boolean);
