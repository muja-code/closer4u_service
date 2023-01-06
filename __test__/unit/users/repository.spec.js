const UserRepository = require('../../../repositories/users/users');

let MockUserModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

let mockUserId = 1;

let mockError = new Error('mock Error');

let userRepository = new UserRepository(MockUserModel);

describe('3계층 아키텍처 패턴 users 리포지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('users 리포지토리 create Method 성공', async () => {
    const userReturnValue = {
      member: 1,
      account_id: 'testId1',
      encryptPassword: 'testPassword',
      nickname: 'nickname1',
      phone: '123465',
      address: 'testAddress',
      point: 1000000,
    };

    userRepository.userModel.create = jest.fn(() => userReturnValue);

    const user = await userRepository.createUser(mockUserId);

    expect(userRepository.userModel.create).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 리포지토리 create Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    userRepository.userModel.create = jest.fn(() => userReturnValue);

    const user = await userRepository.createUser(mockUserId);

    expect(userRepository.userModel.create).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 리포지토리 findOne Method 성공', async () => {
    const userReturnValue = {
      account_id: 'TestId1',
      nickname: 'Nickname1',
      phone: 123465,
      address: 'Address1',
      point: 1000000,
    };

    userRepository.userModel.findOne = jest.fn(() => userReturnValue);

    const user = await userRepository.findUser(mockUserId);

    expect(userRepository.userModel.findOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 리포지토리 findOne Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    userRepository.userModel.findOne = jest.fn(() => userReturnValue);

    const user = await userRepository.findUser(mockUserId);

    expect(userRepository.userModel.findOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 리포지토리 loginUser Method 성공', async () => {
    const userReturnValue = {
      id: 1,
      account_id: 'test',
      password: '1234',
      nickname: 'test',
      createdAt: new Date(),
      member: 1,
    };

    userRepository.userModel.findOne = jest.fn(() => userReturnValue);

    const user = await userRepository.loginUser(mockUserId);

    expect(userRepository.userModel.findOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });

  test('users 리포지토리 loginUser Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    userRepository.userModel.findOne = jest.fn(() => userReturnValue);

    const user = await userRepository.loginUser(mockUserId);

    expect(userRepository.userModel.findOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userReturnValue);
  });
});
