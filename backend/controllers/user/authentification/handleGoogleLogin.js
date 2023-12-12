const AuthHelper = require("./authHelper");
const GoogleAuthClient = require("./googleAuthClient");
const authHelper = new AuthHelper();

exports.handleGoogleLogin = async (req, res) => {
  try {
    const redirectUriIndex = 1;
    const googleAuthClient = new GoogleAuthClient(redirectUriIndex);
    const code = req.query.code;

    const { tokens } = await googleAuthClient.exchangeCodeForTokens(code);
    googleAuthClient.oauth2Client.setCredentials(tokens);

    const { email, name } = await googleAuthClient.fetchUserEmail();
    const user = await authHelper.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Échec de l'authentification : identifiants invalides.",
        user: user,
      });
    }

    const roleName = await authHelper.getUserRole(user.id);
    const token = authHelper.generateToken(user.id, roleName);

    res.status(200).json({
      message: "Connexion réussie.",
      userId: user.id,
      role: roleName,
      token: token,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};
