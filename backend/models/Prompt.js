const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema(
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