<?php 
 $conn = require_once '../conexion.php';


  $etiqueta = trim($_POST['valor']);
  $unit_key = trim($_POST['unit_key']);

  try
  {
   $sql = " SELECT * FROM `unidades` WHERE `etiqueta` = ?";
   $result = $conn->prepare($sql) or die ($sql); 
    $result->execute([$etiqueta]);

    if ($result->rowCount() > 0) {
        echo "$etiqueta ya existe"; // wrong details
      } else { 
       
          $sql = "INSERT INTO `unidades` (`etiqueta`,`unit_key`) VALUES (?,?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$etiqueta,$unit_key])) {
          		echo "$etiqueta resgistrado con exito";
          	}else{
          		echo "Error $etiqueta no se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>