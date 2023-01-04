class OrdersRepository {
  constructor(ordersModel) {
    this.ordersModel = ordersModel;
  }

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
      // 닉네임 중복 방지
      const orders = await this.ordersModel.findAll();

      console.log('orders : ', orders);

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].nickname === nickname) {
          //이 응답은 서버가 서버 주도 콘텐츠 협상 을 수행한 이후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.
          return 406;
        }
      }
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
