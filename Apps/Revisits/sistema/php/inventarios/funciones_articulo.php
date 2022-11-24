<?php 

function actualizarVarios($conn,$post){
	$ids = ($post['ids']);
	$des_corta = ($post['des_corta']);
	$costo = ($post['costo']);
	$precio = ($post['precio']); 
	$contador = 0;
	for ($i=0; $i < count($ids); $i++) {
		$sql = "UPDATE `articulos` SET `des_corta` = (?), `costo` = (?), `precio` = (?) WHERE `id` = (?) ";
		$result = $conn->prepare($sql);
		$result->execute([$des_corta[$i],$costo[$i],$precio[$i],$ids[$i]]);
		$contador = $contador + 1;
	}

	echo $contador." articulos actualizados con exito";
  
}

function datosArticulo($hola,$conn){
    try { 
			$id_articulo = trim($_POST['id_articulo']);

			$sql = " SELECT *, (SELECT `img` FROM `articulos_imagenes` WHERE `id` = `id_main_pic`) as imagen FROM `articulos`  WHERE `id` = ? ";
   			$result = $conn->prepare($sql) or die ($sql);

			if ($result->execute([$id_articulo])) {
				$json = array();
				while ($row = $result->fetch()) {
					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'existencia' => $row['existencia'],
						'precio' => $row['precio'],
						'id_impuesto' => $row['id_impuesto'],
						'codigoBarras' => $row['codigoBarras'],
						'disponibilidad_articulo' => $row['disponibilidad_articulo'],
                        'sku' => $row['sku'],
                        'imagen' => $row['imagen'],
						'sucursal' => $row['sucursal'],
						'des_corta' => $row['des_corta'],
						'des_larga' => $row['des_larga'],
						'destacado' => $row['destacado'],
						'detalles' => $row['des_larga'],
						'costo' => $row['costo']
					);
				}
				return $json;
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
}

function consultaUnidadArticulo($conn,$id){

} 

function consultaArticulos($conn,$idProdcuto){
		try { 
			$idProdcuto = trim($_POST['id']);
			if ($idProdcuto == "todos" ) {
				$sql = " SELECT *,(SELECT `id_unidad` FROM `productos` WHERE `id` = `id_producto`) as 'id_unidad',
				(SELECT `nombre` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_producto',
				(SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_elemento',
				(SELECT `img` FROM `articulos_imagenes` WHERE `id` = `id_main_pic`) as 'imagen', 
				(SELECT `etiqueta` FROM `unidades` WHERE `id` = `id_unidad`) as 'unidad' 
				FROM `articulos` WHERE `id_padre`=0";
			} else {
				$sql = " SELECT *,(SELECT `id_unidad` FROM `productos` WHERE `id` = `id_producto`) as 'id_unidad',
						(SELECT `nombre` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_producto',
						(SELECT `img` FROM `articulos_imagenes` WHERE `id` = `id_main_pic`) as 'imagen', 
						(SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_elemento', 
						(SELECT `etiqueta` FROM `unidades` WHERE `id` = `id_unidad`) as 'unidad' 
						FROM `articulos` WHERE `id_producto` = '$idProdcuto' AND `id_padre`=0";
			}

			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) { 
					$compuesto = $row['compuesto'];
					$existencia = $row['existencia'];
					$existencia_numero = $row['existencia'];
					$cantidad_elementos = 0;
					
					if($compuesto == 1){

						$existencia_elementos = 0;
						$id_padre = $row['id'];
						$consulta_existencia_elementos = "SELECT `existencia` FROM `articulos` WHERE `id_padre` = $id_padre ";
						$result2 = $conn->prepare($consulta_existencia_elementos) or die ($consulta_existencia_elementos);
						
						if (!$result2->execute()) return false;

						
						if ($result2->rowCount() > 0) {
							while ($row2 = $result2->fetch()){
								$existencia_elementos = $existencia_elementos + $row2['existencia'];

							} 
						}

						$cantidad_elementos = $result2->rowCount();
						$existencia = $cantidad_elementos." ".$row['nombre_elemento']."s, ".$existencia_elementos;
						$existencia_numero = $existencia_elementos;
					}


					$json[] = array(
						'id' => $row['id'],
						'nombre' => $row['nombre'],
						'des_corta' => $row['des_corta'],
						'cb' => $row['codigoBarras'],
						'nombre_producto' => $row['nombre_producto'],
						'id_producto' => $row['id_producto'],
						'id_unidad' => $row['id_unidad'],
						'unidad' => $row['unidad'],
						'compuesto' => $compuesto,
						'costo' => $row['costo'],
						'precio' => $row['precio'],
						'existencia_numero' => $existencia_numero,
						'nombre_elemento' => $row['nombre_elemento'],
						'imagen' => $row['imagen'],
						'cantidad_elementos' => $cantidad_elementos,
						'existencia' => $existencia
					);
				}

				$json['success'] = true;

				return $json;
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
	}
?>

 