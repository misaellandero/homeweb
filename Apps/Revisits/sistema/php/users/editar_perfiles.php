<?php
		try {
			$conn = require_once '../conexion.php';

			$nombre = ($_POST['nombre']);
			$id_modulos = ($_POST['id_modulos']);
			$permisos = ($_POST['permisos']);
			$id = ($_POST['id']);

			$eliminarPermisosAnteriores = "DELETE FROM `usuarios_permisos_perfiles` WHERE `id_perfil` = '$id'";

			$result = $conn->prepare($eliminarPermisosAnteriores) or die ($eliminarPermisosAnteriores);
			if ($result->execute()) {

								$sql = "UPDATE `usuarios_perfiles` SET `etiqueta` = '$nombre' WHERE `usuarios_perfiles`.`id` = '$id'";

 								if ($conn->query($sql) == TRUE) {

									for ($i = 0; $i < count($id_modulos); $i++) {
										$insertarPermisos = "INSERT INTO `usuarios_permisos_perfiles`(`id_perfil`, `id_modulo`, `permiso`) VALUES ('{$id}','{$id_modulos[$i]}','{$permisos[$i]}')";
									  $conn->query($insertarPermisos);
	                }

									echo 1;

								} else {
									echo 0;
								}

						 }


		} catch (PDOException $e) {
		echo 'Error: '. $e->getMessage();
	}

?>
