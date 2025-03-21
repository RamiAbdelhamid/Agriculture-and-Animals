const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
 
  name: { type: String, required: true },
  profilePicture: { type: String },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "user"],
    default: "user",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
