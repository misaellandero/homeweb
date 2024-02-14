<?php
	try {
		$conn = require_once '../conexion.php';
		$ds = DIRECTORY_SEPARATOR;  // ruta absoluta


		$storeFolder = '../../images';   // Carpeta de imagenes

		if (!empty($_FILES)) {

			$titulo_img = "logo";
		 
			$nombre =($_FILES['file']['name']);
			$nuevonombre = ($titulo_img);

			$ext =($_FILES['file']['type']);

			$tempFile = $_FILES['file']['tmp_name'];      
			 
			$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
		 
			
			$sql = "UPDATE `configuraciones_generales` SET  `logo_empresa` = '$nuevonombre' WHERE `id` = 1 ";

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
