// 외부 라이브러리
const express = require('express');
const cookie_parser = require('cookie-parser');
const path = require('path'); // 절대경로 사용하기 위해서
require('dotenv').config();

// 내부 모듈
const models = require('./models');
const router = require('./routes/index.js');

const env = process.env;
const app = express();

// EJS 대기중
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookie_parser());

app.get('/orderPage', (req, res, next) => {
  res.send('어서오세요');
});

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

app.use('/api', router);

app.listen(env.PORT, () => {
  console.log(env.PORT, '번 포트가 실행되었습니다.');
});
