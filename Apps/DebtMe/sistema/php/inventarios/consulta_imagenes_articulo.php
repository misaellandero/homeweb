<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id_articulo = trim($_POST['id_articulo']);

			$sql = " SELECT * FROM `articulos_imagenes` WHERE `id_articulo` = ? ";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id_articulo])) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],  
						'titulo' => $row['titulo'], 
						'texto' => $row['texto'], 
						'img' => $row['img']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
