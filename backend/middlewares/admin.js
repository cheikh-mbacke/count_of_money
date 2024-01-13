const jwt = require("jsonwebtoken");
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { roleName } = decodedToken;
  const isAdmin = roleName === "admin";
  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé" + isAdmin });
  }
};
module.exports = adminMiddleware;
