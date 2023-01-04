const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login_page', (req, res) => {
  res.render('login');
});

module.exports = router;
