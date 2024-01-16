module.exports = (sequelize, Sequelize) => {
    const CryptoSelection = sequelize.define("CryptoSelection", {
        cryptoId: {
          type: Sequelize.STRING, // Ce type correspond à l'identifiant utilisé par l'API externe
          allowNull: false,
          unique: true
        },
        nom: Sequelize.STRING
      });
  
    return [CryptoSelection];
  };
  