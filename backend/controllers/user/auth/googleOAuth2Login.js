const GoogleAuthClient = require("./googleAuthClient");

exports.googleOAuth2Login = (req, res) => {
  const redirectUriIndex = 1;
  const googleAuthClient = new GoogleAuthClient(redirectUriIndex);
  const authorizeUrl = googleAuthClient.generateAuthUrl();
  res.redirect(authorizeUrl);
};
