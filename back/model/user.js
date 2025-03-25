const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: ["journalist", "reader", "admin"],
    default: "reader",
  },
  name: { type: String, required: true },
  profilePicture: { type: String },
  savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  readingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "user"],
    default: "user",
  },
  explanation: { type: String },
  identityProof: { type: String },
  subscriptions: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
