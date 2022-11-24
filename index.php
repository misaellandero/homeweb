<?php
 

$conn = require_once 'sistema/php/conexion.php';

include 'sistema/php/configuracion/cargar_datos_empresa.php';
$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn); 


$index  = $datosTienda[0]['index'];
 
 	 include $index ;
 
?>
