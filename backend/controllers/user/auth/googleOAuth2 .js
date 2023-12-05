const { generateAuthUrl } = require("./utils");

exports.googleOAuth2 = (req, res) => {
  const authorizeUrl = generateAuthUrl();
  res.redirect(authorizeUrl);
};


