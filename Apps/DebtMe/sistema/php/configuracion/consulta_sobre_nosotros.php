<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php'; 

			$sql = " SELECT * FROM `sobre_nosotros`";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute()) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],  
						'titulo' => $row['titulo'], 
						'texto' => $row['texto']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
