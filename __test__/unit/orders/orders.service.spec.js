const OrdersService = require('../../../services/orders/orders');

let mockOrdersRepository = {
  findAllOrder: jest.fn(),
  createOrder: jest.fn(),
};

let ordersService = new OrdersService();
ordersService.ordersRepository = mockOrdersRepository;

describe('3계층 아키텍처 패턴 orders 서비스 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('orders 서비스의 findAllOrder Method 성공', async () => {
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

    mockOrdersRepository.findAllOrder = jest.fn(() => ordersReturnValue);

    await ordersService.findAllOrder();

    expect(mockOrdersRepository.findAllOrder).toHaveBeenCalledTimes(1);
  });

  test('orders 서비스의 createOrder Method 성공', async () => {
    const ordersReturnValue = [
      {
        nickname: 'nickname1',
        phone: 1,
        address: 'address1',
        image: 'image1',
        requested: 'requested1',
      },
    ];

    mockOrdersRepository.createOrder = jest.fn(() => ordersReturnValue);

    await ordersService.createOrder(ordersReturnValue);

    expect(mockOrdersRepository.createOrder).toHaveBeenCalledTimes(1);
  });
});
