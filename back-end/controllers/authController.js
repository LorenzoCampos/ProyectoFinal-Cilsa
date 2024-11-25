const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

// Registro
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username y password son requeridos" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({
      message: "Usuario creado",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "SECRET_KEY"
  );

  // Guarda el token en la base de datos
  await Token.create({ token });

  res.status(200).json({ token });
};

// Cerrar Sesión (elimina el token)
const logout = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  // Elimina el token de la lista de tokens válidos
  await Token.destroy({ where: { token } });

  res.status(204).send();
};

module.exports = { register, login, logout };
