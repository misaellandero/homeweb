<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$tipo = trim($_POST['id']);
			$sql = " SELECT * FROM `movimientos_tipo` WHERE `tipo` = '$tipo'";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
