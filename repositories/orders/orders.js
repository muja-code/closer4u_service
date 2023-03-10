const { Op } = require('sequelize');

class OrdersRepository {
  constructor(orderModel, reviewModel, userModel) {
    this.orderModel = orderModel;
    this.reviewModel = reviewModel;
    this.userModel = userModel;
  }

  getOrderRequests = async () => {
    try {
      const orders = await this.orderModel.findAll({
        attributes: [
          'id',
          'nickname',
          'phone',
          'address',
          'requested',
          'status',
          'image',
          'createdAt',
        ],
        where: { status: 0 },
      });
      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCompanyOrders = async (userId) => {
    try {
      const orders = await this.orderModel.findAll({
        attributes: [
          'id',
          'nickname',
          'phone',
          'address',
          'requested',
          'status',
          'image',
          'createdAt',
        ],
        where: {
          company_id: userId,
        },
        include: {
          model: this.reviewModel,
          attributes: ['comment', 'mark'],
        },
      });

      console.log(orders);
      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getOrder = async (orderId) => {
    try {
      const order = await this.orderModel.findOne({
        where: { id: orderId },
      });

      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  acceptRequest = async (userId, orderId, point) => {
    try {
      await this.orderModel.update(
        { company_id: userId, status: 1 },
        { where: { id: orderId } }
      );

      // await this.userModel.update({ where: { id: userId } });
      await this.userModel.increment(
        { point: 10000 },
        { where: { id: userId } }
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  changeStatus = async (orderId, status) => {
    try {
      await this.orderModel.update({ status }, { where: { id: orderId } });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  findAllOrder = async () => {
    try {
      // sequelize ?????? Orders ????????? findAll ???????????? ????????? ????????? ??????
      const orders = await this.orderModel.findAll({
        include: {
          model: this.reviewModel,
          attributes: ['comment', 'mark'],
        },
      });

      return orders;
    } catch (error) {
      // ????????? ????????? ????????? ?????? ????????? 403
      console.log('OrderRepositoryFindAllOrderError :', error);
      return 400;
    }
  };

  createOrder = async (userId, nickname, phone, address, image, requested) => {
    try {
      // // ????????? ?????? ??????
      // const orders = await this.ordersModel.findAll();

      // console.log('orders : ', orders);

      // for (let i = 0; i < orders.length; i++) {
      //   if (orders[i].nickname === nickname) {
      //     //??? ????????? ????????? ?????? ?????? ????????? ?????? ??? ????????? ??????, ????????? ?????????????????? ????????? ????????? ?????? ????????? ???????????? ?????? ????????? ???, ???????????? ????????????.
      //     return 406;
      //   }
      // }
      // sequelize ?????? Orders ????????? create ???????????? ????????? ????????? ??????
      const createOrderData = await this.orderModel.create({
        nickname,
        phone,
        address,
        image,
        requested,
        user_id: userId,
      });

      console.log('??????');
      await this.userModel.decrement(
        { point: 10000 },
        { where: { id: userId } }
      );

      if (
        !createOrderData.nickname ||
        !createOrderData.phone ||
        !createOrderData.address
      ) {
        return 400;
      }

      return createOrderData;
    } catch (error) {
      // ????????? ????????? ????????? ?????? ????????? 403
      console.log('OrderRepositoryCreateOrderError :', error.message);
      return 400;
    }
  };
}

module.exports = OrdersRepository;
