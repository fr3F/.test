const userEntityService = require("./service/userEntity.service");

async function createUserEntity(req, res) {
    const data = req.body; 
    const result = await userEntityService.createUserEntity(data);
    res.status(201).json({ message: "Association créée", result });
}

async function getAllUserEntities(req, res) {
    const result = await userEntityService.getAllUserEntities();
    res.status(200).json({ message: "Liste des associations", result });
}

async function getUserEntityById(req, res) {
    const id = req.params.id;
    const result = await userEntityService.getUserEntityById(id);
    if (!result) return res.status(404).json({ message: "Association introuvable" });
    res.status(200).json({ message: "Association trouvée", result });
}

async function updateUserEntity(req, res) {    
    const result = await userEntityService.updateUserEntity(req.params.id, req.body);
    res.status(200).json({ message: "Association mise à jour", result });
}

async function deleteUserEntity(req, res) {
    const id = req.params.id;
    const result = await userEntityService.deleteUserEntity(id);
    res.status(200).json({ message: "Association supprimée", result });
}

module.exports = {
  createUserEntity,
  getAllUserEntities,
  getUserEntityById,
  updateUserEntity,
  deleteUserEntity
};
