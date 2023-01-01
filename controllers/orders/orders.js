const OrdersService = require('../../service/orders/orders.js');

class OrdersController {
  ordersService = new OrdersService();

  // 본인이 주문 신청한 내역 조회
  getOrders = async (req, res, next) => {
    const orders = await this.ordersService.findAllOrder();

    res.status(200).json({ data: orders });
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

      res.status(201).json({
        data: createOrderData,
        message: '주문 신청이 완료되었습니다.',
      });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = OrdersController;
