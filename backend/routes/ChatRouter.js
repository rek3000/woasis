const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

// Route to create a new chat
router.post('/create', ChatController.createChat);

// Route to get details of a specific chat
router.get('/get/:id', ChatController.getChatDetail);

// Export the router
module.exports = router;
