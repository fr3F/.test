const entityService = require("./service/entity.service")
async function createEntity(req,res){
    const rep = await entityService.createEntityService({name: req.body.name});
    return res.status(200).json({message:"create entity avec success",result:rep})
}
async function getAllEntity(req, res) {
    const rep = await entityService.getAllEntity();  
    return res.status(200).json({message:"getAll entity avec success",result:rep})
}

async function getEntityById(req, res) {
    const rep = await entityService.getEntityById(req.params.id);  
    return res.status(200).json({message:"get entity avec success",result:rep})
}
async function updateEntity(req, res) {
    const rep = await entityService.updateEntity(req.params.id, req.body);  
    return res.status(200).json({message:"update entity avec success",result:rep})
}
async function deleteEntityById(req, res) {
    const rep = await entityService.deleteEntityById(req.params.id);  
    return res.status(200).json({message:"delete entity avec success",result:rep})
}

module.exports={
    createEntity,
    getAllEntity,
    getEntityById,
    updateEntity,
    deleteEntityById
}