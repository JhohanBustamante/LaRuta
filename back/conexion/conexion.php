<?php 
    /* Se realiza la conexión a la base de datos*/
    $username = "normal"; 
    $password = "Colombia2025+..."; 
    $database = "laruta"; 
    $mysqli = new mysqli("127.0.0.1", $username, $password, $database); 
    
    // En conexion.php o archivo de configuración global
    register_shutdown_function(function () {
        $error = error_get_last();
        if ($error && $error['type'] === E_ERROR) {
            header("Location: /proyecto/back/conexion/500.php");
            exit;
        }
});

?>