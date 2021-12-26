// 核心模块
const path = require('path');
const http = require('http');
// 第三方模块
const express = require('express');
const expressArtTpl = require('express-art-template');

// 配置 html 模板
const app = express();
app.set('views', path.join(__dirname, './views'));
app.engine('html', expressArtTpl);

app.use(function (req, res, next) {
  // 请求源
  res.header('Access-Control-Allow-Origin', '*');
  // 请求头
  res.header('Access-Control-Allow-Headers', '*');
  // 请求方法
  res.header('Access-Control-Allow-Methods', '*');

  next();
});

// app 配置
app.use('/public/', express.static(path.join(__dirname, './public/')));

app.use('/', (req, res) => {
  res.render('index.html');
});

app.listen(8883, () => {
  console.log('server running 8883......');
});
