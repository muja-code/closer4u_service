const express = require('express');
const router = express.Router();

const ReviewsController = require('../../controllers/reviews/reivews.js');
const reviewsContorller = new ReviewsController();

// 리뷰 작성
router.post('/', reviewsContorller.createReivews);

module.exports = router;
