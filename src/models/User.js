const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true, // Позволяет пустые значения
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  telegram: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  balance: {
    ETH: { type: Number, default: 0 },
    BTC: { type: Number, default: 0 },
    USDT: { type: Number, default: 0 },
    ARK: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
