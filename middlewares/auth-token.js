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
    console.log(error);
    res
      .status(401)
      .json({ code: 401, errorMessage: '로그인 후 이용 가능합니다.' });
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
