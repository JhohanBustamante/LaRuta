<?php
include '../conexion_base_datos/conexion.php';

// Obtener datos del formulario
$nombre_usuario = $_POST['nombre_usuario'];
$nombre_2_usuario = $_POST['nombre_2_usuario'];
$correo_usuario = $_POST['correo_usuario'];
$apellido_usuario = $_POST['apellido_usuario'];
$apellido_2_usuario = $_POST['apellido_2_usuario'];
$apodo_usuario = $_POST['apodo_usuario'];
$sexo_usuario = $_POST['sexo'];
$nacimiento_usuario = $_POST['fecha_nacimiento'];
$contrasena_usuario = $_POST['contrasena_usuario'];

// Insertar en la base de datos
$sql = "INSERT INTO usuario (nombre, correo, apellido, apodo, sexo, nacimiento, contrasena, nombre_2,apellido_2) 
        VALUES ('$nombre_usuario', '$correo_usuario', '$apellido_usuario', '$apodo_usuario', '$sexo_usuario', '$nacimiento_usuario',
       '$contrasena_usuario','$nombre_2_usuario','$apellido_2_usuario')";

if ($mysqli->query($sql) === TRUE) {  
    header("Location:/proyecto/registrolaruta/confirmacion_registro.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}

// Cerrar conexión
$mysqli->close();
?>