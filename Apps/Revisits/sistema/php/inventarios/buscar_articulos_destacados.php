<?php
header('Content-Type: application/json');
	include  '../configuracion/cargar_datos_empresa.php';
	include '../pago/calcular_comision_paypal.php';
 $conn = require_once '../conexion.php';  
 $datosTienda = cargarDatosTienda($conn);
 $tipo = ($_GET['tipo']);
 $comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
 $comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];
 $tipo_productos = 0;
		try {
				$sql = "SELECT *,
								(SELECT `img` FROM `articulos_imagenes` WHERE `id` = `id_main_pic`) as 'imagen', 
								(SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_elemento'
								FROM `articulos` WHERE  `disponibilidad_articulo` = 1 AND `destacado` = $tipo ";
			 

		 
			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

				if ($result->rowCount() > 0) {
					$json = array();

					while ($row = $result->fetch()) {
						$nombre = $row['nombre'];
						$imagen = $row['imagen']; 
						$id = $row['id'];
						$precio = $row['precio'];
						$precioAnterior = $row['precio_anterior'];
						$resultado = calcularPrecioConComision($precio,$comisionFijaPayPal,$comisionPorciento,$conn);
						$precioPayPal =  round($resultado,2);       
						
						
						$compuesto = $row['compuesto'];
						if ($tipo_productos == 1) {
							if ($compuesto == 1) {

								$consulta_elementos = "SELECT *,
																			(SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as 'nombre_elemento'
																				FROM `articulos` WHERE `id_padre` = $id";

																				$result2 = $conn->prepare($consulta_elementos) or die ($consulta_elementos);
																				if (!$result2->execute()) return false;
																				if ($result2->rowCount() > 0) {
																					while ($row2 = $result2->fetch()) {

																						$json[] = array(
																							'id' => $row2['id'],
																							'id_producto'  => $row2['id_producto'],
																							'cb' => $row['codigoBarras'],
																							'nombre' => $nombre,
																							'imagen' => $imagen,
																							'precio' => $precio,
																							'precio_paypal' => $precioPayPal,
																							'nombre_elemento' =>  $row['nombre_elemento'],
																							'des_corta' =>  $row['des_corta'],
																							'existencia' => $row2['existencia'],
																							'elemento' => 1,
																							'precio_anterior' => $precioAnterior,
																							'compuesto' => $compuesto
																						);

																					}
																				}


							} else {
								$json[] = array(
									'id' => $row['id'],
									'cb' => $row['codigoBarras'],
									'id_producto'  => $row['id_producto'],
									'nombre' => $nombre,
									'imagen' => $imagen,
									'precio' => $precio,
									'precio_paypal' => $precioPayPal,
									'nombre_elemento' =>  $row['nombre_elemento'],
									'des_corta' =>  $row['des_corta'],
									'existencia' => $row['existencia'],
									'precio_anterior' => $precioAnterior,
									'elemento' => 0,
									'compuesto' => $compuesto
								);
							}
						} else {
							$existencia = $row['existencia'];

							 if ($compuesto == 1) {
								$existencia = 0;
								$consulta_elementos = "SELECT `existencia` FROM `articulos` WHERE `id_padre` = $id";

																				$result2 = $conn->prepare($consulta_elementos) or die ($consulta_elementos);
																				if (!$result2->execute()) return false;
																				if ($result2->rowCount() > 0) {
																					while ($row2 = $result2->fetch()) {

																						 $existencia = $existencia  + $row2['existencia'];

																					}
																				}


							}

							$json[] = array(
								'id' => $row['id'],
								'cb' => $row['codigoBarras'],
								'id_producto'  => $row['id_producto'],
								'nombre' => $nombre,
								'des_corta' =>  $row['des_corta'],
								'imagen' => $row['imagen'],
								'precio' => $precio,
								'precio_paypal' => $precioPayPal,
								'nombre_elemento' =>  $row['nombre_elemento'],
								'existencia' => $existencia,
								'precio_anterior' => $precioAnterior,
								'elemento' => 0,
								'compuesto' => $compuesto
							);
						}


					}
				}



			$json['success'] = true;

		echo json_encode($json);

		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
