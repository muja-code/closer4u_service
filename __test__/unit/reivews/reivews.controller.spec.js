const ReiveswController = require('../../../controllers/reviews/reivews');

let mockReivewsService = {
  createReivew: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  render: jest.fn(),
};

let reviewsController = new ReiveswController();
reviewsController.reivewsService = mockReivewsService;

describe('3계층 아키텍처 패턴 reivews 컨트롤러 단위 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    // status 를 사용하기 위한 세팅
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });
  test('reivews 컨트롤러의 createReivews 메소드 성공', async () => {
    const reviewsReturnValue = {
      msg: { message: '리뷰작성을 성공했습니다.' },
    };

    mockReivewsService.createReivew = jest.fn(() => reviewsReturnValue);

    await reviewsController.createReivews(mockRequest, mockResponse);

    expect(mockReivewsService.createReivew).toHaveBeenCalledTimes(1); // 한번 발생하면 통과
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201); // status 값이 201 이면 통과

    expect(mockResponse.render).toHaveBeenCalledWith(
      'order-list',
      reviewsReturnValue.msg
    );
  });
});
