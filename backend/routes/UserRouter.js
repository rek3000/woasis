const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User routes
router.post('/create', UserController.createUser);
router.get('/get-current', UserController.getCurrentUser);
router.get('/get-by-email/:email', UserController.getUserByEmail);
router.get('/get-by-id/:id', UserController.getUserById);

module.exports = router;