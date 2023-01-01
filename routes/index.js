const express = require('express');
const router = express.Router();

const usersRouter = require('./users/users');
const ordersRouter = require('./orders/orders');

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

module.exports = router;
