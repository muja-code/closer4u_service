const OrdersRepository = require('../../repositories/orders/orders');
const { Order, Review } = require('../../models');
const dateFormat = require('../../utills/date');

class OrdersService {
  ordersRepository = new OrdersRepository(Order, Review);

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

  getOrders = async (user_id) => {
    try {
      const orders = await this.ordersRepository.getOrders(user_id);

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

      await this.ordersRepository.acceptRequest(userId, orderId);
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

      if (order.status === 4) {
        throw new Error('Status Error');
      }

      await this.ordersRepository.changeStatus(orderId, order.status + 1);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = OrdersService;
