<?php
header('Content-Type: application/json'); 
$conn = require_once '../conexion.php'; 
include '../reportes/funciones_reportes.php';  
 
		try {
            $fechaInicio = ($_POST['fechaInicioReporte']);
            $fechaFin  = ($_POST['fechaFinReporte']); 
            $usuariosReporte = ($_POST['usuariosReporte']);
            
            $fechaInicioReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaInicio);
            $fechaInicioReporte = $fechaInicioReporte->format("Y-m-d H:i:s");

            $fechaFinReporte  = DateTime::createFromFormat('m/d/Y H:i a',$fechaFin);
            $fechaFinReporte = $fechaFinReporte->format("Y-m-d H:i:s");
          
                        $reporte =  reporteVentas($usuariosReporte,$fechaInicioReporte,$fechaFinReporte,$conn); 
                        echo json_encode($reporte);
			 
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
