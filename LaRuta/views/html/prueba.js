var Actdatos = function () {
    var contrasena = document.getElementById("exampleInputPassword1").value
    var newNombre = document.getElementById("ActualizacionNombre").value.trim()
    var newAno = document.getElementById("ActualizacionAno").value.trim()
    var newAltura = document.getElementById("ActualizacionAltura").value.trim()
    var datosNoPermitidos = ["", null, undefined]

    newDatosNo= datosNoPermitidos.findIndex((dato)=> dato==newNombre)
    newDatosAno= datosNoPermitidos.findIndex((dato)=> dato==newAno)
    newDatosAlt= datosNoPermitidos.findIndex((dato)=> dato==newAltura)
    newDatosPasw= datosNoPermitidos.findIndex((dato)=> dato==contrasena)

    console.log(newDatosNo)
    console.log(newDatosAno)
    if (newDatosNo==0 || newDatosNo==1 || newDatosNo == 2){
        alert ("El nombre ingresado esta vacio")
    }else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{10,30}$/.test (newNombre)){
        alert ("El nombre de usuario no es válido")
    }
    else if (newDatosAno==0 || newDatosAno==1 || newDatosAno == 2){
        alert ("El año ingresado esta vacio")
    }else if (!/^\d{4}$/.test (newAno)){
        alert("El año ingresado debe ser una fecha valida")
    }else if (newDatosAlt==0 || newDatosAlt==1 || newDatosAlt == 2){
        alert ("La altura ingresada esta vacia")
    }else if (!/^\d\.\d{2}$/.test (newAltura)){
        alert("La altura ingresada debe ser un valor valido")
    }else if (newDatosPasw==0 || newDatosPasw==1 || newDatosPasw == 2){
        alert ("La contraseña ingresada esta vacia")
    }
    
    else if (contrasena == "KevinAlejandro_2524") {
        alert("Se han actualizado sus datos de usuario")
        document.getElementById("nombreUser").innerHTML = newNombre;

        document.getElementById("añoEsta").innerHTML = newAno;

        document.getElementById("alturaUser").innerHTML = newAltura;
        
        limpiar()
    }
    else {
        alert("La contraseña no ingresada no coincide, por favor intentelo nuevamente")
    }
   }

var actButon = function (){
    var boton = document.getElementById("verMas")
    var remplazar= "Ocultar";
    var mostrar= "Ver más"
    if(boton.innerHTML.trim()===mostrar){
        boton.innerHTML=remplazar
    } else{
        boton.innerHTML=mostrar
    }
}

var limpiar= function(){
    document.getElementById("ActualizacionNombre").value = "";
    document.getElementById("ActualizacionAno").value = "";
    document.getElementById("ActualizacionAltura").value = "";
    document.getElementById("exampleInputPassword1").value = "";
}