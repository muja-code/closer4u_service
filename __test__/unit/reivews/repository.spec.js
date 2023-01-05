const ReviewsRepository = require("../../../repositories/reviews/reviews");

let mockReviewModel = {
  create: jest.fn(),
};

let reviewsRepository = new ReviewsRepository(mockReviewModel);
reviewsRepository.reviewsModel = mockReviewModel;

describe("3계층 아키텍처 패턴 reviews 리파지토리 unit 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("reviews 리포지토리 createReview Method 성공", async () => {
    const reviewsReturnValue = [
      {
        mark: 5,
        comment: "comment1",
      },
    ];

    mockReviewModel.create = jest.fn(() => reviewsReturnValue);

    await reviewsRepository.createReview();

    expect(mockReviewModel.create).toHaveBeenCalledTimes(1);
  });
});
