<?php
header('Content-Type: application/json');

$conn = require_once '../conexion.php';
include '../users/permisos_perfil.php';
include '../configuracion/cargar_datos_empresa.php';
$datosTienda = cargarDatosTienda($conn);
$comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
$comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];

$id_usuario = ($_POST['id_usuario']);

$datosUsuario = datosUsuario($id_usuario,$conn);
$direccionesEnvio = DirUsuario($id_usuario,$conn);
 
                $datosUsuario['success'] = true; 
                $datosUsuario['direccion'] = $direccionesEnvio[0];
                echo json_encode($datosUsuario); 
                
	 

?>
