const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

class GoogleAuthClient {
  constructor(redirectUriIndex) {
    this.scopes = [
      "https://www.googleapis.com/auth/contacts.readonly",
      "https://www.googleapis.com/auth/user.emails.read",
      "profile",
    ];

    this.oauth2Client = this.createOAuthClient(redirectUriIndex);
  }

  async fetchUserEmail() {
    const people = google.people({ version: "v1", auth: this.oauth2Client });
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

  async exchangeCodeForTokens(code) {
    return await this.oauth2Client.getToken(code);
  }

  generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.scopes.join(" "),
    });
  }

  createOAuthClient(redirectUriIndex) {
    const keyPath = path.join(__dirname, "keys.json");
    let keys = { redirect_uris: [""] };
    if (fs.existsSync(keyPath)) {
      keys = require(keyPath).web;
    }

    const redirectUri =
      keys.redirect_uris[redirectUriIndex];

    return new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUri
    );
  }
}

module.exports = GoogleAuthClient;
