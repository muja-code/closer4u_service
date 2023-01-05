const express = require('express');
const router = express.Router();

const authToken = require('../middlewares/auth-token');

router.get('/signup_page', (req, res) => {
  res.render('signup');
});
router.get('/login_page', (req, res) => {
  res.render('login');
});
router.get('/', (req, res) => {
  res.render('order-requests');
});
router.get('/order_page', (req, res) => {
  res.render('order');
});

router.get('/order-list', (req, res) => {
  res.render('order-list');
});

router.get('/review_page/:orderId', authToken, (req, res) => {
  const { orderId } = req.params;
  res.render('review', {
    orderId,
    userId: req.userInfo.userId,
    member: req.userInfo.member,
  });
});

module.exports = router;
