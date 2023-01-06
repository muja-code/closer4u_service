const ReviewsRepository = require('../../repositories/reviews/reviews.js');
const { Review } = require('../../models');

class ReviewsService {
  reviewsRepository = new ReviewsRepository(Review);

  createReview = async (userId, orderId, mark, comment) => {
    try {
      // Repository 에게 데이터를 요청
      const createReviewData = await this.reviewsRepository.createReview(
        userId,
        orderId,
        mark,
        comment
      );
      if (createReviewData === 400) {
        throw 400;
      }

      // 로그인 쿠키가 없을 경우 throw 403

      // 데이터 가공
      return {
        mark: createReviewData.mark,
        comment: createReviewData.comment,
      };
    } catch (error) {
      console.log('ReviewsRepositoryCreateReview :', error);
      return error;
    }
  };
}

module.exports = ReviewsService;
