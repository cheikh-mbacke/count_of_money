const GoogleAuthClient = require("./googleAuthClient");
const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;

exports.handleGoogleSignup = async (req, res) => {
  let transaction;
  try {
    const redirectUriIndex = 0;
    const googleAuthClient = new GoogleAuthClient(redirectUriIndex);
    const code = req.query.code;

    const { tokens } = await googleAuthClient.exchangeCodeForTokens(code);
    googleAuthClient.oauth2Client.setCredentials(tokens);
    const { email, name } = await googleAuthClient.fetchUserEmail();

    // Début de la transaction
    transaction = await sequelize.transaction();

    // Vérification de l'existence d'un utilisateur
    const existingUser = await User.findOne({
      where: { email: email },
      transaction: transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      return res
          .status(409)
          .cookie("message", "Un compte utilisateur avec cet e-mail existe déjà.")
          .redirect("http://localhost:3001/login")
      }

    const pseudo = name;

    // Création de l'utilisateur sans mot de passe
    const newUser = await User.create({ pseudo, email }, { transaction });
    const userRole = "user";

    await Role.create(
      { userId: newUser.id, roleName: userRole },
      { transaction }
    );

    await transaction.commit();
    res
        .status(201)
        .cookie("message", "Compte utilisateur créé avec succès")
        .redirect("http://localhost:3001/login")
  } catch (e) {
    // Vérifier si la transaction a été initialisée avant d'essayer de faire un rollback
    if (transaction) {
      await transaction.rollback();
    }
    res
        .status(500)
        .cookie("message", "Une erreur s'est produite lors du traitement de la demande.")
        .redirect("http://localhost:3001/signup")
  }
};
