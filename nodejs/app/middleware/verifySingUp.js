const { findByEmail } = require("../features/user/service/user.service");
const db = require("../models");
const User = db.user;

async function usernameExists(username) {
  return User.findOne({ where: { username } });
}

async function checkUser(req, res, next) {
  try {
    const { username, email } = req.body;

    if (await usernameExists(username)) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé !" });
    }

    if (await findByEmail(email)) {
      return res.status(400).json({ message: "Email déjà utilisé !" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  checkUser
};
