const Sequelize = require("sequelize");
const dbConfig = require("../config/db.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: {
    max: dbConfig.POOL.MAX,
    min: dbConfig.POOL.MIN,
    acquire: dbConfig.POOL.ACQUIRE,
    idle: dbConfig.POOL.IDLE,
  },
});

const [User, Role] = require("./user.js")(sequelize, Sequelize);
const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: User,
  Role: Role,
};

module.exports = db;
