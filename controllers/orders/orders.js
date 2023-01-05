const OrdersService = require('../../services/orders/orders');

class OrdersController {
  ordersService = new OrdersService();

  getOrderRequests = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getOrderRequests();

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).render('order-requests', {
        datas: orders,
        userId: req.userInfo.userId,
        member: req.userInfo.member,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  getCustomerOrders = async (req, res, next) => {
    try {
      const { userId } = req.userInfo;
      const orders = await this.ordersService.getCustomerOrders(userId);

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).render('order-list', {
        datas: orders,
        userId: req.userInfo.userId,
        member: req.userInfo.member,
      });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  getCompanyOrders = async (req, res, next) => {
    try {
      const { userId } = req.userInfo;
      const orders = await this.ordersService.getCompanyOrders(userId);

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).render('order-list', {
        datas: orders,
        userId: req.userInfo.userId,
        member: req.userInfo.member,
      });
    } catch (error) {
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };
  acceptRequest = async (req, res, next) => {
    try {
      const { userId, member } = req.userInfo;
      const { orderId } = req.params;

      if (member === 0) {
        throw new Error('Member Error');
      }

      const order = await this.ordersService.acceptRequest(userId, orderId);
      if (typeof order.message !== 'undefined') {
        throw order;
      }

      res.status(201).json({ message: '접수가 완료되었습니다.' });
    } catch (error) {
      console.log(error);
      if (error.message === 'Order Error') {
        res.status(404).json({ errorMessage: '주문이 존재하지 않습니다.' });
      } else if (error.message === 'Status Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error.message === 'Member Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
    }
  };

  changeStatus = async (req, res, next) => {
    try {
      const { member } = req.userInfo;
      const { orderId } = req.params;

      const order = await this.ordersService.changeStatus(orderId);

      if (member === 0) {
        throw new Error('Member Error');
      }

      if (typeof order.message !== 'undefined') {
        throw order;
      }

      res.status(201).json({ message: '주문 상태가 변경되었습니다.' });
    } catch (error) {
      console.log(error);
      if (error.message === 'Order Error') {
        res.status(404).json({ errorMessage: '주문이 존재하지 않습니다.' });
      } else if (error.message === 'Status Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error.message === 'Member Error') {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else {
        res.status(500).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }
    }
  };
}

module.exports = OrdersController;
