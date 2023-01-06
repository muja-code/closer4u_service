const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router = express.Router();

const ReviewsController = require('../../controllers/reviews/reviews.js');
const reviewsContorller = new ReviewsController();
const authToken = require('../../middlewares/auth-token');

// 리뷰 작성
router.post('/:orderId', authToken, reviewsContorller.createReviews);

module.exports = router;
