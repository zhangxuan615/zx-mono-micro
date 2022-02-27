import { NODE_ENV, absolutePath, isProduction, PORT } from './env';
import module from './module';
import plugins from './plugins';
import optimization from './optimization';

export default {
  mode: NODE_ENV, // 控制开发还是生产模式
  entry: absolutePath('./src/index.tsx'),
  output: {
    library: 'sub-react',
    libraryTarget: 'umd',
    globalObject: 'window',
    chunkLoadingGlobal: 'sub-react-global',

    path: isProduction ? absolutePath('./build') : void 0,
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].bundle.js', // 生产需要使用 contentHash 做配合强缓存
    publicPath: `//localhost:${PORT}/`,
    clean: true // 代替  CleanWebpackPlugin 插件
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': absolutePath('./src'),
      '@assets': absolutePath('./src/assets'),
      '@routes': absolutePath('./src/routes'),
      '@pages': absolutePath('./src/pages'),
      '@stores': absolutePath('./src/stores')
    }
  },
  module,
  plugins,
  optimization,
  performance: {
    hints: 'warning', // "error" or false are valid too
    maxEntrypointSize: 200000,
    maxAssetSize: 200000
  },
  devServer: {
    port: PORT, // 端口号
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true, // 启用 hmr hot-module-replacement-plugin webpack 内置插件
    historyApiFallback: true, // 支持懒加载页面
    open: false, //  是否自动打开浏览器
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  }
};
