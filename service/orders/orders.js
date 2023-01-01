const OrdersRepository = require('../../repositories/orders/orders.js');

class OrdersService {
  ordersRepository = new OrdersRepository();

  findAllOrder = async () => {
    // Repostiory 에게 데이터를 요청
    const allOrder = await this.ordersRepository.findAllOrder();

    // 최신글 부터 정렬
    allOrder.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 데이터 가공
    return allOrder.map((order) => {
      return {
        nickname: order.nickname,
        phone: order.phone,
        address: order.address,
        image: order.image,
        requested: order.requested,
        createdAt: order.createdAt,
      };
    });
  };
}

createOrder = async (nickname, phone, address, image, requested) => {
  // Repostiory 에게 데이터를 요청
  const createOrderData = await this.ordersRepository.createOrder(
    nickname,
    phone,
    address,
    image,
    requested,
    createdAt
  );

  // 데이터 가공
  return {
    nickname: createOrderData.nickname,
    phone: createOrderData.phone,
    address: createOrderData.address,
    image: createOrderData.image,
    requested: createOrderData.requested,
    createdAt: createOrderData.createdAt,
  };
};
module.exports = OrdersService;
