module.exports = {
  HOST: "mysql", // Utilisez le nom du service du conteneur MySQL
  USER: "count_of_money",
  PASSWORD: "14785",
  DB: "count_of_money",
  DIALECT: "mysql",
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
