const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Конфигурация Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "API for user authentication and management",
    },
    servers: [
      {
        url: "http://localhost:1024",
        description: "Local Server",
      },
      {
        url: "https://yar-back.onrender.com",
        description: "Production Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Путь к файлам с описанием API
};

// Инициализация Swagger
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at http://localhost:1024/api-docs");
};

module.exports = swaggerDocs;
