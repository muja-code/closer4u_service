const UserService = require('../../../services/users/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let mockUserRepository = {
  findUser: jest.fn(),
  loginUser: jest.fn(),
};

let mockUserId = 1;

let mockError = new Error('mock Error');

let userService = new UserService();
userService.userRepository = mockUserRepository;

describe('3계층 아키텍처 패턴 users 서비스 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('users 서비스의 findUser Method 성공', async () => {
    const userReturnValue = {
      account_id: 'TestId1',
      nickname: 'Nickname1',
      phone: 123465,
      address: 'Address1',
      point: 1000000,
    };

    mockUserRepository.findUser = jest.fn(() => userReturnValue);

    const user = await userService.findUser(mockUserId);

    expect(mockUserRepository.findUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 서비스의 findUser Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    mockUserRepository.findUser = jest.fn(() => userReturnValue);

    const user = await userService.findUser(mockUserId);

    expect(mockUserRepository.findUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 서비스의 loginUser Method 비밀번호 실패 ', async () => {
    const encryptPassword = await bcrypt.hash('12345', saltRounds);
    const userReturnValue = { userId: 1, member: 1, password: encryptPassword };
    const password = '1234';
    const returnError = new Error('Password Error');

    mockUserRepository.loginUser = jest.fn(() => userReturnValue);

    const user = await userService.loginUser(mockUserId, password);

    expect(mockUserRepository.loginUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(returnError);
  });

  test('users 서비스의 loginUser Method 유저 없는 실패', async () => {
    const userReturnValue = null;
    const returnError = new Error('User Error');

    mockUserRepository.loginUser = jest.fn(() => userReturnValue);

    const user = await userService.loginUser(mockUserId);

    expect(mockUserRepository.loginUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(returnError);
  });

  test('users 서비스의 loginUser Method 유저 없는 실패', async () => {
    const userReturnValue = null;
    const returnError = new Error('User Error');

    mockUserRepository.loginUser = jest.fn(() => userReturnValue);

    const user = await userService.loginUser(mockUserId);

    expect(mockUserRepository.loginUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(returnError);
  });
});
