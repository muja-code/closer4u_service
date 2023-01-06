const UserService = require("../../../services/users/users");

let mockUserRepository = {
  createUser: jest.fn(),
  findUser: jest.fn(),
};

let mockError = new Error("mock Error");

let userService = new UserService();
userService.userRepository = mockUserRepository;

describe("3계층 아키텍처 패턴 users 서비스 unit 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("users 서비스의 signupUser Method 성공", async () => {
    const userReturnValue = {
      member: 0,
      account_id: "test1",
      encryptPassword: "Test1@",
      nickname: "test1",
      phone: "01012345678",
      address: "test1",
      point: 1000000,
    };

    mockUserRepository.createUser = jest.fn(() => userReturnValue);

    await userService.signupUser(userReturnValue);

    expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test("users 서비스의 signupUser Method 실패", async () => {
    const userReturnValue = null;

    mockUserRepository.createUser = jest.fn(() => userReturnValue);

    const user = await userService.signupUser(userReturnValue);

    expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(mockError);
  });

  test.each([
    {
      member: "0",
      account_id: "te",
      password: "Test1@",
      check_password: "Test1@",
      nickname: "test",
      phone: "01012345678",
      address: "test",
    },
    {
      member: "0",
      account_id: "test1",
      password: "test1",
      check_password: "test1",
      nickname: "test1",
      phone: "01012345678",
      address: "test",
    },
    {
      member: "0",
      account_id: "test1",
      password: "Test1@",
      check_password: "Test1@@",
      nickname: "test1",
      phone: "01012345678",
      address: "test",
    },
    {
      member: "0",
      account_id: "test1",
      password: "Test1@",
      check_password: "Test1@",
      nickname: "",
      phone: "01012345678",
      address: "test",
    },
    {
      member: "0",
      account_id: "test1",
      password: "Test1@",
      check_password: "Test1@",
      nickname: "test1",
      phone: "",
      address: "test",
    },
    {
      member: "0",
      account_id: "test1",
      password: "Test1@",
      check_password: "Test1@",
      nickname: "test1",
      phone: "01012345678",
      address: "",
    },
  ])(
    "users 서비스의 signupUser 회원가입 유효성 검사",
    async ({
      member,
      account_id,
      password,
      check_password,
      nickname,
      phone,
      address,
    }) => {
      const signupResult = await userService.signupUser(
        member,
        account_id,
        password,
        check_password,
        nickname,
        phone,
        address
      );
      expect(signupResult.errorMessage).toBeDefined();
    }
  );
});
