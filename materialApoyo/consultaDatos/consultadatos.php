<html> 
    <body>
    <?php 
    
    /* Se realiza la conexión a la base de datos*/
include '../conexion_base_datos/conexion.php';

$nick_user1 = $_POST['nick'] ?? NULL; 

/* Query para extraer nombre de usuario y contraseña de la base de datos */
$query = "SELECT apodo_usuario,contraseña_usuario,nombre_usuario FROM usuario
WHERE apodo_usuario LIKE '$nick_user1'";   

/* En esta tabla, se imprime el resultado de la consulta */
echo '<center><table border="0" cellspacing="2" cellpadding="2" align="center">       
    <tr>           <td> <font face="Arial">Apodo de usuario</font> </td>           
    <td> <font face="Arial">Contraseña</font> </td>  
    <td> <font face="Arial">Nombre del usuario</font> </td>            
    </tr></center>'; 

if ($result = $mysqli->query($query)) {     
    while ($row = $result->fetch_assoc()) {         
        $field1name = $row["apodo_usuario"];
        $field2name = $row["contraseña_usuario"];
        $field3name = $row["nombre_usuario"];
        echo '<tr>                   
        <td>'.$field1name.'</td>                   
        <td>'.$field2name.'</td>
        <td>'.$field3name.'</td>  </tr>';
    }     
     $result->free(); 
} 
     ?>
     </body> 
     </html>