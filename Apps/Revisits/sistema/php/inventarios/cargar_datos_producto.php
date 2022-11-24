<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id = trim($_POST['id']);

			$sql = " SELECT * FROM `productos`  WHERE `id` = ?";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id])) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'id_unidad' => $row['id_unidad'],
						'compuesto' => $row['compuesto'],
						'nombre_elemento' => $row['nombre_elemento']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
