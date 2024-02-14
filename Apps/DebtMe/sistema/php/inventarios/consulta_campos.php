<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';


			$sql = " SELECT *,(SELECT `etiqueta` FROM  `unidades` WHERE `id` = `id_unidad`) as 'unidad'  FROM `campos` WHERE `fijo` = 0";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {

					$tiposDatos = [
						 0 => "Texto",
						 1 => "Numero",
						 2 => "Checkbox",
						 3 => "Listado",
						 4 => "Ingrediente extra",
					];

					$tipo = $row['tipo'];
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'tipo' => $tiposDatos[$tipo],
						'datos' => $tipo,
						'unidad' => $row['unidad']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
