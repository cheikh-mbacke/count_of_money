const AuthHelper = require("./authHelper");
const authHelper = new AuthHelper();
const sequelize = require("../../../models").sequelize;

exports.register = async (req, res) => {
  const { pseudo, email, password } = req.body;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const existingUser = await authHelper.findUserByEmail(email, transaction);
    if (existingUser) {
      await transaction.rollback();
      return res.status(409).json({
        message: "Un compte utilisateur avec cet e-mail existe déjà.",
      });
    }

    const newUser = await authHelper.createUser(
      { email, name: pseudo, password },
      transaction
    );

    await transaction.commit();
    res.status(201).json({ message: "Compte utilisateur créé avec succès" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};
