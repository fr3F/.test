const bcrypt = require("bcryptjs");

async function verifierPassword(password, hashedPassword) {
  if (!password || !hashedPassword) throw new Error("Mot de passe manquant");
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch)  throw new Error("Mot de passe incorrect");
  return true;
}

function genererPassword(){
    let motDePasse = Math.random().toString(36).substring(2,10);
    return motDePasse
}

module.exports = {verifierPassword, genererPassword};