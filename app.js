const express = require("express");
const cors = require("cors");
const session = require('express-session');
const db = require("./models");
const cors_ = require("./config/cors"); // Asegúrate de que el archivo de configuración esté correcto

const app = express();

global.__basedir = __dirname;

// Configuración CORS
var corsOptions = {
  origin: cors_.origin, // Usamos 'origin' directamente
  methods: cors_.methods.split(','), // Convierte el string en un arreglo
  allowedHeaders: cors_.allowedHeaders.split(','), // Convierte el string en un arreglo
  credentials: cors_.credentials, // Usar la propiedad directamente
};

app.use(cors(corsOptions)); // Aplica las opciones de CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'nothing',
  cookie: { secure: false } // Cambia a `true` si usas HTTPS en producción
}));

// Conexión a la base de datos
async function testConnection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Connected to Database.");
  } catch (e) {
    console.log(e.message);
  }
}

testConnection();

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Encriptación" });
});

// Importar y usar las rutas
require("./routes/automationRoutes/auth.routes")(app);
require("./routes/automationRoutes/crypto.routes")(app);
require("./routes/app.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
