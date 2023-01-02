const express = require('express');
const router = express.Router();

const OrdersController = require('../../controllers/orders/orders.js');
const ordersController = new OrdersController();

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrders);

module.exports = router;
