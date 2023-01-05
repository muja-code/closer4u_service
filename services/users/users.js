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
    account_id,
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
      console.log('111122222', member, point);
      if (member === '0') {
        console.log('1111', member, point);
        point = 1000000;
        console.log('2222', member, point);
      }
      const duplicateUser = await User.findAll({
        where: {
          [Op.or]: [{ account_id }, { nickname }],
        },
      });
      if (duplicateUser.length) {
        return {
          code: 400,
          errorMessage: '이미 가입된 아이디 또는 닉네임이 있습니다.',
        };
      }
      if (!validateId.test(account_id)) {
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
      console.log(point);
      const encryptPassword = await bcrypt.hash(password, saltRounds);
      await this.userRepository.createUser(
        member,
        account_id,
        encryptPassword,
        nickname,
        phone,
        address,
        point
      );
      return {
        code: 201,
        Message: '회원가입에 성공하셨습니다.',
      };
    } catch (error) {
      console.log(error);
      console.log('signup error - service');
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

  loginUser = async (userId, password) => {
    try {
      const userInfo = await this.userRepository.loginUser(userId);

      if (!userInfo) {
        throw new Error('User Error');
      }

      const check = await bcrypt.compare(password, userInfo.password);

      if (!check) {
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

      return [accessToken, refreshToken];
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = UserService;
