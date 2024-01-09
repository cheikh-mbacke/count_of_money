const db = require("../../../models");
const User = db.User;
const Role = db.Role;
const bcrypt = require("bcrypt");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      throw new Error("ID utilisateur manquant.");
    }

    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
      attributes: ["id", "pseudo", "email", "currency", "preferredCryptocurrencies", "pressReviewKeywords"],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const transformedUser = {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      roleName: user.Roles && user.Roles.length > 0 ? user.Roles[0].roleName : null,
      currency: user.currency,
      preferredCryptocurrencies: user.preferredCryptocurrencies,
      pressReviewKeywords: user.pressReviewKeywords
    };

    res.status(200).json(transformedUser);

  } catch (error) {
    res
      .status(500)
      .json({
        message: "Une erreur s'est produite lors du traitement de la demande.",
      });
  }
};



exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const { 
      pseudo,
      email,
      password,
      currency,
      preferredCryptocurrencies,
      pressReviewKeywords
    } = req.body;

    if (pseudo) user.pseudo = pseudo;
    if (email) user.email = email;
    if (currency) user.currency = currency;
    if (preferredCryptocurrencies) user.preferredCryptocurrencies = preferredCryptocurrencies;
    if (pressReviewKeywords) user.pressReviewKeywords = pressReviewKeywords;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();

    res.status(200).json({ message: "Profil mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors du traitement de la demande."
    });
  }
};


