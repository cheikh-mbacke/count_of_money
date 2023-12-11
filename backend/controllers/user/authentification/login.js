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

    const roleName = await authHelper.getUserRole(user.id);
    const token = authHelper.generateToken(user.id, roleName);

    res.status(200).json({
      message: "Connexion réussie.",
      userId: user.id,
      role: roleName,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Une erreur s'est produite lors du traitement de la demande.",
      });
  }
};
