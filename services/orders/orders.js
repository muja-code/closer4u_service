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
}

module.exports = OrdersService;
