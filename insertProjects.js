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
    name: "PulseChain",
    symbol: "PLS",
    type: "TOKEN SALE",
    participants: 1500,
    totalRaised: 12000000,
    athSinceIDO: "2.5x",
    endDate: "2025-02-15",
    chain: "PulseChain",
    logoUrl: "https://cryptologos.cc/logos/pulsechain-pls-logo.png?v=024",
    description:
      "PulseChain is a blockchain designed for faster and cheaper transactions compared to Ethereum.",
  },
  {
    name: "LayerZero",
    symbol: "ZRO",
    type: "TOKEN SALE",
    participants: 1000,
    totalRaised: 9000000,
    athSinceIDO: "3.2x",
    endDate: "2025-03-01",
    chain: "Ethereum",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
    description:
      "LayerZero is an omnichain interoperability protocol enabling seamless asset transfers across blockchains.",
  },
  {
    name: "Sei Network",
    symbol: "SEI",
    type: "TOKEN SALE",
    participants: 1800,
    totalRaised: 15000000,
    athSinceIDO: "4.0x",
    endDate: "2025-01-25",
    chain: "Cosmos",
    logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=024",
    description:
      "Sei Network is a high-performance layer-1 blockchain optimized for decentralized finance applications.",
  },
  {
    name: "Aptos",
    symbol: "APT",
    type: "TOKEN SALE",
    participants: 2000,
    totalRaised: 25000000,
    athSinceIDO: "5.1x",
    endDate: "2025-04-10",
    chain: "Aptos",
    logoUrl: "https://cryptologos.cc/logos/aptos-apt-logo.png?v=024",
    description:
      "Aptos is a layer-1 blockchain focused on speed, scalability, and developer-friendly features.",
  },
  {
    name: "Sui Network",
    symbol: "SUI",
    type: "TOKEN SALE",
    participants: 1750,
    totalRaised: 18000000,
    athSinceIDO: "3.8x",
    endDate: "2025-05-15",
    chain: "Sui",
    logoUrl: "https://cryptologos.cc/logos/sui-sui-logo.png?v=024",
    description:
      "Sui Network is a decentralized layer-1 blockchain optimized for low-latency, high-throughput transactions.",
  },
  {
    name: "zkSync",
    symbol: "ZKS",
    type: "TOKEN SALE",
    participants: 1400,
    totalRaised: 11000000,
    athSinceIDO: "2.7x",
    endDate: "2025-06-01",
    chain: "Ethereum",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
    description:
      "zkSync is a layer-2 scaling solution for Ethereum, enabling faster and cheaper transactions using zero-knowledge proofs.",
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
