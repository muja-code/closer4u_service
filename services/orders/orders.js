const OrdersRepository = require('../../repositories/orders/orders');
const { Order, Review } = require('../../models');

class OrdersService {
  ordersRepository = new OrdersRepository(Order, Review);

  getOrderRequests = async () => {
    try {
      const orders = this.ordersRepository.getOrderRequests();

      if (orders === 400) {
        throw 400;
      }

      return orders;
    } catch (error) {
      return error;
    }
  };

  getOrders = async () => {
    try {
      const orders = await this.ordersRepository.getOrder();

      if (orders === 400) {
        throw 400;
      }

      return orders;
    } catch (error) {
      return error;
    }
  };

  changeStatus = async (order_id) => {
    try {
      const order = await this.ordersRepository.getOrder(order_id);

      console.log(order.status);

      if (!order) {
        throw 404;
      }

      if (order.status === 4) {
        throw 400;
      }

      await this.ordersRepository.changeStatus(order_id, order.status + 1);
    } catch (error) {
      return error;
    }
  };
}

module.exports = OrdersService;
