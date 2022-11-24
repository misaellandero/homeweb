<?php
session_start();
$id_usuario = $_SESSION['id_session'];
 $conn = require_once '../conexion.php';

  $id = trim($_POST['id']);

  try
  {
          $sql = "DELETE FROM `articulos` WHERE `id` = (?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$id])) {
              $sql = "DELETE FROM `articulos_campos` WHERE `id_articulo` = (?) ";
              $result = $conn->prepare($sql);

              	if ($result->execute([$id])) {
              		echo "Eliminado con exito"; 
                  include '../movimientos/movimientos.php';
                  $id_modulo = 6;
                  $detalles = 'Se elimino el articuloo con el id; '.$id;
                  registrarMovimiento($id_usuario,$id_modulo,$detalles,$conn);
              	}
          	}else{
          		echo "Error no se pudo eliminar";
          	}

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
