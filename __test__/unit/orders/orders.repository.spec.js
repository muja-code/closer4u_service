const OrdersRepository = require('../../../repositories/orders/orders');

let mockOrderModel = {
  findAll: jest.fn(),
  create: jest.fn(),
};

let ordersRepository = new OrdersRepository(mockOrderModel);
ordersRepository.ordersModel = mockOrderModel;

describe('3계층 아키텍처 패턴 orders 리파지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('orders 리포지토리 findAllOrder Method 성공', async () => {
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

    mockOrderModel.findAll = jest.fn(() => ordersReturnValue);

    await ordersRepository.findAllOrder();

    expect(mockOrderModel.findAll).toHaveBeenCalledTimes(1);
  });

  test('orders 리포지토리 createOrder Method 성공', async () => {
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

    mockOrderModel.create = jest.fn(() => ordersReturnValue);

    await ordersRepository.createOrder();

    expect(mockOrderModel.create).toHaveBeenCalledTimes(1);
  });
});
