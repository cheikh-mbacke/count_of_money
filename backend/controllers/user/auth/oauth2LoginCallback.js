const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");

const GoogleAuthClient = require("./googleAuthClient");

exports.googleOAuth2LoginCallback = async (req, res) => {
  try {
    const redirectUriIndex = 1;
    const googleAuthClient = new GoogleAuthClient(redirectUriIndex); 
    const { tokens } = await googleAuthClient.exchangeCodeForTokens(
      req.query.code
    );
    googleAuthClient.oauth2Client.setCredentials(tokens);
    const { email, name } = await googleAuthClient.fetchUserEmail();
    console.log("hello", email);
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({
        message: "Échec de l'authentification : identifiants invalides.",
        user: user
      });
    }

    const roleName = await Role.findOne({ where: { userId: user.id } });

    const token = jwt.sign(
      { userId: user.id, role: roleName },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      userId: user.id,
      role: roleName,
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};
