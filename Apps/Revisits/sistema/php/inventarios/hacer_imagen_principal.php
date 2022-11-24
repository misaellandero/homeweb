<?php
 session_start();
 $id_usuario = $_SESSION['id_session'];
 $conn = require_once '../conexion.php';

  $id_imagen = trim($_POST['id_imagen']);
  $id_articulo = trim($_POST['id_articulo']);

  try
  { 
          
            $sql = "UPDATE `articulos` SET `id_main_pic` = (?) WHERE `id` = (?)";
            $result = $conn->prepare($sql);
             if ($result->execute([$id_imagen,$id_articulo])) {
                    echo "Imagen configurada con exito";  
                  }

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
