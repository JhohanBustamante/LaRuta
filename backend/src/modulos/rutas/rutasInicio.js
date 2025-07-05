const express = require("express");
const respuesta = require("../../red/respuestas");
const controladorInicio = require("../usuarios/controlador");
const router = express.Router();

router.post("/iniciar", iniciarSesion);
router.post("/registrar", registrarUsuario);
router.get("/activar/:correo/:codigo", activarCuenta);
router.get("/recuperar/:correo/:codigo", activarCuenta);

async function activarCuenta(request, response) {
  try {
    const resultado = await controladorInicio.activar(request.params);
    if (resultado.estado == false) {
      respuesta.error(request, response, "codigo", 409);
    } else {
      response.redirect('http://localhost:5500/src/frontend/views/html/inicio.html');
    }
  } catch (error) {
    console.log(error);
  }
}

async function iniciarSesion(request, response) {
  try {
    const resultado = await controladorInicio.iniciarSesion(request.body);
    console.log(resultado);
    if (resultado.estado === false && resultado.mensaje == "contrasena") {
      respuesta.error(request, response, "contrasena", 409);
    } else if (resultado.estado === false && resultado.mensaje == "usuario") {
      respuesta.error(request, response, "correo o apodo mal", 409);
    } else if (resultado.estado === true) {
      respuesta.error(request, response, resultado, 201);
    }
  } catch (error) {
    console.log(error);
  }
}

async function registrarUsuario(request, response) {
  try {
    const resultado = await controladorInicio.registrar(request.body);
    console.log("resultado:" + resultado.estado);
    if (resultado.estado == false && resultado.mensaje == "correo") {
      respuesta.error(request, response, "correousado");
    } else if (resultado.estado == false && resultado.mensaje == "apodo") {
      respuesta.error(request, response, "apodo");
    } else if (
      resultado.estado == true &&
      resultado.mensaje == "registradoEnviado"
    )
      respuesta.error(request, response, resultado.mensaje);
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
