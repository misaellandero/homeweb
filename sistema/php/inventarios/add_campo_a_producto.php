<?php
 $conn = require_once '../conexion.php';


  $idCampo = trim($_POST['idCampo']);
  $idProdcuto = trim($_POST['idProdcuto']);


  try
  {
   $sql = " SELECT * FROM `productos_campos` WHERE `id_campo` = ? AND `elemento` = 0 AND `id_producto` = ?";
   $result = $conn->prepare($sql) or die ($sql);
    $result->execute([$idCampo,$idProdcuto]);

    if ($result->rowCount() > 0) {
        echo "Ya ha asigando este campo a este producto anteriormente"; // wrong details
      } else {

          $sql = "INSERT INTO `productos_campos`(`id_campo`, `id_producto` ,`elemento`) VALUES (?,?,0) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$idCampo,$idProdcuto])) {
          		echo "Añadido con exito";
          	}else{
          		echo "Error no se registro";
          	}

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
