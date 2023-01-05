const OrdersService = require('../../services/orders/orders.js');

class OrdersController {
  ordersService = new OrdersService();

  // 본인이 주문 신청한 내역 조회
  getOrders = async (req, res, next) => {
    try {
      const orders = await this.ordersService.findAllOrder();

      if (orders == '') {
        return res
          .status(400)
          .json({ errorMessage: '요청이 올바르지 않습니다.' });
      }

      res.status(200).json({ data: orders });
    } catch (error) {
      // console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
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

      console.log('createOrderData : ', createOrderData);

      if (!createOrderData) {
        return res.status(400).json({
          errorMessage: '요청이 올바르지 않습니다.',
        });
      }

      if (createOrderData === 406) {
        return res.status(406).json({
          errorMessage: '닉네임이 중복되었습니다.',
        });
      }

      // if (createOrderData === 400) {
      //   return res.status(400).json({
      //     errorMessage: '요청이 올바르지 않습니다.',
      //   });
      // } else if (createOrderData === 406) {
      //   return res.status(406).json({
      //     errorMessage: '닉네임이 중복되었습니다.',
      //   });
      // }
      res.status(201).render('order-list', {
        message: '주문 신청이 완료되었습니다.',
      });

      // res.status(201).json({
      //   // data: createOrderData,
      //   message: '주문 신청이 완료되었습니다.',
      // });
    } catch (error) {
      if (error === 400) {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error === 406) {
        res.status(406).json({ errorMessage: '닉네임이 중복되었습니다.' });
      }
      // else {
      //   res.status(500).json({ errorMessage: error.message });
      // }
    }
  };
}

module.exports = OrdersController;
