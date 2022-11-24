<?php 
	function articulosCombo($id_combo,$conn){

		
		try { 
			$sql = " SELECT *, (SELECT `id_padre` FROM `articulos` WHERE `id` = `id_articulo`) as id_padre FROM `articulos_combo` WHERE `id_combo` =  ? ";
		 
   			$result = $conn->prepare($sql) or die ($sql);
 
			if ($result->execute([$id_combo])) {
				$nombre = "";
				$json = array();
				while ($row = $result->fetch()) { 
 
					if ($row['id_padre'] > 0 ) {
						$compuesto = 1;

					} else {
						$compuesto = 0;
					}
					
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $nombre, 
						'id_articulo' => $row['id_articulo'],
						'id_combo' => $row['id_combo'],
						'compuesto' => $compuesto,
						'cantidad' => $row['cantidad']

					);
				}
				return $json;
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
	}

	function eliminarElementosCombo($id_combo,$conn){
		 $borrar_elementos = "DELETE FROM `movimientos_articulos` WHERE `id_combo` =  $id_combo ";
		 $result = $conn->prepare($borrar_elementos);

              	if ($result->execute([$id_combo])) { 
					
				 }
	}

	function borrarEsteCombo($id_combo,$conn) { 
		$borrar_elementos = "DELETE FROM `movimientos_articulos` WHERE `id` = ?"; 
					$result = $conn->prepare($borrar_elementos);  
					if ($result->execute([$id_combo])) {   
					}
	}
?>