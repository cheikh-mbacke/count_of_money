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
      return res
          .status(401)
          .cookie("message", "Échec de l'authentification : identifiants invalides.")
          .cookie("user", JSON.stringify(user))
          .redirect("http://localhost:3001/login");
    }

    const roleName = await authHelper.getUserRole(user.id);
    const token = authHelper.generateToken(user.id, roleName);
    const us = {
      message: 'Connexion réussie',
      pseudo: user.pseudo,
      roleName: roleName.roleName,
      token: token,
      userId: user.id,
      email: user.email
    }

    const userJSON = JSON.stringify(us);
    const userEncoded = encodeURIComponent(userJSON)

    res
        .status(200)
        .cookie("user", userEncoded)
        .redirect('http://localhost:3001/dashbord');
  } catch (e) {
    console.log(e)
    res
        .status(500)
        .redirect("http://localhost:3001/login")
        .cookie("message", "Une erreur s'est produite lors du traitement de la demande.",
    );
  }
};
