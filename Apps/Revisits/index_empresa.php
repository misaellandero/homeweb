<?php
session_start();

$id_usuario = $_SESSION['id_session'] ?? '';
include 'sistema/php/users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
$verificado = $datosUsuario[0]['verificado'];
$password = $datosUsuario[0]['password'];
$email = $datosUsuario[0]['email'];
$permisos = PermisosSistema($id_perfil,$conn);
$direccionesEnvio = DirUsuario($id_usuario,$conn);
// var_dump($_SESSION);
//var_dump($direccionesEnvio);
//var_dump($datosUsuario);
//var_dump($permisos);
 


include 'sistema/php/inventarios/consulta_precio_e_impuestos.php';
include 'sistema/php/pago/calcular_comision_paypal.php';

$comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
$comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];
$produccion = $datosTienda[0]['modo_produccion']; 
$pedido = $datosUsuario[0]['pedido'];

$comisionFijaOpenPay = $datosTienda[0]['openpay_com_fija'];

$comisionOpenPay_0 = $datosTienda[0]['openpay_com_tarjeta_0']; 
$comisionOpenPay_3 = $datosTienda[0]['openpay_com_tarjeta_3']; 
$comisionOpenPay_6 = $datosTienda[0]['openpay_com_tarjeta_6']; 
$comisionOpenPay_9 = $datosTienda[0]['openpay_com_tarjeta_9']; 
$comisionOpenPay_12 = $datosTienda[0]['openpay_com_tarjeta_12']; 
$fb_appId = $datosTienda[0]['fb_appId']; 
$fb_state = $datosTienda[0]['fb_state'];  
$fb_redirect = $datosTienda[0]['fb_redirect']; 

$notificaciones = 0;

if (is_null($direccionesEnvio)) { 
  $notificaciones = $notificaciones + 1; 
}


if (is_null($email)) { 
  $notificaciones = $notificaciones + 1; 
}

if (is_null($password)) { 
  $notificaciones = $notificaciones + 1; 
}

if ($verificado == 0) {
	$notificaciones = $notificaciones + 1; 
}

if ($pedido > 0) {
  $notificaciones = $notificaciones + 1; 
}
	
if ($produccion == 0) {
//echo 'Sesion: <br>';
//var_dump($_SESSION);
//echo 'Direccion Envio: <br>';
//var_dump($direccionesEnvio);
//echo 'Datos usuario: <br>';
//var_dump($datosUsuario);
//echo 'Permisos: <br>';
//var_dump($permisos);
}  

$producto_buscar = $_GET['Producto'] ?? '';



?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="blk-desing/assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="blk-desing/assets/img/favicon.png">
  <title>
    Blk• Design System by Creative Tim
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet" />
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
  <!-- Nucleo Icons -->
  <link href="blk-desing/assets/css/nucleo-icons.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link href="blk-desing/assets/css/blk-design-system.css?v=1.0.0" rel="stylesheet" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="blk-desing/assets/demo/demo.css" rel="stylesheet" />
</head>

<body class="register-page">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top navbar-transparent " color-on-scroll="100">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="https://demos.creative-tim.com/blk-design-system/index.html" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom" target="_blank">
          <span>BLK•</span> Design System
        </a>
        <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a>
                BLK•
              </a>
            </div>
            <div class="col-6 collapse-close text-right">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item p-0">
            <a class="nav-link" rel="tooltip" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/CreativeTim" target="_blank">
              <i class="fab fa-twitter"></i>
              <p class="d-lg-none d-xl-none">Twitter</p>
            </a>
          </li>
          <li class="nav-item p-0">
            <a class="nav-link" rel="tooltip" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank">
              <i class="fab fa-facebook-square"></i>
              <p class="d-lg-none d-xl-none">Facebook</p>
            </a>
          </li>
          <li class="nav-item p-0">
            <a class="nav-link" rel="tooltip" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial" target="_blank">
              <i class="fab fa-instagram"></i>
              <p class="d-lg-none d-xl-none">Instagram</p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="blk-desing/index.html">Back to Kit</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/creativetimofficial/blk-design-system/issues">Have an issue?</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="wrapper">
    <div class="page-header">
      <div class="page-header-image"></div>
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
              <div id="square7" class="square square-7"></div>
              <div id="square8" class="square square-8"></div>
              <div class="card card-register">
                <div class="card-header">
                  <img class="card-img" src="blk-desing/assets/img/square1.png" alt="Card image">
                  <h4 class="card-title">Register</h4>
                </div>
                <div class="card-body">
                  <form class="form">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-single-02"></i>
                        </div>
                      </div>
                      <input type="text" class="form-control" placeholder="Full Name">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-email-85"></i>
                        </div>
                      </div>
                      <input type="text" placeholder="Email" class="form-control">
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-lock-circle"></i>
                        </div>
                      </div>
                      <input type="text" class="form-control" placeholder="Password">
                    </div>
                    <div class="form-check text-left">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox">
                        <span class="form-check-sign"></span>
                        I agree to the
                        <a href="javascript:void(0)">terms and conditions</a>.
                      </label>
                    </div>
                  </form>
                </div>
                <div class="card-footer">
                  <a href="javascript:void(0)" class="btn btn-info btn-round btn-lg">Get Started</a>
                </div>
              </div>
            </div>
          </div>
          <div class="register-bg"></div>
          <div id="square1" class="square square-1"></div>
          <div id="square2" class="square square-2"></div>
          <div id="square3" class="square square-3"></div>
          <div id="square4" class="square square-4"></div>
          <div id="square5" class="square square-5"></div>
          <div id="square6" class="square square-6"></div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <h1 class="title">BLK•</h1>
          </div>
          <div class="col-md-3">
            <ul class="nav">
              <li class="nav-item">
                <a href="blk-desing/index.html" class="nav-link">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a href="blk-desing/examples/landing-page.html" class="nav-link">
                  Landing
                </a>
              </li>
              <li class="nav-item">
                <a href="blk-desing/examples/register-page.html" class="nav-link">
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a href="blk-desing/examples/profile-page.html" class="nav-link">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <ul class="nav">
              <li class="nav-item">
                <a href="https://creative-tim.com/contact-us" class="nav-link">
                  Contact Us
                </a>
              </li>
              <li class="nav-item">
                <a href="https://creative-tim.com/about-us" class="nav-link">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a href="https://creative-tim.com/blog" class="nav-link">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a href="https://opensource.org/licenses/MIT" class="nav-link">
                  License
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h3 class="title">Follow us:</h3>
            <div class="btn-wrapper profile">
              <a target="_blank" href="https://twitter.com/creativetim" class="btn btn-icon btn-neutral btn-round btn-simple" data-toggle="tooltip" data-original-title="Follow us">
                <i class="fab fa-twitter"></i>
              </a>
              <a target="_blank" href="https://www.facebook.com/creativetim" class="btn btn-icon btn-neutral btn-round btn-simple" data-toggle="tooltip" data-original-title="Like us">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a target="_blank" href="https://dribbble.com/creativetim" class="btn btn-icon btn-neutral  btn-round btn-simple" data-toggle="tooltip" data-original-title="Follow us">
                <i class="fab fa-dribbble"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <!--   Core JS Files   -->
  <script src="blk-desing/assets/js/core/jquery.min.js" type="text/javascript"></script>
  <script src="blk-desing/assets/js/core/popper.min.js" type="text/javascript"></script>
  <script src="blk-desing/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
  <script src="blk-desing/assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
  <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
  <script src="blk-desing/assets/js/plugins/bootstrap-switch.js"></script>
  <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
  <script src="blk-desing/assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
  <!-- Chart JS -->
  <script src="blk-desing/assets/js/plugins/chartjs.min.js"></script>
  <!--  Plugin for the DatePicker, full documentation here: https://github.com/uxsolutions/bootstrap-datepicker -->
  <script src="blk-desing/assets/js/plugins/moment.min.js"></script>
  <script src="blk-desing/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script>
  <!-- Black Dashboard DEMO methods, don't include it in your project! -->
  <script src="blk-desing/assets/demo/demo.js"></script>
  <!-- Control Center for Black UI Kit: parallax effects, scripts for the example pages etc -->
  <script src="blk-desing/assets/js/blk-design-system.min.js?v=1.0.0" type="text/javascript"></script>
</body>

</html>
