<?php
		try {
			$conn = require_once '../conexion.php';

			$nombre = ($_POST['nombre']);
			$apellidos = ($_POST['apellidos']);
			$clave = ($_POST['clave']);
			$rclave = ($_POST['rclave']);
			$correo = ($_POST['correo']);
			$perfil = ($_POST['perfil']);
			$telefono = ($_POST['telefono']); 
			$nivel_cliente = ($_POST['nivel_cliente']); 
			$razon_social = ($_POST['razon_social']);
			$rfc = ($_POST['rfc']);	

			$consultar_nombre = "SELECT * FROM `usuarios_usuarios` WHERE `email` = '$correo'";
			$result = $conn->prepare($consultar_nombre) or die ($consultar_nombre);
 			$result->execute();
			if ($result->rowCount() > 0) {
					 echo "correo ya en uso";
				} else {
								$sql = "INSERT INTO `usuarios_usuarios` (
														 `nombre`,
														 `apellido`,
														 `telefono`,
														 `email`,
														 `password`,
														 `nivel_cliente`,
														 `razon_social`,
														 `rfc`,						
														 `id_perfil`
													 ) VALUES
														 	('$nombre',
															 '$apellidos',
															 '$telefono',
															 '$correo',
															  '$rclave',
															  '$nivel_cliente',
															  '$razon_social',
															  '$rfc', 
															 '$perfil')";
							 
 								if ($conn->query($sql) == TRUE) {
									echo 'Registro Exitoso';
								} else { 
									echo 'Registro No Exitoso';
								}

						 }


		} catch (PDOException $e) {
		echo 'Error: '. $e->getMessage();
	}

?>
