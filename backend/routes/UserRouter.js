const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User routes
router.post('/create', UserController.createUser);
router.get('/get/:email', UserController.getUserByEmail);

module.exports = router;