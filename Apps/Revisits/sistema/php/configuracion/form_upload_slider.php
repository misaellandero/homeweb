<?php
	try {
		$conn = require_once '../conexion.php';
		$ds = DIRECTORY_SEPARATOR;  // ruta absoluta


		$storeFolder = '../../images/images_carousel';   // Carpeta de imagenes

		if (!empty($_FILES)) {

			$titulo_img = ($_POST['titulo']);
			$texto_img = ($_POST['texto']);
			$boton = ($_POST['boton']);

			if ($titulo_img == '') {
				$titulo_img = "slider";
			}
			$nombre =($_FILES['file']['name']);
			$nuevonombre = ('slider');

			$ext =($_FILES['file']['type']);

			$tempFile = $_FILES['file']['tmp_name'];      

			$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4


			$sqlimg =  "SELECT * FROM `sliders`  WHERE `img` = '$nuevonombre' ";
			$result = $conn->prepare($sqlimg) or die ($sqlimg);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {

				$repetidos = $result->rowCount() + 1;

				$nuevonombre = ($nuevonombre.$repetidos.$titulo_img);


			}
			
			$sql = "INSERT INTO  `sliders` (`titulo`,`texto`,`img`,`boton`,`video`) VALUES ('$titulo_img','$texto_img','$nuevonombre','$boton','No')";

			$conn->query($sql);

			$targetFile =  $targetPath.$nuevonombre;  //5

			//Crear la imagen y guardar en directorio upload/
			move_uploaded_file($tempFile,$targetFile);
				/*
				$ruta_remota = "jeans/files/fotos_modelos/$nuevonombre";


				// set up basic connection
				$conn_id = ftp_connect("ftp.ceyeme.mx");
				$ftp_user_name= "u315449203";
				$ftp_user_pass= "UTkFYCS7xtPK";
				// login with username and password
				$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

				// upload a file
				if (ftp_put($conn_id, $ruta_remota, $targetFile, FTP_ASCII)) {
						echo "successfully uploaded $ruta_local\n";
						exit;
				} else {
						echo "There was a problem while uploading $ruta_local\n";
						exit;
						}
				// close the connection
				ftp_close($conn_id);*/
		}
}

catch (PDOException $e) {
                echo 'Error: '. $e->getMessage();
                }

?>
