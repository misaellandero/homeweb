<?php
 $conn = require_once '../conexion.php';


  $titulo = trim($_POST['titulo_abtUs']);
  $texto = trim($_POST['texto_abtUs']); 

  try
  {
   $sql = " SELECT * FROM `sobre_nosotros` WHERE `titulo` = ?";
   $result = $conn->prepare($sql) or die ($sql);
    $result->execute([$titulo]);

    if ($result->rowCount() > 0) {
        echo "$titulo ya existe"; // wrong details
      } else {

          $sql = "INSERT INTO `sobre_nosotros`(`titulo`, `texto`) VALUES (?,?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$titulo,$texto])) {
          		echo "$titulo resgistrado con exito";
          	}else{
          		echo "Error $titulo no se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
