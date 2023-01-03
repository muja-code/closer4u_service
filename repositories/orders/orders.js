class OrdersRepository {
  constructor(orderModel, reviewModel) {
    this.orderModel = orderModel;
    this.reviewModel = reviewModel;
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

  getOrders = async (userId) => {
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

  acceptRequest = async (userId, orderId) => {
    try {
      await this.orderModel.update(
        { company_id: userId, status: 1 },
        { where: { id: orderId } }
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
}

module.exports = OrdersRepository;
