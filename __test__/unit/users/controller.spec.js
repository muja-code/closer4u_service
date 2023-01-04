const UserController = require('../../../controllers/users/users');

let mockUserService = {
  findUser: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
};

let mockError = new Error('mock Error');

let userController = new UserController();
userController.userService = mockUserService;

describe('3계층 아키텍처 패턴 users 컨트롤러 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('users 컨트롤러의 getUser Method 성공', async () => {
    const userReturnValue = {
      account_id: 'TestId1',
      nickname: 'Nickname1',
      phone: '123465',
      address: 'Address1',
      point: 1000000,
    };

    mockUserService.findUser = jest.fn(() => userReturnValue);

    await userController.getUser(mockRequest, mockResponse);

    expect(mockUserService.findUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.render).toHaveBeenCalledWith('mypage', {
      data: userReturnValue,
    });
  });

  test('users 컨트롤러의 getUser Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    mockUserService.findUser = jest.fn(() => mockError);

    await userController.getUser(mockRequest, mockResponse);

    expect(mockUserService.findUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: userReturnValue.errorMessage,
    });
  });
});
