const AuthHelper = require("./authHelper");
const authHelper = new AuthHelper();

const createAdminAccount = async () => {
  const adminEmail = "admin@countofmoney.com";
  const adminPassword = "admin";
  const adminPseudo = "Admin";

  try {
    const existingAdmin = await authHelper.findUserByEmail(adminEmail);
    if (existingAdmin) {
      console.log("Compte administrateur existe déjà.");
      return;
    }

    await authHelper.createUser({
      email: adminEmail,
      name: adminPseudo,
      password: adminPassword,
      role: "admin",
    });
    console.log("Compte administrateur créé avec succès");
  } catch (error) {
    throw "Erreur lors de la création du compte administrateur: " + error;
  }
};

module.exports = createAdminAccount;
