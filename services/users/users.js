const UserRepository = require('../../repositories/users/users');
const { User } = require('../../models');
class UserService {
  userRepository = new UserRepository(User);

  findUser = async (userId) => {
    try {
      const user = await this.userRepository.findUser(userId);

      if (user === 400) {
        throw 400;
      }

      return user;
    } catch (error) {
      return error;
    }
  };
}

module.exports = UserService;
