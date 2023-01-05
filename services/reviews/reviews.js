const ReivewsRepository = require('../../repositories/reviews/reviews.js');
const { Review } = require('../../models');

class ReivewsService {
  reivewsRepository = new ReivewsRepository(Review);

  createReivew = async (userId, orderId, mark, comment) => {
    try {
      // Repository 에게 데이터를 요청
      const createReivewData = await this.reivewsRepository.createReivew(
        userId,
        orderId,
        mark,
        comment
      );
      if (createReivewData === 400) {
        throw 400;
      }

      // 로그인 쿠키가 없을 경우 throw 403

      // 데이터 가공
      return {
        mark: createReivewData.mark,
        comment: createReivewData.comment,
      };
    } catch (error) {
      console.log('ReivewsRepositoryCreateReivew :', error);
      return error;
    }
  };
}

module.exports = ReivewsService;
