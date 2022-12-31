const express = require('express');

const UsersController = require('../../controllers/users/users.js');

const router = express.Router();
const usersController = new UsersController();

// GET /api/users
router.get('/', usersController.getUser);

module.exports = router;
