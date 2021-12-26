console.log('abcd');

if (!window.__POWERED_BY_QIANKUN__) {
  console.log(window.__POWERED_BY_QIANKUN__);
}

async function bootstrap() {
  console.log('bootstrap ...');
}

export async function mount(props) {
  console.log('mount ...');
}

export async function unmount(props) {
  console.log('unmount ...');
}

export const aaa = 10;

export { bootstrap };
