const { Op } = require('sequelize');

class OrdersRepository {
  constructor(orderModel, reviewModel) {
    this.orderModel = orderModel;
    this.reviewModel = reviewModel;
  }

  getOrderRequests = async () => {
    try {
      const orders = await this.orderModel.findAll({
        attributes: [
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
      return 0;
    }
  };

  getOrders = async () => {
    try {
      const orders = await this.orderModel.findAll({
        attributes: [
          'nickname',
          'phone',
          'address',
          'requested',
          'status',
          'image',
          'createdAt',
        ],
        where: {
          [Op.not]: [{ status: 0 }],
        },
        include: {
          model: this.reviewModel,
          attributes: ['comment', 'mark'],
        },
      });

      return orders;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  changeStatus = async (order_id, status) => {
    try {
      const order = await this.orderModel.update(
        { status },
        { where: { id: order_id } }
      );

      return order;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
}

module.exports = OrdersRepository;
