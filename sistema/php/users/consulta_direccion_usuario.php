<?php
header('Content-Type: application/json');
include 'permisos_perfil.php';


$id_usuario = ($_POST['id']);
$conn = require_once '../conexion.php';

$direccionesEnvio = DirUsuario($id_usuario,$conn);

echo json_encode($direccionesEnvio);


?>

 