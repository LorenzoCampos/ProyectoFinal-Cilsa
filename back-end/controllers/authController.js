const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

// Expresión regular para validar la contraseña (al menos un número, 8 caracteres, sin espacios)
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,}$/;

// Expresión regular para validar el username (mínimo 8 caracteres, sin espacios)
const usernameRegex = /^[^\s]{8,}$/;

// Registro
const register = async (req, res) => {
  const { username, password } = req.body;

  // Validación de username
  if (!username || !usernameRegex.test(username)) {
    return res.status(400).json({
      error:
        "El nombre de usuario debe tener al menos 8 caracteres y no puede contener espacios.",
    });
  }

  // Validación de password
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "La contraseña debe tener al menos 8 caracteres, contener al menos un número y no puede contener espacios.",
    });
  }

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

  // Validación de username
  if (!username || !usernameRegex.test(username)) {
    return res.status(400).json({
      error:
        "El nombre de usuario debe tener al menos 8 caracteres y no puede contener espacios.",
    });
  }

  // Validación de password
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "La contraseña debe tener al menos 8 caracteres, contener al menos un número y no puede contener espacios.",
    });
  }

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
