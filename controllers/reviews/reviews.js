const ReviewsService = require('../../services/reviews/reviews');

class ReviewsController {
  reviewsService = new ReviewsService();

  // 리뷰 작성
  createReviews = async (req, res, next) => {
    try {
      console.log;
      const { mark, comment } = req.body;
      const { orderId } = req.params;
      const { userId } = req.userInfo;

      if (!mark || !comment) {
        return res.status(400).json({
          errorMessage: '요청이 올바르지 않습니다.',
        });
      }
      const createReviewData = await this.reviewsService.createReview(
        userId,
        orderId,
        mark,
        comment
      );

      res.status(201).json({
        createReviewData,
        message: '리뷰작성을 성공했습니다.',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };
}

module.exports = ReviewsController;
