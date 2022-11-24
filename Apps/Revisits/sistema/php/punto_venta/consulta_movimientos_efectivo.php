<?php
header('Content-Type: application/json');
session_start();
$conn = require_once '../conexion.php';
$id_usuario = $_SESSION['id_session'];
include '../users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
$permisos = PermisosSistema($id_perfil,$conn); 

		try {
			
			$limite = ($_GET['limite']);

			$sql = " SELECT *, 
					  (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_cajero`) as nombre_cajero,
					  (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_admin`) as nombre_admin,
					  (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento
					 FROM `efectivo_caja` ORDER BY `fecha` DESC LIMIT $limite";
			$result = $conn->prepare($sql) or die ($sql);
			 
			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) { 
				$json = array();

				while ($row = $result->fetch()) { 
					$tipo = $row['tipo']; 

					if ($tipo == 2) {
					$tipo_movimiento = "Salida de efectivo";
					}else{
					$tipo_movimiento = "Entrada de efectivo";
					}
					
					$json[] = array(
						'id' => $row['id'],
						'tipo' => $tipo_movimiento,
						'concepto' => $row['concepto_movimiento'],
						'cantidad' => $row['cantidad'], 
						'nombre_cajero' => $row['nombre_cajero'], 
						'nombre_admin' => $row['nombre_admin'], 
						'fecha' => $row['fecha']
					);
					  
				}
				$json['success'] = true;

				echo json_encode($json);
			}else{
				$json['success'] = false;
				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
