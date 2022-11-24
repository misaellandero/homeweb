<?php
 $conn = require_once '../conexion.php';


  $etiqueta = trim($_POST['valor']);
  $id_campo = trim($_POST['id']);

  try
  {
   $sql = " SELECT * FROM `productos_campos_predefinidos` WHERE `predeterminado` = ? AND `id_campo` = ? ";
   $result = $conn->prepare($sql) or die ($sql);
    $result->execute([$etiqueta,$id_campo]);

    if ($result->rowCount() > 0) {
        echo "$etiqueta ya existe"; // wrong details
      } else {

          $sql = "INSERT INTO `productos_campos_predefinidos` (`predeterminado`,`id_campo`) VALUES (?,?) ";
          $result = $conn->prepare($sql);

          	if ($result->execute([$etiqueta,$id_campo])) {
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
