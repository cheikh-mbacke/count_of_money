const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// Configuration de l'authentification Google
const oauth2Client = createOAuthClient();

const scopes = [
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/user.emails.read",
  "profile",
];

async function fetchUserEmail() {
  const people = google.people({ version: "v1", auth: oauth2Client });
  const res = await people.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names",
  });

  const emailAddresses = res.data.emailAddresses;
  const names = res.data.names;

  let email = null;
  if (emailAddresses && emailAddresses.length > 0) {
    email = emailAddresses[0].value;
  } else {
    throw new Error("No email found.");
  }

  let name = null;
  if (names && names.length > 0) {
    name = names[0].displayName;
  } else {
    throw new Error("No name found.");
  }

  return { email, name };
}

async function exchangeCodeForTokens(code) {
  return await oauth2Client.getToken(code);
}

function generateAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(" "),
  });
}

function createOAuthClient(uriIndex = 0) {
  const keyPath = path.join(__dirname, "keys.json");
  let keys = { redirect_uris: [""] };
  if (fs.existsSync(keyPath)) {
    keys = require(keyPath).web;
  }

  return new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[uriIndex]
  );
}
module.exports = {
  fetchUserEmail,
  exchangeCodeForTokens,
  generateAuthUrl,
  createOAuthClient,
  oauth2Client
};
