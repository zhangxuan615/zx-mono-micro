// 子应用路由配置
const microApps = [
  {
    name: 'react-app-qiankun-sub',
    entry: '//localhost:8882',
    activeRule: '/subApp/react-sub',
    container: '#sub-app'
  },
  {
    name: 'html-app-qiankun-sub',
    entry: '//localhost:8883',
    activeRule: '/subApp/html-sub',
    container: '#sub-app'
  },
  {
    name: 'normal-app-qiankun-sub',
    entry: '//localhost:5500/apps/normal-sub/build/index.html',
    activeRule: '/subApp/normal-sub',
    container: '#sub-app'
  }
];

const appRoutes = microApps.map(item => {
  return {
    ...item
  };
});

export default appRoutes;
