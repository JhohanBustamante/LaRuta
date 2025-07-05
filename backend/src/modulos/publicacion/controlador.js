const db = require("../../DB/MySQL");

var guardarPublicacion = (body) => {
  console.log(body)
  return db.guardarPublicacion("publicaciones", body);
};

var verPublicaciones = (body) => {
  return db.verPublicaciones("publicaciones", body);
};

module.exports = {
  guardarPublicacion,
  verPublicaciones,
};