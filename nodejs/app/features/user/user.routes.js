const { verifyToken } = require('../../middleware/auth.middleware');
const { checkUser } = require('../../middleware/verifySingUp')

module.exports = function(app){
    const controller = require('../user/user.controller')
    const router = require('express').Router()

    router.post('/', (req, res) => {
        if (req.body.username) {
            checkUser(req, res, () => {
                controller.createUser(req, res);
            });
        } else {
            controller.login(req, res);
        }
    });
    
    router.get('/:id',verifyToken, controller.findByUserid)
    router.delete('/:id', verifyToken, controller.deleteByUserid)
    router.get('/', verifyToken, controller.getAllUser)
    router.put('/:id', verifyToken, controller.updatUser)

    app.use('/users', router)
}