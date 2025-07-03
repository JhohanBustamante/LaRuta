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
        alert ("El nombre ingresado esta vacio")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (nombre)){
        alert ("El nombre de usuario no es válido")
    }else if (newSegNo>= 0){
        alert ("El segundo nombre ingresado esta vacio")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (segundoNom)){
        alert ("El segundo nombre de usuario no es válido")
    }else if (newApellido>= 0){
        alert ("El apellido ingresado esta vacio")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (apellido)){
        alert ("El segundo nombre de usuario no es válido")
    }else if (newSegApellido>=0){
        alert ("El segundo apellido ingresado esta vacio")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,30}$/.test (apellido2)){
        alert ("El segundo apellido ingresado no es válido")
    }else if (newUsuario>=0){
        alert ("El usuario ingresado esta vacio")
    }else if (!/^[a-zA-Z0-9_]{4,16}$/.test (usuario)){
        alert ("El usuario ingresado no es válido")
    }else if (newCorreo>=0){
        alert ("El correo ingresado esta vacio")
    }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test (correo)){
        alert ("El correo ingresado no es válido")
    }else if (newContrasena1>=0){
        alert ("El el campo de contraseña esta vacio")
    }else if (!/^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*\d){2,})[a-zA-Z\d]{10,15}$/.test (contrasena1)){
        alert ("La contraseña ingresado no es válido")
    }else if (newContrasena2>=0){
        alert ("El el campo de verificar su contraseña esta vacio")
    }else if (contrasena1 !==contrasena2){
        alert ("Las contraseñas no coinciden")
    }else {
        alert ("¡Se ha registrado exitosamente!")
        localStorage.setItem("usuarioGuardado", usuario);
        localStorage.setItem("correoGuardado", correo);
        localStorage.setItem("contrasenaGuardada", contrasena2);
        setTimeout(() => {
        window.location.href = '../html/inicioSesion.html';
      }, 2000);
      }
    };