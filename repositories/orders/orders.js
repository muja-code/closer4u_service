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
    } catch {
      return 400;
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
    } catch {
      return 400;
    }
  };

  getOrder = async (order_id) => {
    try {
      const order = await this.orderModel.findOne({
        where: { id: order_id },
      });

      return order;
    } catch {
      return 400;
    }
  };

  changeStatus = async (order_id, status) => {
    try {
      const order = await this.orderModel.update(
        { status },
        { where: { id: order_id } }
      );
    } catch {
      return 400;
    }
  };
}

module.exports = OrdersRepository;
