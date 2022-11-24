<?php
header('Content-Type: application/json');
$conn = require_once '../conexion.php'; 
$id_cliente = ($_POST['id_usuario']); 

if ($id_cliente == "mismo_login") {
  session_start();
  $id_cliente = $_SESSION['id_session'];
}

$id_pedido = ($_POST['id_pedido']);

include '../configuracion/cargar_datos_empresa.php';
include '../inventarios/consulta_precio_e_impuestos.php';
include '../pago/calcular_comision_paypal.php';
$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn); 
$comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
$comisionPorciento = $datosTienda[0]['paypal_com_tarjeta']; 

try {  

  if ($id_pedido > 0) {
    $sql = " SELECT * FROM `movimientos_pedidos`  WHERE `id` = ? ";
    $id_cliente = $id_pedido;
  } else {
    $sql = " SELECT * FROM `movimientos_pedidos`  WHERE `id_cliente` = ?  AND `status` BETWEEN 2 AND 3";
  }
    
       $result = $conn->prepare($sql) or die ($sql);

    if ($result->execute([$id_cliente])) {
        $row = array();

          $row = $result->fetch(); 
 

          $row['success'] = true;

        echo json_encode($row);
    }
} catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
}


                	 
?>
