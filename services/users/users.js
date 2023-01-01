const UserRepository = require('../../repositories/users/users');
const { User } = require('../../models');
class UserService {
  userRepository = new UserRepository(User);

  findUser = async (userId) => {
    try {
      const user = await this.userRepository.findUser(userId);

      if (user === 0) {
        throw error;
      }

      return user;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
}

module.exports = UserService;
