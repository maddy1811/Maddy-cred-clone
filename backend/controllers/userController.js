const User = require("../models/User");
const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET /api/user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/pay
const payBill = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance
    user.balance -= amount;

    // Add reward points (10% of amount)
    const pointsEarned = Math.floor(amount * 0.1);
    user.rewardPoints += pointsEarned;

    // Improve credit score
    user.creditScore = Math.min(900, user.creditScore + 15);

    await user.save();

    // Save transaction
    await Transaction.create({
      userId: req.userId,
      amount,
      status: "success",
    });

    res.json({
      message: "Payment successful",
      balance: user.balance,
      pointsEarned,
      creditScore: user.creditScore,
      rewardPoints: user.rewardPoints,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyToken, getUser, payBill, getTransactions };