import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: {
    dark: false,
    compact: true,
  },
  access: {},
  model: {},
  // access 插件依赖 initial State 所以需要同时开启
  initialState: {
    // loading: "true",
  },
  request: {},
  favicons: [
    // 完整地址
    'https://telegraph-image-2s1.pages.dev/file/877db020dd515fe265932.png',
  ],
  define: {
    'process.env.OSS_ACCESS_KEY_ID': process.env.OSS_ACCESS_KEY_ID,
    'process.env.OSS_ACCESS_KEY_SECRET': process.env.OSS_ACCESS_KEY_SECRET,
  },
  layout: {
    title: 'my-big-bang-pro',
    fixedHeader: true,
  },
  routes,
  npmClient: 'npm',
  // tailwindcss: {},
  proxy: {
    '/cake': {
      target: 'https://h5.mcake.com/',
      changeOrigin: true,
      pathRewrite: { '^/cake': '' },
    },
  },
  dva: {
    immer: {
      enable: true,
    },
  },
  hash: true,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://lennylee-umi.oss-cn-shanghai.aliyuncs.com/'
      : '/',
});
