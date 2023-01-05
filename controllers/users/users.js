const UserService = require('../../services/users/users');
require('dotenv').config();

class UsersController {
  userService = new UserService();

  getUser = async (req, res, next) => {
    try {
      const { userId } = req.userInfo;
      const user = await this.userService.findUser(userId);

      if (typeof user.message !== 'undefined') {
        return res
          .status(400)
          .json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
      res.status(200).render('mypage', {
        data: user,
        userId: user.id,
        member: user.member,
      });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { userId, password } = req.body;

      if (typeof req.cookies.accessToken !== 'undefined') {
        throw new Error('Login Error');
      }

      if (!userId || !password) {
        return res.status(400).json({ errorMessage: '정보가 유효하지 않아요' });
      }

      const user = await this.userService.loginUser(userId, password);

      if (typeof user.message !== 'undefined') {
        throw user;
      }

      const [accessToken, refreshToken] = user;
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);
      res.status(200).redirect('/api/orders/business');
    } catch (error) {
      console.log(error);
      if (error.message === 'User Error') {
        res.status(404).json({ errorMessage: '아이디가 존재하지 않습니다.' });
      } else if (error.message === 'Password Error') {
        res.status(400).json({ errorMessage: '비밀번호가 틀립니다.' });
      } else if (error.message === 'Login Error') {
        res.status(400).redirect('/api/orders/business');
        // res.status(400).json({ errorMessage: '이미 로그인 되어있습니다.' });
      } else {
        res.status(400).redirect('/api/orders/business');
        // res
        //   .status(400)
        //   .json({ errorMessage: '요청한 정보가 올바르지 않습니다.' });
      }
    }
  };

  logoutUser = (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).redirect('/api/orders/business');
    // res.status(200).json({ message: '로그아웃 성공' });
  };
}

module.exports = UsersController;
