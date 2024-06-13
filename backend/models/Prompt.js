const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    result: {type: String, required: true},
  },
  {
    timestamps: true,
  }
); 

const Prompt = mongoose.model("Prompt", promptSchema)
module.exports = Prompt;