var Actdatos = function () {
    var contrasena = document.getElementById("exampleInputPassword1").value

    if (contrasena == "KevinAlejandro_2524") {
        alert("Se han actualizado sus datos de usuario")
        var newNombre = document.getElementById("ActualizacionNombre").value

        document.getElementById("nombreUser").innerHTML = newNombre;

        var newAno = document.getElementById("ActualizacionAño").value
        document.getElementById("añoEsta").innerHTML = newAno;

        var newAltura = document.getElementById("ActualizacionAltura").value
        document.getElementById("alturaUser").innerHTML = newAltura;
    }
    else {
        alert("La contraseña no ingresada no coincide, por favor intentelo nuevamente")
    }
}