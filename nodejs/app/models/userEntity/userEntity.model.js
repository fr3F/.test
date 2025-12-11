module.exports = (sequelize, Sequelize) => {
  const UserEntity = sequelize.define("UserEntity", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    entityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Entities",
        key: "id"
      }
    }
  });

  return UserEntity;
};
