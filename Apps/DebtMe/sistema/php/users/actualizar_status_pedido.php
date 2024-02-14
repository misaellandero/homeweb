<?php
session_start();

$conn = require_once '../conexion.php'; 
include '../configuracion/cargar_datos_empresa.php';
$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn); 

$manejoDePedidos = $datosTienda[0]['envio_gratis']; 



if (isset($_SESSION['id_session'])) {
  $id_usuario = $_SESSION['id_session'];
	$id_perfil = $_SESSION['id_perfil']; 

  if ($id_perfil > 0) {
	echo 'Las cuentas de administrador no pueden ser usadas para comprar en tienda';
	die();
  }

} else{
  echo 'Debes primero iniciar sesión';
  die();
}
	include '../users/permisos_perfil.php';
	include '../inventarios/consulta_precio_e_impuestos.php';
	include '../inventarios/consulta_total_de_apartados.php';
    $total = totalApartadosYEnvio($nuevo_status-1,$id_usuario,$conn);

if ($total < 1) {
	echo 'Debes Elegir un producto primero.';
	die();
}

		try {
			$nuevo_status = ($_POST['status']); 

			if ($nuevo_status == 1) {

				$direccionesEnvio = DirUsuario($id_usuario,$conn);
				if (is_null($direccionesEnvio)) {
					echo 'No tienes direcciones registradas, agrega una antes de proceder con tu pedido.';
					die();
				}
			}
			if ($manejoDePedidos == 0) {

				$sql = "UPDATE `usuarios_usuarios`
					SET `pedido` = '$nuevo_status' 
					WHERE  `id` = '$id_usuario' ";

			if ($conn->query($sql) == TRUE) {
				$status =  [
					0 => "Sin pedidos",
					1 => "Pedido en revisión",
					2 => "En espera de pago",
					3 => "Pedido Enviado"
				];

				echo 'Se actualizo con exito tu perfil a '.$status[$nuevo_status];
			}
			else
			{
				echo 'Error';
			}
			
			} elseif($manejoDePedidos == 1) {
				$nuevo_status = 2;
				$empresa_envio = "DHL";
				$costo_envio = $datosTienda[0]['precio_envio'];
				$notas = "Tu pedido sera verificado despues de que pages, te avisaremos cuando tengamos tu numero de guia.";
				$sql = "UPDATE `usuarios_usuarios`
					SET `pedido` = $nuevo_status 
					WHERE  `id` = '$id_usuario' ";

			if ($conn->query($sql) == TRUE) {
				$status =  [
					0 => "Sin pedidos",
					1 => "Pedido en revisión",
					2 => "En espera de pago",
					3 => "Pedido Enviado"
				];
				$id_admin = 0;
				
				$crearPedido = "INSERT  
        		 INTO `movimientos_pedidos` 
         		(`id_cliente`, `id_admin` ,`status`,`empresa_envio`,`costo_envio`,`notas`) 
         		 VALUES (?,?,?,?,?,?)";

				$result = $conn->prepare($crearPedido) or die ($crearPedido); 
				if ($result->execute([$id_usuario,$id_admin,$nuevo_status,$empresa_envio,$costo_envio,$notas])){
					echo 'Se actualizo con exito tu perfil a '.$status[$nuevo_status];
			
				}
			}
			else
			{
				echo 'Error';
			}

				
			} elseif($manejoDePedidos == 2){
				# directo gratis
				$nuevo_status = 2;
				$empresa_envio = "DHL";
				$costo_envio = 0;
				$notas = "Tu pedido sera verificado despues de que pages, te avisaremos cuando tengamos tu numero de guia.";
				$sql = "UPDATE `usuarios_usuarios`
					SET `pedido` = $nuevo_status
					WHERE  `id` = '$id_usuario' ";

			if ($conn->query($sql) == TRUE) {
				$status =  [
					0 => "Sin pedidos",
					1 => "Pedido en revisión",
					2 => "En espera de pago",
					3 => "Pedido Enviado"
				];
				$id_admin = 0;
				
				$crearPedido = "INSERT  
        		 INTO `movimientos_pedidos` 
         		(`id_cliente`, `id_admin` ,`status`,`empresa_envio`,`costo_envio`,`notas`) 
         		 VALUES (?,?,?,?,?,?)";

				$result = $conn->prepare($crearPedido) or die ($crearPedido); 
				if ($result->execute([$id_usuario,$id_admin,$nuevo_status,$empresa_envio,$costo_envio,$notas])){
					echo 'Se actualizo con exito tu perfil a '.$status[$nuevo_status];
			
				}
			}
			else
			{
				echo 'Error';
			}

			
			}


			

			} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}



?>
