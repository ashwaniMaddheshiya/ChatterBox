const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  profile: { type: String },
});

module.exports = mongoose.model("User", userSchema);
