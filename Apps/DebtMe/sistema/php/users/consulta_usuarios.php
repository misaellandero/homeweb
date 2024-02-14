<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';
			$mostrar_clientes = ($_POST['mostrar_clientes']) ?? '';
			if ($mostrar_clientes == 1) {
				$sql = " SELECT *,(SELECT `etiqueta` FROM `usuarios_perfiles` WHERE `id` = `id_perfil`) as 'perfil' FROM `usuarios_usuarios` WHERE `id_perfil` = 0";
			} else {
				$sql = " SELECT *,(SELECT `etiqueta` FROM `usuarios_perfiles` WHERE `id` = `id_perfil`) as 'perfil' FROM `usuarios_usuarios` WHERE `id_perfil` > 0 ";
			}

			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {
					if ($row['perfil'] == null) {
						$row['perfil'] = "CLIENTE";
					}
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'apellido' => $row['apellido'],
						'pass' => $row['password'],
						'perfil' => $row['perfil'],
						'name' => $row['nombre'],
						'verificado' => $row['verificado'],
						'mail' => $row['email'],
						'telefono' => $row['telefono'],
						'apellido' => $row['apellido']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
