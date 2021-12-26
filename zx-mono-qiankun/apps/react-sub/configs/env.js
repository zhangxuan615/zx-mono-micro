import path from 'path';

// 根据相对路径计算绝对路径
// 一定要是在项目的根目录执行，使用 process.cwd() 获取项目根目录
// const absolutePath = relativePath => path.resolve(process.cwd(), relativePath);
const absolutePath = relativePath => path.resolve(__dirname, '../', relativePath);

// 环境变量
const { NODE_ENV, BUNDLE_ANNALYZE } = process.env;

// 开发环境
const isDev = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';
const isBundleAnalyze = BUNDLE_ANNALYZE === 'analyze';

export const shouldUseSourceMap = true;

// 开发服务器配置
const HOST = '127.0.0.1';
const PORT = process.env.port || 8882;
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';

export { NODE_ENV, absolutePath, isDev, isProduction, isBundleAnalyze, PORT };
