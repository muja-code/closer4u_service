const OrdersService = require('../../services/orders/orders');

class OrdersController {
  ordersService = new OrdersService();

  getOrderRequests = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getOrderRequests();

      if (orders === 0) {
        throw error;
      }

      res.status(200).json({ data: orders });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  getOrders = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getOrders();

      if (orders === 0) {
        throw error;
      }

      res.status(200).json({ data: orders });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  changeStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      const { order_id } = req.params;

      const order = await this.ordersService.changeStatus(order_id, status);

      if (order === 0) {
        throw error;
      }

      res.status(201).json({ message: '주문 상태가 변경되었습니다.' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };
}

module.exports = OrdersController;
