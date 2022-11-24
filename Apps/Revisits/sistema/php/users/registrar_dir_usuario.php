<?php

		try {
			$conn = require_once '../conexion.php';

			$id_usuario = ($_POST['id_usuario_dir']); 
			$nombre = ($_POST['nombre']); 
			$nexterior = ($_POST['nexterior']); 
			$calle = ($_POST['calle']); 
			$ciudad	 = ($_POST['ciudad']); 
			$estado = ($_POST['estado']);  
			$cp = ($_POST['cp']); 

			/*
			$dir = ($_POST['dir']);
			$ninterior = ($_POST['ninterior']);
			$colonia = ($_POST['colonia']);
			$municipality = ($_POST['municipality']);
			$country = ($_POST['country']);*/

			if ($cp == "") {
				echo 'Ingresa un Codigo Postal';
				die();
			}

			if ($ciudad == "") {
				echo 'Ingresa una ciudad';
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

				echo "Registro Exitoso.";
			}
			else
			{
				echo 'Error';
			}

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}



?>
