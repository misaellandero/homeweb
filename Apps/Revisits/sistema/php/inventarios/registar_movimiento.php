<?php
 $conn = require_once '../conexion.php';
 session_start();
 $id_usuario = $_SESSION['id_session'];
 include 'funciones_movimiento.php';

 $tipos_movimiento = ($_POST['tipos_movimiento']);
 $concepto_movimiento = ($_POST['concepto_movimiento']);
 $comentarios_movimiento = ($_POST['comentarios_movimiento']);
 $referencia_bancaria = "No Aplica";

if ($tipos_movimiento == 0) {
  $id_articulo = ($_POST['id_articulo']);
  $costo_articulo = ($_POST['costo_articulo']);
  $cantidad_articulo = ($_POST['cantidad_articulo']);
  $datos_extas = ($_POST['datos_extas']);
  $id_datos_extras = ($_POST['id_datos_extras']);
  $compuesto_articulo = ($_POST['compuesto_articulo']);
  
}


 if ($concepto_movimiento  == 6) {
   $referencia_bancaria = ($_POST['referencia_bancaria']);
 } 
 $total = ($_POST['total']); 
  $movimiento = registrarMovimiento($id_usuario,$tipos_movimiento,$concepto_movimiento,$comentarios_movimiento,$total,$conn,$referencia_bancaria,$_POST);
 echo $movimiento; 

?>
 