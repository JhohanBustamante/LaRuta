const $formulario = document.getElementById("R-FR-Datos");
const validacionCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validacionContrasena =
  /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*\d){2,})[a-zA-Z\d]{10,15}$/;
const validacionNombreUsuario = /^[a-zA-Z0-9_]{3,16}$/;
const datosNoPemitidos = ["", null, undefined];

$formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  validarDatos(obtenerDatos());
});

let obtenerDatos = () => {
  let datos = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    nombreDos: document.getElementById("nombreDos").value,
    apellidoDos: document.getElementById("apellidoDos").value,
    correo: document.getElementById("correo").value,
    contrasena: document.getElementById("contrasena").value,
    contrasenaDos: document.getElementById("contrasenaDos").value,
    nombreUsuario: document.getElementById("nombreUsuario").value,
  };
  return datos;
};

let alerta = (mensaje, icono) => {
  Swal.fire({
    title: mensaje,
    icon: icono,
    draggable: true,
  });
};

let validarDatos = (objeto) => {
  let existencia = datosNoPemitidos.findIndex(
    (dato) =>
      dato == objeto.nombre ||
      dato == objeto.apellido ||
      dato == objeto.correo ||
      dato == objeto.contrasena ||
      dato == objeto.contrasenaDos
  );
  existencia >= 0
    ? alerta("Ingresa todos los datos requeridos 1 ", "error")
    : objeto.nombre.trim().length < 1 ||
      objeto.apellido.trim().length < 2 ||
      objeto.correo.trim().length < 7 ||
      objeto.contrasena.trim().length < 10 ||
      objeto.contrasenaDos.trim().length < 10
    ? alerta("Ingresa datos válidos en los datos requeridos 2", "error")
    : !validacionNombreUsuario.test(objeto.nombreUsuario)
    ? alerta("El nombre de usuario no es válido", "error")
    : !validacionCorreo.test(objeto.correo)
    ? alerta("El correo no es válido", "error")
    : !validacionContrasena.test(objeto.contrasena)
    ? alerta("La contraseña no es valida", "error")
    : validarRegistro(objeto);
};

let limpiarCampos = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("nombreDos").value = "";
  document.getElementById("apellidoDos").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("contrasena").value = "";
  document.getElementById("contrasenaDos").value = "";
  document.getElementById("nombreUsuario").value = "";
};

let enviarDatos = async (objeto) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("nombre", objeto.nombre);
  urlencoded.append("apellido", objeto.apellido);
  urlencoded.append("correo", objeto.correo);
  urlencoded.append("apodo", objeto.nombreUsuario);
  urlencoded.append("contrasena", objeto.contrasena);

  try {
    const response = await fetch(
      "http://localhost:4000/api/usuarios/registrar",
      {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

let validarRegistro = async (objeto) => {

  try {
    const respuestaBack = await enviarDatos(objeto);
    console.log(respuestaBack)

    if (respuestaBack.body=="creado") {
      alerta("¡Registro exitoso! ","success");
      limpiarCampos();

       setTimeout(() => {
        window.location.href = '../../../../html/inicioSesion.html';
      }, 2000);
    } else {
      if (respuestaBack.body == "apodo") {
        alerta("Apodo en uso, prueba otro", "error");
      } else if (respuestaBack.body == "correo") {
        alerta("Correo en uso, prueba otro", "error");
      } else {
        alerta("Error de validación interno","error")
      }
    }
  } catch (error) {
    console.error("Error al procesar el registro:", error);
    alert("Ocurrió un error al conectar con el servidor");
  }
};
