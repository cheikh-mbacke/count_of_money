const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("hello", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, roleName } = decodedToken;

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
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};

