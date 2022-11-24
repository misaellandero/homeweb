<?php
header('Content-Type: application/json');
include 'permisos_perfil.php';

session_start(); 

$id_usuario = ($_POST['id']);
$conn = require_once '../conexion.php';
 

if ($id_usuario == "mismo_login") {

    $id_usuario = $_SESSION['id_session'];
}
 
$direccionesEnvio = DirUsuario($id_usuario,$conn);


echo json_encode($direccionesEnvio);


?>

 