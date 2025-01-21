require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./src/models/Project");

const updateProjectsStatus = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));

    console.log("✅ Подключено к MongoDB");

    // Добавляем статус по умолчанию, если его нет
    await Project.updateMany(
      { status: { $exists: false } },
      { $set: { status: "Active" } }
    );

    console.log("✅ Все проекты обновлены, статус добавлен");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка обновления статусов:", error);
    mongoose.connection.close();
  }
};

// Запускаем обновление
updateProjectsStatus();
