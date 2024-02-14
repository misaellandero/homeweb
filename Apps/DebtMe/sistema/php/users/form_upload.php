 <?php
		try {
				$conn = require_once '../conexion.php';
				$ds          = DIRECTORY_SEPARATOR;  //1
 
				if (!empty($_FILES)) {


						$id =($_POST['id_usuario']); 
					

						// Verificamos si el tipo de archivo es un tipo de imagen permitido.
						// y que el tamaño del archivo no exceda los 16MB
						$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
						$limite_kb = 16384;

						if (in_array($_FILES['file']['type'], $permitidos) && $_FILES['file']['size'] <= $limite_kb * 1024)
						{	
						 
							// Archivo temporal
							$imagen_temporal = $_FILES['file']['tmp_name'];

							// Tipo de archivo
							$tipo = $_FILES['file']['type'];

							// Leemos el contenido del archivo temporal en binario.
							/*$fp = fopen($imagen_temporal, 'r+b');
							$data = fread($fp, filesize($imagen_temporal));
							fclose($fp);*/
							
							//Podríamos utilizar también la siguiente instrucción en lugar de las 3 anteriores.
							 //$data=file_get_contents();
							 $data = base64_encode(file_get_contents($imagen_temporal));
							
							// Insertamos en la base de datos.
							//0 no ha enviado nada, 1 mando imagen a verificar, // 2 Usuario verificado. 
							$sql = "UPDATE `usuarios_usuarios` SET  `ine` =  '$data', `tipo_archivo` = '$tipo', `verificado` = 1 WHERE  `usuarios_usuarios`.`id` = '$id'";
							$conn->query($sql);
						
						}else
						{
								echo "Formato de archivo no permitido o excede el tamaño límite de $limite_kb Kbytes.";
						}
						
				     


				    
				}

				}

				catch (PDOException $e) {
				                echo 'Error: '. $e->getMessage();
				                }

?>
