const express = require("express");
const respuesta = require("../../red/respuestas");
const controladorPublicacion = require("../publicacion/controlador");
const router = express.Router();


router.post("/publicar", guardarPublicacion);
router.post("/publicar/ver", verPublicaciones);


async function guardarPublicacion(request, response, next) {
  try {
    const items = await controladorPublicacion
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
    const items = await controladorPublicacion.verPublicaciones(request.body).then((items) => {
      respuesta.success(request, response, items, 200);
    });
    console.log(items)

  } catch (error) {
    next(error);
  }
}

module.exports = router;