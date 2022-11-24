<?php
include 'calcular_comision_paypal.php';
$conn = require_once '../conexion.php';
$cantidad  = ($_POST['cantidad']);
include  '../configuracion/cargar_datos_empresa.php';
 $datosTienda = cargarDatosTienda($conn);
 $comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
 $comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];

$resultado =  calcularPrecioConComision($cantidad,$comisionFijaPayPal,$comisionPorciento,$conn);

echo round($cantidad,2);

?>