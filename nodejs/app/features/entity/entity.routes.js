const { verifyToken } = require('../../middleware/auth.middleware');

module.exports = function(app){
    const controller =  require('../entity/entity.controller');
    const router = require('express').Router();

    router.post('/',verifyToken, controller.createEntity);
    router.get('/',verifyToken, controller.getAllEntity);

    router.get('/:id',verifyToken, controller.getEntityById);
    router.put('/:id',verifyToken, controller.updateEntity);
    router.delete('/:id',verifyToken, controller.deleteEntityById);

    app.use("/entities", router)
}