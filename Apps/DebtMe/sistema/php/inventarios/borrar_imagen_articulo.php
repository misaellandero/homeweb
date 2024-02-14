<?php
session_start();
$id_usuario = $_SESSION['id_session'];
 $conn = require_once '../conexion.php';

  $id = trim($_POST['id']);

  try
  {
          $buscar_archvio = "SELECT `img` FROM  `articulos_imagenes` WHERE `id` = (?) ";
          $result = $conn->prepare($buscar_archvio);
          if ($result->execute([$id])) { 
            $row = $result->fetch();
            unlink('../../images/fotos_articulos/'.$row['img']);
            $sql = "DELETE FROM `articulos_imagenes` WHERE `id` = (?) ";
            $result = $conn->prepare($sql);
             if ($result->execute([$id])) {
                    echo "Imagen eliminada con exito";  
                  }

          } else{
            echo "Error no se pudo eliminar";
          } 
          

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }

  
?>
