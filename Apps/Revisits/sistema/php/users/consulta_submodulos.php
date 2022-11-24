<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';

		 	$id_padre = ($_POST['id_padre']);

			$sql = " SELECT * FROM `usuarios_modulos` where `tipo` = 1 and `id_padre` = $id_padre";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['etiqueta']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
