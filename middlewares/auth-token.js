const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) throw new Error('Login Error');

    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    if (!isRefreshTokenValidate) throw new Error('Login Error');

    if (!isAccessTokenValidate) {
      const newAccessToken = jwt.sign(
        {
          type: 'JWT',
          userId: refreshToken.userId,
          accountId: refreshToken.accountId,
          member: refreshToken.member,
        },
        process.env.ACCESS_JWT_SECRET_KET,
        {
          expiresIn: '10m',
        }
      );

      res.cookie('accessToken', newAccessToken);
    }

    req.userInfo = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(401).redirect('/login_page');
  }

  function validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Refresh Token을 검증합니다.
  function validateRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KET);
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = authToken;
