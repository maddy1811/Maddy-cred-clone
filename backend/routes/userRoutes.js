const express = require("express");
const router = express.Router();
const { verifyToken, getUser, payBill, getTransactions } = require("../controllers/userController");

router.get("/user", verifyToken, getUser);
router.post("/pay", verifyToken, payBill);
router.get("/transactions", verifyToken, getTransactions);

module.exports = router;