const respuesta = require('./respuestas');

var errors = (error, request, response, next) => {
    console.error('[error]', error);
    const message = error.message || 'Error interno';
    const status = error.statusCode || 500;

    respuesta.error(request, response, message, status);
}

module.exports = errors;