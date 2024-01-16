const GoogleAuthClient = require("./googleAuthClient");

// Méthode unifiée pour démarrer le processus d'authentification (signup or login)
exports.initiateGoogleAuth = (req, res) => {
  const authType = req.query.authType;
  const redirectUriIndex = authType === "signup" ? 0 : 1;
  const googleAuthClient = new GoogleAuthClient(redirectUriIndex);

  const authorizeUrl = googleAuthClient.generateAuthUrl();
  res.redirect(authorizeUrl);
};
