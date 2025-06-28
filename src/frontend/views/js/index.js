const $formulario = document.getElementById("I-FP-Datos");
const datosNoPermitidos = ["", undefined, null];
const publicacionCampo = document.getElementById("publicacion");

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
  enviarDatos(objeto);
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
    .then((respuestaBack) => {
      var respuesta = JSON.parse(respuestaBack);
    })
    .catch((error) => console.error(error));
};

let traerDatos = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:4000/api/usuarios/publicar/ver",
      requestOptions
    );
    const respuestaBack = await response.json();
    const body = respuestaBack.body;
    console.log(body);
    return body; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

traerDatos()
.then((body) => {
  if (!Array.isArray(body) || body.length === 0) {
      console.error("Error: 'body' no es un array o está vacío");
      publicacionCampo.innerHTML = "<p>No hay publicaciones disponibles</p>";
      return;
    }
   let publicacion = "";
    for (let i = 0; i < body.length; i++) {
      publicacion += `
        <div class="publicacion">
          <div class="titulo">
            <h4>${body[i].titulo}</h4>
          </div>
          <div class="descripcion">
            <p>${body[i].descripcion}</p>
          </div>
        </div>
      `;
    }
    publicacionCampo.innerHTML = publicacion; 
  })
  .catch((error) => {
    console.error("Error al cargar publicaciones:", error);
    publicacionCampo.innerHTML = "<p>Error al cargar las publicaciones</p>";
});