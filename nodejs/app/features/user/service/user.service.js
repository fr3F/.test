const bcrypt = require("bcryptjs");
const { genererPassword, verifierPassword } = require("../../../utils/password.util.js");
const { genererToken } = require("../../../utils/token.util.js");
const db = require("../../../models/index");
const { validateEmail } = require("../../../helpers/helper.helper.js");
const User = db.user;

async function createUser(username, email, password){
    try {
        if (!validateEmail(email)) throw new Error("Format d'email invalide");
        const plainPassword = password || genererPassword();        
        const userData = genererUser(username, email, plainPassword);
        const result = await User.create(userData);
        return {user: result, plainPassword: plainPassword};        
    } catch (error) {
        throw error;
    }
}

function genererUser(username = null, email, password = "") {
    if (password === "") {
        password = genererPassword();
    }
    const finalUsername = username || email.split('@')[0];    
    return {
        username: finalUsername,
        email: email,
        password: bcrypt.hashSync(password, 8)
    };
}

function findByEmail(email){
    const emailUser = User.findOne({where: {email}});
    return emailUser
}

function buildLoginReponse(token, user){
    return {
        token,
        user:{
            id:user.id,
            username:user.username,
            email:user.email,
            createAt:user.createAt
        }
    }
}

function getAllUser(){
    const users = User.findAll();
    return users
}

async function login(email, password){
    if (!email || !password) throw new Error("Email et mot de passe requis");
    const user = await findByEmail(email);
    if (!user) throw new Error("Email ou mot de passe incorrect");
    await verifierPassword(password, user.password);
    const token = genererToken(user);
    return buildLoginReponse(token, user);
}

async function findByUserid(id){
    const userId = await User.findByPk(id);
    return userId
}

async function deleteByUserid(id){
    const userId = await findByUserid(id)
    await userId.destroy();
    return userId
}

function modifyUser(user, data){
    user.username = data.username || user.username;
    user.email = data.email || user.email;
    if (data.password) user.password = bcrypt.hashSync(data.password, 8);
    return user
}

async function updateUser(id, data){
    const user = await findByUserid(id);       
    const modifiedUser = modifyUser(user, data);
    await modifiedUser.save()
    const { password, ...userWithoutPassword } = modifiedUser.toJSON();
    return userWithoutPassword;
}

module.exports={
    createUser,
    login,
    findByUserid,
    deleteByUserid,
    getAllUser,
    findByEmail,
    updateUser
}