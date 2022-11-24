<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$idProdcuto = trim($_POST['id']);

			$sql = "SELECT *,
		 	(SELECT `compuesto` FROM `productos` WHERE `id` = '$idProdcuto') as 'compuesto',
		 	(SELECT `nombre` FROM `campos` WHERE `id` = `id_campo`) as 'nombre',
			(SELECT `id_unidad` FROM `campos` WHERE `id` = `id_campo`) as 'id_unidad',
			(SELECT `etiqueta` FROM  `unidades` WHERE `id` = `id_unidad`) as 'unidad',
			(SELECT `tipo` FROM `campos` WHERE `id` = `id_campo`) as 'tipo'
			FROM `productos_campos` WHERE `id_producto` = '$idProdcuto' ";
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
					];
					if ($row['elemento'] == 1) {
						$elemento = "Campo de elemento";
					} else {
						$elemento = "Campo de producto";
					}

					$tipo = $row['tipo'];
					$json[] = array(
						'id' => $row['id'],
						'id_campo' => $row['id_campo'],
						'nombre' => $row['nombre'],
						'tipo' => $tiposDatos[$tipo],
						'datos' => $tipo,
						'elemento' => $elemento,
						'compuesto' => $row['compuesto'],
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
