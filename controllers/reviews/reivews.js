const ReviewsService = require('../../services/reviews/reviews.js');

class ReviewsController {
  reivewsService = new ReviewsService();

  // 리뷰 작성
  createReivews = async (req, res, next) => {
    try {
      const { mark, comment } = req.body;

      const createReivewData = await this.reivewsService.createReivew(
        mark,
        comment
      );

      if (createReivewData === 400) {
        return res.status(400).json({
          // message: '요청이 올바르지 않습니다.',
        });
      } // 로그인 쿠키 없을 경우 throw 403
      // res.redirect('/order-list');
      res.status(201).json({
        // data: createReivewData,
        message: '리뷰작성을 성공했습니다.',
      });
    } catch (error) {
      if (error === 400) {
        res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      } else if (error === 403) {
        res.status(403).json({ errorMessage: '로그인이 필요합니다.' });
      }
    }
  };
}

module.exports = ReviewsController;
