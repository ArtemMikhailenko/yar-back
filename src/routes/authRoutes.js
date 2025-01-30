const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  getAllUsers,
  getUserByEmail,
  sendPhoneVerification,
  verifyPhone,
  getUserBalance,
  updateUserBalance,
} = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with name, email, phone number, Telegram, and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               telegram:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, user already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user with email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", login);
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   telegram:
 *                     type: string
 *                   balance:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/auth/user/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 telegram:
 *                   type: string
 *                 balance:
 *                   type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/user/:email", getUserByEmail);
/**
 * @swagger
 * /api/auth/user/{userId}/balance:
 *   get:
 *     summary: Get user balance
 *     description: Retrieve the balance of a specific user in ETH, BTC, USDT, and AVL.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User balance retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/user/:userId/balance", getUserBalance);

/**
 * @swagger
 * /api/auth/user/{userId}/balance:
 *   put:
 *     summary: Update user balance
 *     description: Update the balance of a user for ETH, BTC, USDT, and AVL.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ETH:
 *                 type: number
 *               BTC:
 *                 type: number
 *               USDT:
 *                 type: number
 *               AVL:
 *                 type: number
 *     responses:
 *       200:
 *         description: User balance updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/user/:userId/balance", updateUserBalance);

router.post("/send-phone-verification", sendPhoneVerification);

router.post("/verify-phone", verifyPhone);

module.exports = router;
