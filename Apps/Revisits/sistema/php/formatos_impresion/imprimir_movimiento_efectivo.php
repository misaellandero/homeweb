<?php
 

 	// Write some HTML code:
	try {
	$conn = require_once '../conexion.php';
	$id= ($_POST['id']);
	$sql = " SELECT *, 
	(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_cajero`) as nombre_cajero,
	(SELECT `apellido` FROM `usuarios_usuarios` WHERE `id` = `id_cajero`) as apellido_cajero,
	(SELECT `apellido` FROM `usuarios_usuarios` WHERE `id` = `id_admin`) as apellido_admin, 
	(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_admin`) as nombre_admin,
	(SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento
    FROM `efectivo_caja`  WHERE `id` ='$id'";

	 $result = $conn->prepare($sql) or die ($sql);

 		
	 
?>
 <!DOCTYPE html>
 <html lang="es" dir="ltr">
 	<head>
 		<meta charset="utf-8">
 		<title></title>
			 <!-- Bootstrap core CSS -->

			 <style>

			 @page{
				 size 6in 3.23in;

			 }
  
			 </style>
			</head>

 	<body>

 	</body>
 </html>

	<html>
	<head>
<?php

	$boletos = '';
	if (!$result->execute()) return false;
		  while ($row = $result->fetch()) {


															$tr = '	';
															$trb = ' ';
															$cajero = $row['nombre_cajero'].' '.$row['apellido_cajero'];
															$admin = $row['nombre_admin'].' '.$row['apellido_admin'];
															
															$fecha = $row['fecha']; 
															$id = $row['id'];
															$cantidad = $row['cantidad'];
															$concepto = $row['concepto_movimiento'];
															$tipo = $row['tipo']; 

																if ($tipo == 2) {
																$tipo_movimiento = "Salida de efectivo";
																}else{
																$tipo_movimiento = "Entrada de efectivo";
																}

															$td ='


															<div class="myfixed1">
 
															<h4>Flujo de efectivo</h4>
															<h5>'.$tipo_movimiento.'</h5> 
															<h5>'.$concepto.'</h5> 
															<h5>Cajero:'.$cajero.'</h5> 
															<h5>Autorizado por:  '.$admin.'</h5> 
																<table class="datos-cabezera">
																 	<tbody>
																	<tr class="yellowS"><td>ID</td></tr>
																	<tr ><td>'.$id.'</td></tr>
																	<tr class="yellowS"><td>Fecha</td></tr>
																	<tr ><td>'.$fecha.'</td></tr>
																	<tr class="yellowS"><td>Cantidad</td></tr>
																	<tr ><td>'.$cantidad.'</td></tr> 
																	 
																	</tbody>
																</table> 
															</div>';


								$boletos = $boletos.$tr.$td.$trb;

						}

						$html2 ='</body></html>';
						$html = $html.$boletos.$html2;


						echo $html;



				} catch (PDOException $e) {
							echo 'Error: '. $e->getMessage();
						}






?>
