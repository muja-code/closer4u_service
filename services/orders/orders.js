const OrdersRepository = require('../../repositories/orders/orders');
const { Order, Review, User } = require('../../models');
const dateFormat = require('../../utills/date');
const logger = require('../../utills/winston');

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
      logger.error(error.message);
      return error;
    }
  };

  getCompanyOrders = async (userId) => {
    try {
      const orders = await this.ordersRepository.getCompanyOrders(userId);
      if (!orders) {
        throw new Error('Order Error');
      }
      const datas = orders.map((order) => {
        return {
          id: order.id,
          nickname: order.nickname,
          phone: order.phone,
          address: order.address,
          image: order.image,
          status: order.status,
          requested: order.requested,
          date: dateFormat(order.createdAt),
          review: order.Reviews,
        };
      });

      return datas;
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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
      logger.error(error.message);
      return error;
    }
  };

  findAllOrder = async (userId) => {
    try {
      // Repostiory 에게 데이터를 요청
      const allOrder = await this.ordersRepository.findAllOrder(userId);

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
          id: order.id,
          nickname: order.nickname,
          phone: order.phone,
          address: order.address,
          image: order.image,
          status: order.status,
          requested: order.requested,
          date: dateFormat(order.createdAt),
          review: order.Reviews,
        };
      });
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  };
  createOrder = async (userId, nickname, phone, address, image, requested) => {
    try {
      const createOrderData = await this.ordersRepository.createOrder(
        userId,
        nickname,
        phone,
        address,
        image,
        requested
      );

      if (typeof createOrderData.message !== 'undefined') {
        throw createOrderData;
      }

      return {
        nickname: createOrderData.nickname,
        phone: createOrderData.phone,
        address: createOrderData.address,
        image: createOrderData.image,
        requested: createOrderData.requested,
      };
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  };
}

module.exports = OrdersService;
