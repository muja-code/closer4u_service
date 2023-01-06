const ReviewsController = require('../../../controllers/reviews/reviews');

let mockreviewsService = {
  createReview: jest.fn(),
};

let mockRequest = {
  body: { mark: 5, comment: '감사합니다.' },
  params: { orderId: 1 },
  userInfo: { userId: 1, member: 1 },
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
  redirect: jest.fn(),
};

let reviewsController = new ReviewsController();
reviewsController.reviewsService = mockreviewsService;

describe('3계층 아키텍처 패턴 reviews 컨트롤러 단위 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    // status 를 사용하기 위한 세팅
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('reviews 컨트롤러의 createReviews 메소드 성공', async () => {
    const reviewsReturnValue = 'abcd';

    mockreviewsService.createReview = jest.fn(() => reviewsReturnValue);

    await reviewsController.createReviews(mockRequest, mockResponse);

    expect(mockreviewsService.createReview).toHaveBeenCalledTimes(1); // 한번 발생하면 통과
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201); // status 값이 201 이면 통과

    expect(mockResponse.redirect).toHaveBeenCalledWith('/api/orders/customers');
  });
});
