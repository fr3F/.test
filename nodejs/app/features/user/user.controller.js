const userService = require('../../features/user/service/user.service.js')

async function createUser(req, res){
    const { username, email, password } = req.body; 
    const result = await userService.createUser(username, email, password)    
    return res.status(200).json({message:"create avec success", resultat: result})
}

async function login(req, res){
    try {
        const {email, password} = req.body;       
        const result = await userService.login(email, password);
        return res.status(200).json({message:"login avec success", resultat: result})
    
    } catch (error) {
        console.log("Erreur login :", error.message);
        return res.status(401).json({message: "Email ou mot de passe incorrect"});
    }
    
}

async function findByUserid(req, res){
    const id = req.params.id;
    const result = await userService.findByUserid(id);
    return res.status(200).json({message:"find avec success", resultat: result})
}

async function deleteByUserid(req, res){
    const id = req.params.id;
    const result = await userService.deleteByUserid(id);
    return res.status(200).json({message:"delete avec success", resultat: result})
}

async function getAllUser(req, res){
    const result = await userService.getAllUser();
    return res.status(200).json({message:"getAll avec success", resultat: result})
}

async function updatUser(req,res){
    const {username, email, password} = req.body;
    const user = await userService.updateUser(req.params.id, { username,email,password });
    return res.status(200).json({message: "Utilisateur mis à jour avec succès",user});
}

module.exports={
    createUser,
    login,
    findByUserid,
    deleteByUserid,
    getAllUser,
    updatUser
}