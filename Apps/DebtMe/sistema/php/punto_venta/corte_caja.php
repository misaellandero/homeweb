<?php 
session_start();
$conn = require_once '../conexion.php';
$id_usuario = $_SESSION['id_session'];
include '../users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
include '../punto_venta/funcion_consulta_efectivo.php';
$permisos = PermisosSistema($id_perfil,$conn); 
$total_corte = 0;
$fecha_ultimo_corte = "";
		try {
			
			$periodo_de_tiempo = ""; 
 
			$consulta_cortes = "SELECT * FROM `cortes` WHERE `id_usuario` = $id_usuario ORDER BY id DESC
			LIMIT 1";
		  
			$resultado = $conn->prepare($consulta_cortes) or die ($consulta_cortes);

			if (!$resultado->execute()) return false;
			if ($resultado->rowCount() > 0) {

				while ($fila = $resultado->fetch()) {

					$fecha_ultimo_corte = $fila['fecha_final'];
					$periodo_de_tiempo = "AND `fecha` BETWEEN '$fecha_ultimo_corte' AND CURRENT_TIMESTAMP ";

				}

			} else {
				$periodo_de_tiempo = "AND `fecha` < CURRENT_TIMESTAMP";
			}

			


			$sql = " SELECT *, 
					 (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
					 (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
					 FROM `movimientos_inventario` WHERE `id_usuario` = $id_usuario AND `concepto` IN (4,6)  $periodo_de_tiempo ORDER BY fecha DESC";
		
			$result = $conn->prepare($sql) or die ($sql);
			
		 
			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) { 
				$json = array();

				while ($row = $result->fetch()) { 
					$tipo = $row['tipo']; 
					$total = 0 + $row['costo_total'];
					$total_corte = $total_corte + $total;
					  
				}

				$efectivo = consultaMovimientosEfectivo($periodo_de_tiempo,$id_usuario,$conn);
				$total_corte = $total_corte + $efectivo['total'];

				$registra_corte = "INSERT INTO `cortes`(`id_usuario`,`total`,`fecha_inicial`) VALUES ($id_usuario,$total_corte,'$fecha_ultimo_corte')";
				
									if ($conn ->query($registra_corte) == TRUE) {

                   						 $id = $conn ->lastInsertId();;

										echo $id;

									} else {
                    						echo 0;
									}
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
