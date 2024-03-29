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



?>
	<!DOCTYPE html>
	<html lang="zxx" class="no-js">
	<head>
		<!-- Mobile Specific Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		 
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
		<!-- Meta Description -->
		<meta name="description" content="<?php echo $datosTienda[0]['cabezera_titulo'];?>">
		<!-- Meta Keyword -->
		<meta name="keywords" content="<?php echo $datosEmpresa[0]['sobre_nosotros_corto'];?>">	
	  <!-- DropZones -->
		<link href="sistema/css/dropzone.css"    rel="stylesheet">

		<!-- iconos font-awesome --> 
	 	<!-- Font Awesome -->
  		<link href="sistema/css/fonts/css/all.min.css" rel="stylesheet">
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
			<link rel="stylesheet" href="watch/css/bootstrap.css">
			<link rel="stylesheet" href="watch/css/magnific-popup.css">
			<link rel="stylesheet" href="watch/css/nice-select.css">	 
			<link rel="stylesheet" href="watch/css/owl.carousel.css">

			 <!-- Bootstrap core CSS -->
			 <link href="sistema/css/bootstrap.min.css" rel="stylesheet">

			<link rel="stylesheet" href="watch/css/main_crispy.css">
			
			<!-- Animate  Files -->
			<link href="sistema/css/animate.css" rel="stylesheet" />  
			<!-- Pnotify CSS -->
			<link href="Pnotify.css" rel="stylesheet">
			
			<!-- Bootstrap core CSS 
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
			-->
	<style>
				<?php 
					echo $datosTienda[0]['ver_mas_dir'];
				?>
				
			</style>
    
	
		</head>
		
		<body> 	
		<div class="top-course-area section-gap pre-loader" > 
		<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
		
	</div>
		
		</div>
		
		<?php 
							include 'sistema/estructura/tienda/detalles_articulo.php';
							?>
		<?php 

if ($produccion == 1) {
	 echo '
	 <input type="number" value="'.$produccion.'" id="produccion" hidden="true">

	 <input type="text" value="'.$datosTienda[0]['openpay_cliente_id'].'" id="openpay-id" hidden="true">
	 <input type="text" value="'.$datosTienda[0]['openpay_public'].'" id="openpay-public" hidden="true">
	 
	 ';

} else{
	echo '
	<input type="number" value="'.$produccion.'" id="produccion" hidden="true">

	<input type="text" value="'.$datosTienda[0]['openpay_cliente_id_sandbox'].'" id="openpay-id" hidden="true">
	<input type="text" value="'.$datosTienda[0]['openpay_public_sandbox'].'" id="openpay-public" hidden="true">
	
	
	';
}

if ($datosUsuario[0]['pedido'] == 1) {

				echo '<input type="number" value="'.$pedido.'" id="pedido" hidden="true">';

			} elseif ($datosUsuario[0]['pedido'] == 2){
				echo '<input type="number" value="'.$pedido.'" id="pedido" hidden="true">';

			} elseif ($datosUsuario[0]['pedido'] == 3){
				echo '<input type="number" value="'.$pedido.'" id="pedido" hidden="true">';

			} 
		 ?>
 

 <nav class="navbar-light inversePrimarySet" style="text-align: center;">
 <span  class="navbar-text inversePrimarySet">
 <?php echo $datosTienda[0]['cabezara_texto'];?>
 </span>
 
</nav>
		<header class="sticky-top bg-secondary" id="home">
		
			    <div class="container"> 

					<nav class="navbar sticky-top navbar-expand-lg navbar-dark ">
      		
			   		<div class="container ">
					<a  class=" navbar-brand py-2" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" href="#">
					<img src="sistema/images/icono_oscuro"  class="icon-oscuro rounded-circle d-inline-block align-top img-fluid" width="50em" alt="">
          </a>
			 
         <a class="navbar-toggler navbar-brand py-2 " data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" href="#">
           <i class="fa fa-bars"></i>
          </a>
				         
          <div class="collapse navbar-collapse" id="navbarNav">
           
           <ul class="navbar-nav container d-flex flex-column flex-md-row justify-content-between nav" id="myTab" role="tablist">
           <li class="nav-item dropdown">
              <?php 
              if($id_usuario < 1) {
               
                echo '<a class="nav-link" id="profile-tab"  data-toggle="modal"  href="#"  role="tab" aria-controls="profile"  data-target="#modal-login" aria-selected="false">
                <img width="20em" class="img img-fluid img-circle rounded-circle" src="sistema/images/user.png">
                Iniciar Sesión
                </a>';
               
              } else{
                echo '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img width="20em" class="img img-fluid img-circle rounded-circle" src="sistema/images/user.png">
                '.$datosUsuario[0]['nombre'].'
                </a>
                <div class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                  <i class="fa fa-user"></i> Ver datos de perfil
                  </a> 
                  <a class="dropdown-item" href="sistema/php/login/log_out.php">
                      <button class="btn btn-outline-danger my-2 my-sm-0">
                      <i class="fa fa-times-circle"></i> Salir</button>  
                  </a>
                </div>';
              }
              ?>
            </li>
			<li class="nav-item">
              <a class="nav-link active" id="inicio-tab" data-toggle="tab" href="#inicio" role="tab" aria-controls="inicio" aria-selected="true"><i class="fa fa-home"></i> Inicio</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" id="store-tab" data-toggle="tab" href="#store" role="tab" aria-controls="store" aria-selected="false"><i class="fas fa-store"></i> Tienda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i class="fas fa-headset"></i> Contacto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link  boton_bolsa" id="bolsa-tab" data-toggle="tab" href="#bolsa" role="tab" aria-controls="bolsa" aria-selected="false"> <i class="fa fa-shopping-bag"></i> Bolsa </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="notificaciones-tab" data-toggle="tab" href="#notificaciones" role="tab" aria-controls="notificaciones" aria-selected="false"> <i class="fa fa-bell"></i> Notificaciones
              <?php if ($notificaciones == 0) {
                echo "</a>";
              } else{
                echo '<span class="badge badge-light">'.$notificaciones.'</span> </a>';
              } ?>
               
            </li>
						<li class="nav-item">
						<div id="div_buscador">
													<?php 
														include 'sistema/estructura/buscador/buscador.php';
													?>
						</div>
					 	</li>
           <ul>

					 </ul>
          </ul>
          </div>
        </div>
			
		</nav> 	
 
				    <ul class="list-group sticky-top navbar-expand-lg navbar-dark " id="resultados_busqueda" > 
						</ul> 
			 
			    	</div>
			    </div>
				</header>
							  
				<input type="number" value="<?php echo $datosTienda[0]['reseñas']?>" id="reseña-mode" hidden="true">
		
			<div class="modal " id="modal-login" tabindex="-1" role="dialog">
      <div class="modal-dialog " role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <nav>
              <div class="nav nav-pills" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                 <i class="fa fa-sign-in"></i> Ingresar</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                <i class="fa fa-user-plus"></i> Registrarse</a> 
				<a class="nav-item nav-link" id="nav-key-tab" data-toggle="tab" href="#nav-key" role="tab" aria-controls="nav-profile" aria-selected="false">
                <i class="fa fa-key"></i> Recupera contraseña</a> 
              </div>
            </nav>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
		  <?php
				if (($datosTienda[0]['modo_tienda']) == "tienda") {
				echo '<input type="text" value="true" id="tipo_tienda" hidden="true">';
				} else {
				echo '<input type="text" value="false" id="tipo_tienda" hidden="true">';
				}
			?>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <!-- <form id="form_login_tienda" >-->
			
			<div id="signInForm">
				<h2 class="h2 text-center text-dark mb-3">Ingresar</h2>
                <div class="form-group">
                    <label for="userSIEmail">Email adress<span class="text-danger ml-1">*</span></label>
                    <input type="email" class="form-control" id="userSIEmail" onblur="checkUserSIEmail()"placeholder="mail@mail.com">
                    <small id="userSIEmailError" class="form-text text-danger">Please check your login information.</small>
                </div>
                <div class="form-group">
                    <label for="userSIPassword">Password<span class="text-danger ml-1">*</span></label>
                    <input type="password" class="form-control" id="userSIPassword" onblur="checkUserSIPassword()" placeholder="password">
                    <small id="userSIPasswordError" class="form-text text-danger">Revisa tu contraseña.</small>
                </div> 
            </div> 
          		<button type="button" class="btn btn-outline-primary text-uppercase mb-3" onclick="signIn()"><i class="fa fa-sign-in"></i>  Ingresar</button>
		  	<br>
					 
					  
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
						<div id="signUpForm">
                            <h2 class="h2 text-center text-dark mb-3">Registrarse</h2>
                            <div class="form-group">
                                <label for="userFullName">Nombre<span class="text-danger ml-1">*</span></label>
                                <input type="text" class="form-control" id="userFullName" onblur="checkUserFullName()" placeholder="name">
                                <small id="userFullNameError" class="form-text text-danger">Este campo es obligatorio.</small>
                            </div>
                            <div class="form-group">
                                <label for="userSurname">Apellido<span class="text-danger ml-1">*</span></label>
                                <input type="text" class="form-control" id="userLastName" onblur="checkUserLastName()" placeholder="surname">
                                <small id="userSurnameError" class="form-text text-danger">Este campo es obligatorio.</small>
                            </div>
                            <div class="form-group">
                                <label for="userEmail">Email address<span class="text-danger ml-1">*</span></label>
                                <input type="email" class="form-control" id="userEmail" onblur="checkUserEmail()" placeholder="mail@mail.com">
                                <small id="userEmailError" class="form-text text-danger">Revisa tu dirección de correo.</small>
                            </div>
                            <div class="form-group">
                                <label for="userPassword">Password<span class="text-danger ml-1">*</span></label>
                                <input type="password" class="form-control" id="userPassword" onblur="checkUserPassword()" placeholder="**********">
                                <small id="userPasswordError" class="form-text text-danger">Tu contraseña debe incluir mayusculas, minusculas y tener al menos 10 caracteres.</small>
                            </div>
                            <button type="button" class="btn btn-outline-primary text-uppercase mb-3" onclick="signUp()"><i class="fa fa-user-plus"></i> Registrarse</button>
                        </div> 
            </div> 
			<div class="tab-pane fade" id="nav-key" role="tabpanel" aria-labelledby="nav-key-tab">
			<h2 class="h2 text-center text-dark mb-3">Recuperar contraseña</h2>
                <div class="form-group">
                    <label for="userResetEmail">Email adress<span class="text-danger ml-1">*</span></label>
                    <input type="email" class="form-control" id="userResetEmail" onblur="checkUserEmailReset()" placeholder="mail@mail.com">
                    <small id="userResetEmailError" class="form-text text-danger">Por favor revisa tu correo.</small>
                </div> 
				<button type="button" class="btn btn-outline-primary text-uppercase mb-3" onclick="resetPassWord()"><i class="fas fa-sync-alt"></i> Recuperar</button>
			</div>
								
          </div> 
							
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Cancelar</button> 
          </div>
        </div>
      </div>
    </div>
				<!-- Modal terminos-->
<div class="modal fade" id="modal-terminos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Terminos y condiciones de uso</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
					<?php echo $datosEmpresa[0]["terminos"]?>
          </div>
          <div class="modal-footer"> 
            <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close"> <i class="fa fa-times"></i> Cerrar</button>
          </div>
        </div>
      </div>
    </div>
     <!-- Modal datos terminos -->
							<!-- Modal datos del pedido -->
							<div class="modal fade" id="modalDatosPedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-xl" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLabel">Datos del pedido</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
									<h4>Datos envio</h4>
												<div class="form-group datos-envio">
												<form id="datos_envio_pedido">
												
														<input type="text" id="id_pedido_consulta_pedido_historial" class="form-control id_pedido" name="id_pedido" hidden="true"> 
														<input type="text" class="form-control id_usaurio_pedido" name="id_usaurio_pedido" hidden="true"> 
														<input type="text" class="form-control status_pedio" name="status_pedido" hidden="true"> 
														<label for="">Empresa de paqueteria</label>
														<input type="text" class="form-control empresa_pedido_pedido" name="empresa_pedido" readonly> 
														<label for="">Costo envio</label>
														<input type="text" class="form-control costo_envio_pedido" name="costo_envio_pedido" readonly> 
														<div class="datos-actulizar"> 
														<label for="">Numero de guia</label>
														<input type="text" class="form-control numero_guia_pedido" name="numero_guia_pedido"   readonly> 
														<label for="">Notas para el cliente</label>
														<input type="text" class="form-control notas_pedido" name="notas_pedido"   readonly> 
														</div>
														<br>
												</form>

												<h2>Comprobante de pago</h2>
												<img class="img-fluid" id="comprobante_pago_pedido_img" src="">

												<form id="upload_compPago" class="col-12 dropzone" action="sistema/php/pedidos/upload_comprobante_pedido.php" style="border: 1px solid #e5e5e5; height: 300px;">
                          <input name="id_pedido"  class="id_pedido" hidden="true"> 
													<input name="status_pedio"  class="status_pedio" hidden="true"> 
             						</form>
													

												</div>
									<h4>Productos del Pedido</h4>              
													<table class="tabla_articulos_pedido table" width="100%">
														<thead> 
															<tr role="row">
															<th><i class='fa fa-cube'></i> Producto</th>
															<th><i class='fa fa-cubes'></i> Cantidad</th>
															<th><i class='fa fa-money'></i> Precio</th> 
															<th><i class='fa fa-edit'></i> Subtotal</th>
															<th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
														</tr> 
														</thead>
														<tbody>

														</tbody>
													</table> 
													<div class="alert alert-primary" role="alert">
													<p class=""> ¿<i class="fa fa-headset"> </i> Necesitas ayuda con tu pedido? contactanos para recibir soporte técnico.</p>
													<a href="tel:<?php echo $datosEmpresa[0]["tels"]?>" class="btn btn-secondary"><i class="fa fa-phone"></i> Llamar</a>
													<a href="mailto:<?php echo $datosEmpresa[0]["mail"]?>" class="btn btn-light"><i class="fa fa-envelope"></i> Escribenos</a>
													</div>
									</div>
									<div class="modal-footer"> 
										<button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close> <i class="fa fa-times"></i> Cerrar</button>
									</div>
								</div>
							</div>
						</div>
						
						<!-- Modal datos del pedido -->
					 

<!-- tabs -->
					<div class="tab-content" id="myTabContent">
						  
							<div class="tab-pane fade show active" id="inicio" role="tabpanel" aria-labelledby="inicio-tab">
										<div class="bd-example">
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

								<!-- Start top-course Area -->
								<section class="top-course-area section-gap">
								<div class="title text-center">

												<div class="container">
													<h1 class="mb-10 wow" >¿Por qué comprar con nosotros?</h1>
													<p>Mas de 5 años en el mercado nos respaldan.</p>
												
													<div class="col-12 single-review " style="background-image: linear-gradient(to bottom right, #e88e98, #e7363e);" >
														<div class="row">
															<div class="col-12">
																<br>
																<br>
															</div>
															<div class="col-12 col-md-6 ">
																<h2 style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;"  class="wow fadeInUp" data-wow-duration="3s" >Disfruta más de</h2>
																<h1 > <span class="numbers"> <span class="number-item"></span><h2><span class="value" style="text-shadow: 2px 2px 8px #000000; color: yellow; font-size: 72px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s">82</span></h2> </span> </h1>
			 
																<h2  style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s" >Sabores de paletas</h2>
															</div>
															<div class="col-12 col-md-6">
																<img width="50%" class="img-fluid single-review wow fadeInRight" data-wow-duration="3s" src="sistema/images/imagen_promocional/paleta1.jpg" alt="">
															</div>
														</div>

												 
													</div>

													<div class="col-12 single-review " style="background-image: linear-gradient(to bottom right, #9bdaf9, #0179da);" >
														<div class="row">
															<div class="col-12">
																<br>
																<br>
															</div>
															<div class="col-12 col-md-6">
																<img width="50%" class="img-fluid single-review wow fadeInRight" data-wow-duration="3s" src="sistema/images/imagen_promocional/paleta2.jpg" alt="">
															</div>
															<div class="col-12  col-md-6">
																<h2 style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;"  class="wow fadeInUp" data-wow-duration="3s" >Disfruta más de</h2>
																<h1 > <span class="numbers"> <span class="number-item"></span><h2><span class="value" style="text-shadow: 2px 2px 8px #000000; color: yellow; font-size: 72px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s">50</span></h2> </span> </h1>
			 
																<h2  style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s" >Sabores de paletas</h2>
															</div>
															
														</div>

												 
													</div>

													<div class="col-12 single-review " style="background-image: linear-gradient(to bottom right, #ffc100, #e7363e);" >
														<div class="row">
															<div class="col-12">
																<br>
																<br>
															</div>
															<div class="col-12  col-md-6">
																<h2 style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;"  class="wow fadeInUp" data-wow-duration="3s" >Disfruta más de</h2>
																<h1 > <span class="numbers"> <span class="number-item"></span><h2><span class="value" style="text-shadow: 2px 2px 8px #000000; color: yellow; font-size: 72px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s">82</span></h2> </span> </h1>
			 
																<h2  style="text-shadow: 2px 2px 8px #000000; color: #fff; font-size: 40px; font-weight: 700; line-height: 1em; margin-top: 20px;" class="wow fadeInUp" data-wow-duration="3s" >Sabores de paletas</h2>
															</div>
															<div class="col-12 col-md-6">
																<img width="50%" class="img-fluid single-review wow fadeInRight" data-wow-duration="3s" src="sistema/images/imagen_promocional/paleta3.jpg" alt="">
															</div>
														</div>

												 
													</div>

													<div class="row" id="pq_comprar">
														<div class="col-12" >
														<img class="fluid">
														</div>
														<div class="col-sm-3"><h4><i class="lnr lnr-rocket"></i> Envios Seguros</h4></div>
														<div class="col-sm-3"><h4><i class="lnr lnr-cog"></i> Soporte continuo</h4></div>
														<div class="col-sm-3"><h4><i class="lnr lnr-apartment"></i> Garantia de Fabrica</h4> </div>
														<div class="col-sm-3"><h4><i class="lnr lnr-phone"></i> Equipos Originales</h4> </div>
													</div>
													
												</div>

												
									</div>
			</section>


									<!-- Start unique-feature Area -->
									<section class="top-course-area  section-gap" id="unique2">
									<div class="container">
										<div class="row d-flex justify-content-center">
											<div class="menu-content pb-60 col-lg-10">
												<div class="title text-white text-center">
											
												<div class="row d-flex justify-content-center">
											<div class="menu-content pb-60 col-lg-10">
												<div class="title text-center">
													<h1 class="mb-10 text-danger">Ofertas <i class="fa fa-tag"></i></h1> 
												</div>
											</div>
										</div>
												<div id="productos-oferta" class="row"> 
												</div>	
												</div>
											</div>
										</div>						
										</section>
								<!-- End unique-feature Area -->


									<!-- Start unique-feature Area -->
									<section class="unique-feature-area section-gap" id="unique2">
									<div class="container">
										<div class="row d-flex justify-content-center">
											<div class="menu-content pb-60 col-lg-10">
												<div class="title text-white text-center">
											
												<div class="row d-flex justify-content-center">
											<div class="menu-content pb-60 col-lg-10">
												<div class="title text-center">
													<h1 class="mb-10 text-white">Destacados <i class="fa fa-star"></i></h1> 
												</div>
											</div>
										</div>
												<div id="productos-destacados" class="row"> 
												</div>	
												</div>
											</div>
										</div>						
										</section>
								<!-- End unique-feature Area -->
						<!-- End top-course Area -->

						<section style="background: url('sistema/images/portada') center; background-size: cover;" class="faq-area section-gap" style="" id="faq">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-60 col-lg-10">
							<div class="title text-center">
								<img src="sistema/images/icono_oscuro"  class="d-inline-block rounded-circle align-top img-fluid" width="150em" alt="">
          
								<h1 class="mb-10">Sobre Nosotros</h1>
								<p>	<?php echo $datosEmpresa[0]['sobre_nosotros_largo'];?>	</p>
							</div>
						</div>
					</div>						
					<div class="row justify-content-start">
						<div class="col-lg-6 faq-left ">
							<div id="accordion">

							  <div class="card">
							    <div class="card-header" id="headingOne">
							      <h5 class="mb-0">
							        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
							         Misión
							        </button>
							      </h5>
							    </div>

							    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" style="">
							      <div class="card-body">
										<?php echo $datosEmpresa[0]['mision'];?>	
										</div>
							    </div>
							  </div>

							  <div class="card">
							    <div class="card-header" id="headingTwo">
							      <h5 class="mb-0">
							        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							        Visión
							        </button>
							      </h5>
							    </div>

							    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion" style="">
							      <div class="card-body">
										<?php echo $datosEmpresa[0]['vision'];?>	</div>
										 </div>
							    </div>

							  </div>
							 
							  							  
							</div>

					 	
					</div>
				</div>	
			</section>
					<!-- Start review Area -->
				<section class="review-area section-gap" id="review">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-60 col-lg-10">
							<div class="title text-center">
								<h1 class="mb-10">Opiniones de nuestros clientes</h1>
								<p>Recopiladas de facebook y MercadoLibre</p>
							</div>
						</div>
					</div>						
					<div class="row" id="reseñas"> 

						<div class="col-lg-4 col-md-6">
							<div class="single-review">
								<h4>Jesús Ríos</h4>
								<p>
								Buena atención, hasta el momento no he tenido problemas con el celular, totalmente recomendado.
								</p>
								<div class="star">
									<span class="fa fa-star checked"></span>
									<span class="fa fa-star checked"></span>
									<span class="fa fa-star checked"></span>
									<span class="fa fa-star checked"></span>
									<span class="fa fa-star"></span>
								</div>
							</div>
						</div>	

					</div>
				</div>	
			</section>

		 
			<section id="instagram">

				<div class="container">
						<div class="row d-flex justify-content-center">
							<div class="menu-content pb-60 col-lg-10">
								<div class="title text-center">
									<h1 class="mb-10">Instagram <i class="fa fa-instagram"></i></h1> 
								</div>
							</div>
						</div>		
				</div>
						<script src="https://apps.elfsight.com/p/platform.js" defer></script>
						<div class="<?php echo $datosTienda[0]['chat_fb'];?>">
					</div>
			</section>
			<!-- End review Area -->
		
		
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
															$icono = array("<h1 class='text-white'><i class='fa fa-user'></i>","<h1 class='text-white'><i class='fa fa-user'></i>","<i class='fa fa-user-check'></i>");
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
												<!--
													<li class="nav-item">
														<a class="nav-link" id="pills-ine-tab" data-toggle="pill" href="#pills-ine" role="tab" aria-controls="pills-ine" aria-selected="false">
														<i class="fa fa-address-card"></i> INE
														</a>
													</li>
													-->

													
											
												</ul>
												<div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <form id="datosDelUsuario">
							<input type="number" class="form-control" value="<?php echo $datosUsuario[0]['id'] ?>" id="id" name="id"  hidden="true">
							<input type="number" class="form-control" value="0" id="perfil" name="perfil"  hidden="true">
													
							<h4>Datos basicos del usuario</h4>
              <div class="form-group">
                  <label for="formGroupExampleInput">Correo Electronico</label>
                  <input type="text" class="form-control" value="<?php echo $datosUsuario[0]['email'] ?>" id="email_user" name="correo" placeholder="Example input" disabled="true">
                </div>
				
                <div class="form-group">
                  <label for="formGroupExampleInput2">Nombre</label>
                  <input type="text" class="form-control" value="<?php echo $datosUsuario[0]['nombre'] ?>" id="nombre_user" name="nombre" placeholder="Another input">
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Apellido</label>
                  <input type="text" class="form-control" value="<?php echo $datosUsuario[0]['apellido'] ?>" id="apellido_user" name="apellidos" placeholder="Another input">
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Numero</label>
                  <input type="text" class="form-control"  value="<?php echo $datosUsuario[0]['telefono'] ?>" id="telefono_user" name="telefono" placeholder="Another input">
                </div>
				 <div class="form-group">
                  <label for="formGroupExampleInput2">Contraseña</label>
                  <input type="password" class="form-control"  value="<?php echo $datosUsuario[0]['password'] ?>" id="passwordr_user" name="rclave" placeholder="Another input" disabled="true">
									<label for="formGroupExampleInput2">Valida contraseña</label>
                  <input type="password" class="form-control"  value="<?php echo $datosUsuario[0]['password'] ?>" id="password_user" name="clave" placeholder="Another input" disabled="true">
                
                </div>
                
              </form>
							<button id="actualizar_datos" class="btn btn-lg btn-success btn-block"><i class="fa fa-refresh"></i> Actualizar</button>
              
            </div>

            <div class="tab-pane fade" id="pills-dir" role="tabpanel" aria-labelledby="pills-dir-tab">
			<div>
									<H2>Direcciones registradas</H2>
									<div id="div_tabla_direcciones"></div>
									</div>
									<?php 
										if (is_null($direccionesEnvio)) { 
											$notificaciones + 1;
										}
											echo '
											 

											<form id="DirDelUsuario">

											<h4>Crea una nueva dirección donde recibir tus compras</h4>

												<input type="number" class="form-control" value="'.$datosUsuario[0]['id'].'" id="id_usuario_dir" name="id_usuario_dir"  hidden="true">
												<div id="statusDir"></div>
												<div class="form-group">

                                                                            <label for="formGroupExampleInput">Destinatario</label>
                                                                            <input type="text" class="form-control"   id="dir_usuario_nombre"  name="nombre" placeholder="Persona que recibira el paquete">
																		</div>

                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Numero</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_nexterior"   name="nexterior">
                                                                        </div>
																		<div class="form-group">
                                                                            <label for="formGroupExampleInput2">Calle</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_calle"   name="calle">
																		</div>
																		<div class="form-group">
                                                                            <label for="formGroupExampleInput2">Ciudad o Localidad</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_ciudad"   name="ciudad">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Estado</label>
                                                                            <input type="text" class="form-control"   id="dir_usuario_estado"  name="estado">
                                                                        </div> 
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Codigo Postal</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_cp"   name="cp">
                                                                        </div>
                                                                             
                                                                    </form> 

											<button id="registrar_dir" class="btn btn-lg btn-success btn-block"><i class="fa fa-plus"></i> Crear</button>';

										
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
						<h1 class="text-second"><i class="fas fa-headset"></i>  Diferentes formas de ponernos en contacto </h1>
						<p><i class="fa fa-phone"></i> <?php echo $datosEmpresa[0]['tels'];?> <i class="fa fa-envelope"></i>  <?php echo $datosEmpresa[0]['mail'];?> </p>
							 
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['fb']?>"><i class="fa fa-facebook"></i></a>
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['twtr']?>"><i class="fa fa-twitter"></i></a>
									<a class="btn btn-dark" href="https://api.whatsapp.com/send?phone=<?php echo $datosEmpresa[0]['wtsp'];?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
									<a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['inst']?>"><i class="fa fa-instagram"></i></a>
							 
						<a href="tel:<?php echo $datosEmpresa[0]["tels"]?>" class="btn btn-info"><i class="fa fa-phone"></i> Llamar</a>
						<a href="mailto:<?php echo $datosEmpresa[0]["mail"]?>" class="btn btn-secondary"><i class="fa fa-envelope"></i> Escribenos</a>						
						<a class="btn btn-primary" href="<?php echo $datosEmpresa[0]['mgn'];?>"  target="_blank"><i class="fab fa-facebook-messenger"></i> Envíanos un mensaje</a>
						<a class="btn btn-success" href="https://api.whatsapp.com/send?phone=<?php echo $datosEmpresa[0]['wtsp'];?>" target="_blank" target="_blank"><i class="fab fa-whatsapp"></i> Envíanos un mensaje</a>
						<br>
						<br>
						<h1 class="text-second"><i class="fas fa-map-marker-alt"></i>  Visitanos </h1>
						<p><?php echo $datosEmpresa[0]['dir'];?></p>
																	
						<iframe id="map" src="<?php echo $datosTienda[0]['google_maps']; ?>"  frameborder="0" style="border:0" allowfullscreen></iframe>
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
															 
																<h1 class="text-white"><i class="fa fa-bell"></i>  Notificaciones </h1>
															
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
      <div class="tab-pane fade" id="bolsa" role="tabpanel" aria-labelledby="bolsa-tab">
					<section class="generic-banner relative">	
													<div class="container">
														<div class="row align-items-center justify-content-center">
															<div class="col-lg-10">
																<div class="generic-banner-content">
																		<br>
																		<br>
																		<br>
																		<br>
																 
																		<h1 class="text-white"><i class="fa fa-shopping-bag"></i> Bolsa </h1>
																	
																		<br>
															

																</div>							
															</div>
														</div>
													</div>
						</section>
						<div class="container-fluid">
							<?php 
							include 'sistema/estructura/tienda/bolsa_2.php';
							?>
						</div>
      </div>
			<div class="tab-pane fade" id="store" role="tabpanel" aria-labelledby="store-tab">
					<section class="generic-banner relative">	
											<div class="container">
												<div class="row align-items-center justify-content-center">
													<div class="col-lg-10">
														<div class="generic-banner-content">
																<br>
																<br>
																<br>
																<br> 
																<h1 class="text-white"><i class="fas fa-store"></i>  Tienda </h1>
															
																<br>
													

														</div>							
													</div>
												</div>
											</div>
					</section>
					<div class="container">
					<br>
					<p>Elije un categoria para poder ver una lista de nuestros productos</p>
					<div class="row">
				
					<div class="col-sm-3">
					
						<br>
						<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
									Aqui va a cargar la lista de productos
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
      
		</div>



	 
			<!-- End faq Area -->
			<!-- start footer Area -->		
			<footer class="footer-area section-gap text-white">
			<div class="text-right" style="position: fixed;
												bottom: 0;
												width:100%;
												z-index:1000;
												">
											<a class="btn btn-primary btn-mgn" href="https://<?php echo $datosEmpresa[0]['mgn'];?>" target="_blank"><i class="fab fa-facebook-messenger"></i> <span class="d-none d-lg-block">Envíanos un mensaje</span>		 </a>
											<a class="btn btn-success btn-wtsp" href="https://api.whatsapp.com/send?phone=<?php echo $datosEmpresa[0]['wtsp'];?>" target="_blank"  target="_blank"><i class="fab fa-whatsapp"></i>  <span class="d-none d-lg-block"> Envíanos un mensaje </span>	</a>
											<a class="btn btn-dark btn-tlg" href="https://<?php echo $datosEmpresa[0]['tlg'];?>" target="_blank"><i class="fab fa-telegram"></i> <span class="d-none d-lg-block">Envíanos un mensaje</span>		 </a>
							</div>
				<div class="container">
					<div class="row">
						<div class="col-lg-5 col-md-6 col-sm-6">
							<div class="single-footer-widget">
							<h6>Aviso Legal</h6>
							<p>Al usar este sitio se entiende que usted acepta nuestros <a class="terminos"  data-toggle="modal" data-target="#modal-terminos" href="#" > <i class="fa fa-file-text"> terminos y condiciones</i></a> de uso.
								</p>	
							<p class="footer-text">
									<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
								 	<img src="sistema/images/<?php echo $datosEmpresa[0]['icon_site'];?>" width="30" height="30" class="d-inline-block align-top" alt="">
          			  <br>
									  <?php echo $datosEmpresa[0]['nombre'];?> Copyright &copy;<script>document.write(new Date().getFullYear());</script> | Todos los derechos reservados | This Web site is made by <a href="https://landercorp.mx" target="_blank">LanderCorp.mx</a>
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
							</div>
							<div class="single-footer-widget">
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
									<a href="https://api.whatsapp.com/send?phone=<?php echo $datosEmpresa[0]['wtsp'];?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
									<a href="<?php echo $datosEmpresa[0]['inst']?>"><i class="fa fa-instagram"></i></a>
								</div>
							</div>
							<br>
							<div class="single-footer-widget">
							<h6 class="">Administración</h6>
								<ul class="list-unstyled text-small">
									<li><a href="sistema/home.php"> <i class="fa fa-user"></i> Iniciar Sesión</a></li> 
								</ul>	
							</div>
						</div>

						<div class="col-lg-12 col-md-12 col-sm-12">
						
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

			<script src="sistema/js/wow.js"></script> 
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
			<script src="sistema/js/login/login.js"></script>

			<!-- Paypal -->
			<script src="https://www.paypalobjects.com/api/checkout.js"></script>
			 

			<!-- OpenPay 
			<script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></script>
			<script type='text/javascript' src="https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"></script>
			-->
			<!-- PNotify -->
			<script type="text/javascript" src="sistema/js/notify/pnotify.core.js"></script>
			<script type="text/javascript" src="sistema/js/notify/pnotify.buttons.js"></script>
			<script type="text/javascript" src="sistema/js/notify/pnotify.nonblock.js"></script>


		 
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  	<!-- DropZone.js -->
		<script src="sistema/js/dropzone.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<!-- mercado pago -->
	<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>

    <script src="sistema/js/bootstrap.min.js"></script>
	 
    <script src="https://sdk.accountkit.com/es_ES/sdk.js"></script>
    <script>
	/*

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

	  */
	</script>
	
	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js"></script>

	<!-- TODO: Add SDKs for Firebase products that you want to use
		https://firebase.google.com/docs/web/setup#available-libraries -->
	<script src="https://www.gstatic.com/firebasejs/7.14.3/firebase-analytics.js"></script> 
 

	<!-- TODO: Add SDKs for Firebase products that you want to use
		https://firebase.google.com/docs/web/setup#available-libraries --> 
	<!-- Add Firebase products that you want to use -->
	<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-database.js"></script>
	
	<script>
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyAMyGHRTEozlp4xLTgqnk0rrBZUs11ylt8",
		authDomain: "paleteria-47670.firebaseapp.com",
		databaseURL: "https://paleteria-47670.firebaseio.com",
		projectId: "paleteria-47670",
		storageBucket: "paleteria-47670.appspot.com",
		messagingSenderId: "51357261773",
		appId: "1:51357261773:web:25e678a24cf1688319ee84",
		measurementId: "G-F8KLR3X7VX"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	</script>
	<script src="sistema/js/tienda/tienda.js"></script>
	<script src="sistema/js/firebaselogin.js"></script>
</body></html>