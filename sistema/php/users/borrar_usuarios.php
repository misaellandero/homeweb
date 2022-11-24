<?php
session_start();
$id_usuario = $_SESSION['id_session'];
		try {
			$conn = require_once '../conexion.php';

			$id = ($_POST['id']);
			$nombre= ($_POST['nombre']);

			$sql =  "DELETE FROM `usuarios_usuarios`  WHERE  `id` = '$id' ";


			if ($conn->query($sql) == TRUE) {

				echo 1;
				include '../movimientos/movimientos.php';
				$id_modulo = 1;
				$detalles = 'Se elimino el usuario con el id; '.$id;
				registrarMovimiento($id_usuario,$id_modulo,$detalles,$conn);

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
