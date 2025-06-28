const mysql = require("mysql2");
const config = require("../config");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.db,
};

let conexion;

conexionMysql = () => {
  conexion = mysql.createConnection(dbConfig);

  conexion.connect((error) => {
    if (error) {
      console.log(["[db error]"], error);
      setTimeout(conexionMysql, 200);
    } else {
      console.log("DB conectada");
    }
  });
  conexion.on("error", (error) => {
    console.log(["[db error]"], error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      conexionMysql();
    } else {
      throw error;
    }
  });
};

conexionMysql();

var verPublicaciones = (tabla) => {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
};

var todos = (tabla) => {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
};

var uno = (tabla, correo, atributo) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE ${atributo} = "${correo}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var crear = (tabla, data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${tabla} (nombre, apellido, apodo, correo, contrasena) VALUES (?, ?, ?, ?, ?)`,
      [data.nombre,
      data.apellido,
      data.apodo,
      data.correo,
      data.contrasena],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var eliminar = (tabla, data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id = ?`,
      parseInt(data.id),
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var guardarPublicacion = (tabla, data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${tabla} (titulo, descripcion) VALUES (?,?) `,
      [data.titulo, data.descripcion] ,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};


module.exports = {
  todos,
  uno,
  crear,
  eliminar,
  guardarPublicacion,
  verPublicaciones
};
