<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../connexion.php';

			$sql = " SELECT * FROM `usuarios_usuarios`";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'telefono' => $row['telefono'],
						'email' => $row['email']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
