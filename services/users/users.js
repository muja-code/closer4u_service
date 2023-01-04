const jwt = require('jsonwebtoken');

const UserRepository = require('../../repositories/users/users');
const { User } = require('../../models');

class UserService {
  userRepository = new UserRepository(User);

  findUser = async (userId) => {
    try {
      const user = await this.userRepository.findUser(userId);

      return user;
    } catch (error) {
      return error;
    }
  };

  loginUser = async (userId, password) => {
    try {
      const userInfo = await this.userRepository.loginUser(userId);

      if (!userInfo) {
        throw new Error('User Error');
      }

      if (userInfo.password !== password) {
        return new Error('Password Error');
      }

      const accessToken = jwt.sign(
        {
          type: 'JWT',
          userId: userInfo.id,
          accountId: userInfo.account_id,
          member: userInfo.member,
        },
        process.env.ACCESS_JWT_SECRET_KET,
        {
          expiresIn: '10m',
        }
      );

      const refreshToken = jwt.sign(
        {
          type: 'JWT',
          userId: userInfo.id,
          accountId: userInfo.account_id,
          member: userInfo.member,
        },
        process.env.REFRESH_JWT_SECRET_KET,
        {
          expiresIn: '7d',
        }
      );

      return [accessToken, refreshToken, userInfo];
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = UserService;
