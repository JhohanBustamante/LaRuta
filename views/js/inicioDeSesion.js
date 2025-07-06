var confirmacion = function () {

    var usuario = document.getElementById("IS-FV-usuario").value.trim();
    var contrasena = document.getElementById("IS-FV-contrasena").value.trim();
    var usuarioGuardado = localStorage.getItem("usuarioGuardado")
    var correoGuardado = localStorage.getItem("correoGuardado")
    var contrasenaGuardada = localStorage.getItem("contrasenaGuardada")
    var datosNoPermitidos = ["", null, undefined];
    console.log(usuario)
    var NumeroUsuario= datosNoPermitidos.findIndex ((dato)=> dato == usuario);
    var NumeroContrasena= datosNoPermitidos.findIndex ((dato)=> dato == contrasena);

    console.log(usuarioGuardado)
    console.log(correoGuardado)
    console.log(contrasenaGuardada)
    

    if (NumeroUsuario >= 0){
        alerta ("Campo de usuario ingresado vacio","error")
    }else if (NumeroContrasena >= 0){
        alerta ("Campo de contraseña ingresada esta vacio","error")
    }else if ((usuario == usuarioGuardado || usuario== correoGuardado) && contrasena == contrasenaGuardada){
        alerta ("Inicio de sesión exitoso","success")
        setTimeout(() => {
        window.location.href = '/laruta/views/html/blog.html';
      }, 2000);
    }else{
        alerta("Usuario o contraseña incorrectos","error")
    }
}
let alerta = (mensaje, icono) => {
  Swal.fire({
    title: mensaje,
    icon: icono,
    draggable: true,
  });
};
