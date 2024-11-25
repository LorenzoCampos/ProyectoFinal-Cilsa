const jwt = require("jsonwebtoken");
const Token = require("./models/tokenModel");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const payload = jwt.verify(token, "SECRET_KEY");

    // Verifica si el token está en la base de datos
    const validToken = await Token.findOne({ where: { token } });
    if (!validToken) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = payload; // Agrega el usuario autenticado al request
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = { authenticateToken };
