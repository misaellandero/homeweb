<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id_combo = trim($_POST['id']); 
			$sql = " SELECT *,
			(SELECT `nombre` FROM `articulos` WHERE `id` = `id_articulo`) as nombre, 
			(SELECT `id_padre` FROM `articulos` WHERE `id` = `id_articulo`) as id_padre 
			 FROM `articulos_combo` WHERE `id_combo` = ? ";

   			$result = $conn->prepare($sql) or die ($sql);
 
			if ($result->execute([$id_combo])) {
				$nombre = "";
				$json = array();
				while ($row = $result->fetch()) {
				$id_padre = $row['id_padre']; 
				$nombre = $row['nombre'];
					if ($id_padre > 0) { 
						$consulta_mombre_padre = "SELECT `nombre`,(SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as nombre_elemento FROM `articulos` WHERE `id` = ?";
						$result2 = $conn->prepare($consulta_mombre_padre) or die ($consulta_mombre_padre);
						if ($result2->execute([$id_padre])) {
							$row2 = $result2->fetch(); 
							$nombre = $row2['nombre'].' '.$row2['nombre_elemento'];
						}
					}
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $nombre, 
						'id_articulo' => $row['id_articulo'],
						'id_combo' => $row['id_combo'],
						'cantidad' => $row['cantidad']

					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>