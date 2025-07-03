var confirmacion = function () {

    var usuario = document.getElementById("IS-FV-usuario").value.trim();
    var contrasena = document.getElementById("IS-FV-contrasena").value.trim();
    const usuarioGuardado = localStorage.getItem("usuarioGuardado")
    const correoGuardado = localStorage.getItem("correoGuardado")
    const contrasenaGuardada = localStorage.getItem("contrasenaGuardada")
    var datosNoPermitidos = ["", null, undefined];
    console.log(usuario)
    var NumeroUsuario= datosNoPermitidos.findIndex ((dato)=> dato == usuario);
    var NumeroContrasena= datosNoPermitidos.findIndex ((dato)=> dato == contrasena);

    console.log(usuarioGuardado)
    console.log(correoGuardado)
    console.log(contrasenaGuardada)


    if (NumeroUsuario >= 0){
        alert ("Campo de usuario ingresado vacio")
    }else if (NumeroContrasena >= 0){
        alert ("Campo de contraseña ingresada esta vacio")
    }else if ((usuario == usuarioGuardado || usuario== correoGuardado && contrasena == contrasenaGuardada)){
        alert ("Inicio de sesión exitoso")
        setTimeout(() => {
        window.location.href = '../html/blogComunidad.html';
      }, 2000);
    }else{
        alert("Usuario o contraseña ingresada incorrecto")
    }
}