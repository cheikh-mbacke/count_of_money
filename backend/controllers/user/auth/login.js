const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({
        message: "Échec de l'authentification : identifiants invalides.",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        message: "Échec de l'authentification : identifiants invalides.",
      });
    }

    const roleName = await Role.findOne({ where: { userId: user.id } });

    const token = jwt.sign(
      { userId: user.id, role: roleName },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      userId: user.id,
      role: roleName,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande.",
      error: error.message,
    });
  }
};
