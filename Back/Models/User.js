const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  photo: String,
  adresse: String,
  role: String,
});

module.exports = mongoose.model("users", userSchema);
