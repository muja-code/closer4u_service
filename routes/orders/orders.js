const express = require('express');

const OrdersController = require('../../controllers/orders/orders');

const router = express.Router();
const ordersController = new OrdersController();

router.get('/business', ordersController.getOrderRequests);
router.get('/', ordersController.getOrders);
router.put('/:order_id', ordersController.changeStatus);
module.exports = router;
