const UserService = require('../../../services/users/users');

let mockUserRepository = {
  findUser: jest.fn(),
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
});
