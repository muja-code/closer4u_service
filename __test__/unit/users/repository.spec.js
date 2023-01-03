const UserRepository = require('../../../repositories/users/users');

let MockUserModel = {
  findOne: jest.fn(),
};

let mockUserId = 1;

let mockError = new Error('mock Error');

let userRepository = new UserRepository(MockUserModel);

describe('3계층 아키텍처 패턴 users 리포지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
});
