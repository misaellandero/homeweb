<?php
header('Content-Type: application/json');
$conn = require_once '../conexion.php';
include '../inventarios/funciones_articulo.php';

$idProdcuto = trim($_POST['id'] ?? "todos");

$articulos = consultaArticulos($conn,$idProdcuto); 
echo json_encode($articulos); 
?>
