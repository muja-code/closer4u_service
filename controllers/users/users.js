const UserService = require('../../services/users/users');
require('dotenv').config();

class UsersController {
  userService = new UserService();

  signupUser = async (req, res, next) => {
    try {
      const {
        member,
        accountId,
        password,
        check_password,
        nickname,
        phone,
        address,
      } = req.body;

      const user = await this.userService.signupUser(
        member,
        accountId,
        password,
        check_password,
        nickname,
        phone,
        address
      );
      if (typeof user.errorMessage !== 'undefined') {
        return res.status(user.code).json({ errorMessage: user.errorMessage });
      }
      res
        .status(201)
        .json({ message: '회원가입에 성공하셨습니다.', data: user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  getUser = async (req, res, next) => {
    try {
      const { userId } = req.userInfo;
      const user = await this.userService.findUser(userId);
      if (typeof user.message !== 'undefined') {
        return res
          .status(400)
          .json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { accountId, password } = req.body;

      if (typeof req.cookies.accessToken !== 'undefined') {
        throw new Error('Login Error');
      }

      if (!accountId || !password) {
        return res
          .status(400)
          .json({ errorMessage: '요청한 정보가 유효하지 않아요' });
      }

      const user = await this.userService.loginUser(accountId, password);

      if (typeof user.message !== 'undefined') {
        if (user.message === 'User Error') {
          return res
            .status(404)
            .json({ errorMessage: '아이디가 존재하지 않습니다.' });
        } else if (user.message === 'Password Error') {
          return res.status(400).json({ errorMessage: '비밀번호가 틀립니다.' });
        }
      }
      const [accessToken, userInfo] = user;
      res.cookie(
        'userInfo',
        `${userInfo.account_id},${userInfo.member},${userInfo.nickname}`
      );
      res.cookie('accessToken', accessToken);
      res.status(200).json({ message: '로그인 성공' });
    } catch (error) {
      console.log(error);
      if (error.message === 'Login Error') {
        return res
          .status(400)
          .json({ errorMessage: '이미 로그인 되어있습니다.' });
      } else {
        res
          .status(400)
          .json({ errorMessage: '요청한 정보가 올바르지 않습니다.' });
      }
    }
  };

  logoutUser = (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('userInfo');

    res.status(200).json({ message: '로그아웃 성공' });
  };
}

module.exports = UsersController;
