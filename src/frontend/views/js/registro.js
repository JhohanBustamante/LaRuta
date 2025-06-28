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
    ? alerta("Ingresa todos los datos requeridos", "error")
    : objeto.nombre.trim().length < 1 ||
      objeto.apellido.trim().length < 2 ||
      objeto.correo.trim().length < 7 ||
      objeto.contrasena.trim().length < 10 ||
      objeto.contrasenaDos.trim().length < 10
    ? alerta("Ingresa datos válidos en los datos requeridos", "error")
    : !validacionNombreUsuario.test(objeto.nombreUsuario)
    ? alerta("El nombre de usuario no es válido", "error")
    : !validacionCorreo.test(objeto.correo)
    ? alerta("El correo no es válido", "error")
    : !validacionContrasena.test(objeto.contrasena)
    ? alerta("La contraseña no es valida", "error")
    : reflejarDatos();
};

let reflejarDatos = () => {
  console.log("Pasó la validacion");
};
