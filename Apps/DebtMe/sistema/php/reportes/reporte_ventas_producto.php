<?php
header('Content-Type: application/json'); 
$conn = require_once '../conexion.php'; 
include '../reportes/funciones_reportes.php';  
include '../movimientos/consulta_movimiento.php';  
include '../inventarios/consulta_precio_e_impuestos.php';   
       
		try {
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
                        echo json_encode($reporte);
			 
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
