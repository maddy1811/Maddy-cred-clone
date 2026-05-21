const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    required: true,
  },
  balance: {
    type: Number,
    default: 10000,
  },
  creditScore: {
    type: Number,
    default: 742,
  },
  rewardPoints: {
    type: Number,
    default: 1250,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);