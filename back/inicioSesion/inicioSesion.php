<?php

include '../conexion/conexion.php';

$entrada_usuario = $_POST['entrada_usuario'];
$contrasena_usuario = $_POST['contrasena_usuario'];

$sql = "SELECT * FROM usuario 
        WHERE (apodo = ? OR correo = ?) 
        AND contrasena = ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("sss", $entrada_usuario, $entrada_usuario, $contrasena_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {  
    $url = "http://localhost/Proyecto/Front/blog/blog.html";
    echo "<script>window.location.href = '$url';</script>";
    exit();
} else {
    $url = "http://localhost/Proyecto/front/inicioSesion/errorInicio.html"; 
    echo "<script>window.location.href = '$url';</script>";
    exit();
}

$stmt->close();
$mysqli->close();

?>
