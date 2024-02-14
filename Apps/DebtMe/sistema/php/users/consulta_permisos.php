<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$id = ($_POST['id']);

			$sql = " SELECT * FROM `usuarios_usuarios` WHERE `id` = $id ";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {
					$json[] = array(
						'nombre' => $row['nombre'],
						'apellido' => $row['apellido'],
						'mail' => $row['email'],
						'telefono' => $row['telefono'],
						'perfil' => $row['id_perfil'],
						'razon_social' => $row['razon_social'],
						'rfc' => $row['rfc'],
						'pass' => $row['password'],
						'ine' => $row['ine'],
						'tipo_archivo' => $row['tipo_archivo'],
						'verificado' => $row['verificado'],
						'id' => $row['id']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
