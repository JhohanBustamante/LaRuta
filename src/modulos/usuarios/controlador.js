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

var guardarPublicacion = (body) => {
  return db.guardarPublicacion("publicaciones", body);
};

var verPublicaciones = () => {
  return db.verPublicaciones("publicaciones");
};

const registrarUsuario = async (body) => {
  try {
    const usuarioExistente = await db.uno("usuarios", body.correo, "correo");
    
    if (usuarioExistente.length > 0) {
      return { estado: false, mensaje: "correo", codigo:"correo" };
    }

    const apodoExistente = await db.uno("usuarios", body.apodo, "apodo");
    
    if (apodoExistente.length > 0) {
      return { estado: false, mensaje: "apodo", codigo:"apodo" };
    }
    
    const resultado = await db.crear("usuarios", body);
    return { estado: true, id: resultado.insertId };
    
  } catch (error) {
    console.error("Error en controlador registrarUsuario:", error);
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
};
