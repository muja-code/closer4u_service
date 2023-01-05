
const express = require("express");
const router = express.Router();


const usersRouter = require("./users/users");
const ordersRouter = require("./orders/orders");
const reviewsRouter = require('./reviews/reivews.js');

router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use('/orders/customers', ordersRouter);
router.use('/orders/:orderId/reivews', reviewsRouter);


module.exports = router;

