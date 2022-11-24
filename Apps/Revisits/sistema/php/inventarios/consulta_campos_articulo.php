<?php
header('Content-Type: application/json');

		try {
			$conn = require_once '../conexion.php';

			$id_articulo = trim($_POST['id_articulo']);
			$sql = " SELECT * FROM `articulos_campos` WHERE `id_articulo` = ?";
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute([$id_articulo])) return false;

			if ($result->rowCount() > 0) { 

				
				
				while ($row = $result->fetch()) {
					
					$id_campo = $row['id_campo'];
					$valor = $row['val']; 
					$consulta_campo = "SELECT *,
					(SELECT `etiqueta` FROM  `unidades` WHERE `id` = `id_unidad`) as 'unidad'  
					FROM `campos` WHERE `id` = ?";

					$result2 = $conn->prepare($consulta_campo) or die ($consulta_campo);
					
					if (!$result2->execute([$id_campo])) return false;
					if ($result2->rowCount() > 0) { 
						while ($row2 = $result2->fetch()) {
		
							$tiposDatos = [
								 0 => "Texto",
								 1 => "Numero",
								 2 => "Checkbox",
								 3 => "Listado",
							];
							
							$tipo = $row2['tipo']; 
							 
							$json[] = array(
								'id' => $row2['id'],
								'nombre' => $row2['nombre'],
								'tipo' => $tiposDatos[$tipo],
								'datos' => $tipo,
								'unidad' => $row2['unidad'],
								'id_campo' => $id_campo,
								'val' => $valor

							); 
						}
		
					}
				
				}


				$json['success'] = true;
		
				echo json_encode($json);
 
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
?>