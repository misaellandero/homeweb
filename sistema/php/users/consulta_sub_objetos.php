<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';

			$id_perfil = ($_GET['id_perfil']);
			$id_padre = ($_GET['id_padre']);

			$sql = " SELECT * FROM `usuarios_modulos` WHERE `tipo` = '1' AND `id_padre` ='$id_padre' ";



			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {

				$permiso = 0;

				$json = array();
				while ($row = $result->fetch()) {
					$id_objeto = $row['id'];
					$consulta_permiso = "SELECT * FROM `usuarios_permisos_perfiles` WHERE `id_perfil` ='$id_perfil' AND `id_modulo` = '$id_objeto' ";
					$result2 = $conn->prepare($consulta_permiso) or die ($consulta_permiso);

					if (!$result2->execute()) return false;
					if ($result2->rowCount() > 0) {

						while ($row2 = $result2->fetch()) {

							$permiso = $row2['permiso'];

						}
					}

					$json[] = array(
						'id' => $id_objeto,
						'tipo' => $row['tipo'],
						'permiso' => $permiso,
						'nombre' => $row['etiqueta']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
