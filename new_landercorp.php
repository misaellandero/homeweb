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
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- Author Meta -->
  <meta name="author" content="LanderCorp.mx">
	<!-- Meta Description -->
	<meta name="description" content="<?php echo $datosTienda[0]['cabezera_titulo'];?>">
	<!-- Meta Keyword -->
	<meta name="keywords" content="<?php echo $datosEmpresa[0]['sobre_nosotros_corto'];?>">	
   
     
  <!-- inconos -->
      <link rel="icon" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="144x144" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="114x114" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="72x72" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="57x57" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"" />
     
 	<!-- Site Title -->
  <title> <?php echo $datosTienda[0]['titulo_tienda'];?></title>

  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet" />
  <!-- Font Awesome -->
  <link href="sistema/css/fonts/css/all.min.css" rel="stylesheet">
  <!-- Nucleo Icons -->
  <link href="blk-desing/assets/css/nucleo-icons.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link href="blk-desing/assets/css/landercorp.css" rel="stylesheet" />  
  <!-- Animate  Files -->
  <link href="sistema/css/animate.css" rel="stylesheet" />  

</head> 

<body class="register-page landing-page">
  <!-- Navbar -->

  
  <?php
    if (($datosTienda[0]['modo_tienda']) == "tienda") {
      echo '<input type="text" value="true" id="tipo_tienda" hidden="true">';
     } else {
       echo '<input type="text" value="false" id="tipo_tienda" hidden="true">';
     }
  ?>
  
    
  <nav class="navbar navbar-expand-lg fixed-top navbar-transparent" color-on-scroll="100">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="#">
          <img src="sistema/images/icono_claro.svg"  class="img-fluid rounded-circle shadow-lg icon-claro wow slideInLeft" data-wow-duration="6s"width="8%" alt="">
          <img src="sistema/images/icono_oscuro.svg"  class="img-fluid rounded-circle shadow-lg icon-oscuro wow slideInLeft" data-wow-duration="6s" width="8%" alt="">
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
                LanderCorp.mx
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
          <li class="nav-item  p-0 wow slideInRight" data-wow-duration="1s" >
                <a class="nav-link"   href="#Servicios" ><i class="fa fa-laptop-code"></i> Servicios</a>
          </li>
          <li class="nav-item  p-0 wow slideInRight" data-wow-duration="2s">
                <a class="nav-link" href="#Portafolio" ><i class="fa fa-briefcase"></i> Portafolio</a>
           </li>
           <li class="nav-item  p-0 wow slideInRight" data-wow-duration="3s">
                <a class="nav-link"  href="#SobreMi" ><i class="fa fa-smile-wink"></i> Sobre Mi</a>
           </li>
           <li class="nav-item  p-0 wow slideInRight" data-wow-duration="4s">
                <a class="nav-link"  href="http://blog.landercorp.mx" ><i class="fa fa-code"></i>  Blog</a>
           </li> 
           <li class="nav-item p-0" >
            <a class="nav-link btn btn-warning d-none d-lg-block text-white wow slideInRight pulse" data-wow-duration="5s"   href="#contacto" onclick="scrollToDownload()">
              Solicita una cotización
            </a>
          </li>
           
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="wrapper">
  
  <div class="page-header ">
      <div class="particles-container" id="particles-js"></div>
      <img  src="blk-desing/assets/img/blob.png" class="path wow slideInRight">
      <img src="blk-desing/assets/img/path2.png" class="path2 wow slideInLeft">
      <img src="blk-desing/assets/img/triunghiuri.png" class="shapes triangle wow slideInUp">
      <img src="blk-desing/assets/img/waves.png" class="shapes wave wow slideInDown">
      <img src="blk-desing/assets/img/patrat.png" class="shapes squares wow slideInRight">
      <img src="blk-desing/assets/img/cercuri.png" class="shapes circle wow slideInLeft">
      <div class="content-center d-flex flex-column">
      
      

        <div class="row row-grid justify-content-between align-items-center text-left">
        <div class="col-lg-12 col-md-12">
            <br>
            <br>
            <h1 class="wow fadeInRight text-green" >  Developer </h1>
            <img class="wow fadeInRight" height="10%" data-wow-duration="4s" src="sistema/images/imagen_promocional/icon-iphone-large.png"  alt="Circle image" >
            <img class="wow fadeInRight" height="10%" data-wow-duration="4s" src="sistema/images/imagen_promocional/icon-mac-large.png"  alt="Circle image" >
            <img class="wow fadeInRight" height="10%" data-wow-duration="4s" src="sistema/images/imagen_promocional/icon-ipad-large.png"  alt="Circle image" >
            <img class="wow fadeInRight" height="10%" data-wow-duration="4s" src="sistema/images/imagen_promocional/icon-watch-large.png"  alt="Circle image" >
            <img class="wow fadeInRight" height="10%" data-wow-duration="4s" src="sistema/images/imagen_promocional/icon-appletv-large.png"  alt="Circle image" >
        
          </div>
          <div class="col-lg-6 col-md-6" >
            <div> 
              <br>
              <br>
            <h4 class="wow slideInLeft text-blue" data-wow-duration="4s"><span >Desarrollador Web y Swift </span></h4>
            <p class="text-white mb-3 wow slideInLeft" data-wow-duration="5s">¡Hola mi nombres es Misael! Ayudo a las empresas a aumentar sus ganancias y digitalizar sus procesos mediante elegantes y modernas <strong> Apps, Sitios Web y Sistemas Informáticos</strong> </p>
            <div class="btn-wrapper mb-3">
            <a href="#contacto" class="btn btn-success btn-link btn-sm wow slideInLeft" data-wow-duration="6s" > <p class="category text-success d-inline">Cuentame sobre tu proyecto <i class="tim-icons icon-minimal-right"></i></p></a>
            </div>
            </div>

            <div class="btn-wrapper">
            
              <div class="button-container">
                <a href="<?php echo $datosEmpresa[0]['twtr']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="3s">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="<?php echo $datosEmpresa[0]['inst']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="2s"   >
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="<?php echo $datosEmpresa[0]['fb']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="1s">
                  <i class="fab fa-facebook"></i>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <section class="section section-lg section-coins">
      <img src="blk-desing/assets/img/path3.png" class="path">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <hr class="line-info">
            <h1 class="wow fadeInRight" data-wow-duration="3s" >
              <span > Herramientas y soluciones para todos</span>
              <span class="text-info" >nuestras Apps y Sistemas</span>
            </h1>
          </div>
        </div>
        <div class="row" id="pq_comprar">
          <div class="col-md-4">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img src="blk-desing/assets/img/bitcoin.png" class="img-center img-fluid">
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <h4 class="text-uppercase">Light Coin</h4>
                    <span>Plan</span>
                    <hr class="line-primary">
                  </div>
                </div>
                <div class="row">
                  <ul class="list-group">
                    <li class="list-group-item">50 messages</li>
                    <li class="list-group-item">100 emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-primary btn-simple">Get plan</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img src="blk-desing/assets/img/etherum.png" class="img-center img-fluid">
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <h4 class="text-uppercase">Dark Coin</h4>
                    <span>Plan</span>
                    <hr class="line-success">
                  </div>
                </div>
                <div class="row">
                  <ul class="list-group">
                    <li class="list-group-item">150 messages</li>
                    <li class="list-group-item">1000 emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-success btn-simple">Get plan</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img src="blk-desing/assets/img/ripp.png" class="img-center img-fluid">
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <h4 class="text-uppercase">Bright Coin</h4>
                    <span>Plan</span>
                    <hr class="line-info">
                  </div>
                </div>
                <div class="row">
                  <ul class="list-group">
                    <li class="list-group-item">350 messages</li>
                    <li class="list-group-item">10K emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-info btn-simple">Get plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  <?php 
			include 'sistema/estructura/tienda/detalles_articulo.php';
		?>
   
    <div class="main servicios" id="Servicios"> 
    <br>
    <br>
    <div class="content-center wow fadeInUp" data-wow-duration="3s" >
      <br>
      <br>
     <h1><i class="fa fa-laptop-code"></i> Servicios</h1>
     <p>Soluciones a la medida para nuestros clientes</p>
    </div> 
    <div class="bd-example wow fadeInUp" data-wow-duration="3s">
												<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
															<ol class="carousel-indicators" id="indicadores"> 
															</ol>
															<div class="carousel-inner " id="carousel"> </div>
															<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
																<span class="carousel-control-prev-icon" aria-hidden="true"></span>
																<span class="sr-only">Previous</span>
															</a>
															<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
																<span class="carousel-control-next-icon" aria-hidden="true"></span>
																<span class="sr-only">Next</span>
															</a>
											 </div>
											
										</div>
    </div>

    <div class="main" id="Portafolio">
    <br>
    <br>        
    <div class="content-center">
      <br>
      <br>
      <h1 class="white-text wow fadeInDown" data-wow-duration="3s" ><i class="fa fa-briefcase"></i> Portafolio</h1>
      <div class="container-fluid">
        <div id="productos-destacados"  class="row wow zoomInUp" data-wow-duration="3s"> 
        </div>	 
      </div>
      <br>

      <a role="button" id="ver_mas_portafolio" class="btn btn-dark btn-default btn-lg wow fadeInUp" data-wow-duration="3s"  > Ver más</a>
      <h1 class="white-text todos-portafolio wow fadeInDown" data-wow-duration="3s" >Todos mi trabajos</h1>
      <p class="white-text">Elije una categoria para cargar todos los trabjos</p>
     <div class="container">
          
      <div class="row"> 
								<div class="col-sm-3"> 
									<br>
									<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
									 
									</div>
									<br>
								</div> 
								<div class="col-sm-9"> 		
									<br> 
									<div class="tab-content" id="v-pills-tabContent" >
									</div> 
									<br>
								</div>
     </div>
     </div>
              
    </div> 
    </div> 

      <section class="servicios main wow fadeInDown" data-wow-duration="3s"  id="SobreMi">
									<div class="container">
										<div class="row d-flex justify-content-center">
											<div class="menu-content pb-60 col-lg-10">
											<div class="title text-white text-center"> 
												<div class="row d-flex justify-content-center">
													<div class="menu-content pb-60 col-lg-10">
														<div class="">
                              <br>
                              <br>
                              <br>
																<h1 class="wow fadeInDown animated" data-wow-duration="2s" style="visibility: visible; animation-duration: 2s; animation-name: fadeInDown;"><i class="fa fa-smile-wink"></i> Sobre Mi.</h1>
																<br>
																<br>
																<div class="row">
																	<?php echo $datosEmpresa[0]['sobre_nosotros_largo'];?> 	  	
																</div>
														</div>
													</div>
												</div>
											</div> 
											</div>
											</div>
										</div>						
                    </section>
    
    <section id="contacto">
    <div class="page-header">
      <div class="page-header-image"></div>
      <div class="content">
        <div class="container">
          <div class="row"> 
            <div class="col-lg-8 col-md-9 offset-lg-0 offset-md-3"> 
              <br>
              <br>
              <div class="card card-home wow fadeInLeft" data-wow-duration="3s" >
                <div class="card-header"> 
                  <h2 class="card-title wow slideInRight" >Solicita tu cotización</h2>
                </div>
                <div class="card-body wow slideInRight"> 
                <h1 class=""><strong>Tomemos un ☕️ cafe y conversemos sobre tu idea, yo invito 😉.</strong> <br> </h1>
                <h3>Podemos comenzar desde cero e ir desarrollando tu proyecto paso a paso <strong> envía un correo 📮 o contacta por redes sociales </strong> estaré feliz de darte una cotización sin costo.</h3>
                <p></p>
                </div>
                <div class="card-footer">
               
                  <a href="mailto:<?php echo $datosEmpresa[0]["mail"]?>" class="btn btn-info btn-default btn-lg wow slideInUp" data-wow-duration="1s"><i class="fa fa-envelope"></i> Email</a>
              
                  <a  href="https://<?php echo $datosEmpresa[0]['mgn'];?>"  class="btn btn-warning btn-lg wow slideInUp" data-wow-duration="2s"><i class="fab fa-facebook-messenger"></i> Menssager</a>
               
                  <a href="https://api.whatsapp.com/send?phone=<?php echo $datosEmpresa[0]['wtsp'];?>" class="btn btn-success btn-default btn-lg wow slideInUp" data-wow-duration="3s"><i class="fab fa-whatsapp"></i> Whatsapp</a>
                </div>
              </div>
            </div>  
          </div>  
          <div id="square7" class="square square-7"></div>
          <div id="square8" class="square square-8"></div>
          <div id="square1" class="square square-1"></div>
          <div id="square2" class="square square-2"></div>
          <div id="square3" class="square square-3"></div>
          <div id="square4" class="square square-4"></div>
          <div id="square5" class="square square-5"></div>
          <div id="square6" class="square square-6"></div>
        </div>
      </div>
    </div>
    </section>
      
    <footer class="footer text-white"> 
				<div class="container text-white">
					<div class="row">
          <div class="col-lg-2  col-md-3 col-sm-3">
            <img  src="sistema/images/Macfig.gif" alt="">
          </div>
						<div class="col-lg-5 col-md-6 col-sm-6">
							<div class="single-footer-widget">
								<h6>Aviso Legal</h6>
								Al usar este sitio se entiende que usted acepta nuestros <a class="terminos"  data-toggle="modal" data-target="#modal-terminos" href="#" > <i class="fa fa-file-text"> terminos y condiciones</i></a> de uso.
								<p class="footer-text text-white">
                  <br>
									<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                  <img src="sistema/images/icono_claro.svg"  class="img-fluid rounded-circle shadow-lg icon-claro wow infinite pulse"      width="8%" alt="">
                  <img src="sistema/images/icono_oscuro.svg"  class="img-fluid rounded-circle shadow-lg icon-oscuro wow  infinite pulse"  width="8%" alt="">
                  <br>
                  <br>
									<?php echo $datosEmpresa[0]['nombre'];?> Copyright &copy;<script>document.write(new Date().getFullYear());</script> | Todos los derechos reservados | Esta pagina web es un producto artesanal hecho a mano por <a href="http://www.landercorp.mx" target="_blank">LanderCorp.mx</a>
									<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
								</p>
														
							</div> 
						</div>
						<div class="col-lg-3  col-md-3 col-sm-3">
							<div class="single-footer-widget">
							   <h6>Sobre nosotros</h6>
								<p class="text-white">
								<?php echo $datosEmpresa[0]['sobre_nosotros_corto'];?>	
								</p>
								
							</div>
							
						</div>						
						<div class="col-lg-2 col-md-6 col-sm-6 social-widget">
							<div class="single-footer-widget">
								<h6>Siguenos</h6>
                <p class="text-white">En nuestras redes sociales</p>
                <div class="button-container">
                <a href="<?php echo $datosEmpresa[0]['twtr']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="3s">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="<?php echo $datosEmpresa[0]['inst']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="2s"   >
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="<?php echo $datosEmpresa[0]['fb']?>" class="btn btn-icon btn-simple btn-round btn-neutral wow zoomInUp" data-wow-duration="1s">
                  <i class="fab fa-facebook"></i>
                </a>
              </div>
							 
							</div>
							<br>
							<div class="single-footer-widget">
							<h5 class="text-white">Administración</h5>
								<ul class="list-unstyled text-small">
									<li><a href="sistema/home.php"> <i class="fa fa-user"></i> Iniciar Sesión</a></li> 
								</ul>	
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
 
  <!-- Control Center for Black UI Kit: parallax effects, scripts for the example pages etc -->
  <script src="blk-desing/assets/js/blk-design-system.min.js?v=1.0.0" type="text/javascript"></script>

  <!-- particulas --> 
  <script src="sistema/js/particulas/particles.js"></script>
  <script src="sistema/js/particulas/app.js"></script>
  <script src="sistema/js/wow.js"></script>

   <!-- funciones Generales--> 
  <script src="sistema/js/funciones_generales.js" type="text/javascript"></script> 
  <script src="sistema/js/portafolio.js" type="text/javascript"></script>
 
</body>

</html>
