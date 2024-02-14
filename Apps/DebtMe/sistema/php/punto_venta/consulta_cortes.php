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
			$limite = ($_GET['limite_cortes']);
 
			if ($permisos[13]["permiso"] == 1) {
				 $permiso = "";
				 
				 
			}else{
				$permiso = "WHERE `id_usuario` = $id_usuario";
			}

			$consulta_cortes = "SELECT *, (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as `nombreUsuario` FROM `cortes` $permiso ORDER BY `fecha_final` DESC LIMIT $limite";
			$resultado = $conn ->prepare($consulta_cortes) or die ($consulta_cortes);

			if (!$resultado->execute()) return false;
			if ($resultado->rowCount() > 0) {
				$json = array();
				while ($fila = $resultado->fetch()) {

					$json[] = array(
						'id' => $fila['id'],
						'fecha' => $fila['fecha_final'],
						'nombreUsuario' => $fila['nombreUsuario'],
						'total' => $fila['total']
					);

				}
				$json['eleentos'] = $permiso;
				$json['success'] = true;
				 echo json_encode($json);

				}

			}  catch (PDOException $e) {
						echo 'Error: '. $e->getMessage();
					}
?>
