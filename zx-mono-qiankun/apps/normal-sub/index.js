console.log('start parse normal-sub');

if (!window.__POWERED_BY_QIANKUN__) {
  console.log('normal sub window: ', window.__POWERED_BY_QIANKUN__);
}

async function bootstrap() {
  console.log('normal-sub bootstrap ...');
}

export async function mount(props) {
  console.log('normal-sub mount ...');
}

export async function unmount(props) {
  console.log('normal-sub unmount ...');
}

export { bootstrap };
