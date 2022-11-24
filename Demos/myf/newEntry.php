<?php
	try {
		$conn = require_once 'conexion.php';
		$ds = DIRECTORY_SEPARATOR;  // ruta absoluta


		$storeFolder = 'img/';   // Carpeta de imagenes

		if (!empty($_FILES)) {

			$id_articulo = ($_POST['nombre']);
			$mensaje = ($_POST['mensaje']); 
			  

			$titulo_img = "foto_entrada";
			 

			$randomInt = random_int(10,99);

			$code = $id_articulo[0].$id_articulo[1].$id_articulo[2].$randomInt;

			$nombre =($_FILES['file']['name']);
			$filename=$_FILES["file"]["name"];
			$extension=end(explode(".", $filename)); 
			$nuevonombre = ($code.'imagen').".".$extension;

			

			$ext =($_FILES['file']['type']);

			$tempFile = $_FILES['file']['tmp_name'];          //3
			
			$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
		   //comprimir imagen
		 


			$sqlimg =  "SELECT * FROM `entrada`  WHERE  `code` = '$code' ";
			$result = $conn->prepare($sqlimg) or die ($sqlimg);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {

				$repetidos = $result->rowCount() + 1;
 
				$code = $id_articulo[0].$id_articulo[1].$id_articulo[2].($randomInt + $repetidos);

				$nuevonombre = ($code.'imagen').".".$extension;

			}


			$sql = "INSERT INTO `entrada` (`nombre`,`mensaje`,`image`, `code`) VALUES ('$id_articulo','$mensaje','$nuevonombre','$code')";

			$conn->query($sql);
			$targetFile =  $targetPath.$nuevonombre;  //5

			//Crear la imagen y guardar en directorio upload/ 
            move_uploaded_file($tempFile,$targetFile);
			
			$id = $conn->lastInsertId();
            print $code;
		 
		}
}

catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
}

?>
