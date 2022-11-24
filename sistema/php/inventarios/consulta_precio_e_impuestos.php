<?php 
	function consultarPrecioEImpuestos($id_articulo,$compuesto,$conn){
		try { 
			if ($compuesto == 1) {
				$consultar_precio = "SELECT `id_padre` FROM `articulos` WHERE `id` = ?";
				$result = $conn->prepare($consultar_precio);
				if ($result->execute([$id_articulo])) {
				  while ($row = $result->fetch()) {
						$id_padre = $row['id_padre'];
						$consultar_precio = 'SELECT `nombre`,`precio`,`id_impuesto` FROM `articulos` WHERE `id` = ?';
						$result = $conn->prepare($consultar_precio);
						if ($result->execute([ $id_padre ])) {
							$json = array();
						  while ($row = $result->fetch()) {
							$precio = $row['precio'];
							$id_impuesto = $row['id_impuesto'];
							$nombre = $row['nombre'];
							$impuetos = consultaIMPUESTOS($id_impuesto,$conn);
												
							$json[] = array(
								'precio' => $precio,
								'nombre' => $nombre,
								'impuestos' => $impuetos
							);
						  }
						}
						return $json;
				  }
				}
			  } else {
					$consultar_precio = "SELECT `nombre`, `precio`,`id_impuesto`  FROM `articulos` WHERE `id` = ?";
					$result = $conn->prepare($consultar_precio);
					if ($result->execute([$id_articulo])) {
					$json = array();
					  while ($row = $result->fetch()) {
							$precio = $row['precio'];
							$id_impuesto = $row['id_impuesto'];
							$nombre = $row['nombre'];
							$impuetos = consultaIMPUESTOS($id_impuesto,$conn);
							$json[] = array(
								'precio' => $precio,
								'nombre' => $nombre,
								'impuestos' => $impuetos
							);
					  }
					  return $json;
					}
			  }
			 
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
	}

	function consultaIMPUESTOS($id_impuesto,$conn){
	
		$consultar_impuestos = "SELECT `IVA`,`IEPS` FROM `impuestos` WHERE `id` = ?";
					$result = $conn->prepare($consultar_impuestos);
					if ($result->execute([$id_impuesto])) {
						$json = array();

						while ($row = $result->fetch()) { 
								$json[] = array(
									'IVA' => $row['IVA'],
									'IEPS' => $row['IEPS']
								);
						}
					
					  return $json;
					}
	}
	
	

?>