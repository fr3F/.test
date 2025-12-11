const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize({
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user/user.model")(sequelize, Sequelize);
db.entity = require("./entity/entity.model")(sequelize, Sequelize);
db.userEntity = require("./userEntity/userEntity.model")(sequelize, Sequelize);

db.user.hasMany(db.userEntity, { foreignKey: "userId", onDelete: "CASCADE", as: "userEntities" });
db.entity.hasMany(db.userEntity, { foreignKey: "entityId", onDelete: "CASCADE", as: "userEntities"});

db.userEntity.belongsTo(db.user, { foreignKey: "userId", as: "user" });
db.userEntity.belongsTo(db.entity, { foreignKey: "entityId", as: "entity"});

db.user.belongsToMany(db.entity, { through: db.userEntity, foreignKey: "userId", otherKey: "entityId", as: "entities"});
db.entity.belongsToMany(db.user, { through: db.userEntity, foreignKey: "entityId", otherKey: "userId",as: "users"});

module.exports = db;