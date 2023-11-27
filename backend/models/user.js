module.exports = (sequelize, Sequelize) => {
    
  const User = sequelize.define("User", {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
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

  User.hasMany(Role, { foreignKey: "id" });
  Role.belongsTo(User, { foreignKey: "userId" });

  return [User, Role];
};
