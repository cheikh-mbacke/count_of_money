require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/userRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const pressReviewRoutes = require("./routes/pressReviewRoutes");
const swaggerSpec = require("./config/swagger");
const { sequelize } = require("./models");
const corsMiddleware = require("./middlewares/cors");
const { createAdminAccount } = require("./controllers/user/");

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
app.use("/api/users/auth", authRoutes);
app.use("/api/cryptos", cryptoRoutes);
app.use("/api/articles", pressReviewRoutes);



// Synchronisation de la base de données
sequelize
  .sync()//{force:true} pour generer la BD dès le début
  .then(async () => {
    console.log("Database synced");
    try {
      await createAdminAccount();
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => {
    console.error("Failed to sync database: ", err);
  });


module.exports = app;
