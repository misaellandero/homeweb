<?php

		try {
			$conn = require_once '../conexion.php';

			$id_usuario = ($_POST['id_usuario_dir']); 
			$cp = ($_POST['cp']); 
			$ciudad	 = ($_POST['ciudad']);
			$dir = ($_POST['dir']);
			$nombre = ($_POST['nombre']);
			$estado = ($_POST['estado']); 
			$calle = ($_POST['calle']);
			$nexterior = ($_POST['nexterior']);
			$ninterior = ($_POST['ninterior']);
			$colonia = ($_POST['colonia']);
			$municipality = ($_POST['municipality']);
			$country = ($_POST['country']);

			if ($cp == "") {
				echo 'Ingresa un Codigo Postal';
				die();
			}

			if ($ciudad == "") {
				echo 'Ingresa una ciudad';
				die();
			}

			if ($dir == "") {
				echo 'Ingresa los datos de la dirección';
				die();
			}

			if ($estado == "") {
				echo 'Ingresa los datos del estado';
				die();
			}

			if ($nombre == "") {
				echo 'Ingresa el nombre de quien recibira';
				die();
			}

			$sql =  "INSERT INTO `usuarios_direcciones`(
				`cp`, 
				`estado`,	 
				`ciudad`,	 
				`dir`,	 
				`id_usuario`,
				`calle`,
				`nexterior`,
				`ninterior`,
				`colonia`,
				`municipality`,
				`country`,
				`nombre`
			)
			values (
				'$cp',
				'$estado',
				'$ciudad',
				'$dir',
				'$id_usuario',
				'$calle',
				'$nexterior',
				'$ninterior',
				'$colonia',
				'$municipality',
				'$country',
				'$nombre'
			) ";

			
			if ($conn->query($sql) == TRUE) {

				echo "Registro Exitoso, recarge pagina.";
			}
			else
			{
				echo 'Error';
			}

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}



?>
