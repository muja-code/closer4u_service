
const express = require('express');

const OrdersController = require('../../controllers/orders/orders');
const reviewsRouter = require('../reviews/reivews');
const authToken = require('../../middlewares/auth-token');

const router = express.Router();
const ordersController = new OrdersController();

router.get('/business', authToken, ordersController.getOrderRequests);
// router.get('/customers', authToken, ordersController.getCustomerOrders);
router.get('/customers', authToken, ordersController.getOrders);

router.get('/companies', authToken, ordersController.getCompanyOrders);
router.put('/accept/:orderId', authToken, ordersController.acceptRequest);
router.put('/:orderId', authToken, ordersController.changeStatus);
router.post('/', ordersController.createOrders);

router.use('/orders/:orderId/reivews', reviewsRouter);



module.exports = router;
