
const OrdersRepository = require('../../repositories/orders/orders');
const { Order, Review, User } = require('../../models');
const dateFormat = require('../../utills/date');

class OrdersService {
  ordersRepository = new OrdersRepository(Order, Review, User);

  getOrderRequests = async () => {
    try {
      const orders = await this.ordersRepository.getOrderRequests();

      if (!orders) {
        throw new Error('Order Error');
      }

      for (let order of orders) {
        order.date = dateFormat(order.createdAt);
      }

      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCustomerOrders = async (userId) => {
    try {
      const orders = await this.ordersRepository.getCustomerOrders(userId);

      if (!orders) {
        throw new Error('Order Error');
      }

      for (let order of orders) {
        order.date = dateFormat(order.createdAt);
      }

      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCompanyOrders = async (userId) => {
    try {
      const orders = await this.ordersRepository.getCompanyOrders(userId);

      if (!orders) {
        throw new Error('Order Error');
      }

      for (let order of orders) {
        order.date = dateFormat(order.createdAt);
      }
      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  acceptRequest = async (userId, orderId) => {
    try {
      const order = await this.ordersRepository.getOrder(orderId);

      if (!order) {
        throw new Error('Order Error');
      }

      console.log(order.status);
      if (order.status !== 0) {
        throw new Error('Status Error');
      }

      await this.ordersRepository.acceptRequest(
        userId,
        orderId,
        order.point + 10000
      );
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  changeStatus = async (orderId) => {
    try {
      const order = await this.ordersRepository.getOrder(orderId);

      if (!order) {
        throw new Error('Order Error');
      }

      if (order.status === 4 || order.status === 0) {
        throw new Error('Status Error');
      }

      await this.ordersRepository.changeStatus(orderId, order.status + 1);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };



  findAllOrder = async () => {
    try {
      // Repostiory 에게 데이터를 요청
      const allOrder = await this.ordersRepository.findAllOrder();

      if (!allOrder) {
        return res.status(404).json({
          message: '작성한 리뷰가 없습니다.',
        });
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
        return res.status(404).json({
          message: '작성한 리뷰가 없습니다.',
        });
      }

      // nickname 중복
      if (createOrderData === 406) {
        //이 응답은 서버가 서버 주도 콘텐츠 협상 을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.
        throw 406;
      }

      if (createOrderData === 400) {
        throw 400;
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
