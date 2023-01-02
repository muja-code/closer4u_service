class ReivewsRepository {
  constructor(reivewsModel) {
    this.reivewsModel = reivewsModel;
  }

  createReivew = async (mark, comment) => {
    try {
      // sequelize 에서 Reivews 모델의 create 메소드를 사용해 데이터 요청
      const createRievewData = await this.reivewsModel.create({
        mark,
        comment,
      });

      return createRievewData;
    } catch (error) {
      console.log('ReivewsRepositoryCreateReivewError :', error.message);
      return 400;
    }
  };
}

module.exports = ReivewsRepository;
