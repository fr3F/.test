const db = require("../../../models");
const { getEntityById } = require("../../entity/service/entity.service");
const { findByUserid } = require("../../user/service/user.service");
const UserEntity = db.userEntity;
const User = db.user;
const Entity = db.entity;

async function createUserEntity(data) {
    await findByUserid(data.userId)
    await getEntityById(data.entityId)
    const association = await createUserEntity(data);
    return association;
}

async function createUserEntity(data){
    await UserEntity.create({
    userId: data.userId,
    entityId: data.entityId 
  });
}

async function getAllUserEntities() {
  return await UserEntity.findAll({
    include: [
      { model: User, as: "user", attributes: ["id", "username", "email"] },
      { model: Entity,as: "entity", attributes: ["id", "name"] }
    ]
  });
}

async function getUserEntityById(id) {
  return await UserEntity.findByPk(id, {
    include: [
        {model: User,as: "user", attributes: ["id", "username", "email"]},
        {model: Entity, as: "entity", attributes: ["id", "name"]}
    ]
  });
}


function modifyUserEntity(userEntity, data) {
  userEntity.userId = data.userId;
  userEntity.entityId = data.entityId;
  return userEntity;
}

async function updateUserEntity(id, data) {
    const association = await UserEntity.findByPk(id);
    const modifiedAssociation = modifyUserEntity(association, data);
    await modifiedAssociation.save();

    return await UserEntity.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] },
        { model: Entity, as: "entity", attributes: ["id", "name"] }
      ]
    });
}


async function deleteUserEntity(id) {
  const association = await UserEntity.findByPk(id);
  await association.destroy();
  return association;
}

module.exports = {
  createUserEntity,
  getAllUserEntities,
  getUserEntityById,
  updateUserEntity,
  deleteUserEntity
};
