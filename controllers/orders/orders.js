const OrdersService = require('../../service/orders/orders.js');

class OrdersController {
  ordersService = new OrdersService();

  // 본인이 주문 신청한 내역 조회
  getOrders = async (req, res, next) => {
    try {
      const orders = await this.ordersService.findAllOrder();

      if (orders === 400) {
        throw 400;
      } else if (orders === 403) {
        // 로그인 쿠키가 없을 경우(미완)
        throw 403;
      } else if (orders === 404) {
        // 내역이 없을 경우
        throw 404;
      }

      res.status(200).json({ data: orders });
    } catch (error) {
      if (error === 400) {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error === 403) {
        res.status(403).json({ errorMessage: '로그인이 필요합니다.' });
      } else if (error === 404) {
        res.status(403).json({ errorMessage: '유저가 존재하지 않습니다.' });
      } else {
        res.status(500).json({ errorMessage: error.message });
      }
    }
  };

  // 주문 신청
  createOrders = async (req, res, next) => {
    try {
      const { nickname, phone, address, image, requested } = req.body;

      const createOrderData = await this.ordersService.createOrder(
        nickname,
        phone,
        address,
        image,
        requested
      );

      if (createOrderData === 400) {
        throw 400;
      } else if (createOrderData === 403) {
        throw 403;
      } else if (createOrderData === 406) {
        throw 406;
      }

      res.status(201).json({
        data: createOrderData,
        message: '주문 신청이 완료되었습니다.',
      });
    } catch (error) {
      if (error === 400) {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error === 403) {
        res.status(403).json({ errorMessage: '로그인이 필요합니다.' });
      } else if (error === 406) {
        res.status(406).json({ errorMessage: '닉네임이 중복되었습니다.' });
      } else {
        res.status(500).json({ errorMessage: error.message });
      }
    }
  };
}

module.exports = OrdersController;
