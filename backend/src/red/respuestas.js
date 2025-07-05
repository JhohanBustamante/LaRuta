exports.success = (request, response, mensaje = "", status = 200) => {
  
  response.status(status).send({
    error: false,
    status: status,
    body: mensaje,
  });
};

exports.error = (request, response, mensaje = "Error interno", status = 500) => {  
  response.status(status).send({
    error: true,
    status: status,
    body: mensaje,
  });
};