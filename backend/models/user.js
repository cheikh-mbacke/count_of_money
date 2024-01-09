module.exports = (sequelize, Sequelize) => {
    
  const User = sequelize.define("User", {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  const Role = sequelize.define("Role", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    roleName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  const InvalidToken = sequelize.define("InvalidToken", {
    jti: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    expiration: {
      type: Sequelize.DATE,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  User.hasMany(Role, { foreignKey: "userId" });
  Role.belongsTo(User, { foreignKey: "userId" });
  InvalidToken.belongsTo(sequelize.models.User, { foreignKey: "userId" });
  sequelize.models.User.hasMany(InvalidToken, { foreignKey: "userId" });

  return [User, Role, InvalidToken];
};
