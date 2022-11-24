<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php'; 

			$sql = " SELECT * FROM `porque_comprar`";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute()) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],  
						'html' => $row['html'] 
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
