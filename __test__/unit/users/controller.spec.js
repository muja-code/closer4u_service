const UserController = require('../../../controllers/users/users');

let mockUserService = {
  findUser: jest.fn(),
  loginUser: jest.fn(),
  signupUser: jest.fn(),
};

let mockRequest = {
  body: { userId: 'test', password: '1234' },
  userInfo: { userId: 1, member: 1 },
  cookies: { accessToken: undefined },
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
  cookie: jest.fn(),
  redirect: jest.fn(),
  clearCookie: jest.fn(),
};

let [mockUserId, mockPassword] = ['mock', '1234'];

let mockError = new Error('요청이 올바르지 않습니다.');

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

  test('users 컨트롤러의 loginUser Method 성공', async () => {
    const userReturnValue = ['accessToken', 'refreshToken'];

    mockUserService.loginUser = jest.fn(() => userReturnValue);

    await userController.loginUser(mockRequest, mockResponse);

    expect(mockUserService.loginUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/api/orders/business');
  });

  test('users 컨트롤러의 logoutUser Method 성공', async () => {
    await userController.logoutUser(mockRequest, mockResponse);

    expect(mockResponse.clearCookie).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/api/orders/business');
  });

  test('users 컨트롤러의 signupUser Method 성공', async () => {
    const userReturnValue = {
      member: 1,
      account_id: 'testId1',
      password: 'testPassword',
      check_password: 'testPassword',
      nickname: 'nickname1',
      phone: '123465',
      address: 'testAddress',
    };

    mockUserService.signupUser = jest.fn(() => userReturnValue);

    await userController.signupUser(mockRequest, mockResponse);

    expect(mockUserService.signupUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/login_page');
  });

  test('users 컨트롤러의 signupUser Method 실패', async () => {
    const userReturnValue = {
      errorMessage: mockError.message,
    };

    mockUserService.signupUser = jest.fn(() => mockError);

    await userController.signupUser(mockRequest, mockResponse);

    expect(mockUserService.signupUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: userReturnValue.errorMessage,
    });
  });
});
