const routes = (app)=>{
    require("../features/entity/entity.routes")(app);
    
    require("../features/user/user.routes")(app);
    require("../features/userEntity/userEntity.routes")(app);
}
module.exports = routes;