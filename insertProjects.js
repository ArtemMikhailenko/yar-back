const mongoose = require("mongoose");
const Project = require("./src/models/Project"); // Убедись, что путь корректный
require("dotenv").config();

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Примеры проектов
const projects = [
  {
    name: "Sentient AI",
    symbol: "$SETAI",
    type: "TOKEN SALE",
    participants: 530,
    totalRaised: 150000,
    athSinceIDO: "+440%",
    endDate: "2024-12-27T14:01:00Z",
    chain: "Ethereum",
    logoUrl: "https://example.com/logo-sentient-ai.png",
    description:
      "Sentient AI is a revolutionary artificial intelligence project transforming the future of human-AI collaboration.",
  },
  {
    name: "Henjin AI",
    symbol: "$HENAI",
    type: "TOKEN SALE",
    participants: 628,
    totalRaised: 400000,
    athSinceIDO: "TBA",
    endDate: "2025-01-09T14:03:00Z",
    chain: "BNB Chain",
    logoUrl: "https://example.com/logo-henjin-ai.png",
    description:
      "Henjin AI is an innovative platform focused on decentralized AI solutions for businesses and individuals.",
  },
  {
    name: "aiPump",
    symbol: "$AIPUMP",
    type: "TOKEN SALE",
    participants: 439,
    totalRaised: 150000,
    athSinceIDO: "TBA",
    endDate: "2025-01-06T14:01:00Z",
    chain: "Polygon",
    logoUrl: "https://example.com/logo-aipump.png",
    description:
      "aiPump is a blockchain-based platform offering advanced AI trading tools for cryptocurrency enthusiasts.",
  },
  {
    name: "AI Voice Agents",
    symbol: "$AIVA",
    type: "TOKEN SALE",
    participants: 241,
    totalRaised: 50000,
    athSinceIDO: "+440%",
    endDate: "2024-12-19T16:01:00Z",
    chain: "Ethereum",
    logoUrl: "https://example.com/logo-aiva.png",
    description:
      "AI Voice Agents is a next-generation AI project focused on developing intelligent voice-based virtual assistants.",
  },
  {
    name: "WELF",
    symbol: "$WELF",
    type: "TOKEN SALE",
    participants: 318,
    totalRaised: 100000,
    athSinceIDO: "+717%",
    endDate: "2024-12-18T14:05:00Z",
    chain: "Avalanche",
    logoUrl: "https://example.com/logo-welf.png",
    description:
      "WELF is a decentralized platform for welfare and social impact projects driven by blockchain technology.",
  },
];

// Добавление проектов в базу
const insertProjects = async () => {
  try {
    await Project.insertMany(projects);
    console.log("Projects added successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting projects:", error);
    mongoose.connection.close();
  }
};

insertProjects();
