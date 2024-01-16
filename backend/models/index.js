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

const [User, Role, InvalidToken] = require("./user.js")(sequelize, Sequelize);
const [CryptoSelection] = require("./crypto.js")(sequelize, Sequelize);
const [ArticleSelection] = require("./pressReview.js")(sequelize, Sequelize);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: User,
  Role: Role,
  InvalidToken: InvalidToken,
  CryptoSelection: CryptoSelection,
  ArticleSelection: ArticleSelection
};

module.exports = db;
