<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php'; 
			
			$id = trim($_GET['id']);

			$sql = " SELECT *, 
					 (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
					 (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
					 FROM `movimientos_inventario` WHERE `id` = $id ";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) { 
				$json = array();

				while ($row = $result->fetch()) { 
					$tipo = $row['tipo']; 
					$json[] = array(
						'id' => $row['id'],
						'tipo' => $tipo,
						'concepto' => $row['concepto_movimiento'],
						'costo_total' => $row['costo_total'],
						'usuario' => $row['usuario_movimiento'],
						'detalles' => $row['detalles'],
						'fecha' => $row['fecha'],
						'total' => $row['costo_total'],
					);
					  
				}
				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
