const express = require('express');
const router = express.Router();

const ordersRouter = require('./orders/orders.js');

router.use('/orders', ordersRouter);

module.exports = router;
