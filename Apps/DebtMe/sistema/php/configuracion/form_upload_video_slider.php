 
 <?php
		try {
				$conn = require_once '../conexion.php';
				$ds          = DIRECTORY_SEPARATOR;  //1


				$storeFolder = '../../images/images_carousel';   // Carpeta de imagenes
				//2

				if (!empty($_FILES)) {


						$id =($_POST['id_slider']);
					 	$archivo =($_FILES['file']['name']);
						$nombre_archivo = ($id.'video');
						$ext =($_FILES['file']['type']);


            $tempFile = $_FILES['file']['tmp_name'];          //3

             $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4

             $targetFile =  $targetPath. $nombre_archivo;  //5

             move_uploaded_file($tempFile,$targetFile); //6


             $sql = "UPDATE   `sliders` SET  `video` =  '$nombre_archivo' WHERE  `sliders`.`id` = '$id';";
             $conn->query($sql);


				}

				}

				catch (PDOException $e) {
				                echo 'Error: '. $e->getMessage();
				                }

?>
