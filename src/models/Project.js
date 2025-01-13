const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  type: { type: String, required: true }, // Например, "TOKEN SALE"
  participants: { type: Number, required: true },
  totalRaised: { type: Number, required: true }, // Сумма в $
  athSinceIDO: { type: String, required: true }, // Например, "+440%"
  endDate: { type: Date, required: true },
  chain: { type: String, required: true }, // Например, "Ethereum"
  logoUrl: { type: String, required: true }, // URL логотипа
  description: { type: String, required: true }, // Описание проекта
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
