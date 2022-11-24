<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';


			$sql = " SELECT * FROM `impuestos`";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],
						'nombre' => "IVA ".$row['IVA']."% "."IEPS ".$row['IEPS']."%"." ISR ".$row['ISR']."%",
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
