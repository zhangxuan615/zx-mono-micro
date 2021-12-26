import { isProduction } from './env';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export default {
  minimizer: [
    isProduction &&
      new TerserWebpackPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // sourceMap: shouldUseSourceMap,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
    // This is only used in production mode
    isProduction &&
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
  ].filter(Boolean),
  splitChunks: {
    cacheGroups: {
      'vender-react': {
        test: /node_modules[\\/](react|react-dom)/,
        name: 'vender-react',
        chunks: 'initial',
        priority: 10
        // enforce: true
      },
      'vender-antd': {
        test: /node_modules[\\/](antd|rc-.*)/,
        name: 'vender-antd',
        chunks: 'all',
        priority: 9
      },
      vendor: {
        // 抽离第三方插件
        test: /node_modules/, // 指定是node_modules下的第三方包
        // cacheGroupKey: here is `vendor` as the key of the cacheGroup
        // chunks: item.name 每个chunk的name
        name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module.identifier().split('\\').pop();
          //   const allChunksNames = chunks.map(item => item.name).join('~');
          return `${cacheGroupKey}`;
        },
        chunks: 'initial',
        priority: 8
      }
      // common: {
      //   // 抽离自己写的公共代码，common这个名字可以随意起
      //   chunks: 'all',
      //   name: 'common', // 任意命名
      //   priority: 7
      // }
    }
  }
};
