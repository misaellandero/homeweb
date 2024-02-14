<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id_articulo = trim($_POST['id_articulo']);

			$sql = " SELECT * FROM `articulos`  WHERE `id` = ? ";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id_articulo])) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'existencia' => $row['existencia'],
						'precio' => $row['precio'],
						'id_impuesto' => $row['id_impuesto'],
						'codigoBarras' => $row['codigoBarras'],
						'disponibilidad_articulo' => $row['disponibilidad_articulo'],
						'sku' => $row['sku'],
						'sucursal' => $row['sucursal'],
						'des_corta' => $row['des_corta'],
						'des_larga' => $row['des_larga'],
						'destacado' => $row['destacado'],
						'detalles' => $row['des_larga'],
						'costo' => $row['costo']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
