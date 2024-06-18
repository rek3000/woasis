const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    name: { type: String, required: true },
    prompts: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }], // Array of Prompt references
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
