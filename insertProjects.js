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
    name: "Ondo AI",
    description:
      "Revolutionizing AI infrastructure with decentralized computing power and blockchain technology. Ondo AI creates an ecosystem where users can share computational resources and earn rewards.",
    logoUrl:
      "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Flogo_onda_ba410336f5%2Flogo_onda_ba410336f5.jpg&w=96&q=70",
    bannerUrl:
      "https://cdn.banklesstimes.com/bt/content/uploads/2024/07/1720681115-Ondo-Finance.jpg",
    startDate: "Jan 30, 2025",
    targetRaise: 400000,
    totalParticipants: 12000,
    timeUntilStart: "12 days",
    chain: "Ethereum",
    status: "Upcoming",
    categories: ["AI", "Infrastructure", "Web3"],
  },
  {
    name: "Avalanche AI",
    description:
      "A next-generation AI platform leveraging the Avalanche network for high-performance machine learning applications. Building the future of decentralized artificial intelligence.",
    logoUrl:
      "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fqug8_L_Ew_F_400x400_63d22bf6ba%2Fqug8_L_Ew_F_400x400_63d22bf6ba.jpg&w=96&q=70",
    bannerUrl:
      "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fbanner_fe80625570%2Fbanner_fe80625570.png&w=3840&q=75",
    startDate: "Feb 5, 2025",
    targetRaise: 350000,
    totalParticipants: 10000,
    timeUntilStart: "18 days",
    chain: "Avalanche",
    status: "Upcoming",
    categories: ["AI", "DeFi", "Gaming"],
  },
  {
    name: "Lympid",
    description:
      "Pioneering liquid staking solutions with advanced DeFi protocols. Lympid enables seamless staking across multiple chains while maintaining full liquidity.",
    logoUrl:
      "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Flympid_logo_400x400_4647e1b1c2%2Flympid_logo_400x400_4647e1b1c2.png&w=96&q=70",
    bannerUrl:
      "https://dex-bin.bnbstatic.com/static/dapp-uploads/W3bLk6HK1uSI3oh54ruas",
    startDate: "Feb 12, 2025",
    targetRaise: 450000,
    totalParticipants: 15000,
    timeUntilStart: "25 days",
    chain: "Multichain",
    status: "Upcoming",
    categories: ["DeFi", "Staking", "Infrastructure"],
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
