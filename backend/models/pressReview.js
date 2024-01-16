module.exports = (sequelize, Sequelize) => {
  const ArticleSelection = sequelize.define("ArticleSelection", {
    articleId: {
      type: Sequelize.STRING, // Could be a unique identifier or a URL
      allowNull: false,
      unique: true
    },
    title: Sequelize.STRING, // Optional
  });

  return [ArticleSelection];
};
