<?php
 $conn = require_once '../conexion.php';


  $tipoCampo = trim($_POST['tipoCampo']);
  $nombreCampo = trim($_POST['nombreCampo']);
  $unidadCampo = trim($_POST['unidadCampo']);

  try
  {
   $sql = " SELECT * FROM `campos` WHERE `nombre` = ?";
   $result = $conn->prepare($sql) or die ($sql);
   $result->execute([$nombreCampo]);

    if ($result->rowCount() > 0) { 
        echo "$nombreCampo ya existe" ; // wrong details
      } else {

          $sql = "INSERT INTO `campos`(`nombre`, `tipo`, `id_unidad`,`fijo`) VALUES (?,?,?,0) ";
          $result = $conn->prepare($sql); 
          	if ($result->execute([$nombreCampo,$tipoCampo,$unidadCampo])) {
          		echo "$nombreCampo resgistrado con exito";
          	}else{
          		echo "Error $nombreCampo no se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
