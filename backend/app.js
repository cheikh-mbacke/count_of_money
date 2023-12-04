require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/user");
const swaggerSpec = require("./config/swagger");
const { sequelize } = require("./models");
const corsMiddleware = require("./middlewares/cors");
const createAdminAccount = require("./controllers/createAdmin");
const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const opn = require("open");
const destroyer = require("server-destroy");

const { google } = require("googleapis");
const people = google.people("v1");

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
  .then(async () => {
    console.log("Database synced");
    try {
      await createAdminAccount(); // Appel direct à la création du compte admin
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => {
    console.error("Failed to sync database: ", err);
  });

// Configuration de l'authentification Google
const keyPath = path.join(__dirname, "oauth2.keys.json");
let keys = { redirect_uris: [""] };
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

const scopes = [
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/user.emails.read",
  "profile",
];

// Endpoint pour l'authentification Google
app.get("/google-auth", (req, res) => {
  // Générez l'URL d'autorisation OAuth2
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(" "),
  });

  // Redirigez l'utilisateur vers l'URL d'autorisation
  res.redirect(authorizeUrl);
});

// Endpoint de retour d'authentification Google
app.get("/oauth2callback", async (req, res) => {
  try {
    const qs = new url.URL(req.url, `http://${req.headers.host}`).searchParams;
    const { tokens } = await oauth2Client.getToken(qs.get("code"));
    oauth2Client.credentials = tokens;
    // Vous pouvez ajouter votre logique ici pour gérer le jeton d'accès
    console.log(oauth2Client);


    res.send("Authentication successful! You can close this window.");
  } catch (e) {
    console.error(e);
    res.send("Authentication failed. Please try again.");
  }
});

module.exports = app;
