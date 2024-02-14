<?php
require('../../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

include '../configuracion/cargar_datos_empresa.php';
$conn = require_once '../conexion.php';
$datosTienda = cargarDatosTienda($conn);
$prod = $datosTienda[0]['modo_produccion'];

$buscar = ($_POST['buscar'] ?? "Pagina web");

  if ($prod == 1) {
    $API_KEY = getenv('API_KEY');
   } else {
    $API_KEY = getenv('API_KEY_TEST');
   }
  
use Facturapi\Facturapi;
$facturapi = new Facturapi($API_KEY);

$result = $facturapi->Catalogs->searchUnits([
  "q" => "pulgada"
]);

$dato_a_buscar = (array("q" => "pulgada"));
  
var_dump($facturapi->Catalogs->searchUnits($dato_a_buscar)); 


?>