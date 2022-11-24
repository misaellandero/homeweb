<?php
 

 	// Write some HTML code:
	try {
	$conn = require_once '../conexion.php';
	$id_corte= ($_POST['id_corte']);
	include '../punto_venta/funcion_consulta_efectivo.php';
	$sql = "SELECT *,(SELECT `apellido` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as `apellidoUsuario`,(SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as `nombreUsuario`, now() as 'ahora'  FROM `cortes` WHERE `id` ='$id_corte' ";
	$result = $conn->prepare($sql) or die ($sql);

	$contador = 1;
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

			 .boleto{
				 height: 8in;
				 width: 3.8in;
				 margin-bottom: 0.169in;
				 font-family: sans-serif;
				 background-color: #b8101f;
			 }
			 .table{

				 font-size: 1px;
			 }
			 .cover{

				 margin-bottom: 2px;
			 }
			 .container-logo{

				 text-align: center;
			 }
			 .yellowS{
				 background-color: #c1bdbd;


			 }
			 .yellowl{
				 background-color: #ffffff;

			 }

			 .datos-cabezera{
				 width: 98%;
				 max-width: 98%;

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
															$nombre = $row['nombreUsuario'].' '.$row['apellidoUsuario'];
															$ultimoCorte = $row['fecha_inicial'];
															$horaCorte = $row['fecha_final'];
															$fecha_actual = $row['ahora'];
															$total_ventas = $row['total'];
															$id_usuario = $row['id_usuario'];
															$id = $row['id'];
															
															$periodo_de_tiempo = " AND `fecha` BETWEEN '$ultimoCorte' AND '$horaCorte'  ";
															$movimientos = "";
															$venta_total = "";
															$efectivo = consultaMovimientosEfectivo($periodo_de_tiempo,$id_usuario,$conn);
															$ventas = consultaVentas($periodo_de_tiempo,$id_usuario,$conn);
															  
															foreach ($efectivo as $efectivoFlujo) {
																if ($efectivoFlujo["id"] > 0) { 
																	$movimientos = $movimientos."<tr><td></td></tr><tr><td><h6>Movimiento Efectivo</h6>".$efectivoFlujo['fecha']."</td></tr><tr><td>".$efectivoFlujo['concepto']."  $".$efectivoFlujo['cantidad']."</td></tr><td> Autorisado por ".$efectivoFlujo['nombre_admin'].$efectivoFlujo['apellido_admin']."<td></tr>";
																}
															}
															foreach ($ventas as $venta) {
																if ($venta["id"] > 0) { 
																	$venta_total =  $venta_total + $venta["costo_total"];
																}
															}
														 
															$td ='


															<div class="myfixed1">
 
															<h4>Corte de Caja</h4>
															<h5>'.$nombre.'</h5> 
																<table class="datos-cabezera">
																 	<tbody>
																	<tr class="yellowS"><td>ID del corte</td></tr>
																	<tr ><td>'.$id.'</td></tr>
																	<tr class="yellowS"><td>Hora de Inicio</td></tr>
																	<tr ><td>'.$ultimoCorte.'</td></tr>
																	<tr class="yellowS"><td>Hora de Corte</td></tr>
																	<tr ><td>'.$horaCorte.'</td></tr> 
																	
																	<tr class="yellowS"><td><h5>Total Ventas</h5> </td></tr>
																	<tr ><td>$'.$venta_total.'</td></tr>
																	'.$movimientos.'
																	<tr class="yellowS"><td><h5>Total Efectivo</h5> </td></tr>
																	<tr ><td>$'.$total_ventas.'</td></tr>
																	
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
