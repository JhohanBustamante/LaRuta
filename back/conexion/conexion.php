<?php 
    /* Se realiza la conexión a la base de datos*/
    $username = "root"; 
    $password = "Colombia2025+..."; 
    $database = "laruta"; 
    $mysqli = new mysqli("127.0.0.1", $username, $password, $database); 
    
    set_exception_handler(function($e) {
        header("Location: /500.php");
        exit;
        });
?>