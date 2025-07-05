var validarRegistro = function () {

    var nombre = document.getElementById("nombre").value.trim()
    var segundoNom = document.getElementById("nombreDos").value.trim()
    var apellido = document.getElementById("apellido").value.trim()
    var apellido2 = document.getElementById("apellidoDos").value.trim()
    var usuario = document.getElementById("nombreUsuario").value.trim()
    var correo = document.getElementById("correo").value.trim()
    var contrasena1 = document.getElementById("contrasena").value.trim()
    var contrasena2 = document.getElementById("contrasenaDos").value.trim()
    var noPerminido = ["", null, undefined]

    newNombre= noPerminido.findIndex((dato)=> dato==nombre)
    newSegNo= noPerminido.findIndex((dato)=> dato==segundoNom)
    newApellido= noPerminido.findIndex((dato)=> dato==apellido)
    newSegApellido= noPerminido.findIndex((dato)=> dato==apellido2)
    newUsuario= noPerminido.findIndex((dato)=> dato==usuario)
    newCorreo= noPerminido.findIndex((dato)=> dato==correo)
    newContrasena1= noPerminido.findIndex((dato)=> dato==contrasena1)
    newContrasena2= noPerminido.findIndex((dato)=> dato==contrasena2)

    if (newNombre>= 0){
        alerta ("El nombre ingresado esta vacio", "error")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (nombre)){
        alerta ("El nombre de usuario no es válido", "error")
    }else if (newSegNo>= 0){
        alerta ("El segundo nombre ingresado esta vacio", "error")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (segundoNom)){
        alerta ("El segundo nombre de usuario no es válido", "error")
    }else if (newApellido>= 0){
        alerta ("El apellido ingresado esta vacio", "error")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (apellido)){
        alerta ("El segundo nombre de usuario no es válido", "error")
    }else if (newSegApellido>=0){
        alerta ("El segundo apellido ingresado esta vacio", "error")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (apellido2)){
        alerta ("El segundo apellido ingresado no es válido", "error")
    }else if (newUsuario>=0){
        alerta ("El usuario ingresado esta vacio", "error")
    }else if (!/^[a-zA-Z0-9_]{4,16}$/.test (usuario)){
        alerta ("El usuario ingresado no es válido", "error")
    }else if (newCorreo>=0){
        alerta ("El correo ingresado esta vacio", "error")
    }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test (correo)){
        alerta ("El correo ingresado no es válido", "error")
    }else if (newContrasena1>=0){
        alerta ("El el campo de contraseña esta vacio", "error")
    }else if (!/^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*\d){2,})[a-zA-Z\d]{10,15}$/.test (contrasena1)){
        alerta ("La contraseña ingresado no es válida", "error")
    }else if (newContrasena2>=0){
        alerta ("El el campo de verificar su contraseña esta vacio", "error")
    }else if (contrasena1 !==contrasena2){
        alerta ("Las contraseñas no coinciden", "error")
    }else {
        alerta ("¡Se ha registrado exitosamente!", "success")
        localStorage.setItem("usuarioGuardado", usuario);
        localStorage.setItem("correoGuardado", correo);
        localStorage.setItem("contrasenaGuardada", contrasena2);
        setTimeout(() => {
        window.location.href = '../html/Activacion.html';
      }, 2000);
      }
    };

    let alerta = (mensaje, icono) => {
  Swal.fire({
    title: mensaje,
    icon: icono,
    draggable: true,
  });
};