const mongoose = require('mongoose');

const chatSchema = new mongoose.Chat(
  {
    name: { type: String, required: true },
    
  },
  {
    timestamps: true,
  }
); 