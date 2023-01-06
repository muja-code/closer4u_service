const OrdersRepository = require("../../../repositories/orders/orders");

let mockOrderModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};

let mockReviewModel = {};

let mockUserModel = {
  increment: jest.fn(),
};

let [mockUserId, mockOrderId, mockStatus] = [1, 1, 1];

let mockError = new Error("mock Error");

let ordersRepository = new OrdersRepository(
  mockOrderModel,
  mockReviewModel,
  mockUserModel
);

describe("3계층 아키텍처 패턴 orders 리포지토리 unit 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("orders 리포지토리 getOrderRequests Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "test1",
        phone: "test1",
        address: "test1",
        requested: "test1",
        status: "test1",
        image: "test1",
        createdAt: "test1",
      },
      {
        id: 2,
        nickname: "test2",
        phone: "test2",
        address: "test2",
        requested: "test2",
        status: "test2",
        image: "test2",
        createdAt: "test2",
      },
    ];

    ordersRepository.orderModel.findAll = jest.fn(() => ordersReturnValue);

    const orders = await ordersRepository.getOrderRequests();

    expect(ordersRepository.orderModel.findAll).toHaveBeenCalledTimes(1);
    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 리포지토리 getCompanyOrders Method 성공", async () => {
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
        id: 2,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
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
    ];

    ordersRepository.orderModel.findAll = jest.fn(() => ordersReturnValue);

    const orders = await ordersRepository.getCompanyOrders(mockUserId);

    expect(ordersRepository.orderModel.findAll).toHaveBeenCalledTimes(1);
    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 리포지토리 getOrder Method 성공", async () => {
    const orderReturnValue = {
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
    };

    ordersRepository.orderModel.findOne = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.getOrder(mockUserId);

    expect(ordersRepository.orderModel.findOne).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });

  test("orders 리포지토리 acceptRequest Method 성공", async () => {
    const orderReturnValue = undefined;

    ordersRepository.orderModel.update = jest.fn(() => orderReturnValue);
    ordersRepository.orderModel.increment = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.acceptRequest(mockUserId, mockOrderId);

    expect(ordersRepository.orderModel.update).toHaveBeenCalledTimes(1);
    expect(ordersRepository.userModel.increment).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });

  test("orders 리포지토리 changeStatus Method 성공", async () => {
    const orderReturnValue = undefined;
    ordersRepository.orderModel.update = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.changeStatus(mockUserId, mockStatus);

    expect(ordersRepository.orderModel.update).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });

  test("orders 리포지토리 getOrderRequests Method 실패", async () => {
    const ordersReturnValue = mockError;

    ordersRepository.orderModel.findAll.mockReturnValue(
      new Error("mock Error")
    );

    const orders = await ordersRepository.getOrderRequests();

    expect(ordersRepository.orderModel.findAll).toHaveBeenCalledTimes(1);
    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 리포지토리 getCompanyOrders Method 실패", async () => {
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
        id: 2,
        nickname: "nickname2",
        phone: 123456,
        address: "address2",
        requested: "requested2",
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
    ];

    ordersRepository.orderModel.findAll = jest.fn(() => ordersReturnValue);

    const orders = await ordersRepository.getCompanyOrders(mockUserId);

    expect(ordersRepository.orderModel.findAll).toHaveBeenCalledTimes(1);
    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 리포지토리 getOrder Method 실패", async () => {
    const orderReturnValue = {
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
    };

    ordersRepository.orderModel.findOne = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.getOrder(mockUserId);

    expect(ordersRepository.orderModel.findOne).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });

  test("orders 리포지토리 acceptRequest Method 실패", async () => {
    const orderReturnValue = undefined;
    ordersRepository.orderModel.update = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.acceptRequest(mockUserId, mockOrderId);

    expect(ordersRepository.orderModel.update).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });

  test("orders 리포지토리 changeStatus Method 실패", async () => {
    const orderReturnValue = undefined;
    ordersRepository.orderModel.update = jest.fn(() => orderReturnValue);

    const order = await ordersRepository.changeStatus(mockUserId, mockStatus);

    expect(ordersRepository.orderModel.update).toHaveBeenCalledTimes(1);
    expect(order).toEqual(orderReturnValue);
  });
});

// ----------------------------------------------------------------

test("orders 리포지토리 findAllOrder Method 성공", async () => {
  const ordersReturnValue = [
    {
      nickname: "nickname1",
      phone: 1,
      address: "address1",
      image: "image1",
      requested: "requested1",
      createdAt: new Date(),
    },
  ];

  mockOrderModel.findAll = jest.fn(() => ordersReturnValue);

  await ordersRepository.findAllOrder();

  expect(mockOrderModel.findAll).toHaveBeenCalledTimes(1);
});

test("orders 리포지토리 createOrder Method 성공", async () => {
  const ordersReturnValue = [
    {
      nickname: "nickname1",
      phone: 1,
      address: "address1",
      image: "image1",
      requested: "requested1",
      createdAt: new Date(),
    },
  ];

  mockOrderModel.create = jest.fn(() => ordersReturnValue);

  await ordersRepository.createOrder();

  expect(mockOrderModel.create).toHaveBeenCalledTimes(1);
});
