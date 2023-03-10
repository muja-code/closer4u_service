const OrdersController = require("../../../controllers/orders/orders");

let mockOrdersService = {
  getOrderRequests: jest.fn(),
  getCompanyOrders: jest.fn(),
  acceptRequest: jest.fn(),
  changeStatus: jest.fn(),
  findAllOrder: jest.fn(),
  createOrder: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  userInfo: { userId: 1, member: 1 },
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
  redirect: jest.fn(),
};

let ordersController = new OrdersController();
ordersController.ordersService = mockOrdersService;

describe("3계층 아키텍처 패턴 orders 컨트롤러 unit 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("orders 컨트롤러의 getOrderRequests Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "nickname1",
        phone: 123456,
        address: "address1",
        requested: "requested1",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
      {
        id: 2,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
    ];

    mockOrdersService.getOrderRequests = jest.fn(() => ordersReturnValue);

    await ordersController.getOrderRequests(mockRequest, mockResponse);

    expect(mockOrdersService.getOrderRequests).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.render).toHaveBeenCalledWith("order-requests", {
      datas: ordersReturnValue,
      userId: mockRequest.userInfo.userId,
      member: mockRequest.userInfo.member,
    });
  });

  test("orders 컨트롤러의 getCompanyOrders Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "nickname1",
        phone: 123456,
        address: "address1",
        requested: "requested1",
        status: 0,
        image: null,
        createdAt: new Date(),
        Reviews: [
          {
            comment: "comment",
            mark: 4,
          },
        ],
      },
      {
        id: 1,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
        status: 0,
        image: null,
        createdAt: new Date(),
        Reviews: [
          {
            comment: "comment2",
            mark: 4,
          },
        ],
      },
    ];

    mockOrdersService.getCompanyOrders = jest.fn(() => ordersReturnValue);

    await ordersController.getCompanyOrders(mockRequest, mockResponse);

    expect(mockOrdersService.getCompanyOrders).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.render).toHaveBeenCalledWith("order-list", {
      datas: ordersReturnValue,
      userId: mockRequest.userInfo.userId,
      member: mockRequest.userInfo.member,
    });
  });

  test("orders 컨트롤러의 acceptRequest Method 성공", async () => {
    const ordersReturnValue = { msg: { message: "접수가 완료되었습니다." } };

    mockOrdersService.acceptRequest = jest.fn(() => ordersReturnValue);

    await ordersController.acceptRequest(mockRequest, mockResponse);

    expect(mockOrdersService.acceptRequest).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersReturnValue.msg);
  });

  test("orders 컨트롤러의 changeStatus Method 성공", async () => {
    const ordersReturnValue = {
      msg: { message: "주문 상태가 변경되었습니다." },
    };

    mockOrdersService.changeStatus = jest.fn(() => ordersReturnValue);

    await ordersController.changeStatus(mockRequest, mockResponse);

    expect(mockOrdersService.changeStatus).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersReturnValue.msg);
  });

  test("orders 컨트롤러의 getOrderRequests Method 실패", async () => {
    const ordersReturnValue = {
      message: { errorMessage: "요청이 올바르지 않습니다." },
    };

    mockOrdersService.getOrderRequests = jest.fn(() => ordersReturnValue);

    await ordersController.getOrderRequests(mockRequest, mockResponse);

    expect(mockOrdersService.getOrderRequests).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersReturnValue.message);
  });

  test("orders 컨트롤러의 getCompanyOrders Method 실패", async () => {
    const ordersReturnValue = {
      message: { errorMessage: "요청이 올바르지 않습니다." },
    };

    mockOrdersService.getCompanyOrders = jest.fn(() => ordersReturnValue);

    await ordersController.getCompanyOrders(mockRequest, mockResponse);

    expect(mockOrdersService.getCompanyOrders).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersReturnValue.message);
  });
  test("orders 컨트롤러의 acceptRequest Method 실패 Order Error", async () => {
    const ordersReturnValue = { message: "Order Error" };
    const ordersErrorMessage = { errorMessage: "주문이 존재하지 않습니다." };

    mockOrdersService.acceptRequest = jest.fn(() => ordersReturnValue);

    await ordersController.acceptRequest(mockRequest, mockResponse);

    expect(mockOrdersService.acceptRequest).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersErrorMessage);
  });
  test("orders 컨트롤러의 acceptRequest Method 실패 Status Error", async () => {
    const ordersReturnValue = { message: "Status Error" };
    const ordersErrorMessage = { errorMessage: "요청이 올바르지 않습니다." };

    mockOrdersService.acceptRequest = jest.fn(() => ordersReturnValue);

    await ordersController.acceptRequest(mockRequest, mockResponse);

    expect(mockOrdersService.acceptRequest).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersErrorMessage);
  });
  test("orders 컨트롤러의 acceptRequest Method 실패 예상 못한 예외", async () => {
    const ordersReturnValue = { message: "예상 못한 에러" };
    const ordersErrorMessage = { errorMessage: "요청이 올바르지 않습니다." };

    mockOrdersService.acceptRequest = jest.fn(() => ordersReturnValue);

    await ordersController.acceptRequest(mockRequest, mockResponse);

    expect(mockOrdersService.acceptRequest).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(ordersErrorMessage);
  });
  //-------------------------------------------------------------------
  test("orders 컨트롤러의 getOrders Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "nickname1",
        phone: 123456,
        address: "address1",
        requested: "requested1",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
      {
        id: 2,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
    ];

    mockOrdersService.findAllOrder = jest.fn(() => ordersReturnValue);

    await ordersController.getOrders(mockRequest, mockResponse);

    expect(mockOrdersService.findAllOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.render).toHaveBeenCalledWith("order-list", {
      datas: ordersReturnValue,
      userId: mockRequest.userInfo.userId,
      member: mockRequest.userInfo.member,
    });
  });

  test("orders 컨트롤러의 createOrders Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "nickname1",
        phone: 123456,
        address: "address1",
        requested: "requested1",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
      {
        id: 2,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
        status: 0,
        image: null,
        createdAt: new Date(),
      },
    ];

    mockOrdersService.createOrder = jest.fn(() => ordersReturnValue);

    await ordersController.createOrders(mockRequest, mockResponse);

    expect(mockOrdersService.createOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.redirect).toHaveBeenCalledWith("/api/orders/customers");
  });

  test("orders 컨트롤러의 getOrders Method 실패", async () => {
    const ordersReturnValue = "";

    mockOrdersService.findAllOrder = jest.fn(() => ordersReturnValue);

    await ordersController.getOrders(mockRequest, mockResponse);

    expect(mockOrdersService.findAllOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: "요청이 올바르지 않습니다.",
    });
  });
});
