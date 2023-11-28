const db = require("../models");
const User = db.User;
const Role = db.Role;
const bcrypt = require("bcrypt");

const createAdminAccount = async () => {
  const adminEmail = "admin@countofmoney.com";
  const adminPassword = "admin";
  const adminPseudo = "Admin";

  try {
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log("Compte administrateur existe déjà.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const newAdmin = await User.create({
      pseudo: adminPseudo,
      email: adminEmail,
      password: hashedPassword,
    });

    await Role.create({ userId: newAdmin.id, roleName: "admin" });

    console.log("Compte administrateur créé avec succès");
  } catch (error) {
    throw "Erreur lors de la création du compte administrateur:" +error;
  }
};

module.exports = createAdminAccount;
