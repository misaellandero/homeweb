<?php 
session_start();
$conn = require_once '../conexion.php';
$id_usuario = $_SESSION['id_session'];
include '../users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
$id_admin = $id_usuario;
$permisos = PermisosSistema($id_perfil,$conn); 
$total_corte = 0;
$fecha_ultimo_corte = "";
		try {
			
			 
			if ($permisos[16]["permiso"] != 1) {
			  echo "No tienes permisos para realizar movimientos de efectivo";
			  die();
			}
		 
			
			$tipo = ($_POST['tipo_movimiento_efectivo']);
			$cantidad = ($_POST['cantidad_movimiento_efectivo']);
			$id_cajero = ($_POST['usaurio_movimiento_efectivo']); 
			$concepto = ($_POST['concepto_movimiento_efectivo']);

			if ($cantidad < 1) {
				echo "$cantidad es una cantidad invalida";
			 	 die();
			}

			$sql = "INSERT INTO `efectivo_caja` (`id_cajero`,`cantidad`,`id_admin`,`tipo`,`concepto`) VALUES
			(?,?,?,?,?)";
			$result = $conn->prepare($sql);
			if($result->execute([$id_cajero,$cantidad,$id_admin,$tipo,$concepto])){
				echo "Se añadio el movimiento de efectivo con exito";
			}else{
				echo "No Se añadio el movimiento de efectivo";
			}
			
			  
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
