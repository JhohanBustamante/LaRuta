<?php
// Configurar las cabeceras para JSON
header("Content-Type: application/json");
// Leer el archivo JSON
$json = file_get_contents("datos.json");
// Devolver la respuesta
echo $json;
?>