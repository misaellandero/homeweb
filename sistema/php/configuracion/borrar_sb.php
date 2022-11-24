<?php
session_start();
$id_usuario = $_SESSION['id_session'];
 $conn = require_once '../conexion.php';

  $id = trim($_POST['id']);

  try
  {
           
             $sql = "DELETE FROM `sobre_nosotros` WHERE `id` = (?) ";
            $result = $conn->prepare($sql);
             if ($result->execute([$id])) {
                    echo "Apartado Eliminado";  
                  } else{
                    echo "No se puedo eliminar";
                  }
 

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }

  
?>
