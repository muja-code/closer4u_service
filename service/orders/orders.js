const OrdersRepository = require('../../repositories/orders/orders.js');
const { Order } = require('../../models');

class OrdersService {
  ordersRepository = new OrdersRepository(Order);

  findAllOrder = async () => {
    try {
      // Repostiory 에게 데이터를 요청
      const allOrder = await this.ordersRepository.findAllOrder();

      if (allOrder === 400) {
        throw 400;
      }

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
    } catch (error) {
      console.log('OrdersRepositoryFindAllOrderError :', error.message);
      return error;
    }
  };
  createOrder = async (nickname, phone, address, image, requested) => {
    try {
      // Repostiory 에게 데이터를 요청
      const createOrderData = await this.ordersRepository.createOrder(
        nickname,
        phone,
        address,
        image,
        requested
      );

      if (!createOrderData) {
        throw 400;
      }

      // nickname 중복
      if (createOrderData === 406) {
        //이 응답은 서버가 서버 주도 콘텐츠 협상 을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.
        throw 406;
      }

      // 로그인 쿠키 없을 경우 throw 403

      // 데이터 가공
      return {
        nickname: createOrderData.nickname,
        phone: createOrderData.phone,
        address: createOrderData.address,
        image: createOrderData.image,
        requested: createOrderData.requested,
      };
    } catch (error) {
      console.log('OrdersRepositoryCreateOrderError :', error.message);
      return error;
    }
  };
}

module.exports = OrdersService;
