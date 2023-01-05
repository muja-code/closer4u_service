const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login_page', (req, res) => {
  res.render('login');
});

router.get('/order', (req, res) => {
  res.render('order');
});

router.get('/order-list', (req, res) => {
  res.render('order-list');
});

router.get('/review', (req, res) => {
  res.render('review');
});

module.exports = router;
