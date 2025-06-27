const express = require("express");
const respuesta = require("../../red/respuestas");
const controladorUsuarios = require("./controlador");

const router = express.Router();

router.post("/crear", crear);
router.get("/", todos);
router.get("/:id", uno);
router.put('/eliminar', eliminar);


 async function todos (request, response,next) {
  try {
    const items = await controladorUsuarios.todos().then((items) => {
      respuesta.success(request, response, items, 200);
    });
  } catch (error) {
    next(error);
  }
};

 async function uno (request, response, next) {
  try {
    const items = await controladorUsuarios
      .uno(parseInt(request.params.id))
      .then((items) => {
        respuesta.success(request, response, items, 201);
      });
  } catch (error) {
    next(error);
  }
};

async function eliminar (request, response, next) {
  try {
    const items = await controladorUsuarios
      .eliminar(request.body)
      .then((items) => {
        respuesta.success(request, response, "Eliminado con éxito", 200);
      });
  } catch (error) {
    next(error);
  }
};

async function crear (request, response, next) {
  try {
    const items = await controladorUsuarios
      .crear(request.body)
      .then((items) => {
        respuesta.success(request, response, "Creado con éxito", 200);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = router;
