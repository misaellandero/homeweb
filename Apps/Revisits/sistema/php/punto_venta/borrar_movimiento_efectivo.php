<?php
session_start();
$conn = require_once '../conexion.php';
$id_usuario = $_SESSION['id_session'];
include '../users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
$id_admin = $id_usuario;
$permisos = PermisosSistema($id_perfil,$conn); 

  $id = trim($_POST['id']);
  
  var_dump($permisos[16]["permiso"]);

  if ($permisos[16]["permiso"] != 1) {
        echo "No tienes permisos para realizar movimientos de efectivo";
        die();
      }

  try
  {
          $sql = "DELETE FROM `efectivo_caja` WHERE `id` = (?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$id])) {
          		echo "Eliminada con exito";
          	}else{
          		echo "Error no se pudo eliminar";
          	}

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
