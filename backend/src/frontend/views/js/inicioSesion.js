const $formulario = document.getElementById("IS-FV-datos");
const datosNoPermitidos = ["", undefined, null];
$formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  obtenerDatos();
});

let alerta = (mensaje, icono) => {
  Swal.fire({
    title: mensaje,
    icon: icono,
    draggable: true,
  });
};

let obtenerDatos = () => {
  datos = {
    usuario: document.getElementById("IS-FV-usuario").value,
    contrasena: document.getElementById("IS-FV-contrasena").value,
  };

  iniciarSesion(datos);
};

let validarDatos = (objeto) => {
  let existencia = datosNoPermitidos.findIndex(
    (item) => item == objeto.usuario || item == objeto.contrasena
  );

  console.log(validarDatos(objeto));

  let longitud = [
    objeto.usuario.trim().length,
    objeto.contrasena.trim().length,
  ];

  existencia >= 0
    ? alerta("Agrega todos los campos.", "error")
    : longitud[0] <= 5 || longitud[1] <= 5
    ? alerta(
        "Usuario debe tener más de 5 caracteres y contraseña, entre 5 y 15",
        "error"
      )
    : iniciarSesion(objeto);
};

let enviarDatos = async (objeto) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("usuario", objeto.usuario);
  urlencoded.append("contrasena", objeto.contrasena);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:4000/api/usuarios/iniciar",
      requestOptions
    );
    const respuestaBack = await response.json();

    const body = respuestaBack.body;
    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let iniciarSesion = (objeto) => {
  enviarDatos(objeto).then((body) => {
    if (body == "correo o apodo mal") {
      alerta(`Usuario o correo incorrecto`, "error");
      return false;
    } else if (body == "contrasena") {
      alerta(`Contraseña incorrecta o usuario inactivo`, "error");
      return false;
    }
    var rol = parseInt(body.mensaje.rol);

    console.log(body);

    var usuario = "";
    rol == 1
      ? (usuario = "invitado")
      : rol == 2
      ? (usuario = "normal")
      : rol == 3
      ? (usuario = "moderador")
      : rol == 2
      ? (usuario = "asesor")
      : (usuario = "administrador");
    console.log(usuario.body);
    alerta(`Bienvenido, ${body.apodo}, usuario ${usuario}`);
    localStorage.setItem("apodo", body.apodo);
    localStorage.setItem("id", body.mensaje.idUsuario);

    setTimeout(() => {
      window.location.href = "../html/index.html";
    }, 2000);
  });
};
