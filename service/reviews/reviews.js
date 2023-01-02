const ReivewsRepository = require('../../repositories/reviews/reviews.js');
const { Review } = require('../../models');

class ReivewsService {
  reivewsRepository = new ReivewsRepository(Review);

  createReivew = async (mark, comment) => {
    try {
      // Repository 에게 데이터를 요청
      const createReivewData = await this.reivewsRepository.createReivew(
        mark,
        comment
      );

      if (!createReivewData) {
        throw 400;
      }

      // 로그인 쿠키 없을 경우 throw 403

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
