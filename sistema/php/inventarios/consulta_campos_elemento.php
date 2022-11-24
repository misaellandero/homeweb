<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$idProdcuto = trim($_POST['id']);
			if ($idProdcuto == "todos" ) {
				$sql = " SELECT *,(SELECT `id_unidad` FROM `productos` WHERE `id` = `id_producto`) as 'id_unidad',(SELECT `nombre` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_producto',(SELECT `etiqueta` FROM `unidades` WHERE `id` = `id_unidad`) as 'unidad' FROM `articulos` WHERE `id_padre`=0";

			} else {
				$sql = " SELECT *,(SELECT `id_unidad` FROM `productos` WHERE `id` = `id_producto`) as 'id_unidad',(SELECT `nombre` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_producto',(SELECT `etiqueta` FROM `unidades` WHERE `id` = `id_unidad`) as 'unidad' FROM `articulos` WHERE `id_producto` = '$idProdcuto' AND `id_padre`=0";

			}


			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'nombre_producto' => $row['nombre_producto'],
						'id_producto' => $row['id_producto'],
						'id_unidad' => $row['id_unidad'],
						'unidad' => $row['unidad'],
						'compuesto' => $row['compuesto'],
						'costo' => $row['costo'],
						'existencia' => $row['existencia']
					);
				}

				$json['success'] = true; 

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
