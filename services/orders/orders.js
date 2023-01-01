const OrdersRepository = require('../../repositories/orders/orders');
const { Order, Review } = require('../../models');

class OrdersService {
  ordersRepository = new OrdersRepository(Order, Review);

  getOrderRequests = async () => {
    try {
      const orders = this.ordersRepository.getOrderRequests();

      if (orders === 0) {
        throw error;
      }

      return orders;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  changeStatus = async (order_id, status) => {
    try {
      if (status === 4) {
        throw error;
      }

      const order = await this.ordersRepository.changeStatus(
        order_id,
        status + 1
      );

      return order;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
}

module.exports = OrdersService;
