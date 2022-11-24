<?php
session_start(); 
		try {
			$conn = require_once '../conexion.php';

			$id = ($_POST['id']); 

			$sql =  "DELETE FROM `usuarios_direcciones`  WHERE  `id` = '$id' ";


			if ($conn->query($sql) == TRUE) {

				echo "Eliminado con exito"; 

			}
			else
			{
				echo "Error al eliminar";
			}
			}
			catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
			}

?>
