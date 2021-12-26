import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from 'qiankun';

import App from './App';
import appRoutes from './routes/app.config';

import '@/assets/styles/global.less';

ReactDOM.render(<App />, document.getElementById('root'));

registerMicroApps(appRoutes);
start();
