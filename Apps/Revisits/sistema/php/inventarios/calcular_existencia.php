<?php

function consultaExistencias($id_articulo,$conn){

  //status 1 significa apartado
  $consulta_apartados = "SELECT `cantidad` FROM `movimientos_articulos` WHERE `id_articulo` = ? AND `status` = 1";
  $result = $conn->prepare($consulta_apartados) or die ($consulta_apartados);

  $apartados = 0;
  $existencia = 0;
  
  if ($result->execute([$id_articulo])) { 
    while ($row = $result->fetch()) {

      $apartados = $apartados + $row['cantidad'];

    }
  }

  $consulta_existencia = "SELECT `existencia` FROM `articulos` WHERE `id` = ? ";
  $result2 = $conn->prepare($consulta_existencia) or die ($consulta_existencia);

  if ($result2->execute([$id_articulo])) {
    while ($row2 = $result2->fetch()) { 
      $existencia = $row2['existencia'];
    }
  } 
    return ($existencia - $apartados);

}

function consultarEsDivisible($id_articulo,$conn){

  //status 1 significa apartado
  $consulta_unidad = " SELECT `id_producto`, (SELECT `id_unidad` FROM `productos` WHERE `id` = `id_producto` ) as `id_unidad`, (SELECT `divisible` FROM `unidades` WHERE `id` = `id_unidad` ) as `divisible` FROM `articulos` WHERE `id` = ?";
  $result = $conn->prepare($consulta_unidad) or die ($consulta_unidad);

  $divisible = 0; 
  
  if ($result->execute([$id_articulo])) { 
    while ($row = $result->fetch()) {

      $divisible = $row['divisible'];

    }
  }
  
    return ($divisible);

}
?>
