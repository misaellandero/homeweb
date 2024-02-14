<?php 
 $conn = require_once '../conexion.php';

  $id = trim($_POST['id']);

  try
  {
          $sql = "DELETE FROM `unidades` WHERE `id` = (?) ";
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