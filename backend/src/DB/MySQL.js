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

var uno = (tabla, valor, atributo) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE ${atributo} = "${valor}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var varios = (tabla, valorUno, valorDos) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE (correo="${valorUno}" OR apodo ="${valorUno}") AND contrasena="${valorDos}" AND estado="Activo"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var todos = (tabla) => {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
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

var verPublicaciones = (tabla, body) => {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario="${parseInt(body.idUsuario)}"`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
};

var buscarRol = (tabla, dato) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE correo = "${dato}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

var guardarPublicacion = (tabla, data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${tabla} (titulo, descripcion, id_usuario) VALUES (?,?,?)`,
      [data.titulo, data.descripcion, data.idUsuario],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

const guardarImagen = async (data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      "INSERT INTO publicaciones (titulo, descripcion, id_usuario, imagen) VALUES (?, ?, ?, ?)",
      [body.titulo, body.descripcion, body.id_usuario, body.imagen],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

const registrar = async (body) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO usuarios (nombre, apellido, correo, contrasena, apodo, codigoAct) VALUES (?,?,?,?,?,?)`,
      [body.nombre, body.apellido, body.correo, body.contrasena, body.apodo, body.codigo],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};
const asignarRol = async (body) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO rol_usuario (id_rol,id_usuario) VALUES (2,${body.idUsuario})`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

const activar = async (params) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE usuarios SET estado = "Activo" WHERE correo = "${params.correo}" AND codigoAct = "${params.codigo}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
};

module.exports = {
  todos,
  uno,
  eliminar,
  guardarPublicacion,
  verPublicaciones,
  varios,
  buscarRol,
  guardarImagen,
  registrar,
  asignarRol,
  activar,
};
