const db = require('../../DB/MySQL');

const tabla = 'usuarios';

var todos = () => {
    return db.todos(tabla);
};

var uno = (id) => {
    return db.uno(tabla,id);
};

var eliminar = (body) => {
    return db.eliminar(tabla, body);
};

var crear = (body) => {
    return db.crear(tabla, body);
};

var guardarPublicacion = (body) => {
    return db.guardarPublicacion("publicaciones", body)
}

var verPublicaciones = () =>{
    return db.verPublicaciones('publicaciones');
}


module.exports = {
    todos,
    uno,
    eliminar,
    crear,
    guardarPublicacion,
    verPublicaciones
}