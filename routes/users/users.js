const express = require('express');

const UsersController = require('../../controllers/users/users');

const router = express.Router();
const usersController = new UsersController();

// GET
router.get('/', usersController.getUser);

module.exports = router;
