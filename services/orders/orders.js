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

  getCompanyOrders = async (userId) => {
    try {
      const orders = await this.ordersRepository.getCompanyOrders(userId);
      if (!orders) {
        throw new Error('Order Error');
      }
      const datas = orders.map((order) => {
        return {
          id: order.id,
          nickname: order.nickname,
          phone: order.phone,
          address: order.address,
          image: order.image,
          status: order.status,
          requested: order.requested,
          date: dateFormat(order.createdAt),
          review: order.Reviews,
        };
      });

      return datas;
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

  findAllOrder = async () => {
    try {
      // Repostiory ?????? ???????????? ??????
      const allOrder = await this.ordersRepository.findAllOrder();

      if (!allOrder) {
        return res.status(404).json({
          message: '????????? ????????? ????????????.',
        });
      }

      // ????????? ?????? ??????
      allOrder.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      // ????????? ??????
      return allOrder.map((order) => {
        return {
          id: order.id,
          nickname: order.nickname,
          phone: order.phone,
          address: order.address,
          image: order.image,
          status: order.status,
          requested: order.requested,
          date: dateFormat(order.createdAt),
          review: order.Reviews,
        };
      });
    } catch (error) {
      console.log('OrdersRepositoryFindAllOrderError :', error.message);
      return error;
    }
  };
  createOrder = async (userId, nickname, phone, address, image, requested) => {
    try {
      console.log('?????????1');
      // Repostiory ?????? ???????????? ??????
      const createOrderData = await this.ordersRepository.createOrder(
        userId,
        nickname,
        phone,
        address,
        image,
        requested
      );

      if (!createOrderData) {
        return res.status(404).json({
          message: '????????? ????????? ????????????.',
        });
      }

      // nickname ??????
      if (createOrderData === 406) {
        //??? ????????? ????????? ?????? ?????? ????????? ?????? ??? ????????? ??????, ????????? ?????????????????? ????????? ????????? ?????? ????????? ???????????? ?????? ????????? ???, ???????????? ????????????.
        throw 406;
      }

      if (createOrderData === 400) {
        throw 400;
      }

      // ????????? ?????? ?????? ?????? throw 403

      // ????????? ??????
      return {
        nickname: createOrderData.nickname,
        phone: createOrderData.phone,
        address: createOrderData.address,
        image: createOrderData.image,
        requested: createOrderData.requested,
      };
    } catch (error) {
      console.log('OrdersRepositoryCreateOrderError :', error.message);

      return error;
    }
  };
}

module.exports = OrdersService;
