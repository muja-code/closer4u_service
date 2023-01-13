const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new Error('Login Error');

    const isAccessTokenValidate = validateAccessToken(accessToken);

    if (!isAccessTokenValidate) {
      throw new Error('login Error');
    }

    req.userInfo = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
    next();
  } catch (error) {
    console.log('로그인 ::', error);
    res.send(
      "<script>alert('로그인 후 이용 가능합니다.');location.href='/login_page';</script>"
    );
  }

  function validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = authToken;
