import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import '@/assets/styles/global.less';

function render(props: any) {
  ReactDOM.render(<App />, document.getElementById('sub-react-root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('bootstrap ...');
}

export async function mount(props: any) {
  console.log('mount ...');
  render(props);
}

export async function unmount(props: any) {
  console.log('unmount ...');
}
