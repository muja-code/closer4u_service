class ReviewsRepository {
  constructor(reviewsModel) {
    this.reviewsModel = reviewsModel;
  }

  // 리뷰 작성
  createReview = async (userId, orderId, mark, comment) => {
    try {
      console.log(userId, orderId);
      // sequelize 에서 Reviews 모델의 create 메소드를 사용해 데이터 요청
      const createRievewData = await this.reviewsModel.create({
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
      console.log('ReviewsRepositoryCreateReviewError :', error.message);
      return 400;
    }
  };
}

module.exports = ReviewsRepository;
