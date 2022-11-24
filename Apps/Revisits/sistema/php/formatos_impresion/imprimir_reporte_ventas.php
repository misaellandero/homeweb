<?php
 
 	// Write some HTML code:
 
	$conn = require_once '../conexion.php';
	include '../configuracion/cargar_datos_empresa.php';

	$datosEmpresa = cargarDatosEmpresa($conn);
	include '../reportes/funciones_reportes.php';  
		   
				$fechaInicio = ($_POST['fechaInicioReporte']);
				$fechaFin  = ($_POST['fechaFinReporte']); 
				$usuariosReporte = ($_POST['usuariosReporte']);
				
				$fechaInicioReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaInicio);
				$fechaInicioReporte = $fechaInicioReporte->format("Y-m-d H:i:s");
	
				$fechaFinReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaFin);
				$fechaFinReporte = $fechaFinReporte->format("Y-m-d H:i:s");
			  
				$reporte =  reporteVentas($usuariosReporte,$fechaInicioReporte,$fechaFinReporte,$conn); 
				$ventas = "";
				
				foreach ($reporte as $venta) {
					if ($venta["id"] > 0) { 
						$ventas = $ventas."
						<tr>
						<td>".$venta["concepto"]."</td>
						<td>".$venta["usuario"]."</td>
						<td>".$venta["concepto_movimiento"]."</td>
						<td>".$venta["detalles"]."</td>
						<td>".$venta["fecha"]."</td>
						<td>$".$venta["costo_total"]."</td>
						</tr>
						";
					}
				}
				 
	 
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
	<img height="150px" src="images/<?php echo $datosEmpresa[0]['icon_site'];?>" alt="">
<?php

 
 


															$tr = '	';
															$trb = ' ';
													 

															$td ='


															<div class="myfixed1">
 
															<h4>Reporte de movimientos por usuario</h4>
															<h5>'.$fechaInicio.' al '.$fechaFin.'</h5>  
																<table class="table datatable">
																<thead>
																<tr>
																<td>Concepto</td>
																<td>Usuario</td>
																<td>Detalles</td>
																<td>Fecha</td>
																<td>Importe</td>
																</tr>
																</thead>
																 	<tbody>
																	 '.$ventas.'
																	</tbody>
																</table> 
																<h3>Total ventas: $'.$reporte["total"].'</h3>
															</div>';


								$boletos = $boletos.$tr.$td.$trb;

					 

						$html2 ='</body></html>';
						$html = $html.$boletos.$html2;


						echo $html;


 






?>
