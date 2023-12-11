const { login } = require("./authentification/login");
const { register } = require("./authentification/register");
const { handleGoogleLogin } = require("./authentification/handleGoogleLogin");
const { handleGoogleSignup } = require("./authentification/handleGoogleSignup");
const { initiateGoogleAuth } = require("./authentification/initiateGoogleAuth");
const createAdminAccount = require("./authentification/createAdmin");

module.exports = {
  login,
  register,
  handleGoogleLogin,
  handleGoogleSignup,
  initiateGoogleAuth,
  createAdminAccount,
};
