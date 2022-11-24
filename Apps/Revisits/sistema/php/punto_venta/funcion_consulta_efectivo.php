<?php
 
function consultaMovimientosEfectivo($periodo_de_tiempo,$id_cajero,$conn)
{
	
	$total_a_sumar = 0;
				$sql = " SELECT *, 
				(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_cajero`) as nombre_cajero,
				(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_admin`) as nombre_admin,
				(SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento
				FROM `efectivo_caja` WHERE `id_cajero` = $id_cajero $periodo_de_tiempo ";
				
	  $result = $conn->prepare($sql) or die ($sql);
	   if (!$result->execute()) return false;

	  if ($result->rowCount() > 0) { 
		  $json = array();

		  while ($row = $result->fetch()) { 
			  $tipo = $row['tipo']; 
			  
			  

			  if ($tipo == 2) {
			  $total_a_sumar = $total_a_sumar - $row['cantidad'];
			  $tipo_movimiento = "Salida de efectivo";
			  }else{
				$total_a_sumar = $total_a_sumar + $row['cantidad'];
			  $tipo_movimiento = "Entrada de efectivo";
			  }
			  
			  $json[] = array(
				  'id' => $row['id'],
				  'tipo' => $tipo_movimiento,
				  'concepto' => $row['concepto_movimiento'],
				  'cantidad' => $row['cantidad'], 
				  'nombre_cajero' => $row['nombre_cajero'], 
				  'nombre_admin' => $row['nombre_admin'], 
				  'fecha' => $row['fecha']
			  );
				
		  }
		  $json['total'] = $total_a_sumar ;
		  return $json;
	  }
}			

function consultaVentas($periodo_de_tiempo,$id_usuario,$conn)
{
	
	$total_a_sumar = 0;
	$sql = " SELECT *, 
	(SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
	(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
	FROM `movimientos_inventario` WHERE `id_usuario` = $id_usuario AND `concepto` IN (4,6) $periodo_de_tiempo  ORDER BY fecha DESC";
				
	  $result = $conn->prepare($sql) or die ($sql);
	   if (!$result->execute()) return false;

	  if ($result->rowCount() > 0) { 
		  $json = array();

		  while ($row = $result->fetch()) { 
			$tipo = $row['tipo']; 
			$total = 0 + $row['costo_total'];
			$json[] = array(
				'id' => $row['id'],
				'tipo' => $tipo,
				'concepto' => $row['concepto_movimiento'],
				'costo_total' => $total,
				'usuario' => $row['usuario_movimiento'],
				'detalles' => $row['detalles'],
				'fecha' => $row['fecha']
			);
				
		  } 
		  return $json;
	  }
}			
 
?>
