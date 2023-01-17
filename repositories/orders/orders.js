const { Op } = require('sequelize');
const logger = require('../../utills/winston');

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
      logger.error(error.message);
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

      return orders;
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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
      logger.error(error.message);
      return error;
    }
  };

  changeStatus = async (orderId, status) => {
    try {
      await this.orderModel.update({ status }, { where: { id: orderId } });
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  };

  findAllOrder = async (userId) => {
    try {
      // sequelize 에서 Orders 모델의 findAll 메소드를 사용해 데이터 요청
      const orders = await this.orderModel.findAll({
        where: { user_id: userId, [Op.not]: { company_id: 0 } },
        include: {
          model: this.reviewModel,
          attributes: ['comment', 'mark'],
        },
      });
      return orders;
    } catch (error) {
      logger.error(error.message);
      return 400;
    }
  };

  createOrder = async (userId, nickname, phone, address, image, requested) => {
    try {
      const createOrderData = await this.orderModel.create({
        nickname,
        phone,
        address,
        image,
        requested,
        user_id: userId,
      });

      await this.userModel.decrement(
        { point: 10000 },
        { where: { id: userId } }
      );

      return createOrderData;
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  };
}

module.exports = OrdersRepository;
