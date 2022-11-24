<?php
session_start();

$id_usuario = $_SESSION['id_session'];
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

$producto_buscar = $_GET['Producto'];



?>
	<!DOCTYPE html>
	<html lang="zxx" class="no-js">
	<head>
		<!-- Mobile Specific Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		 <!-- animate -->
		<link href="sistema/css/animate.css" rel="stylesheet">

		  <!-- inconos -->
      <link rel="icon" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="144x144" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="114x114" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="72x72" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="57x57" href="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>"" />
      <!-- fin iconos -->

		<!-- Author Meta -->
		<meta name="author" content="LanderCorp.mx">
		<!-- Meta Description -->
		<meta name="description" content="Micelprivacy iPhones nuevos originales baratos">
		<!-- Meta Keyword -->
		<meta name="keywords" content="iPhone, Galaxy, Smarthphone">
	 
	  <!-- DropZones -->
		<link href="sistema/css/dropzone.css"    rel="stylesheet">
		
		<!-- iconos font-awesome -->
		<!-- Font Awesome -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
		<link href="sistema/css/fonts/css/font-awesome.min.css" rel="stylesheet">
		<!-- DataTables -->
		<link rel="stylesheet" type="text/css" href="sistema/js/dataTables/datatables.min.css"/>
		<!-- DropZones -->
		<link href="sistema/css/dropzone.css"    rel="stylesheet">
		<!-- Site Title -->
		<title> <?php echo $datosTienda[0]['titulo_tienda'];?></title>

		<link href="https://fonts.googleapis.com/css?family=Poppins:100,200,400,300,500,600,700" rel="stylesheet"> 
			<!--
			CSS
			============================================= -->
			<link rel="stylesheet" href="watch/css/linearicons.css">
			<link rel="stylesheet" href="watch/css/font-awesome.min.css">
			 
			<link rel="stylesheet" href="watch/css/magnific-popup.css">
			<link rel="stylesheet" href="watch/css/nice-select.css">					
			<link rel="stylesheet" href="watch/css/animate.min.css">
			<link rel="stylesheet" href="watch/css/owl.carousel.css">
			<!-- Pnotify CSS -->
			<link href="Pnotify.css" rel="stylesheet">
			 <!-- Bootstrap core CSS -->
			 <link href="sistema/css/bootstrap.min.css" rel="stylesheet">
    
			<link rel="stylesheet" href="watch/css/main_revisits.css">
   
    
    <!-- Bootstrap core CSS 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    -->
		</head>
		
		<body> 	
		<?php
				if (($datosTienda[0]['modo_tienda']) == "tienda") {
				echo '<input type="text" value="true" id="tipo_tienda" hidden="true">';
				} else {
				echo '<input type="text" value="false" id="tipo_tienda" hidden="true">';
				}
		?>
		<div class="text-center section-gap pre-loader"> 
		 
		<input type="number" value="<?php echo $datosTienda[0]['reseñas']?>" id="reseña-mode" hidden="true">
		
		<img src="sistema/images/loaderIcon.png"  class="animated infinite bounceIn" width="25%" alt="">
		<p>Cargando...</p>
		</div>
		
		</div> 
 
		<header  class="fixed-top" id="home">
		
			    <div class="container">
			     
					<nav class="navbar sticky-top navbar-expand-lg">
      		
			   		<div class="container ">
					<a  class=" navbar-brand py-2" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" href="#">
					<img src="sistema/images/icono_claro"  class="icon-claro d-inline-block align-top rounded-circle  img-fluid" width="35em" alt="">
					<img src="sistema/images/icono_oscuro"  class="icon-oscuro d-inline-block align-top rounded-circle  img-fluid" width="35em" alt="">
					<span class="navbar-brand mb-0 h3">Revisits</span>
          </a>
			 
         <a class="navbar-toggler navbar-brand py-2 " data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" href="#">
           <i class="fas fa-bars"></i>
          </a>
				         
          <div class="collapse navbar-collapse" id="navbarNav">
           
           <ul class="navbar-nav container d-flex flex-column flex-md-row justify-content-between nav" id="myTab" role="tablist">
           
			 <li class="nav-item">
              <a class="nav-link <?php if ($pedido == 0) { echo "active";  } ?> " id="inicio-tab" data-toggle="tab" href="#inicio" role="tab" aria-controls="inicio" aria-selected="true"><i class="fas fa-star"></i> Inicio</a>
            </li>
		 
            <li class="nav-item">
              <a class="nav-link" id="privacy-tab" data-toggle="tab" href="#privacy" role="tab" aria-controls="privacy" aria-selected="false"> <i class="fas fa-user-lock"></i> Politica de Privacidad </a> 
            </li>
            <li class="nav-item">
              <a class="nav-link boton_legal" id="legal-tab" data-toggle="tab" href="#legal" role="tab" aria-controls="legal" aria-selected="false"> <i class="fas fa-handshake"></i> Terminos y condiciones</a>
            </li>
		 
			<li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i class="fas fa-headset"></i> Contacto</a>
            </li>
						
           <ul>

					 </ul>
          </ul>
          </div>
        </div>
			
		</nav> 	
		
			 
			    	</div>
			    </div>
				</header>
							  
		 
					<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade <?php if ($pedido == 0) { echo "show active";  } ?> " id="inicio" role="tabpanel" aria-labelledby="inicio-tab">
							
										<div class="bd-example">
										<div id="particles-js"></div>
												 	<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
														 
																<br>
																<br>
																<br>
																<br>
																<img src="sistema/images/cover.png" class="img-fluid" width="500em" alt="">
																<H1>Descarga</H1>
																<a href="https://apps.apple.com/mx/app/revisits/id1513271477">
																	<img src="sistema/images/AppStore.png" class="img-fluid" heigth="150em00em" alt="">
																</a>
																<br>
																<br>
													

														</div>							
													</div>
												</div>
											</div>
								</section>
											
										</div>

 
						<!-- End top-course Area -->

						<section style="" class="section-gap" style="" id="faq">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-60 col-lg-10">
							<div class="title text-center">
							<img src="sistema/images/icono_claro"  class="icon d-inline-block align-top img-fluid" width="200em" alt=""> 

								<h1 class="mb-10">Novedades de la version 1.0</h1> 
							</div>
						</div>
					</div>						
					<div class="row justify-content-start">
					<div class="row" id="pq_comprar">
							 
						 
						
					</div>

					 	
					</div>
				</div>	
			</section>
			<section style="" class="beta-area section-gap" style="" id="beta">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-60 col-lg-10">
							<div class="title text-center">
							<img src="sistema/images/iconBeta.png"  class="icon  d-inline-block align-top img-fluid" width="200em" alt="">
							 
								<h1 class="text-white mb-10">Unete a la beta</h1> 
								<p class="text-white">Prueba las nuevas funciones antes que nadie y ayuda a desarrollar la App</p>
								<p>
									<a href="https://testflight.apple.com/join/Ir02ia6z">
										<img src="sistema/images/TestFlight.png" class="img-fluid" heigth="150em00em" alt="">
									</a>
								</p>
							</div>
						</div>
					</div>						
					<div class="row justify-content-start">
					
					 	
					</div>
				</div>	
			</section>
		</div>
					 
							<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

									<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
														 
																<br>
																<br>
																<br>
																<br>
															
															<?php 
															$estado = array("Usuario no verificado", "Datos en revisión", "<strong>Usuario verificado</strong>");
															$icono = array("<h1 class='text-white'><i class='fa fa-user'></i>","<h1 class='text-white'><i class='fa fa-user'></i>","<i class='fas fa-user-check'></i>");
															$dato = $datosUsuario[0]['verificado'];
															$icono = $icono[$dato];
															$texto = $estado[$dato];
															echo '<h1 class="text-white">'.$icono.' Perfil de Usuario </h1>'; 
															echo '<h4 class="text-white">'.$texto.'</h4>'; 

															?>
																<br>
													

														</div>							
													</div>
												</div>
											</div>
								</section>
						
							<div class="container"> 
							<br>
							<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
													
													<li class="nav-item">
														<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
														<i class="fa fa-user"></i> Datos Usuario
														</a>
													</li>

												

													<li class="nav-item">
														<a class="nav-link" id="pills-dir-tab" data-toggle="pill" href="#pills-dir" role="tab" aria-controls="pills-dir" aria-selected="false">
														<i class="fa fa-map-marker"></i> Direcciones
														</a>
													</li>

													<li class="nav-item">
														<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
														<i class="fa fa-truck"></i> Mis pedidos
														</a>
													</li>

													<li class="nav-item">
														<a class="nav-link" id="pills-ine-tab" data-toggle="pill" href="#pills-ine" role="tab" aria-controls="pills-ine" aria-selected="false">
														<i class="fa fa-address-card"></i> INE
														</a>
													</li>

													
											
												</ul>
												<div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
					  <?php 
					 	include 'sistema/estructura/tienda/datos_usuario.php'; 
					  ?>
					<button id="actualizar_datos" class="btn btn-lg btn-success btn-block"><i class="fa fa-refresh"></i> Actualizar</button>
              
            </div>

            <div class="tab-pane fade" id="pills-dir" role="tabpanel" aria-labelledby="pills-dir-tab">
							
									<?php 
										if (is_null($direccionesEnvio)) { 
											$notificaciones + 1;
											echo '
											<div class="alert alert-warning" role="alert">
											<i class="fa fa-exclamation-triangle"></i> No tienes registrada un dirección para recibir tu envio  
											</div>

											<form id="DirDelUsuario">

											<h4>Crea una nueva dirección donde recibir tus compras</h4>

												<input type="number" class="form-control" value="'.$datosUsuario[0]['id'].'" id="id_usuario_dir" name="id_usuario_dir"  hidden="true">
												
												<div class="form-group">
													<label for="formGroupExampleInput">Destinatario</label>
													<input type="text" class="form-control" value="" id="nombre" name="nombre" placeholder="Persona que recibira el paquete">
												</div>

												<div class="form-group">
													<label for="formGroupExampleInput2">Estado</label>
													<input type="text" class="form-control" value=""  id="estado" name="estado">
												</div>

												<div class="form-group">
													<label for="formGroupExampleInput2">Ciudad o Localidad</label>
													<input type="text" class="form-control" value=""  id="ciudad" name="ciudad">
												</div>

												<div class="form-group">
													<label for="formGroupExampleInput2">Codigo Postal</label>
													<input type="text" class="form-control" value=""  id="cp" name="cp">
												</div>
												<div class="form-group">
												<label for="formGroupExampleInput2">Calle</label>
												<input type="text" class="form-control"   id="calle" name="calle">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Numero Exterior</label>
												<input type="text" class="form-control"  id="nexterior" name="nexterior">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Numero Interior</label>
												<input type="text" class="form-control"  id="ninterior" name="ninterior">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Colonia</label>
												<input type="text" class="form-control"  id="colonia" name="colonia">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Municipio o Delegación</label>
												<input type="text" class="form-control"  id="municipality" name="municipality">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">País</label>
												<input type="text" class="form-control" value="México"  id="country" name="country">
											</div>

												<div class="form-group">
													<label for="formGroupExampleInput2">Notas y señas particulares</label>
													<textarea class="form-control" placeholder="Calle, colonia, numero exterior e interior y referencias"  name="dir" id="dir" cols="30" rows="10"></textarea> 
												</div>
												
											</form>

											<button id="registrar_dir" class="btn btn-lg btn-success btn-block"><i class="fa fa-plus"></i> Crear</button>';

										} else{
											echo '  
											<form id="DirDelUsuario">
											<input type="number" class="form-control" value="'.$datosUsuario[0]['id'].'" id="id_usuario_dir" name="id_usuario_dir"  hidden="true">
											<div class="form-group">
												<label for="formGroupExampleInput">Destinatario</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['nombre'].'" id="nombre" name="nombre" placeholder="Persona que recibira el paquete">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Estado</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['estado'].'"  id="estado" name="estado">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Ciudad o Localidad</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['ciudad'].'"  id="ciudad" name="ciudad">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Codigo Postal</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['cp'].'"  id="cp" name="cp">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Calle</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['calle'].'"  id="calle" name="calle">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Numero Exterior</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['nexterior'].'"  id="nexterior" name="nexterior">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Numero Interior</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['ninterior'].'"  id="ninterior" name="ninterior">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Colonia</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['colonia'].'"  id="colonia" name="colonia">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">Municipío</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['municipality'].'"  id="municipality" name="municipality">
											</div>
											<div class="form-group">
												<label for="formGroupExampleInput2">País</label>
												<input type="text" class="form-control" value="'.$direccionesEnvio[0]['country'].'"  id="country" name="country">
											</div>

											
											<div class="form-group">
												<label for="formGroupExampleInput2">Notas y señas particulares</label>
												<textarea class="form-control" placeholder="Calle, colonia, numero exterior e interior y referencias"  name="dir" id="dir" cols="30" rows="10">'.$direccionesEnvio[0]['dir'].'</textarea> 
											</div>
										</form>
										<button id="actualizar_dir" class="btn btn-lg btn-success btn-block"><i class="fa fa-refresh"></i> Actualizar </button>';
										}
									?> 
            </div>
						<div class="tab-pane fade" id="pills-ine" role="tabpanel" aria-labelledby="pills-ine-tab">
						<h4>INE</h4>
						<p>Sube una copia de tu credencial, de ambos lados que coincida con los datos que nos has proporcionado para activar los pagos a meses.</p>
						<p>Estatus actual: </p> 
						<?php 
						$estado = array("No ha enviado datos", "En revisión", "<span class='text-success'> <i class='fa fa user-check'></i> Usuario verificado</span>");
						if (is_null($datosUsuario[0]['ine'])) {

						}else{
							echo '<img class="img-fluid" src="data:'.($datosUsuario[0]['tipo_archivo']).';base64,'.($datosUsuario[0]['ine']).'" alt="">';
						} ?>

						<form id="upload_ine" class="col-12 dropzone" action="sistema/php/users/form_upload.php" style="border: 1px solid #e5e5e5; height: 300px;">
                                <input name="id_usuario"  id="id_usuario" value="<?php echo $id_usuario; ?>" hidden="true"> 
             </form>
						</div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div id="div_tabla_pedidos"></div>
						
            </div>
						 </div>

           </div>
					 <br>

        </div>
				<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
				<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
																<br>
																<br>
																<br>
																<br>
															 
																<h1 class="text-white"><i class="fas fa-headset"></i>  Contacto </h1>
															
																<br>
													

														</div>							
													</div>
												</div>
											</div>
								</section>
					<div class="container">
						<br>
						<h1 class="text-primary"><i class="fas fa-headset"></i>  Diferentes formas de ponernos en contacto </h1>
						<p><i class="fa fa-phone"></i> <?php echo $datosEmpresa[0]['tels'];?> <i class="fa fa-envelope"></i>  <?php echo $datosEmpresa[0]['mail'];?> </p>
							 
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['fb']?>"><i class="fa fa-facebook"></i></a>
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['twtr']?>"><i class="fa fa-twitter"></i></a> 
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['inst']?>"><i class="fa fa-instagram"></i></a>
							  
						<a href="mailto:<?php echo $datosEmpresa[0]["mail"]?>" class="btn btn-secondary"><i class="fa fa-envelope"></i> Escribenos</a>						 
						 <br>
						<br>
					 </div>
				</div>
				
      <div class="tab-pane fade" id="notificaciones" role="tabpanel" aria-labelledby="notificaciones-tab">
			<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
																<br>
																<br>
																<br>
																<br>
															 
																<h1 class="text-white"><i class="fas fa-bell"></i>  Notificaciones </h1>
															
																<br>
													

														</div>							
													</div>
												</div>
											</div>
								</section>
								<div >
									<?php 
									if (is_null($direccionesEnvio)) { 
										echo '  
										<div class="alert alert-warning alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> Sin dirección de envio </strong> 
										No tiene registrada un dirección para recibir tu envio, agrege una en sus datos de perfil.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										'; 
									}
									if (is_null($password)) { 
										echo '  
										<div class="alert alert-warning alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> Sin contraseña </strong> 
									 	Registra en tus datos de perfil una contraseña y correo para poder loggearte.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										'; 
									}

									if (is_null($email)) { 
										echo '  
										<div class="alert alert-warning alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> Sin email</strong> 
									 	Registra en tus datos de perfil una contraseña y correo para poder loggearte.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										'; 
									}
									if ($verificado == 0) {
										echo '  
										<div class="alert alert-warning alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> No has verificado tu identidad </strong> 
										Verifica tu identidad subiendo una copia de tu INE para poder comprar a meses sin intereses.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										'; 
									}
									if ($datosUsuario[0]['pedido'] == 1) { 
										echo ' 
										<div class="alert alert-info alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> Pedido en revisión </strong> 
										Cuando tu pedido sea aprobado te enviaremos un mensaje, si gustas puedes contactarnos en nuestros chats.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										'; 
									} elseif ($datosUsuario[0]['pedido'] == 2){ 
										echo ' 
										<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> En espera de pago</strong> 
										Tu pedido ha sido aprobado y el costo de envio ha sido proporcionado para que hagas tu pago.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										';
									} elseif ($datosUsuario[0]['pedido'] == 3){ 
										echo ' 
										<div class="alert alert-info alert-dismissible fade show" role="alert">
										<strong><i class="fa fa-exclamation-triangle"></i> ¡Recibimos tu pago!</strong> 
											En cuanto tengamos tu numero de guia te avisaremos.
										<button type="button" class="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
										';
									} 

									?> 
								</div>
     </div>
      <div class="tab-pane fade <?php if($pedido != 0){echo 'show active'; } ?>" id="legal" role="tabpanel" aria-labelledby="legal-tab">
					<section class="generic-banner relative">	
													<div class="container">
														<div class="row align-items-center justify-content-center">
															<div class="col-lg-10">
																<div class="generic-banner-content">
																		<br>
																		<br>
																		<br>
																		<br>
																 
																		<h1 class="text-white"><i class="fas fa-handshake"></i> Terminos y condiciones</h1>
															
																	
																		<br>
															

																</div>							
															</div>
														</div>
													</div>
						</section>
						<div class="container">
							<br>
							<p>Este un contrato legal entre usted (de ahora en adelante denominado el usuario) y Landecorp Mx (de ahora en adelante el desarrollador). </p>
							<p> Esta aplicación se entrega tal y como es sin garantías ni promesas. </p>
							<p> Al usar esta aplicación usted acepta que se use su cuenta de iCloud para respalda y sincronizar sus datos</p>
							<p> En todo momento usted es el único responsable de la información que guarde dentro de esta aplicación y de su resguardo y sera su deber cumplir con la legislación de su país al respecto.</p>
							<p> La información que usted almacena es guardada de manera segura en su dispositivo y en iCloud, al usar esta App se entiende que usted esta de acuerdo con esto.</p>
							<p> El desarrollador no proveerá ni proporcionará respaldos de esta información ni se compromete a recuperarla en caso de que se pierda, de hecho no es técnicamente posible para el desarrollador accesar a su información al estar resguarda en su cuenta de iCloud y en su dispositivos.</p> 
							<p> El desarrollador se desliza de cualquier responsabilidad relacionada con la perdida, filtración, robo o modificación no deseaba o no autorizada de la información almacenada en la app. </p>
							<p> El desarrollador no se hará responsable de posibles daños a su dispositivo resultado del uso de versiones beta o finales de esta App.</p>
							<p>Ultima Actulización 17 septiembre 2020</p>
						</div>
      </div>
			<div class="tab-pane fade" id="privacy" role="tabpanel" aria-labelledby="privacy-tab">
					<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
														<br>
																		<br>
																		<br>
																		<br>
																 
																		<h1 class="text-white"><i class="fas fa-user-lock"></i> Politica de Privacidad</h1>
															
																	
																		<br>
													

														</div>							
													</div>
												</div>
											</div>
					</section>
					<div class="container">
					<br> 
					<p>Esta es la política de privacidad de Landercorp Mx sus productos y servicios. </p>

					<p>LanderCorp no vende, monetiza, analiza o colecta ningún tipo de información de sus usuarios. Todas las aplicaciones que soportan sincronización de datos utilizan iCloud, y la información no es accesible para el desarrollador algunas aplicaciones también utilizan servicios de geolocalización y mapas, los cuales son proporcionados por Apple y requeridos cada vez que se usen en su dispositivo, puede deshabilitar estos servicios en la sección de ajustes de su dispositivo. Para mas información sobre la política de privacidad de Apple, sus servicio o iCloud visite <a href="https://www.apple.com/legal/privacy/">www.apple.com/legal/privacy</a>  </p>
				 
					</div>
				</div>
      </div>
      
		</div>



	 
			<!-- End faq Area -->
			<!-- start footer Area -->		
			<footer class="footer-area section-gap">
				<div class="container">
					<div class="row">
						<div class="col-lg-5 col-md-6 col-sm-6">
							<div class="single-footer-widget">
								<h6>Aviso Legal</h6>
								Al usar este sitio se entiende que usted acepta nuestros <a href="https://landercorp.mx/Apps/Revisits/#legal/"><i class="fas fa-handshake"></i> Terminos y condiciones</a> de uso.
								
								<br>
								<br>
								<p>
									<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
								 	<img src="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" width="30" height="30" class="icon d-inline-block align-top" alt="">
          			  				 <br>
									  <?php echo $datosEmpresa[0]['nombre'];?> Copyright &copy;<script>document.write(new Date().getFullYear());</script> | Todos los derechos reservados | <a href="http://www.landercorp.mx" target="_blank">LanderCorp.mx</a>
									<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
								</p>
														
							</div> 
						</div>
						<div class="col-lg-5  col-md-6 col-sm-6">
							<div class="single-footer-widget">
							   <h6>Sobre nosotros</h6>
								<p>
								<?php echo $datosEmpresa[0]['sobre_nosotros_corto'];?>	
								</p>
								<h6>Tu privacidad es importante</h6>
								<p>
								No utilizamos cookies propios ni de terceros para rastrear tus habitos de navegación.
								</p>
							</div>
							
						</div>						
						<div class="col-lg-2 col-md-6 col-sm-6 social-widget">
							<div class="single-footer-widget">
								<h6>Siguenos</h6>
								<p>En nuestras redes sociales</p>
								<div class="footer-social d-flex align-items-center">
									<a href="<?php echo $datosEmpresa[0]['fb']?>"><i class="fa fa-facebook"></i></a>
									<a href="<?php echo $datosEmpresa[0]['twtr']?>"><i class="fa fa-twitter"></i></a> 
									<a href="<?php echo $datosEmpresa[0]['inst']?>"><i class="fa fa-instagram"></i></a>
								</div>
							</div>
							<br>
							<div class="single-footer-widget">
							<h5>Administración</h5>
								<ul class="list-unstyled text-small">
									<li><a href="sistema/home.php"> <i class="fa fa-user"></i> Iniciar Sesión</a></li> 
								</ul>	
							</div>
						</div>  
					</div>
				</div>
			</footer>	
			<!-- End footer Area -->	

			

		</body>
		<input id="fb_appID" type="text" value="<?php echo $datosTienda[0]['fb_appId'];?>" hidden="true">
		<input id="fb_state" type="text" value="<?php echo $datosTienda[0]['fb_state'];?>" hidden="true">
		<input id="fb_redirect" type="text" value="<?php echo $datosTienda[0]['fb_redirect'];?>" hidden="true">
		
	</html>
 
  <!-- Placed at the end of the document so the pages load faster -->
			<script src="sistema/js/jquery.min.js" type="text/javascript"></script>
			<script src="watch/js/vendor/jquery-2.2.4.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
			<script src="watch/js/vendor/bootstrap.min.js"></script>			
		  <script src="watch/js/easing.min.js"></script>			
			<script src="watch/js/hoverIntent.js"></script>
			<script src="watch/js/superfish.min.js"></script>	
			<script src="watch/js/jquery.ajaxchimp.min.js"></script>
			<script src="watch/js/jquery.magnific-popup.min.js"></script>	
			<script src="watch/js/owl.carousel.min.js"></script>			
			<script src="watch/js/jquery.sticky.js"></script>
			<script src="watch/js/jquery.nice-select.min.js"></script>			
			<script src="watch/js/parallax.min.js"></script>	
			<script src="watch/js/mail-script.js"></script>	
			<script src="watch/js/main.js"></script>	
			<!-- DataTables-->
			<script type="text/javascript" src="sistema/js/dataTables/datatables.min.js"></script>
			<!-- funciones Generales-->
			<script src="sistema/js/funciones_generales.js"></script>
			<script src="sistema/js/revisits.js"></script>
			<script src="sistema/js/login/login.js"></script>

			<!-- Paypal -->
			<script src="https://www.paypalobjects.com/api/checkout.js"></script>
			<script>paypal.Button().render('body');</script>

			<!-- OpenPay -->
			<script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></script>
			<script type='text/javascript' src="https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"></script>

			<!-- PNotify -->
			<script type="text/javascript" src="sistema/js/notify/pnotify.core.js"></script>
			<script type="text/javascript" src="sistema/js/notify/pnotify.buttons.js"></script>
			<script type="text/javascript" src="sistema/js/notify/pnotify.nonblock.js"></script>


			<!-- Google Map -->
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAaa4JXJAQDCfqdyXf--w7VOmdg-QO3UVc"></script>
			<script src="sistema/js/mapa/google_map.js"></script>
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  	<!-- DropZone.js -->
		<script src="sistema/js/dropzone.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<!-- mercado pago -->
	<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
	<!-- particulas -->
	<!-- scripts -->
<script src="sistema/js/particulas/particles.js"></script>
<script src="sistema/js/particulas/app.js"></script>
<!-- stats.js -->
<script src="sistema/js/particulas/lib/stats.js"></script>
    <script src="sistema/js/bootstrap.min.js"></script>
    <script>
      Holder.addTheme('thumb', {
        bg: '#55595c',
        fg: '#eceeef',
        text: 'Thumbnail'
      });
    </script>
 
    <script src="https://sdk.accountkit.com/es_ES/sdk.js"></script>
    <script>

				var fb_appID = $('#fb_appID').val();			
				var fb_state = $('#fb_state').val();			
				var fb_redirect = $('#fb_redirect').val();
	 
        AccountKit_OnInteractive = function(){
        AccountKit.init(
          {
            appId:fb_appID,
            state:fb_state,
            version:"v1.1",
            fbAppEventsEnabled:true,
            debug: true,
            redirect:fb_redirect
          }
        );
      };

      // login callback
      function loginCallback(response) {
        if (response.status === "PARTIALLY_AUTHENTICATED") {
          var code = response.code;
          var csrf = response.state;
					var phoneNumber = document.getElementById("phone_number").value;
					var emailAddress = document.getElementById("email").value;
                   var nombre = document.getElementById("nombre").value;
					var apellidos = document.getElementById("apellidos").value;
					var password1 = document.getElementById("password_registro").value;
					var password2 = document.getElementById("password_registro2").value;

					if (password1 == null || password1 == '') {
              $('#password1').show();
              return;
          } else {
              $('#password1').hide();
					}

					if (password1 != password2) {
              $('#password2').show();
              return;
          } else {
              $('#password2').hide();
					}
					
          // Send code to server to exchange for access token
          $.ajax({
            data: 'telefono=' + phoneNumber + '&email=' + emailAddress + '&password=' + password1 + '&token=' + code + '&state=' + response.state + '&nombre=' + nombre + '&apellidos=' + apellidos,
            type: 'POST',
            url: 'sistema/php/users/crear.php',
            success: function(data, textStatus) {
                window.location.href = "index.php";
            },
            error: function(jqXHR, txtsStatus, erro) {
                console.log(jqXHR);
            }
          });
        }
        else if (response.status === "NOT_AUTHENTICATED") {
          // handle authentication failure
        }
        else if (response.status === "BAD_PARAMS") {
          // handle bad parameters
        }
      }

      // phone form submission handler
      function smsLogin() {
        var countryCode = document.getElementById("country_code").value;
				var phoneNumber = document.getElementById("phone_number").value;
				var emailAddress = document.getElementById("email").value;
          var nombre = document.getElementById("nombre").value;
					var apellidos = document.getElementById("apellidos").value;
					var password1 = document.getElementById("password_registro").value;
					var password2 = document.getElementById("password_registro2").value;

					if (password1 == null || password1 == '') {
              $('#password1').show();
              return;
          } else {
              $('#password1').hide();
					}

					if (password1 != password2) {
              $('#password2').show();
              return;
          } else {
              $('#password2').hide();
					}
					if (nombre == null || nombre == '') {
              $('#nombrevalid').show();
              return;
          } else {
              $('#nombrevalid').hide();
          }
          if (apellidos == null || apellidos == '') {
              $('#apellidosvalid').show();
              return;
          } else {
              $('#apellidosvalid').hide();
					}
					if (emailAddress  == null || emailAddress  == '') {
              $('#emailvalid').show();
              return;
          } else {
              $('#emailvalid').hide();
					}
					if (phoneNumber  == null || phoneNumber  == '') {
              $('#telefonosvalid').show();
              return;
          } else {
              $('#telefonosvalid').hide();
          }
        AccountKit.login(
          'PHONE',
          {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
          loginCallback
        );
      }
	 
      // email form submission handler
      function emailLogin() {
        var emailAddress = document.getElementById("email").value;
          var nombre = document.getElementById("nombre").value;
          var apellidos = document.getElementById("apellidos").value;
          if (nombre == null || nombre == '') {
              $('#nombrevalid').show();
              return;
          } else {
              $('#nombrevalid').hide();
          }
          if (apellidos == null || apellidos == '') {
              $('#apellidosvalid').show();
              return;
          } else {
              $('#apellidosvalid').hide();
					}
					if (emailAddress  == null || emailAddress  == '') {
              $('#emailvalid').show();
              return;
          } else {
              $('#emailvalid').hide();
					}
					var password1 = document.getElementById("password_registro").value;
					var password2 = document.getElementById("password_registro2").value;

					if (password1 == null || password1 == '') {
              $('#password1').show();
              return;
          } else {
              $('#password1').hide();
					}

					if (password1 != password2) {
              $('#password2').show();
              return;
          } else {
              $('#password2').hide();
					}
          $.ajax({
            data: 'nombre=' + nombre + '&apellidos=' + apellidos,
            type: 'GET',
            url: 'guardar.php',
            success: function(data, textStatus) {
                console.log(data);
            },
            error: function(jqXHR, txtsStatus, erro) {
                console.log(jqXHR);
            }
          });
        AccountKit.login(
          'email',
          {emailAddress: emailAddress},
          loginCallback
        );
      }
   
      $('#nombrevalid').hide();
			$('#apellidosvalid').hide();
			$('#telefonosvalid').hide();
			$('#emailvalid').hide(); 
			$('#password2').hide();
			$('#password1').hide();
    </script>

<!-- Load Facebook SDK for JavaScript -->
<div id="fb-root"></div>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            xfbml            : true,
            version          : 'v4.0'
          });
        };

        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));</script>

      <!-- Your customer chat code -->
      <div class="fb-customerchat"
        attribution=setup_tool
        page_id="315146926047797"
 		theme_color="#ff7e29"
  		logged_in_greeting="¡Hola! ¿Como puedo ayudarte?"
  		logged_out_greeting="¡Hola! ¿Como puedo ayudarte?">
      </div>
</body>
</html>
<script>
 $(document).ready(() => {
  let url = location.href.replace(/\/$/, "");
 
  if (location.hash) {
    const hash = url.split("#");
    $('#myTab a[href="#'+hash[1]+'"]').tab("show");
    url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  } 
   
  $('a[data-toggle="tab"]').on("click", function() {
    let newUrl;
    const hash = $(this).attr("href");
    if(hash == "#home") {
      newUrl = url.split("#")[0];
    } else {
      newUrl = url.split("#")[0] + hash;
    }
    newUrl += "/";
    history.replaceState(null, null, newUrl);
  });

  
});
</script>
