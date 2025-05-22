<?php
    header('Content-Type: application/json'); //cabeceras para que el navegador sepa que es un archivo json

    $json = file_get_contents('datos.json'); //lee el archivo json
    
    echo $json;                               //muestra el archivo json
?>
