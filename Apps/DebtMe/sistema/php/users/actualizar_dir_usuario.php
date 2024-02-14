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

			$consultaSiEstaRegistrado = "SELECT `id`  FROM `usuarios_direcciones` WHERE `id_usuario` = $id_usuario";
			$result = $conn->prepare($consultaSiEstaRegistrado) or die ($sql);


			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$sql =  "UPDATE `usuarios_direcciones` 
				SET
				`cp` = '$cp',
				`estado` = '$estado',
				`ciudad` = '$ciudad',	 
				`dir` = '$dir',	 
				`id_usuario` = '$id_usuario', 
				`calle`= '$calle',
				`nexterior`= '$nexterior',
				`ninterior`= '$ninterior',
				`colonia`= '$colonia',
				`municipality`= '$municipality',
				`country`= '$country',
				`nombre` = '$nombre' WHERE `id_usuario` = $id_usuario";

	

				if ($conn->query($sql) == TRUE) {
				
					echo "Dirección actualizada, recarge.";
				}else{
					echo 'Error';
				}

			} else
			{
				 
	
				$sql2 =  "INSERT INTO `usuarios_direcciones`(
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
	
				
				if ($conn->query($sql2) == TRUE) {
	
					echo "Registro Exitoso, recarge pagina.";
				}
				else
				{
					echo 'Error';
				}

			}

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
?>
