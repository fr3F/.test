const db = require("../../../models");
const Entity = db.entity;

async function createEntityService(data) {
    const rep = await Entity.create(data);
    return rep;
}

async function getAllEntity() {
    const rep = await Entity.findAll();
    return rep;
}

async function getEntityById(id) {
    const rep = await Entity.findByPk(id);
    return rep;
}

function modifyEntity(entity, data) {
    if (!entity) return null;
    entity.name = data.name || entity.name;
    return entity;
}

async function updateEntity(id, data) {
    const entity = await getEntityById(id);
    if (!entity) throw new Error(`Entity with id ${id} not found`);
    const modifieEntity = modifyEntity(entity, data);
    await modifieEntity.save();
    return modifieEntity;
}

async function deleteEntityById(id) {
    const entity = await getEntityById(id);
    if (!entity) {
        throw new Error(`Entity with id ${id} not found`);
    }
    await entity.destroy();
    return entity;
}

module.exports = {
    createEntityService,
    getAllEntity,
    getEntityById,
    updateEntity,
    deleteEntityById
};
