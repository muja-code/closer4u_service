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

      if (typeof createReviewData.message !== 'undefined') {
        return createReviewData;
      }

      return {
        mark: createReviewData.mark,
        comment: createReviewData.comment,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = ReviewsService;
