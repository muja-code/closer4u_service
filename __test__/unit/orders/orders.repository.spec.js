const OrdersRepository = require('../../../repositories/orders/orders');

let mockOrderModel = {
  findAll: jest.fn(),
  create: jest.fn(),
};

let ordersRepository = new OrdersRepository(mockOrderModel);

describe('3계층 아키텍처 패턴 orders 리파지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //?
  test('orders 리포지토리 findAllOrder Method 성공', async () => {});

  //?
  test('orders 리포지토리 createOrder Method 성공', async () => {});
});
