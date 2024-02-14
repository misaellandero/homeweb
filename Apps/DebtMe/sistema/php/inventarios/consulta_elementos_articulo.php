<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id_articulo = trim($_POST['id_articulo']);

			$sql = " SELECT * FROM `articulos`  WHERE `id_padre` = ? ";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id_articulo])) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'], 
						'existencia' => $row['existencia'],
						'precio' => $row['precio'], 
						'costo' => $row['costo']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
