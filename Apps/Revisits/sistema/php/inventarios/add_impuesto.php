<?php 
 $conn = require_once '../conexion.php';


  $IVA = trim($_POST['IVA']);
  $IEPS = trim($_POST['IEPS']);
  $ISR = trim($_POST['ISR']);

  try
  {
   $sql = " SELECT * FROM `impuestos` WHERE `IVA` = ? AND `IEPS` = ? AND `ISR` = ?";
   $result = $conn->prepare($sql) or die ($sql); 
    $result->execute([$etiqueta]);

    if ($result->rowCount() > 0) {
        echo "Este impesto ya existe"; // wrong details
      } else { 
       
          $sql = "INSERT INTO `impuestos` (`IVA`,`IEPS`,`ISR`) VALUES (?,?,?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$IVA,$IEPS,$ISR])) {
          		echo "Se añadio el impuesto con exito";
          	}else{
          		echo "Error No se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>