<?php 
 $conn = require_once '../conexion.php';

  $id = trim($_POST['idProdcuto']);
  $nombre = trim($_POST['nombreProducto']);
  $unidad = trim($_POST['unidadProducto']);
  $productoCompuesto = trim($_POST['producto_compuesto']);
  $nombreElemento = trim($_POST['nombre_elementos_producto']);

 
  if ($nombre == "") {
    echo "Indica un nombre para registrar tu producto";
  } else {
       try
  {
   
    if ($productoCompuesto == "") {
      $productoCompuesto = 0;
    }  


    if ($nombreElemento == null) {
      $nombreElemento = 'No aplica';
    }   
          $sql = " UPDATE `productos` SET  
          `nombre`=?,
          `id_unidad`=?,
          `compuesto`=?,
          `nombre_elemento`=? 
          WHERE `id` = ?";

          $result = $conn->prepare($sql);

            if ($result->execute([$nombre,$unidad,$productoCompuesto,$nombreElemento,$id])) {
            
              echo "$nombre Actualizado con exito";
            }else{
              echo "Error $nombre no se actualizo";
            }

       

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }

  }
?>