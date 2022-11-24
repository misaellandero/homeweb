<?php 
 	// Write some HTML code: 
	$conn = require_once '../conexion.php';
	include '../inventarios/funciones_articulo.php';
	$id = trim($_POST['id']);
	$articulos = consultaArticulos($conn,$id); 
	$lista_precios = "";
	include '../configuracion/cargar_datos_empresa.php';

	$datosEmpresa = cargarDatosEmpresa($conn);
	foreach ($articulos as $articulo) {
		if ($articulo["id"] > 0) { 
			$precio_provedor = (($articulo["costo"] - $articulo["precio"])/2) + $articulo["precio"];
		 
			$lista_precios = $lista_precios."
			<tr>
			<td>".$articulo["nombre_producto"]."</td>
			<td>".$articulo["nombre"]."</td>
			<td>".$articulo["des_corta"]."</td>  
			<td>".round($articulo["precio"],2)."</td> 
			<td> https://micel.store/index.php?Producto=".$articulo["id"]." </td>
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
 
															<h4>Lista de precios</h4>
															<h5>Precios y disponibilidad sujeta a cambios sin previo aviso, verifica existencias y precios antes de depositar.</h5>  
																<table class="table datatable">
																<thead>
																<tr>
																<td>Producto</td>
																<td>Modelo</td>
																<td>Detalles</td>
																<td>Precio Regular</td>  
																<td>Link con detalles</td>
																</tr>
																</thead>
																 	<tbody>
																	 '.$lista_precios.'
																	</tbody>
																</table>  
															</div>';


								$boletos = $boletos.$tr.$td.$trb;

					 

						$html2 ='</body></html>';
						$html = $html.$boletos.$html2;


						echo $html;


 






?>
