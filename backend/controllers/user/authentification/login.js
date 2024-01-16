const AuthHelper = require("./authHelper");
const authHelper = new AuthHelper();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authHelper.findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({
          message: "Échec de l'authentification : identifiants invalides.",
        });
    }

    const isValidPassword = await authHelper.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res
        .status(401)
        .json({
          message: "Échec de l'authentification : identifiants invalides.",
        });
    }

    const {roleName} = await authHelper.getUserRole(user.id);
    const token = authHelper.generateToken(user.id, roleName);

    res.status(200).json({
      message: "Connexion réussie.",
      pseudo: user.pseudo,
      userId: user.id,
      roleName: roleName,
      token: token,
      email: user.email,
      preferredCryptocurrencies: user.preferredCryptocurrencies,
      pressReviewKeywords: user.pressReviewKeywords
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Une erreur s'est produite lors du traitement de la demande.",
      });
  }
};

exports.logout = async (req, res) => {
  try {
    // Utiliser userId et jti extraits par le middleware d'authentification
    const { userId, jti, tokenExp } = req;

    // Appeler la méthode d'invalidation de token d'AuthHelper
    await authHelper.invalidateToken(jti, tokenExp, userId);

    res.status(200).json({
      message: "Déconnexion réussie."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la déconnexion." });
  }
};