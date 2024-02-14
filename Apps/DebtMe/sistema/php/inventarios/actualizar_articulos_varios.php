<?php
  $conn = require_once '../conexion.php';
  include '../inventarios/funciones_articulo.php';
	
  actualizarVarios($conn,$_POST); 
?>
