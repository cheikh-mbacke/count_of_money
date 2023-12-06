const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;
const { fetchUserEmail, exchangeCodeForTokens, oauth2Client } = require("./utils");


exports.googleOAuth2Callback = async (req, res) => {
  let transaction;
  try {
    const { tokens } = await exchangeCodeForTokens(req.query.code);
    oauth2Client.setCredentials(tokens);
    const { email, name } = await fetchUserEmail();

    // Début de la transaction
    transaction = await sequelize.transaction();

    // Vérification de l'existence d'un utilisateur
    const existingUser = await User.findOne({
      where: { email: email },
      transaction: transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      return res.status(409).json({
        message: "Un compte utilisateur avec cet e-mail existe déjà.",
      });
    }

    const pseudo = name;

    // Création de l'utilisateur sans mot de passe
    const newUser = await User.create({ pseudo, email }, { transaction });

    // Création de rôle
    const userRole = "user";

    await Role.create(
      { userId: newUser.id, roleName: userRole },
      { transaction }
    );

    // Validation de la transaction
    await transaction.commit();
    res.status(201).json({ message: "Compte utilisateur créé avec succès" });
  } catch (e) {
    // Vérifier si la transaction a été initialisée avant d'essayer de faire un rollback
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};
