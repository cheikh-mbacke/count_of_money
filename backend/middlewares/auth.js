const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, roleName, exp } = decodedToken;
    // Vérifier si le token a été invalidé
    const tokenInvalid = await db.InvalidToken.findOne({ where: { jti: token } });
    if (tokenInvalid) {
      throw "Token invalidé";
    }

    // Ajouter les informations du token décodé à l'objet req
    req.userId = userId;
    req.roleName = roleName;
    req.jti = token;
    req.tokenExp = exp; // Ajouter la date d'expiration du token

    // Vérifier l'identité de l'utilisateur
    if (
      req.body.userId &&
      req.body.userId !== userId &&
      req.body.roleName !== roleName
    ) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({message: 'Accès refusé' +error});
  }
};
