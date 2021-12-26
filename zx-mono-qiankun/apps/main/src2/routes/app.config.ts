import store from '../store';

const microApps = [
  // {
  //   name: 'react-app-qiankun-sub',
  //   entry: '//localhost:8882/react-sub',
  //   activeRule: '/react-sub',
  //   container: '#subapp-viewport'
  // },
  // {
  //   name: 'html-app-qiankun-sub',
  //   entry: '//localhost:8883/html-sub',
  //   activeRule: '/html-sub',
  //   container: '#subapp-viewport'
  // },
  {
    name: 'normal-app-qiankun-sub1',
    entry: '//localhost:5500/apps/normal-sub/build/index.html',
    activeRule: '/normal-sub',
    container: '#subapp-viewport'
  }
];

const appRoutes = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule,
      getGlobalState: store.getGlobalState
    }
  };
});

export default appRoutes;
