const ReivesRepository = require('../../../repositories/reviews/reviews');

let mockReviewModel = {
  create: jest.fn(),
};

let reivewsRepository = new ReivesRepository(mockReviewModel);
reivewsRepository.reivewsModel = mockReviewModel;

describe('3계층 아키텍처 패턴 reivews 리파지토리 unit 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('reivews 리포지토리 createReivew Method 성공', async () => {
    const reivewsReturnValue = [
      {
        mark: 5,
        comment: 'comment1',
      },
    ];

    mockReviewModel.create = jest.fn(() => reivewsReturnValue);

    await reivewsRepository.createReivew();

    expect(mockReviewModel.create).toHaveBeenCalledTimes(1);
  });
});
