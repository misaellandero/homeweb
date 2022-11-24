<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id = trim($_POST['id']);
			$sql = " SELECT * FROM `productos_campos_predefinidos` WHERE `id_campo`  = ?";
			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id]))  {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['predeterminado']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
