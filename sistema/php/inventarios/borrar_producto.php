<?php
 $conn = require_once '../conexion.php';

  $id = trim($_POST['id']);

  try
  {
          $sql = "DELETE FROM `productos` WHERE `id` = (?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$id])) {
              $sql = "DELETE FROM `productos_campos` WHERE `id_producto` = (?) ";
              $result = $conn->prepare($sql);

              	if ($result->execute([$id])) {
              		echo "Eliminado con exito";
              	}
          	}else{
          		echo "Error no se pudo eliminar";
          	}

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
