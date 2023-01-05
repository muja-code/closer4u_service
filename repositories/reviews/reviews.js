class ReivewsRepository {
  constructor(reivewsModel) {
    this.reivewsModel = reivewsModel;
  }

  // 리뷰 작성
  createReivew = async (userId, orderId, mark, comment) => {
    try {
      console.log(userId, orderId);
      // sequelize 에서 Reivews 모델의 create 메소드를 사용해 데이터 요청
      const createRievewData = await this.reivewsModel.create({
        user_id: userId,
        order_id: orderId,
        mark,
        comment,
      });

      if (!createRievewData.mark || !createRievewData.comment) {
        return 400;
      }

      return createRievewData;
    } catch (error) {
      console.log('ReivewsRepositoryCreateReivewError :', error.message);
      return 400;
    }
  };
}

module.exports = ReivewsRepository;
