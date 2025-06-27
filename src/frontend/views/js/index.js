const $formulario = document.getElementById("I-FP-Datos");
const datosNoPermitidos = ["", undefined, null];

let obtenerDatos = () => {
  let datos = {
    titulo: document.getElementById("I-IT-Dato").value,
    descripcion: document.getElementById("I-IC-Dato").value,
  };

  validarDatos(datos);
  //reflejarDatos(datos);
};

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

let validarDatos = (objeto) => {
  let existencia = datosNoPermitidos.findIndex(
    (item) => item == objeto.titulo || item == objeto.descripcion
  );

  let longitud = [
    objeto.titulo.trim().length,
    objeto.descripcion.trim().length,
  ];

  existencia >= 0
    ? alerta("Agrega todos los campos", "error")
    : longitud[0] <= 5 || longitud[1] <= 10
    ? alerta(
        "Titulo debe tener más de 5 caracteres y descripción, más de 10",
        "error"
      )
    : reflejarDatos(objeto);
};

let limpiarCampos = () => {
  document.getElementById("I-IT-Dato").value = "";
  document.getElementById("I-IC-Dato").value = "";
};

let reflejarDatos = (objeto) => {
  limpiarCampos();

  const publicacion = `<div id="publicacionTitulo" class="col-12">
                        <h4> ${objeto.titulo} </h4>
                     </div>
                     <div id="publicacionContenido" class="col-12">
                    <p> ${objeto.descripcion} </p>
                    </div>`;

    enviarDatos(objeto);

  document.getElementById("publicacion").innerHTML = publicacion;
};

let enviarDatos = (objeto) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("titulo", objeto.titulo);
  urlencoded.append("descripcion", objeto.descripcion);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:4000/api/usuarios/publicar", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

let traerDatos = () => {
  const urlencoded = new URLSearchParams();

  const requestOptions = {
    method: "GET",
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:4000/api/usuarios/publicar/ver", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};
