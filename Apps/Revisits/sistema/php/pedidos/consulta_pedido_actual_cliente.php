<?php
header('Content-Type: application/json');
$conn = require_once '../conexion.php'; 
session_start();
$id_cliente = $_SESSION['id_session'];

include '../configuracion/cargar_datos_empresa.php';
include '../inventarios/consulta_precio_e_impuestos.php';
include '../pago/calcular_comision_paypal.php';
$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn); 
$comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
$comisionPorciento = $datosTienda[0]['paypal_com_tarjeta']; 
$filtro = ($_POST['filtro']); 
try {  

  if ($filtro == "Actual") {

    $sql = " SELECT  * , 
    (SELECT `nombre`  FROM `usuarios_usuarios` WHERE `id` = `id_cliente`) as nombre_cliente,
    (SELECT `costo_total`  FROM `movimientos_inventario` WHERE `id` = `id_movimiento`) as costo_total   
    FROM `movimientos_pedidos`  WHERE  `status` == 2  AND `id_cliente` = ?";
   

    $result = $conn->prepare($sql) or die ($sql);

    if ($result->execute([$id_cliente ])) {

        $json = array();
        while ($row = $result->fetch()) { 
        
          $status =  [
					0 => "Sin pedidos",
					1 => "En espera de costos de envio",
					2 => "En espera de pago",
          3 => "Pedido pagado, envio pendiente.",
          4 => "Pedido pagado, numero de guia enviado.",
          5 => "Cancelado"
				];

          $pedido = $row['status'];

          $total = $row['costo_total'] + $row['costo_envio'];
         
					$json[] = array(
            'id' => $row['id'],
						'nombre' => $row['nombre_cliente'],    
						'total' => $total, 
						'status' => $pedido,
            'pedido' => $status[$pedido], 
            'costo_envio' => $row['costo_envio'],
            'numero_guia' => $row['numero_guia'],
            'id_cliente' => $row['id_cliente']
					);
				} 

          $json ['success'] = true; 

        echo json_encode($json);
    }
   
  } else {
    $sql = " SELECT * , 
    (SELECT `nombre`  FROM `usuarios_usuarios` WHERE `id` = `id_cliente`) as nombre_cliente,
    (SELECT `costo_total`  FROM `movimientos_inventario` WHERE `id` = `id_movimiento`) as costo_total
    FROM `movimientos_pedidos`   WHERE `id_cliente` = ?  AND `status` > 2 ";

    $result = $conn->prepare($sql) or die ($sql);

    if ($result->execute([$id_cliente])) {
      $json = array();
      while ($row = $result->fetch()) { 
      
          $status =  [
          0 => "Sin pedidos",
          1 => "En espera de costos de envio",
          2 => "En espera de pago",
          3 => "Pedido pagado, envio pendiente.",
          4 => "Pedido pagado, numero de guia enviado.",
          5 => "Cancelado"
        ];

         
        $pedido = $row['status'];
        $total = $row['costo_total'];
        $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
        $row['costo_paypal'] =  $totalpaypal;

        $total = $row['costo_envio'];
        $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
        $row['costo_envio_paypal'] =  $totalpaypal;

        $json[] = array(
          'id' => $row['id'],
          'nombre' => $row['nombre_cliente'],    
          'total' => $row['costo_paypal'], 
          'status' => $pedido,
          'pedido' => $status[$pedido], 
          'costo_envio' => $row['costo_envio_paypal'],
          'numero_guia' => $row['numero_guia'],
          'id_cliente' => $row['id_cliente']
        );
        } 

          $json ['success'] = true; 

        echo json_encode($json);
    }
    }
   
} catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
}


                	 
?>
