class OrdersRepository {
  constructor(ordersModel) {
    this.ordersModel = ordersModel;
  }

  findAllOrder = async () => {
    // sequelize 에서 Orders 모델의 findAll 메소드를 사용해 데이터 요청
    const orders = await this.ordersModel.findAll();

    return orders;
  };

  createOrder = async (nickname, phone, address, image, requested) => {
    // sequelize 에서 Orders 모델의 create 메소드를 사용해 데이터 요청
    const createOrderData = await this.ordersModel.create({
      nickname,
      phone,
      address,
      image,
      requested,
    });

    return createOrderData;
  };
}

module.exports = OrdersRepository;
