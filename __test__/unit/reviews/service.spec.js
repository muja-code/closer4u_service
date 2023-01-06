const ReviewsService = require('../../../services/reviews/reviews');

let mockReviewsRepository = {
  createReview: jest.fn(),
};

let reviewsService = new ReviewsService();
reviewsService.reviewsRepository = mockReviewsRepository;

describe('3계층 아키텍처 패턴 reviews 서비스 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('reviews 서비스의 createReview Method 성공', async () => {
    const reviewsReturnValue = [
      {
        mark: 5,
        comment: 'comment1',
      },
    ];

    mockReviewsRepository.createReview = jest.fn(() => {
      reviewsReturnValue;
    });

    await reviewsService.createReview(1, 1, 4, 'mock');

    expect(mockReviewsRepository.createReview).toHaveBeenCalledTimes(1);
  });
});
