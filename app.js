// 외부 라이브러리
const express = require('express');
const cookie_parser = require('cookie-parser');
require('dotenv').config();

// 내부 모듈
const router = require('./routes/index');
const models = require('./models/index');
const pageRouter = require('./routes/page');

const env = process.env;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use('/api', router);
app.use('/', pageRouter);

// mysql 연결 상태 확인
models.sequelize
  .sync()
  .then(() => {
    console.log(' DB 연결 성공');
  })
  .catch((err) => {
    console.log('연결 실패');
    console.log(err);
  });

app.listen(env.PORT, () => {
  console.log(env.PORT, '번 포트가 실행되었습니다.');
});

module.exports = app;
