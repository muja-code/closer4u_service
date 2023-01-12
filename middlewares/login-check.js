const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginCheck = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (accessToken) throw new Error('Login Error');

    next();
  } catch (error) {
    console.log(error);
    res.status(401).redirect('/');
  }
};

module.exports = loginCheck;
