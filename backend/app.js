require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/user");
const swaggerSpec = require("./config/swagger");
const { sequelize } = require("./models");
const corsMiddleware = require("./middlewares/cors");

const app = express();

// Sécurité HTTP
app.use(helmet());

// Analyse des requêtes JSON
app.use(express.json());

// Configuration de CORS
app.use(corsMiddleware);

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users/", authRoutes);

// Synchronisation de la base de données
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Failed to sync database: ", err);
  });

module.exports = app;
