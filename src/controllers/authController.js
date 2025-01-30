const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const twilio = require("twilio");
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// Регистрация пользователя
const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      walletAddress,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }, { walletAddress }],
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User with this email, phone number, or wallet address already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      walletAddress,
      balance: 0,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        walletAddress: newUser.walletAddress,
        balance: newUser.balance,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Вход пользователя
const login = async (req, res) => {
  const { email, password, walletAddress } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Обновим кошелек пользователя при логине, если он не был указан ранее
    if (!user.walletAddress && walletAddress) {
      user.walletAddress = walletAddress;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
// Получение всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Исключаем поле пароля
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Получение пользователя по email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select("-password"); // Исключаем поле пароля

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const phoneVerificationCodes = new Map();

const sendPhoneVerification = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Отправка кода через Twilio Verify API
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).json({
      message: "Verification code sent successfully",
      sid: verification.sid,
    });
  } catch (error) {
    console.error("Phone verification error:", error);
    res.status(500).json({ error: "Failed to send verification code." });
  }
};
const verifyPhone = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({ error: "Phone number and code required" });
    }

    // Проверка кода через Twilio Verify API
    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code });

    if (verificationCheck.status !== "approved") {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }

    res.status(200).json({ message: "Phone verification successful" });
  } catch (error) {
    console.error("Phone verification check error:", error);
    res.status(500).json({ error: "Failed to verify phone number" });
  }
};
const getUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ищем пользователя по ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Отправляем баланс
    res.status(200).json({
      ETH: user.balance.ETH,
      BTC: user.balance.BTC,
      USDT: user.balance.USDT,
      AVL: user.balance.AVL,
    });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { ETH, BTC, USDT, AVL } = req.body; // Получаем баланс из тела запроса

    // Найти пользователя
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Обновляем только поле balance, НЕ затрагивая валидацию других полей
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "balance.ETH": ETH || user.balance.ETH,
          "balance.BTC": BTC || user.balance.BTC,
          "balance.USDT": USDT || user.balance.USDT,
          "balance.AVL": AVL || user.balance.AVL,
        },
      },
      { new: true, runValidators: false } // Отключаем валидацию
    );

    return res.status(200).json({ balance: updatedUser.balance });
  } catch (error) {
    console.error("Ошибка обновления баланса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserByEmail,
  sendPhoneVerification,
  verifyPhone,
  getUserBalance,
  updateUserBalance,
};
