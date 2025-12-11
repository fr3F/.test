const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user; 
const SECRET = process.env.JWT_SECRET || "secret-key"; 

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "Aucun token fourni !" });

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({ message: "Token invalide !" });

        const token = parts[1];
        const decoded = jwt.verify(token, SECRET);

        if (!decoded || !decoded.id) return res.status(401).json({ message: "Token invalide !" });

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ message: "Utilisateur introuvable" });

        req.userId = decoded.id;
        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Non autorisé !" });
    }
};

const setUserConnecte = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return next();

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return next();

    const token = parts[1];
    const decoded = jwt.verify(token, SECRET);

    if (decoded && decoded.id) {
      const user = await User.findByPk(decoded.id);
      if (user) {
        req.userId = decoded.id;
        req.user = user;
      }
    }
    next();
  } catch {
    next(); // On ignore les erreurs ici pour ne pas bloquer les routes publiques
  }
};

module.exports = { verifyToken, setUserConnecte };
