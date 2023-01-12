const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Op } = require('sequelize');

const UserRepository = require('../../repositories/users/users');
const { User } = require('../../models');

class UserService {
  userRepository = new UserRepository(User);
  signupUser = async (
    member,
    accountId,
    password,
    check_password,
    nickname,
    phone,
    address
  ) => {
    const validateId = /^[a-z0-9]{3,10}$/gs; // 숫자, 영어 소문자로만 3~10 글자, 글자 중간 공백 불가
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가
    let point = 0;
    try {
      if (member === '0') {
        point = 1000000;
      }
      if (!validateId.test(accountId)) {
        return {
          code: 400,
          errorMessage: '아이디가 작성 형식과 맞지 않습니다.',
        };
      }
      if (!validatePassword.test(password)) {
        return {
          code: 400,
          errorMessage: '비밀번호가 작성 형식과 맞지 않습니다.',
        };
      }
      if (password !== check_password) {
        return {
          code: 400,
          errorMessage: '비밀번호가 비밀번호 확인란과 다릅니다.',
        };
      }
      if (!nickname) {
        return { code: 400, errorMessage: '닉네임이 입력되지 않았습니다.' };
      }
      if (!phone) {
        return { code: 400, errorMessage: '연락처가 입력되지 않았습니다.' };
      }
      if (!address) {
        return { code: 400, errorMessage: '배송지가 입력되지 않았습니다.' };
      }
      const duplicateUser = await User.findAll({
        where: {
          [Op.or]: [{ account_id: accountId }, { nickname }],
        },
      });

      if (duplicateUser.length) {
        return {
          code: 400,
          errorMessage: '이미 가입된 아이디 또는 닉네임이 있습니다.',
        };
      }
      const encryptPassword = await bcrypt.hash(password, saltRounds);
      const user = await this.userRepository.createUser(
        member,
        accountId,
        encryptPassword,
        nickname,
        phone,
        address,
        point
      );
      return user;
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        errorMessage: '요청이 올바르지 않습니다. - service',
      };
    }
  };

  findUser = async (userId) => {
    try {
      const user = await this.userRepository.findUser(userId);

      return user;
    } catch (error) {
      return error;
    }
  };

  loginUser = async (accountId, password) => {
    try {
      const userInfo = await this.userRepository.loginUser(accountId);

      if (!userInfo) {
        throw new Error('User Error');
      }

      const check = await bcrypt.compare(password, userInfo.password);

      if (!check) {
        throw new Error('Password Error');
      }

      const accessToken = jwt.sign(
        {
          type: 'JWT',
          userId: userInfo.id,
          accountId: userInfo.accountId,
          member: userInfo.member,
        },
        process.env.ACCESS_JWT_SECRET_KET,
        {
          expiresIn: '1h',
        }
      );

      return accessToken;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = UserService;
