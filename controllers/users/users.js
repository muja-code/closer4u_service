const UserService = require('../../services/users/users');

class UsersController {
  userService = new UserService();

  getUser = async (req, res, next) => {
    try {
      const userId = 1;
      const user = await this.userService.findUser(userId);

      if (typeof user.message !== 'undefined') {
        return res
          .status(400)
          .json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
      console.log(user);
      res.status(200).render('mypage', {
        data: user,
      });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };
}

module.exports = UsersController;
