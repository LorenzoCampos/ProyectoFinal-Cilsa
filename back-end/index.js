const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes en JSON
app.use(cors()); // Habilitar CORS para todos los orígenes

app.use("/", authRoutes);
app.use("/", taskRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
});