const OrdersService = require('../../services/orders/orders');

class OrdersController {
  ordersService = new OrdersService();

  getOrderRequests = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getOrderRequests();

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).json({ datas: orders });
      // res.status(200).render('order-requests', { datas: orders });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  getOrders = async (req, res, next) => {
    try {
      const userId = 3;
      const orders = await this.ordersService.getOrders(userId);

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).json({ datas: orders });
      // res.status(200).render('order-list', {
      //   datas: orders,
      // });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  acceptRequest = async (req, res, next) => {
    try {
      const userId = 3;
      const { orderId } = req.params;

      const order = await this.ordersService.acceptRequest(userId, orderId);
      if (typeof order.message !== 'undefined') {
        throw order;
      }

      res.status(201).json({ message: '접수가 완료되었습니다.' });
    } catch (error) {
      if (error.message === 'Order Error') {
        res.status(404).json({ errorMessage: '주문이 존재하지 않습니다.' });
      } else if (error.message === 'Status Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else {
        console.log(error);
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
    }
  };

  changeStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      const { orderId } = req.params;

      const order = await this.ordersService.changeStatus(orderId, status);

      if (typeof order.message !== 'undefined') {
        throw order;
      }

      res.status(201).json({ message: '주문 상태가 변경되었습니다.' });
    } catch (error) {
      if (error.message === 'Order Error') {
        res.status(404).json({ errorMessage: '주문이 존재하지 않습니다.' });
      } else if (error.message === 'Status Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else {
        res.status(500).json({ errorMessage: error.message });
      }
    }
  };
}

module.exports = OrdersController;
