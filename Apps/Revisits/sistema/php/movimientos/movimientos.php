<?php
  function registrarMovimiento($id_usuario,$id_modulo,$detalles,$conn){
    $sql = "INSERT INTO `movimientos`(`id_usuario`,`id_modulo`,`detallas`)
    VALUES (?,?,?) ";
    $result = $conn->prepare($sql);
    if ($result->execute([$id_usuario,$id_modulo,$detalles])) {
  							   //return 1;
  						} else {
  				  			 return 0;
  						}
  }
?>
