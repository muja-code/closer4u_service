const express = require('express');
const router = express.Router();

const usersRouter = require('./users/users');
const ordersRouter = require('./orders/orders');
const reviewsRouter = require('./reviews/reivews');

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/orders/reviews', reviewsRouter);

module.exports = router;
