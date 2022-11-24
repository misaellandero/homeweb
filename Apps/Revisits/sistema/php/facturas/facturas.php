<?php
require('../../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

include '../configuracion/cargar_datos_empresa.php';
$conn = require_once '../conexion.php';
$datosTienda = cargarDatosTienda($conn);
$prod = $datosTienda[0]['modo_produccion'];


  if ($prod == 1) {
    $API_KEY = getenv('API_KEY');
   } else {
    $API_KEY = getenv('API_KEY_TEST');
   }
  
use Facturapi\Facturapi;
$facturapi = new Facturapi($API_KEY);
 
 

$invoice = (array(
    "customer" => array(
      "legal_name" => "Kerena Leyva",
      "email" => "jacky@example.com",
      "tax_id" => "RNJB960414VE6",
      "address" => array(
        "street"=> "Sunset Blvd",
        "exterior"=> "123",
        "interior"=> "4",
        "zip"=> "44940",
        "neighborhood"=> "Villa Toscana",
        "city"=> "Guadalajara",
        "municipality"=> "Guadalajara",
        "state"=> "Jalisco",
        "country"=> "México")
    ),
    "items" => array(
      array(
        "product" => array(
          "description" => "iPhone 6",
          "product_key" => "60131324",
          "price" => 300,
          "tax_included" => false,
          "taxes" => array(
            [
              "withholding" => false,
              "type" => "IVA",
              "rate" => 0.16
            ],
            [
              "withholding" => false,
              "type" => "ISR",
              "rate" => 0.3
            ],
            [
              "withholding" => false,
              "type" => "IEPS",
              "rate" => 0.4
            ]
          )
        )
      ),
    ),
      "payment_form" => \Facturapi\PaymentForm::EFECTIVO
  ));

  var_dump($facturapi->Invoices->create($invoice));

?>