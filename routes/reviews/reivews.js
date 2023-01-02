const express = require('express');
const router = express.Router();

const ReviewsController = require('../../controllers/reviews/reviews.js');
const reviewsContorller = new ReviewsController();

router.post('/', reviewsContorller.createReivews);

module.exports = router;
