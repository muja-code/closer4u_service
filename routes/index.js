const express = require('express');
const router = express.Router();

const ordersRouter = require('./orders/orders.js');
const reviewsRouter = require('./reviews/reivews.js');

router.use('/orders/customers', ordersRouter);
router.use('/orders/:orderId/reivews', reviewsRouter);

module.exports = router;
