const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success",
  },
  description: {
    type: String,
    default: "Credit card bill payment",
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);