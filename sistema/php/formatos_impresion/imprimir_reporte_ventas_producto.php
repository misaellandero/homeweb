<?php
  	
 	// Write some HTML code:
 
				$conn = require_once '../conexion.php';
				include '../configuracion/cargar_datos_empresa.php';
				include '../reportes/funciones_reportes.php';  
				include '../movimientos/consulta_movimiento.php';  
				include '../inventarios/consulta_precio_e_impuestos.php';   
					   
				$datosEmpresa = cargarDatosEmpresa($conn);  

				$fechaInicio = ($_POST['fechaInicioReporte']);
				$fechaFin  = ($_POST['fechaFinReporte']); 
				$usuariosReporte = ($_POST['usuariosReporteProducto']);
				$id_articulo = ($_POST['articulosReporteProducto']);
				$id_producto = ($_POST['productosReporteProducto']);
	

				$fechaInicioReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaInicio);
				$fechaInicioReporte = $fechaInicioReporte->format("Y-m-d H:i:s");

				$fechaFinReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaFin);
				$fechaFinReporte = $fechaFinReporte->format("Y-m-d H:i:s"); 
				//var_dump($id_articulo,$usuariosReporte,$fechaInicioReporte,$fechaFinReporte);
				$reporte =   reporteventasProducto($id_producto,$id_articulo,$usuariosReporte,$fechaInicioReporte,$fechaFinReporte,$conn); 
				var_dump($reporte);
			 	$ventas = "";
				foreach ($reporte as $venta) {
					if ($venta["id"] > 0) { 
						$ventas = $ventas."
						<tr> 
						<td>".$venta["nombre"]."</td>
						<td>".$venta["usuario"]."</td>
						<td>".$venta["fecha"]."</td>
						<td>".$venta["cantidad"]."</td> 
						<td>".$venta["importe"]."</td> 
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
 
															<h4>Reporte de ventas por producto</h4>
															<h5>'.$fechaInicio.' al '.$fechaFin.'</h5>  
																<table class="table datatable">
																<thead>
																<tr>
																<td>Producto</td> <td>Usuario</td><td>Fecha</td><td>Cantidad</td><td>Importe</td>
																</tr>
																</thead>
																 	<tbody>
																	 '.$ventas.'
																	</tbody>
																</table> 
																<h3>Total ventas: $'.$reporte["total"].'</h3>
																<h4>Total de unidades vendidas '.$reporte["totalCantidad"].'</h4>
															</div>';


								$boletos = $boletos.$tr.$td.$trb;

					 

						$html2 ='</body></html>';
						$html = $html.$boletos.$html2;


						echo $html;


 






?>
