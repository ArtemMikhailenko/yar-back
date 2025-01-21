const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String },
  type: { type: String }, // Например, "TOKEN SALE"
  participants: { type: Number },
  totalRaised: { type: Number }, // Сумма в $
  athSinceIDO: { type: String }, // Например, "+440%"
  endDate: { type: Date },
  chain: { type: String }, // Например, "Ethereum"
  logoUrl: { type: String }, // URL логотипа
  bannerUrl: { type: String }, // Новый баннер проекта
  startDate: { type: String }, // Дата начала (например, "Jan 30, 2025")
  targetRaise: { type: Number }, // Цель по сбору средств
  totalParticipants: { type: Number }, // Количество участников
  timeUntilStart: { type: String }, // Время до старта (например, "12 days")
  description: { type: String }, // Описание проекта
  status: { type: String }, // Новый статус (например, "Upcoming")
  categories: [{ type: String }], // Категории (например, ["AI", "Infrastructure", "Web3"])
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
