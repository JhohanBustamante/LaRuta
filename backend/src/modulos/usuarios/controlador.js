const db = require("../../DB/MySQL");

const iniciarSesion = async (body) => {
  try {
    const correoInicio = await db.uno("usuarios", body.usuario || "", "correo");
    const apodoInicio = await db.uno("usuarios", body.usuario || "", "apodo");
    var usuarioBuscado = "";
    var rolUsuario = "";
    if (correoInicio.length > 0) {
      usuarioBuscado = correoInicio[0].correo;
      rolUsuario = correoInicio[0].rol;
    } else if (apodoInicio.length > 0) {
      usuarioBuscado = apodoInicio[0].correo;
      rolUsuario = apodoInicio[0].rol;
    } else {
      return { estado: false, mensaje: "usuario" };
    }
    body.contrasena = sha256(body.contrasena + config.claveSecreta);
    const validacionInicio = await db.varios(
      "usuarios",
      usuarioBuscado,
      body.contrasena
    );

    if (validacionInicio.length > 0) {
      const rol = await db.buscarRol("inicio", usuarioBuscado);
      console.log("------------------->")
      console.log(rol)
      idEncontrado = rol[0].id_usuario;
      rolUsuario = rol[0].id_rol;
      apodoUsuario = rol[0].apodo;
      return { estado: true, mensaje: {mensaje:"iniciado", rol:rolUsuario, idUsuario: idEncontrado}, apodo: apodoUsuario };
    } else {
      return { estado: false, mensaje: "contrasena" };
    }
  } catch (error) {
    console.error("Error en controlador iniciarSesion:", error);
    throw error;
  }
};

const registrar = async (body) => {
  try {
    const correo = await db.uno("usuarios", body.correo, "correo");
    const apodo = await db.uno("usuarios", body.apodo, "apodo");

    if (correo.length > 0) {
      return { estado: false, mensaje: "correo" };
    } else if (apodo.length > 0) {
      return { estado: false, mensaje: "apodo" };
    } else {
      body.contrasena = sha256(body.contrasena + config.claveSecreta);
      var codigoAzar = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);
      body.codigo = codigoAzar;
      const resultado = await db.registrar(body);
      const usuarioReg = await db.uno("usuarios", body.correo, "correo");
      body.idUsuario = usuarioReg[0].id;

      const rolUsuarioAsignar = await db.asignarRol(body);
      const transportador = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        secure: false,
        requireTLS: true,
        auth: {
          user: config.emailUser,
          pass: config.emailPass,
        },
      });

      var mailOptions = {
        from: config.emailUser,
        to: body.correo,
        subject: "Verifica tu cuenta con el código: ",
        html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; text-align: center;">
                <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

                  <h1 style="color: #2c3e50;">Bienvenido a <span style="color: #3498db;">La Ruta</span></h1>

                  <p style="font-size: 16px; color: #333;">Gracias por registrarte. Usa el siguiente código para activar tu cuenta:</p>

                  <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #e74c3c; background-color: #fdecea; padding: 15px; margin: 20px auto; width: fit-content; border-radius: 8px;">
                    ${body.codigo}
                  </div>

                  <a href="${config.dominio}/api/usuarios/activar/${body.correo}/${body.codigo}" target = "_blank" 
                     style="display: inline-block; background-color: #3498db; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; font-size: 16px;">
                    Activar mi cuenta
                  </a>

                  <p style="margin-top: 30px; font-size: 14px; color: #888;">
                    Si no te registraste en <strong>La Ruta</strong>, puedes ignorar este mensaje.
                  </p>
                </div>
              </div>`,
      };

      transportador.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return { estado: false, mensaje: "Error enviando el correo" };
        } else {
          console.log(info);
        }
      });
      return { estado: true, mensaje: "registradoEnviado" };
    }
  } catch (error) {
    console.error("Error en controlador registro:", error);
    throw error;
  }
};

const activar = async (params) => {
  console.log(params);
  try {
    const activacion = await db.activar(params);
    console.log("---------------------->");
    if(activacion.affectedRows == 1) return {estado:true, mensaje:"actualizado"}
    else return {estado:false, mensaje:"error"}
    console.log("---------------------->");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  iniciarSesion,
  registrar,
  activar,
};
