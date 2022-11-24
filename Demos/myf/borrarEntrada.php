<?php 
 $conn = require_once 'conexion.php';

  $id = trim($_POST['code']);

  try
  {
          $buscar_archvio = "SELECT `image` FROM  `entrada` WHERE `code` = (?) ";
          $result = $conn->prepare($buscar_archvio);
          if ($result->execute([$id])) { 
            $row = $result->fetch();
            unlink('img/'.$row['image']);
            $sql = "DELETE FROM `entrada` WHERE `code` = (?) ";
            $result = $conn->prepare($sql);
             if ($result->execute([$id])) {
                    echo "Entrada eliminada con exito";  
                  } 
          } else{
            echo "Error no se pudo eliminar";
          } 
          

          }


  catch(PDOException $e){
   echo $e->getMessage();
  }

  
?>
