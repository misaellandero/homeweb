<?php
 $conn = require_once '../conexion.php';
 
  $texto = trim($_POST['texto_pq_comprar']); 

  try
  {
   $sql = " SELECT * FROM `porque_comprar` WHERE `html` = ?";
   $result = $conn->prepare($sql) or die ($sql);
    $result->execute([$texto]);

    if ($result->rowCount() > 0) {
        echo "$texto ya existe"; // wrong details
      } else {

          $sql = "INSERT INTO `porque_comprar`(`html`) VALUES (?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$texto])) {
          		echo "Resgistrado con exito";
          	}else{
          		echo "Error No se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
