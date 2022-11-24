<?php
    header('Content-Type: application/json');
    session_start(); 
    $id_usuario = $_SESSION['id_session'];
    $conn = require_once '../conexion.php';

    include '../configuracion/cargar_datos_empresa.php';
    include '../inventarios/consulta_precio_e_impuestos.php';
    include '../inventarios/consulta_total_de_apartados.php';  
    include 'calcular_comision_paypal.php';
    $datosEmpresa = cargarDatosEmpresa($conn);
    $datosTienda = cargarDatosTienda($conn); 
    $comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
    $comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];

    include '../users/permisos_perfil.php';
    $datosUsuario = datosUsuario($id_usuario,$conn);
    $status = $datosUsuario[0]['pedido'];
    $verificado = $datosUsuario[0]['verificado'];

    if ($verificado < 2) {
      echo 'Tu identidad no ha sido verificada, por lo que no puedes comprar mas que en efectivo';
      die();
    }
    $datosEmpresa = cargarDatosEmpresa($conn);
    $datosTienda = cargarDatosTienda($conn);
    $prod = $datosTienda[0]['modo_produccion']; 

    
    $total = totalApartadosYEnvio($status,$id_usuario,$conn);
    $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
            

    // Set up a payment
 
    $totalpaypal = round($totalpaypal,2);
    if ($prod == 1) {
      $paypalClientID = $datosTienda[0]['paypal_cliente_id'];
       $paypalSecret = $datosTienda[0]['paypal_secret'];
      include 'PaypalExpress.class.php';
    } else {
      $paypalClientID = $datosTienda[0]['paypal_cliente_id_sandbox'];
       $paypalSecret = $datosTienda[0]['paypal_secret_sandbox'];
      include 'PaypalExpressSandBox.class.php';
    }

     $paypal = new PaypalExpress;

     $Setupthepayment = $paypal->Setupthepayment($totalpaypal,$paypalClientID,$paypalSecret);

    echo $Setupthepayment;



?>
