const OrdersService = require("../../../services/orders/orders");
const dateFormat = require("../../../utills/date");

let mockOrdersRepository = {
  getOrderRequests: jest.fn(),
  getCompanyOrders: jest.fn(),
  getOrder: jest.fn(),
  acceptRequest: jest.fn(),
  changeStatus: jest.fn(),
};

const [mockUserId, mockOrderId] = [1, 1];

const mockError = new Error("Order Error");

let ordersService = new OrdersService();
ordersService.ordersRepository = mockOrdersRepository;

describe("3계층 아키텍처 패턴 orders 서비스 unit 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("orders 서비스의 getOrderRequests Method 성공", async () => {
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

    mockOrdersRepository.getOrderRequests = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.getOrderRequests();

    expect(mockOrdersRepository.getOrderRequests).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(ordersReturnValue);
  });
  test("orders 서비스의 getCompanyOrders Method 성공", async () => {
    const ordersReturnValue = [
      {
        id: 1,
        nickname: "nickname",
        phone: 123456,
        address: "address",
        requested: "requested",
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

    const returnValue = [
      {
        id: 1,
        nickname: "nickname",
        phone: 123456,
        address: "address",
        requested: "requested",
        status: 0,
        image: null,
        date: dateFormat(new Date()),
        review: [
          {
            comment: "comment",
            mark: 4,
          },
        ],
      },
    ];

    mockOrdersRepository.getCompanyOrders = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.getCompanyOrders(mockUserId);

    expect(mockOrdersRepository.getCompanyOrders).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(returnValue);
  });

  test("orders 서비스의 acceptRequest Method 성공", async () => {
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
    const ordersReturnValue = true;

    mockOrdersRepository.getOrder = jest.fn(() => orderReturnValue);
    mockOrdersRepository.acceptRequest = jest.fn(() => ordersReturnValue);
    const orders = await ordersService.acceptRequest(mockUserId, mockOrderId);

    expect(mockOrdersRepository.getOrder).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.acceptRequest).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 서비스의 changeStatus Method 성공", async () => {
    const orderReturnValue = {
      id: 1,
      nickname: "nickname1",
      phone: 123456,
      address: "address1",
      requested: "requested1",
      status: 1,
      image: null,
      createdAt: new Date(),
      Reviews: [
        {
          comment: "comment",
          mark: 4,
        },
      ],
    };
    const ordersReturnValue = true;

    mockOrdersRepository.getOrder = jest.fn(() => orderReturnValue);
    mockOrdersRepository.changeStatus = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.changeStatus(mockOrderId);

    expect(mockOrdersRepository.changeStatus).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(ordersReturnValue);
  });

  test("orders 서비스의 getOrderRequests Method 실패 Order Error", async () => {
    const ordersReturnValue = null;

    mockOrdersRepository.getOrderRequests = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.getOrderRequests();

    expect(mockOrdersRepository.getOrderRequests).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(mockError);
  });

  test("orders 서비스의 getCompanyOrders Method 실패 Order Error", async () => {
    const ordersReturnValue = null;

    mockOrdersRepository.getCompanyOrders = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.getCompanyOrders(mockUserId);

    expect(mockOrdersRepository.getCompanyOrders).toHaveBeenCalledTimes(1);

    expect(orders).toEqual(mockError);
  });

  test("orders 서비스의 acceptRequest Method 실패 Order Error", async () => {
    const orderReturnValue = null;
    const ordersReturnValue = true;

    mockOrdersRepository.getOrder = jest.fn(() => orderReturnValue);
    mockOrdersRepository.acceptRequest = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.acceptRequest(mockUserId, mockOrderId);

    expect(mockOrdersRepository.getOrder).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.acceptRequest).toHaveBeenCalledTimes(0);

    expect(orders).toEqual(mockError);
  });

  test("orders 서비스의 changeStatus Method 성공", async () => {
    const orderReturnValue = null;
    const ordersReturnValue = true;

    mockOrdersRepository.getOrder = jest.fn(() => orderReturnValue);
    mockOrdersRepository.changeStatus = jest.fn(() => ordersReturnValue);

    const orders = await ordersService.changeStatus(mockOrderId);

    expect(mockOrdersRepository.getOrder).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.changeStatus).toHaveBeenCalledTimes(0);

    expect(orders).toEqual(mockError);
  });
});

// ------------------------------------------------------------
test("orders 서비스의 findAllOrder Method 성공", async () => {
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

  mockOrdersRepository.findAllOrder = jest.fn(() => ordersReturnValue);

  await ordersService.findAllOrder();

  expect(mockOrdersRepository.findAllOrder).toHaveBeenCalledTimes(1);
});

test("orders 서비스의 createOrder Method 성공", async () => {
  const ordersReturnValue = [
    {
      nickname: "nickname1",
      phone: 1,
      address: "address1",
      image: "image1",
      requested: "requested1",
    },
  ];

  mockOrdersRepository.createOrder = jest.fn(() => ordersReturnValue);

  await ordersService.createOrder(ordersReturnValue);

  expect(mockOrdersRepository.createOrder).toHaveBeenCalledTimes(1);
});
