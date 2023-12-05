const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { pseudo, email, password, role } = req.body;
  let transaction;
  try {
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

    // Création de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      {
        pseudo,
        email,
        password: hashedPassword,
      },
      { transaction }
    );

    // Création de rôle
    const userRole = role || "user";

    await Role.create(
      { userId: newUser.id, roleName: userRole },
      { transaction }
    );

    // Validation de la transaction
    await transaction.commit();
    res.status(201).json({ message: "Compte utilisateur créé avec succès" });
  } catch (error) {
    // Vérifier si la transaction a été initialisée avant d'essayer de faire un rollback
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
    });
  }
};
