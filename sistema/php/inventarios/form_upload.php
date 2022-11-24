<?php
	try {
		$conn = require_once '../conexion.php';
		$ds = DIRECTORY_SEPARATOR;  // ruta absoluta


		$storeFolder = '../../images/fotos_articulos';   // Carpeta de imagenes

		if (!empty($_FILES)) {

			$id_articulo = ($_POST['id_articulo']);
			$titulo_img = ($_POST['titulo_img']);
			$texto_img = ($_POST['texto_img']);

			if ($titulo_img == '') {
				$titulo_img = "foto_articulo";
			}

			$nombre =($_FILES['file']['name']);
			$nuevonombre = ($id_articulo.'imagen');

			$ext =($_FILES['file']['type']);

			$tempFile = $_FILES['file']['tmp_name'];          //3
			
			$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
		 //comprimir imagen
		 

			$sqlimg =  "SELECT * FROM `articulos_imagenes`  WHERE `titulo` = '$titulo_img' and `id_articulo` = $id_articulo ";
			$result = $conn->prepare($sqlimg) or die ($sqlimg);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {

				$repetidos = $result->rowCount() + 1;

				$nuevonombre = ($id_articulo.$repetidos.$titulo_img.$nombre);


			}
			
			$sql = "INSERT INTO `articulos_imagenes` (`titulo`,`texto`,`img`,`id_articulo`) VALUES ('$titulo_img','$texto_img','$nuevonombre','$id_articulo')";

			$conn->query($sql);
			$targetFile =  $targetPath.$nuevonombre;  //5

			//Crear la imagen y guardar en directorio upload/ 
			move_uploaded_file($tempFile,$targetFile);
		 
		}
}

catch (PDOException $e) {
                echo 'Error: '. $e->getMessage();
                }

?>
