const express = require("express");
const respuesta = require("../../red/respuestas");
const controladorUsuarios = require("./controlador");

const router = express.Router();

router.post("/publicar", guardarPublicacion);
router.get("/publicar/ver", verPublicaciones);

router.post("/iniciar", iniciarSesion);
// Esta función permite al usuario enviar datos para  validar las credenciales de inicio y dar acceso a la aplicación

router.post("/crear", crear);
router.get("/", todos);
router.get("/:correo", uno);
router.put("/eliminar", eliminar);
router.post("/registrar", registrarUsuario);

async function iniciarSesion(request, response) {
  try {
    const resultado = await controladorUsuarios.iniciarSesion(request.body);

    if (resultado.estado === false && resultado.mensaje == "contrasena") {
      respuesta.error(request, response, "contrasena", 409);
    } else if (resultado.estado === false && resultado.mensaje == "usuario") {
      respuesta.error(request, response, "correo o apodo mal", 409);
    } else if (resultado.estado === true && resultado.mensaje == "ok") {
      respuesta.error(request, response, "iniciado", 409);
    }
    console.log(resultado);
  } catch (error) {}
}

async function registrarUsuario(request, response, next) {
  try {
    const resultado = await controladorUsuarios.registrarUsuario(request.body);

    if (resultado.estado === false && resultado.mensaje === "correo") {
      respuesta.error(request, response, resultado.mensaje || "correo", 409);
    } else if (resultado.estado === false && resultado.mensaje === "apodo") {
      respuesta.error(request, response, resultado.mensaje || "apodo", 409);
    } else {
      respuesta.success(request, response, "creado", 201); // respuesta de que la solicitud está bien
    }
  } catch (error) {
    console.error("Error en registro de usuario:", error);
    respuesta.error(request, response, "Error interno del servidor", 500);
  }
}

async function guardarPublicacion(request, response, next) {
  try {
    const items = await controladorUsuarios
      .guardarPublicacion(request.body)
      .then((items) => {
        respuesta.success(request, response, "Publicado", 200);
      });
  } catch (error) {
    console.log("error en validación");
    next(error);
  }
}

async function verPublicaciones(request, response, next) {
  try {
    const items = await controladorUsuarios.verPublicaciones().then((items) => {
      respuesta.success(request, response, items, 200);
    });
  } catch (error) {
    next(error);
  }
}

async function todos(request, response, next) {
  try {
    const items = await controladorUsuarios.todos().then((items) => {
      respuesta.success(request, response, items, 200);
    });
  } catch (error) {
    next(error);
  }
}

async function uno(request, response, next) {
  try {
    const items = await controladorUsuarios
      .uno(request.params.correo)
      .then((items) => {
        respuesta.success(request, response, items, 201);
      });
  } catch (error) {
    next(error);
  }
}

async function eliminar(request, response, next) {
  try {
    const items = await controladorUsuarios
      .eliminar(request.body)
      .then((items) => {
        respuesta.success(request, response, "Eliminado con éxito", 200);
      });
  } catch (error) {
    next(error);
  }
}

async function crear(request, response, next) {
  try {
    const items = await controladorUsuarios
      .crear(request.body)
      .then((items) => {
        respuesta.success(request, response, "Creado con éxito", 200);
      });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
