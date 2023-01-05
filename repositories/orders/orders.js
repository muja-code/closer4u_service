
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

  getCustomerOrders = async (userId) => {
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
          user_id: userId,
          [Op.not]: { company_id: 0 },
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
      // sequelize 에서 Orders 모델의 findAll 메소드를 사용해 데이터 요청
      const orders = await this.ordersModel.findAll();

      return orders;
    } catch (error) {
      // 추가로 쿠키에 로그인 정보 없을때 403
      console.log('OrderRepositoryFindAllOrderError :', error);
      return 400;
    }
  };

  createOrder = async (nickname, phone, address, image, requested) => {
    try {
      // // 닉네임 중복 방지
      // const orders = await this.ordersModel.findAll();

      // console.log('orders : ', orders);

      // for (let i = 0; i < orders.length; i++) {
      //   if (orders[i].nickname === nickname) {
      //     //이 응답은 서버가 서버 주도 콘텐츠 협상 을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.
      //     return 406;
      //   }
      // }
      // sequelize 에서 Orders 모델의 create 메소드를 사용해 데이터 요청
      const createOrderData = await this.ordersModel.create({
        nickname,
        phone,
        address,
        image,
        requested,
      });

      if (
        !createOrderData.nickname ||
        !createOrderData.phone ||
        !createOrderData.address
      ) {
        return 400;
      }

      return createOrderData;
    } catch (error) {
      // 추가로 쿠키에 로그인 정보 없을때 403
      console.log('OrderRepositoryCreateOrderError :', error.message);
      return 400;

    }
  };
}

module.exports = OrdersRepository;
