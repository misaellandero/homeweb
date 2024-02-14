<?php
		try {
			$conn = require_once '../conexion.php';

			$nombre = ($_POST['nombre']);
			$apellidos = ($_POST['apellidos']);
			$clave = ($_POST['clave']);
			$rclave = ($_POST['rclave']);
			$correo = ($_POST['correo']);
		 	$perfil = ($_POST['perfil']);
			$id = ($_POST['id']);
			$razon_social = ($_POST['razon_social']);
			$rfc = ($_POST['rfc']);

			if ($perfil == 'CLIENTE'){
				$perfil = 0;
			}
			$telefono = ($_POST['telefono']);

			if ($clave == $rclave) {
				
			} else{
				echo 'Las contraseñas no coinciden';
				die();
			}


			$sql = "UPDATE `usuarios_usuarios`
			SET `id_perfil` = '$perfil',
			  	`email` = '$correo',
					`nombre` = '$nombre',
					`apellido` = '$apellidos',
					`telefono` = '$telefono',
					`razon_social` = '$razon_social', 
					`rfc` = '$rfc', 
					`password` = '$rclave'
					WHERE  `id` = '$id' ";
 
			if ($conn->query($sql) == TRUE) {

				echo 'Datos actualizados correctamente';
			}
			else
			{ 
				echo 'Error no se puedo actualizar' ;
			}

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}



?>
