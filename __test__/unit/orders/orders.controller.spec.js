const OrdersController = require('../../../controllers/orders/orders');

let mockOrdersService = {
  findAllOrder: jest.fn(),
  createOrder: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
};

let ordersController = new OrdersController();
ordersController.ordersService = mockOrdersService;

describe('3계층 아키텍처 패턴 orders 컨트롤러 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('orders 컨트롤러의 getOrders Method 성공', async () => {
    const ordersReturnValue = [
      {
        nickname: 'nickname1',
        phone: 1,
        address: 'address1',
        image: 'image1',
        requested: 'requested1',
        createdAt: new Date(),
      },
    ];

    mockOrdersService.findAllOrder = jest.fn(() => ordersReturnValue);

    await ordersController.getOrders(mockRequest, mockResponse);

    expect(mockOrdersService.findAllOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: ordersReturnValue,
    });
  });

  test('orders 컨트롤러의 createOrders Method 성공', async () => {
    const ordersReturnValue = {
      msg: { message: '주문 신청이 완료되었습니다.' },
    };

    mockOrdersService.createOrder = jest.fn(() => ordersReturnValue);

    await ordersController.createOrders(mockRequest, mockResponse);

    expect(mockOrdersService.createOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.render).toHaveBeenCalledWith(
      'order-list',
      ordersReturnValue.msg
    );
  });

  test('orders 컨트롤러의 getOrders Method 실패', async () => {
    const ordersReturnValue = '';

    mockOrdersService.findAllOrder = jest.fn(() => ordersReturnValue);

    await ordersController.getOrders(mockRequest, mockResponse);

    expect(mockOrdersService.findAllOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '요청이 올바르지 않습니다.',
    });
  });

  test('orders 컨트롤러의 createOrders Method 실패', async () => {
    const ordersReturnValue = 406;

    mockOrdersService.createOrder = jest.fn(() => ordersReturnValue);

    await ordersController.createOrders(mockRequest, mockResponse);

    expect(mockOrdersService.createOrder).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(406);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '닉네임이 중복되었습니다.',
    });
  });
});
