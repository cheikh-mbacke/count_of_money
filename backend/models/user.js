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

  User.hasMany(Role, { foreignKey: "userId" });
  Role.belongsTo(User, { foreignKey: "userId" });

  return [User, Role];
};
