const authProvider = require("./googleOAuth2 ");
const authCallback = require("./oauth2Callback");
const authRegister = require("./register");
const authLogin = require("./login");
const authOAuth2Login = require("./googleOAuth2Login")
const authOAuth2LoginCallback = require("./oauth2LoginCallback");
const createAdminAccount = require("./createAdmin");

module.exports = {
  googleOAuth2: authProvider.googleOAuth2,
  googleOAuth2Callback: authCallback.googleOAuth2Callback,
  register: authRegister.register,
  login: authLogin.login,
  createAdminAccount: createAdminAccount,
  googleOAuth2Login: authOAuth2Login.googleOAuth2Login,
  googleOAuth2LoginCallback: authOAuth2LoginCallback.googleOAuth2LoginCallback
};
