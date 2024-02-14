<?php 
 $conn = require_once '../conexion.php';

  $nombre = trim($_POST['nombreProducto']);
  $unidad = trim($_POST['unidadProducto']);
  $productoCompuesto = trim($_POST['producto_compuesto']  ?? '');
  $nombreElemento = trim($_POST['nombre_elementos_producto']  ?? '');

  if ($nombre == "") {
    echo "Indica un nombre para registrar tu producto";
  } else {
       try
  {
   $sql = " SELECT * FROM `productos` WHERE `nombre` = ?";
   $result = $conn->prepare($sql) or die ($sql); 
    $result->execute([$nombre]);

    if ($result->rowCount() > 0) {
        echo "$nombre ya existe, elige otro nombre"; // wrong details
      } else { 
       
          $sql = "INSERT INTO `productos` (`nombre`, `id_unidad`, `compuesto`, `nombre_elemento`) VALUES (?,?,?,?) ";
          $result = $conn->prepare($sql);

            if ($result->execute([$nombre,$unidad,$productoCompuesto,$nombreElemento])) {
              echo "$nombre registrado con exito";
            }else{
              echo "Error $nombre no se registro";
            }

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }

  }
?>