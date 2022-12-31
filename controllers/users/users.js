const UserService = require('../../services/users/users.js');

class UsersController {
  userService = new UserService();

  getUser = async (req, res, next) => {
    try {
      const userId = 1;

      const user = await this.userService.findUser(userId);

      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.staus(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };
}

module.exports = UsersController;