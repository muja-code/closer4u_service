const OrdersService = require('../../services/orders/orders');
const logger = require('../../utills/winston');

const io = require('../../socket');
const socket = require('../../socket');

class OrdersController {
  ordersService = new OrdersService();

  getOrderRequests = async (req, res, next) => {
    try {
      const { userId, member } = req.userInfo;

      const orders = await this.ordersService.getOrderRequests();

      if (typeof orders.message !== 'undefined') {
        throw orders;
      }

      res.status(200).json({ datas: orders, userInfo: { userId, member } });
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  // 본인이 주문 신청한 내역 조회
  getCustomerOrders = async (req, res, next) => {
    try {
      const { userId } = req.userInfo;
      const orders = await this.ordersService.findAllOrder(userId);
      if (orders == '') {
        return res
          .status(400)
          .json({ errorMessage: '요청이 올바르지 않습니다.' });
      }

      res.status(200).json({ datas: orders });
    } catch (error) {
      logger.error(error.message);
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

      if ('message' in orders) {
        throw orders;
      }

      res.status(200).json({ datas: orders });
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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
      logger.error(error.message);
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

  // 주문 신청
  createOrders = async (req, res, next) => {
    try {
      const { nickname, phone, address, image, requested } = req.body;
      const userId = req.userInfo.userId;

      if (!nickname || !phone || !address || !image || !requested) {
        return res.status(400).json({
          errorMessage: '요청이 올바르지 않습니다.',
        });
      }

      const createOrderData = await this.ordersService.createOrder(
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

      io.getIO().emit('orderCreate', { message: '주문이 생성되었습니다.' });

      res.status(201).json({
        message: '주문 신청이 완료되었습니다.',
      });
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = OrdersController;
