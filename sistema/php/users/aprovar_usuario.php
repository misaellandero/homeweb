<?php
session_start();
$id_usuario = $_SESSION['id_session'];
		try {
			$conn = require_once '../conexion.php';

			$id = ($_POST['id']);
			$status =  ($_POST['estado']);

			$sql =  "UPDATE `usuarios_usuarios` SET `verificado` = $status  WHERE  `id` = '$id' ";


			if ($conn->query($sql) == TRUE) {

				echo 1;
				/*include '../movimientos/movimientos.php';
				$id_modulo = 1;
				$detalles = 'Se cambio el estado de verificado del usuario con el  id; '.$id;
				registrarMovimiento($id_usuario,$id_modulo,$detalles,$conn);*/

			}
			else
			{
				echo 0;
			}
			}
			catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
			}

?>
