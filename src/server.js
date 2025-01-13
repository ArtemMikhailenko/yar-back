require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

// Подключение к базе данных
connectDB();

// Настройка CORS и парсера JSON
const allowedOrigins = [
  "https://yar-nu.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Использование маршрутов
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 1024;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
