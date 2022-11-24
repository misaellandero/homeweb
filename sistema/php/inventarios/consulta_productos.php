<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';


			$sql = " SELECT * FROM `productos`";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {
					$id = $row['id'];
					$consultar_existencia_articulos = "SELECT `id` FROM `articulos` WHERE `id_producto` = $id";
					$result2 = $conn->prepare($consultar_existencia_articulos) or die ($consultar_existencia_articulos);
					if (!$result2->execute()) return false;

					$articulos_por_producto = $result2->rowCount();

					$json[] = array(
						'id' => $id,
						'nombre' => $row['nombre'],
						'id_unidad' => $row['id_unidad'],
						'compuesto' => $row['compuesto'],
						'nombre_elemento' => $row['nombre_elemento'],
						'articulos_por_producto' => $articulos_por_producto
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
