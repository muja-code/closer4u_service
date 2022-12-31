const express = require('express');
const router = express.Router();

const usersRouter = require('./users/users.js');

// GET /api/users
router.use('/users', usersRouter);
router.use('/orders', usersRouter);

module.exports = router;
