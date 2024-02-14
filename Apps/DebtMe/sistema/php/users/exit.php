<?php

$conn = require_once '../connexion.php';

  $id_usuario = ($_GET['id_usuario']);
  $sql1 =  "UPDATE `usuarios` SET `sesion` = '0' WHERE `usuarios`.`id` =   $id_usuario ";
  $result = $conn->prepare($sql1) or die ($sql1);
if ($result->execute()) {
echo 1;
}

?>
