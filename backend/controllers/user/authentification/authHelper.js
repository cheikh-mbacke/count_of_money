const jwt = require("jsonwebtoken");
const db = require("../../../models");
const bcrypt = require("bcrypt");

class AuthHelper {
  constructor() {
    this.User = db.User;
    this.Role = db.Role;
  }

  async verifyPassword(inputPassword, userPassword) {
    try {
      return await bcrypt.compare(inputPassword, userPassword);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      return await this.User.findOne({ where: { email: email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  generateToken(userId, roleName) {
    return jwt.sign(
      { userId: userId, role: roleName },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  }

  async createUser({ email, name, password }, transaction = null) {
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      const options = transaction ? { transaction } : {};
      const newUser = await this.User.create(
        {
          email,
          name,
          password: hashedPassword,
        },
        options
      );
      await this.assignDefaultRole(newUser.id, "user", transaction);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async assignDefaultRole(
    userId,
    defaultRoleName = "user",
    transaction = null
  ) {
    try {
      const options = transaction ? { transaction } : {};
      return await this.Role.create(
        { userId, roleName: defaultRoleName },
        options
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AuthHelper;
