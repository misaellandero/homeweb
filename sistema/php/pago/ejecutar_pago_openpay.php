<?php

try{

    session_start();
    $id_usuario = $_SESSION['id_session'];
    require '../libs/openpay/sdk/Openpay.php'; 
    $conn = require_once '../conexion.php'; 

    include '../configuracion/cargar_datos_empresa.php';
    include '../inventarios/consulta_precio_e_impuestos.php';
    include '../inventarios/consulta_total_de_apartados.php';  
    include '../inventarios/funciones_movimiento.php';
    include 'calcular_comision_paypal.php';

    include '../users/permisos_perfil.php';
    $datosUsuario = datosUsuario($id_usuario,$conn);
    $status = $datosUsuario[0]['pedido'];

    $datosEmpresa = cargarDatosEmpresa($conn);
    $datosTienda = cargarDatosTienda($conn); 
    $verificado = $datosUsuario[0]['verificado'];

    if ($verificado == 0) {
      echo 'Tu identidad no ha sido verificada, por lo que no puedes comprar mas que en efectivo';
      die();
    }

    $meses = $_POST['meses'];

    $comisionFijaOpenPay = $datosTienda[0]['openpay_com_fija'];
    $comisionPorciento = $datosTienda[0]['openpay_com_tarjeta_0']; 

    if ($meses == 1) {
      $comisionMeses = 0;

      $comisionPorciento = $comisionPorciento + $comisionMeses;

    } elseif ($meses == 3){
      $comisionMeses = $datosTienda[0]['openpay_com_tarjeta_3'];  
      $comisionPorciento = $comisionPorciento + $comisionMeses;

    }elseif ($meses == 6){

      $comisionMeses = $datosTienda[0]['openpay_com_tarjeta_3']; 
      $comisionPorciento = $comisionPorciento + $comisionMeses; 

    }elseif ($meses == 9){
      $comisionMeses = $datosTienda[0]['openpay_com_tarjeta_3'];  
      $comisionPorciento = $comisionPorciento + $comisionMeses;

    }elseif ($meses == 12){
      $comisionMeses = $datosTienda[0]['openpay_com_tarjeta_3'];  
      $comisionPorciento = $comisionPorciento + $comisionMeses;
    }
   
    $prod = $datosTienda[0]['modo_produccion']; 
    
      
    $articulosApartados = articulosApartados($id_usuario,$conn);
  
    $total = totalApartadosYEnvio($status,$id_usuario,$conn);
    $totalOpenPay = calcularPrecioConComisionOpenpay($total,$comisionFijaOpenPay,$comisionPorciento,$conn);
     
    if ($prod == 1) {
      $openpay = Openpay::getInstance($datosTienda[0]['openpay_cliente_id'], $datosTienda[0]['openpay_secret']);
      Openpay::setProductionMode(true);
    } else {
      $openpay = Openpay::getInstance($datosTienda[0]['openpay_cliente_id_sandbox'], $datosTienda[0]['openpay_secret_sandbox']);
      Openpay::setProductionMode(false);
    }
    
    $customer = [
        'name' => $_SESSION['nombre_session'],
        'last_name' => $_SESSION['apellido_session'],
        'phone_number' => $_SESSION['telefono_session'],
        'email' => $_SESSION['email_session'],
    ];

    
    $payment_plan = [
      "payments" => $meses
    ];

    if ($meses == 1) {
        $chargeData = [
          'method' => 'card',
          'source_id' => $_POST['token_id'],
          'amount' => (string)$totalOpenPay,
          'description' => $articulosApartados, 
          'device_session_id' => $_POST['device_session'],
          'customer' => $customer,
      ];

    } else{
        $chargeData = [
          'method' => 'card',
          'source_id' => $_POST['token_id'],
          'amount' => (string)$totalOpenPay,
          'description' => $articulosApartados,
          'payment_plan' => $payment_plan,
          'device_session_id' => $_POST['device_session'],
          'customer' => $customer,
      ];

    }

   
    
     $charge = $openpay->charges->create($chargeData);

     error_reporting(E_ALL);
     ini_set('display_errors','1');

    //Actualiza los articulos comprados en la BD

    $medioPago = 4;
      $registro =  registrarPago($medioPago,$conn,$id_usuario,$totalOpenPay,null); 
      if ($registro == "Aprobado") {
        echo 'Tu orden fue procesada con exito. Revisa en tu Perfil.';
      }



} catch (OpenpayApiTransactionError $e) {
	error_log('ERROR on the transaction: ' . $e->getMessage() .
	      ' [error code: ' . $e->getErrorCode() .
	      ', error category: ' . $e->getCategory() .
	      ', HTTP code: '. $e->getHttpCode() .
	      ', request ID: ' . $e->getRequestId() . ']', 0);

        $errores = [
              3001 =>	"La tarjeta fue rechazada.",
              3002 =>	"La tarjeta ha expirado.",
              3003 =>	"La tarjeta no tiene fondos suficientes.",
              3004 =>	"La tarjeta ha sido identificada como una tarjeta robada.",
              3005 =>	"La tarjeta ha sido rechazada por el sistema antifraudes.",
              3001 =>	"La tarjeta fue rechazada.",
              3002 =>	"La tarjeta ha expirado.",
              3003 =>	"La tarjeta no tiene fondos suficientes."

                  ];

        echo ($errores[$e->getErrorCode()]);
        echo '</br>';
        echo $e->getMessage();

} catch (OpenpayApiRequestError $e) {
	error_log('ERROR on the request: ' . $e->getMessage(), 0);


} catch (OpenpayApiConnectionError $e) {
	error_log('ERROR while connecting to the API: ' . $e->getMessage(), 0);


} catch (OpenpayApiAuthError $e) {
	error_log('ERROR on the authentication: ' . $e->getMessage(), 0);


} catch (OpenpayApiError $e) {
	error_log('ERROR on the API: ' . $e->getMessage(), 0);


} catch (Exception $e) {
	error_log('Error on the script: ' . $e->getMessage(), 0);

}

?>
