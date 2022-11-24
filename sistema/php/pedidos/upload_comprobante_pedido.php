<?php
	try {
		$conn = require_once '../conexion.php';
		$ds = DIRECTORY_SEPARATOR;  // ruta absoluta
		session_start(); 
		$id_usuario = $_SESSION['id_session'];

		include '../inventarios/funciones_movimiento.php';
		$storeFolder = '../../images/comprobantes_pago';   // Carpeta de imagenes

		if (!empty($_FILES)) {

			$id_status_pedido = ($_POST['status_pedio']);

			$titulo_img = "comprobante";
		 
			$nombre =($_FILES['file']['name']);
			
			$ext =($_FILES['file']['type']);

			$tempFile = $_FILES['file']['tmp_name'];    
			 
			$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
		 
			if ($id_status_pedido == 2) {

				$nuevonombre = ("comprobante".$id_usuario.$titulo_img);
				$total  = ($_POST['total_pedio']);
				//registrar
				$medioPago = 2; 
				$registro =  registrarPago($medioPago,$conn,$id_usuario,$total,$nuevonombre);
			 
				if ($registro == "Aprobado") {
					$targetFile =  $targetPath.$nuevonombre;  //5 
					move_uploaded_file($tempFile,$targetFile);
				 
				}

			}else{
				//actualizar
				$id_pedido = ($_POST['id_pedido']);
				$nuevonombre = ("comprobante".$id_pedido.$titulo_img);
				$sql = "UPDATE `movimientos_pedidos` SET  `comprobante_pago` = '$nuevonombre' WHERE `id` = $id_pedido ";
				$conn->query($sql);
				$targetFile =  $targetPath.$nuevonombre;  //5 
				move_uploaded_file($tempFile,$targetFile);
			 
			
			}
			
			

		
		}
}

catch (PDOException $e) {
                echo 'Error: '. $e->getMessage();
                }

?>
