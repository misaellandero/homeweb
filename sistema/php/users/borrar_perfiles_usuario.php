<?php
		try {
			$conn = require_once '../conexion.php';

			$id = ($_POST['id']);

			$sql =  "DELETE FROM `usuarios_perfiles`  WHERE  `id` = '$id' ";

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

			if ($conn->query($sql) == TRUE) {

				echo 1;

			}
			else
			{
				echo 0;
			}

?>
