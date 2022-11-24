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
			
			$limite = trim($_GET['limite']);
			$tipo = trim($_GET['tipo']);
		
			if ($tipo == 'todos'){
				$condicion= "";
				if($permisos[14]["permiso"] == 1){
					$usuario = "";
				}else{
					$usuario = "WHERE `id_usuario` = $id_usuario";
				
					
				}
			} else{
				$condicion = "WHERE `tipo` = $tipo";
				if($permisos[14]["permiso"] == 1){
					$usuario = "AND `id_usuario` = $id_usuario";
				}else{
					$usuario = "";
				}
				
			}


			$sql = " SELECT *, 
					 (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
					 (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
					 FROM `movimientos_inventario` $condicion $usuario ORDER BY `id` DESC Limit $limite";

		 
			$result = $conn->prepare($sql) or die ($sql);
		 
			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) { 
				$json = array();

				while ($row = $result->fetch()) { 
					$tipo = $row['tipo']; 
					$json[] = array(
						'id' => $row['id'],
						'tipo' => $tipo,
						'concepto' => $row['concepto_movimiento'],
						'costo_total' => $row['costo_total'],
						'usuario' => $row['usuario_movimiento'],
						'detalles' => $row['detalles'],
						'fecha' => $row['fecha']
					);
					  
				}
				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
