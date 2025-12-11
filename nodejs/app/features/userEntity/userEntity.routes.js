module.exports = function(app){
    const controller =  require('../userEntity/userEntity.controller');
    const router = require('express').Router();

    router.post("/", controller.createUserEntity);
    router.get("/", controller.getAllUserEntities);
    router.get("/:id", controller.getUserEntityById);
    router.put("/:id", controller.updateUserEntity);
    router.delete("/:id", controller.deleteUserEntity);

    app.use("/user-entities", router)
}