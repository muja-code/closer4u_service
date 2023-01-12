const express = require('express');

const loginCheck = require('../middlewares/login-check');

const router = express.Router();

router.get('/signup_page', (req, res) => {
  res.render('signup');
});
router.get('/login_page', (req, res) => {
  res.render('login');
});
router.get('/order_create_page', (req, res) => {
  res.render('order-create');
});
router.get('/order_list_page', (req, res) => {
  res.render('order-list');
});
router.get('/order_requests_page', (req, res) => {
  res.render('order-requests');
});
router.get('/profile_page', (req, res) => {
  res.render('profile');
});
router.get('/review_create_page', (req, res) => {
  res.render('review-create');
});
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
