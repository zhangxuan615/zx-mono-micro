import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from '../../qiankun/es/index.js';
import appRoutes from './routes/app.config';

import App from './App';

import '@/assets/styles/global.less';

ReactDOM.render(<App />, document.getElementById('root'));

const microApps = appRoutes.map(app => ({
  ...app
}));

registerMicroApps(microApps);
start();
