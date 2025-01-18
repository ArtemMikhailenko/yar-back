require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const swaggerDocs = require("./config/swagger"); // Подключение Swagger
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Подключение к базе данных
connectDB();

// CORS
const allowedOrigins = [
  "https://yar-nu.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:1024",
  "https://yar-back.onrender.com",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Подключение маршрутов
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
// Подключение Swagger
swaggerDocs(app);
// Запуск сервера
const PORT = process.env.PORT || 1024;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
