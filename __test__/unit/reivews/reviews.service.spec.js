const ReivesService = require('../../../services/reviews/reviews');

let mockReviewsRepository = {
  createReivew: jest.fn(),
};

let reivewsService = new ReivesService();
reivewsService.reivewsRepository = mockReviewsRepository;

describe('3계층 아키텍처 패턴 reviews 서비스 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('reivews 서비스의 createReivew Method 성공', async () => {
    const reviewsReturnValue = [
      {
        mark: 5,
        comment: 'comment1',
      },
    ];

    mockReviewsRepository.createReivew = jest.fn(() => {
      reviewsReturnValue;
    });

    await reivewsService.createReivew(reviewsReturnValue);

    expect(mockReviewsRepository.createReivew).toHaveBeenCalledTimes(1);
  });
});
