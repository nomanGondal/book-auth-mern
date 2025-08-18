const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  }
}, { collection: 'users' });  // model maped with collection force collection name
const user = mongoose.model("User", userSchema);
module.exports = user