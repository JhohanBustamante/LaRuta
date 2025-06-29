const db = require("../../DB/MySQL");

const tabla = "usuarios";

var todos = () => {
  return db.todos(tabla);
};

var uno = (correo) => {
  return db.uno("usuarios", correo);
};

var eliminar = (body) => {
  return db.eliminar(tabla, body);
};

var crear = (body) => {
  return db.crear(tabla, body);
};

const registrarUsuario = async (body) => {
  try {
    const correoExistente = await db.uno("usuarios", body.correo, "correo");
    if (correoExistente.length > 0) {
      return { estado: false, mensaje: "correo" };
    }

    const apodoExistente = await db.uno("usuarios", body.apodo, "apodo");
    if (apodoExistente.length > 0) {
      return { estado: false, mensaje: "apodo" };
    }

    const resultado = await db.crear("usuarios", body);
    return { estado: true, id: resultado.insertId };
  } catch (error) {
    console.error("Error en controlador registrarUsuario:", error);
    throw error;
  }
};

var guardarPublicacion = (body) => {
  return db.guardarPublicacion("publicaciones", body);
};

var verPublicaciones = () => {
  return db.verPublicaciones("publicaciones");
};



const iniciarSesion = async (body) => {
  try {
    const correoInicio = await db.uno("usuarios", body.correo || "", "correo");
    const apodoInicio = await db.uno("usuarios", body.apodo || "", "apodo");
    let usuarioBuscado = "";
    let rolUsuario = "";

    if (correoInicio.length > 0) {
      usuarioBuscado = correoInicio[0].correo;
      rolUsuario = correoInicio[0].rol;
    } else if (apodoInicio.length > 0) {
      usuarioBuscado = apodoInicio[0].apodo;
      rolUsuario = apodoInicio[0].rol;
    } else {
      return { estado: false, mensaje: "usuario" };
    }

    const validacionInicio = await db.varios(
      "usuarios",
      usuarioBuscado,
      body.contrasena
    );

    if (validacionInicio.length > 0) {
      return { estado: true, mensaje: "ok", rol: "valorPendiente" };
    } else {
      return { estado: false, mensaje: "contrasena" };
    }
  } catch (error) {
    console.error("Error en controlador iniciarSesion:", error);
    throw error;
  }
};

module.exports = {
  todos,
  uno,
  eliminar,
  crear,
  guardarPublicacion,
  verPublicaciones,
  registrarUsuario,
  iniciarSesion,
};
