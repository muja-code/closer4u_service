const ReivesRepository = require('../../../repositories/reviews/reviews');

let mockReviewModel = {
  create: jest.fn(),
};

let reivewsRepository = new ReivesRepository(mockReviewModel);

describe('3계층 아키텍처 패턴 reivews 리파지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //?
  test('reivews 리포지토리 findAllOrder Method 성공', async () => {});

  //?
  test('reivews 리포지토리 createOrder Method 성공', async () => {});
});
