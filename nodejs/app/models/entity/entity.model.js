module.exports = (sequelize, Sequelize) => {
  const Entity = sequelize.define("Entity", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Entity;
};
