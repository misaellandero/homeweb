<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php'; 

			$sql = " SELECT *,(SELECT `nombre` FROM `articulos` WHERE `id` = `id_articulo`) as `nombre_articulo` FROM `reseñas`";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute()) {
				$json = array();
				while ($row = $result->fetch()) {

					$json[] = array(
						'id' => $row['id'],  
						'id_articulo' => $row['id_articulo'], 
						'nombre_articulo' => $row['nombre_articulo'],
						'nombre' => $row['nombre'],
						'estrellas' => $row['estrellas'], 
						'id_cliente' => $row['id_cliente'],
						'opinion' => $row['opinion'],
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
