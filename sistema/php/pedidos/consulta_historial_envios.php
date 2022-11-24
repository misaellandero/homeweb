<?php
header('Content-Type: application/json');
$conn = require_once '../conexion.php'; 

$id_cliente = ($_POST['filtro']);

try {  

  if ($id_cliente == "Todos") {

    $sql = " SELECT  * , 
    (SELECT `nombre`  FROM `usuarios_usuarios` WHERE `id` = `id_cliente`) as nombre_cliente,
    (SELECT `costo_total`  FROM `movimientos_inventario` WHERE `id` = `id_movimiento`) as costo_total   
    FROM `movimientos_pedidos`  WHERE  `status`  > 3 ";
   

    $result = $conn->prepare($sql) or die ($sql);

    if ($result->execute()) {

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

					$json[] = array(
            'id' => $row['id'],
						'nombre' => $row['nombre_cliente'],    
						'total' => $row['costo_total'], 
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
    WHERE `id_cliente` = ?  AND `status` > 3 ";

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

          $json[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre_cliente'],    
            'total' => $row['costo_total'], 
            'status' => $pedido,
            'pedido' => $status[$pedido], 
            'numero_guia' => $row['numero_guia'],
            'costo_envio' => $row['costo_envio'],
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
