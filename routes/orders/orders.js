const { render } = require('ejs');
const express = require('express');
const router = express.Router();

const OrdersController = require('../../controllers/orders/orders');
const ordersController = new OrdersController();

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrders);

module.exports = router;
