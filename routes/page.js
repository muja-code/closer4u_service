const express = require("express");
const router = express.Router();

router.get("/signup_page", (req, res) => {
  res.render("signup");
});
router.get("/login_page", (req, res) => {
  res.render("login");
});
router.get('/', (req, res) => {
  res.render('order-requests');
});

module.exports = router;
