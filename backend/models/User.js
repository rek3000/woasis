const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  prompts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
