<?php
		try {
			$conn = require_once '../conexion.php';

			$nombre = ($_POST['nombre']);
			$id_modulos = ($_POST['id_modulos']);
			$permisos = ($_POST['permisos']);


			$consultar_nombre = "SELECT * FROM `usuarios_perfiles` WHERE `etiqueta` = '$nombre'";
			$result = $conn->prepare($consultar_nombre) or die ($consultar_nombre);
 			$result->execute();
			if ($result->rowCount() > 0) {
					 echo "nombre no disponible";
				} else {
								$sql = "INSERT INTO `usuarios_perfiles`(`etiqueta`) VALUES ('$nombre')";
 								if ($conn->query($sql) == TRUE) {

									$id = $conn->lastInsertId($sql);

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
