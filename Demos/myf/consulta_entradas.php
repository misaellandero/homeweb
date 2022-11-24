<?php
header('Content-Type: application/json');

		try {
			$conn = require_once 'conexion.php';


			$sql = " SELECT * FROM `entrada` ";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {  

					$date = $row['fecha'];  
					//converts date and time to seconds  
					$sec = strtotime($date);  
					//converts seconds into a specific format  
					$newdate = date ("d M Y H:i", $sec);  
					//Appends seconds with the time  
					$newdate = $newdate . ":00";  
					// display converted date and time  
 

					$json[] = array(
						'id' => $row['id'],
                        'nombre' => $row['nombre'],
                        'mensaje' => $row['mensaje'], 
						'image' => $row['image'], 
						'code' => $row['code'], 
                        'fecha' => $newdate
                    );
                    
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
