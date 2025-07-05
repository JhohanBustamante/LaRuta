const express = require("express");
const morgan = require("morgan");
global.config = require("./config.js")
const cors = require("cors")
global.nodemailer = require("nodemailer")
global.sha256 = require("sha256")

const inicio = require("./modulos/rutas/rutasInicio");
const publicar = require("./modulos/rutas/rutasPublicacion");

const error = require('./red/errors')

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/usuarios", inicio);
app.use("/api/publicar", publicar);

app.use(error);

module.exports = app;