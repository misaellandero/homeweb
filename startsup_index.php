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
  <link href="blk-desing/assets/css/blk-design-system.css?v=1.0.0" rel="stylesheet" />  
  <!-- Animate  Files -->
  <link href="sistema/css/animate.css" rel="stylesheet" />  
  <style>
    <?php
    echo $datosTienda[0]['ver_mas_dir'];
    ?>
  </style>
</head> 

<body class="index-page">
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
          <img src="sistema/images/logo"  class="img-fluid wow slideInLeft" data-wow-duration="3s" width="30%" alt="">
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
              <img src="sistema/images/logo"  class="img-fluid wow slideInRight" data-wow-duration="3s" width="60%" alt="">
        
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
            <a class="nav-link" rel="tooltip" title="Síguenos en Twitter" data-placement="bottom" href="<?php echo $datosEmpresa[0]['twtr']?>" target="_blank">
              <i class="fab fa-twitter"></i>
              <p class="d-lg-none d-xl-none">Twitter</p>
            </a>
          </li>
          <li class="nav-item p-0">
            <a class="nav-link" rel="tooltip" title="Síguenos en Facebook" data-placement="bottom" href="<?php echo $datosEmpresa[0]['inst']?>" target="_blank">
              <i class="fab fa-facebook-square"></i>
              <p class="d-lg-none d-xl-none">Facebook</p>
            </a>
          </li>
          <li class="nav-item p-0">
            <a class="nav-link" rel="tooltip" title="Síguenos en Instagram" data-placement="bottom"  href="<?php echo $datosEmpresa[0]['fb']?>" target="_blank">
              <i class="fab fa-instagram"></i>
              <p class="d-lg-none d-xl-none">Instagram</p>
            </a>
          </li>
          <li class="dropdown nav-item">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <i class="fa fa-cogs d-lg-none d-xl-none"></i> <i class="fa fa-book"></i>Documentación
            </a>
            <div class="dropdown-menu dropdown-with-icons">
              <a href="#usuarios" class="dropdown-item">
                <i class="tim-icons icon-single-02"></i> Usuarios
              </a>
              <a href="#inventarios" class="dropdown-item">
                <i class="tim-icons icon-bullet-list-67"></i>Inventarios
              </a> 
              
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-default d-none d-lg-block" href="javascript:void(0)" onclick="scrollToDownload()">
              <i class="fa fa-rocket"></i> Solicitar Demo
            </a>
          </li>
          
           
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar --> 
  <div class="wrapper">
    
  <div class="page-header header-filter">
      <div class="squares square1"></div>
      <div class="squares square2"></div>
      <div class="squares square3"></div>
      <div class="squares square4"></div>
      <div class="squares square5"></div>
      <div class="squares square6"></div>
      <div class="squares square7"></div>
      <div class="container">
        <div class="content-center brand">
          <img src="blk-desing/assets/img/tienda.png" class="img-fluid" >
          <h4>| Tienda en linea | Punto de venta | Control de inventarios | Reportes de ventas | Control de usuarios | </h4>
          <h1 class="h1-seo space">STARSUP</h1> 
          <h3>Un sistema para emprendedores y StartUps facil, simple y rapido.</h3>
        </div>
      </div>
    </div>
   
  </div>


    <section class="main servicios" id="usuarios">
      <img src="blk-desing/assets/img/path3.png" class="path">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <hr class="line-info">
            <br><br><br>
            <h1 class="wow fadeInRight" data-wow-duration="3s" >
              <i class="tim-icons icon-single-02"></i> Usuarios</span>
              <span class="text-info" >roles y permisos</span>
            </h1>
          </div>
          <div class="col-md-12 wow fadeInLeft" data-wow-duration="3s">
            <h1> <i class="fa fa-user"></i>  Usuarios</h1>
            <p>Controla por completo tu negocio, cada modulo del sistema tiene una serie de permisos configurables y extendibles según tus necesidades, ademas algunos procesos específicos como las ventas y los movimientos de inventarios guardan un registro de los usuarios  que realizaron tales acciones para brindar información veras y transparente.</p>
            <p>Nota: Las configuras de usuarios de tipo cliente tambien pueden ser editadas desde este modulo, sin embargo dado que este modulo es solo para personal administrativo los clientes tienen su propio menu de configuracion para mas información vea la sección <a href="#clientes"> <i class="fa fa-user"></i> Clientes</a></p>
          </div>
          <div class="col-md-6 wow fadeInLeft" data-wow-duration="3s">
            <h1> <i class="fa fa-users"></i> Roles</h1>
            <p>Para facilitar el control de los permisos de los usuarios, puedes crear roles de esta forma en lugar de configurar los permisos de los cajeros uno por uno, puedes crear un rol de permisos para todos los cajeros y al crear el usuario solo le asignas el rol que deseas.</p>
          </div>
         
          <div class="col-md-6 wow fadeInRight " data-wow-duration="3s">
            <h1> <i class="fa fa-key"></i>  Permisos</h1>
            <p>Controla por completo tu negocio, cada modulo del sistema tiene una serie de permisos configurables y extendibles según tus necesidades, ademas algunos procesos específicos como las ventas y los movimientos de inventarios guardan un registro de los usuarios  que realizaron tales acciones para brindar información veras y transparente.</p>
          </div>
         
           <div class="col-12">
             <br>
             <br>
             <br>
           </div>
         
      
          <div class="col-md-8 wow fadeInLeft" data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/usuarios/roles1.png" class="img-fluid floating">
          </div>
          <div class="col-md-4 wow fadeInRight" data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-users"></i> Crear un Rol nuevo </h2> 
              <p>Cree un Rol de usuario para asignar privilegios y restricciones a varios usuarios.</p>
            
              <p>
              Haga click en el boton 
              <button id="crear_nuevo_perfil_de_usuario" type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target=".modal-editar-perfil">
                  Nuevo Rol <i class="fa fa-users"></i>
              </button>
              luego ingrese un nombre para su nuevo rol y seleccione los permisos que desea asignar de la lista.
            </p>
              <ul class="list-unstyled mt-5">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fa fa-plus"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Añada roles nuevos</h6>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fa fa-edit"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Edite los permisos ya existentes</h6>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-success mb-2">
                      <i class="fa fa-users"></i>
                    </div>
                    <div class="ml-3">
                      <h6>Asigne roles y permisos a varios usuarios</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12">
             <br>
             <br>
             <br>
           </div>
          <div class="col-md-4 wow fadeInLeft " data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-users"></i> Editar y borrar roles  </h2> 
              <p>Cree un Rol de usuario para asignar privilegios y restricciones a varios usuarios.</p>
            
              <p>
              <span class="dtr-data">
                Para editar un Rol existente precione
             
                <button type="button" class="boton-editar-perfil btn btn-sm btn-primary"  ><i class="editar_datos_usuario fa fa-spin fa-gear"></i> Editar</button>
                <br>
                Para eliminar un rol existente precione
                <button type="button" class="btn-eliminar-perfil btn btn-sm btn-danger"  ><i class=" fa fa-trash"></i> Borrar</button></span>
                <br>
                Tomen en cuenta que borrar un rol eliminara los permisos de los usuarios que esten vinculados a ese rol.
              </p> 
            </div>
          </div>
          <div class="col-md-8 wow fadeInRight" data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/usuarios/roles2.png" class="img-fluid floating">
          </div>

          <div class="col-12">
             <br>
             <br>
             <br>
           </div>

          

           <div class="col-md-4 wow fadeInLeft " data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-user"></i> Crear nuevo Usuario  </h2>  
              <p>
              
              Haga click en <button id="registrar_nuevo_usuario" type="button" class="btn btn-sm btn-primary" >
                Nuevo Usuario <i class="fa fa-user"></i>
              </button>
              <br> para añadir un usuario, llene todos los datos y elija un rol para el usuario, si el usuario es un cliente puede llenar ademas los datos fiscales para facilitar la facturación. 
              </p> 
            
            </div>
          </div> 

           <div class="col-md-8 wow fadeInRight" data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/usuarios/usuarios.png" class="img-fluid floating">
          </div>

          <div class="col-md-8 wow fadeInLeft " data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/usuarios/usuarios2.png" class="img-fluid floating">
          </div>
          <div class="col-md-4 wow  fadeInRight" data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-user"></i> Editar y borrar usuarios  </h2>  
              <p> 
              En la tabla de usuarios podrá ver los datos detallados de cada usuario haciendo click en <button data-id="1" type="button" class="editar_datos_usuario btn btn-sm btn-primary" ><i class="editar_datos_usuario fa fa-spin fa-gear"></i> Ver y editar</button>, para eliminar un usuario puede hacer click en el botón <button type="button" class="bbu btn btn-sm btn-danger"><i class="fa fa-trash"></i> Borrar</button>
              </p> 
              <p>Si desea ver los clientes seleccione la casilla mostrar cliente.</p>
            
            </div>
          </div> 


          <div class="col-md-12 wow  fadeInRight" data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-key"></i> Permisos y configuraciones adicionales  </h2>  
              <p>Puede solicitar la extensión de permisos y restricciones a su sistema enviando un correo a <a href="mailto:hola@landercorp.mx" class="btn btn-info btn-default btn-sm wow slideInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: slideInUp;"><i class="fa fa-envelope"></i> hola@landercorp.mx</a> 
              <p>Solicitudes complejas, especializadas o avanzadas podrían tener un coste extra.</p>
            <br><br><br>
            </div>
          </div> 

         


        </div> 
      </div>
    </section>
 
    <section class="section section-lg section-coins" id="inventarios">
      <img src="blk-desing/assets/img/path3.png" class="path">
      <div class="container">
        <div class="row"> 
          <div class="col-md-4">
            <hr class="line-info">
            <h1 class="wow fadeInRight" data-wow-duration="3s" >
            <i class="tim-icons icon-bullet-list-67"></i>  Inventarios 
         
            <span class="text-info" >Productos, Articulos y Movimientos</span>
            </h1>
          </div>
          <div class="col-12">
            
           </div>
          <div class="col-md-6 wow fadeInLeft" data-wow-duration="3s">
            <h2> <i class="fa fa-boxes"></i>  Productos</h2>
            <p>Un producto engloba una familia de artículos que comparten campos y características por ejemplo podemos crear un producto de tipo Celular y este tendrá ciertos campos por ejemplo Tamaño de pantalla y Ram, también podemos crear un producto de tipo Escritorio que tendrá otros campos. De esta forma podemos crear varias familias de productos con las cuales no solo clasificar nuestros artículos si no también brindarles campos únicos. </p>
            <br>
            <br>
          </div>
          <div class="col-md-6 wow fadeInRight" data-wow-duration="3s">
            <h2> <i class="fa fa-list"></i> Campos</h2>
            <p>Los campos son una carterista especial de nuestro CMR y el que le da mas flexibilidad para adaptarse a cualquier tipo de negocio, si crear un capo de tipo Color, Talla, Marca puedes elegir que familias de productos tendrá o no estos campos de tal forma que puedes tener inventarios tan diversos como uno que contenga botones y smartphones y aun así tener los campos correctos para cada producto. </p>
            <br>
            <br>
          </div>
          <div class="col-md-6 wow fadeInLeft" data-wow-duration="3s">
            <h2> <i class="fa fa-pallet"></i> Artículos</h2>
            <p>Los artículos son la base de nuestro CMR, puedes crear artículos en base a alguna de las diferentes familias de productos, los productos pueden ser vendidos dentro del punto de venta del sistema y de la tienda en linea, ademas puedes controlar su ingreso y salida con el modulo de movimientos. </p> 
            <br>
            <br>
          </div>
          <div class="col-md-6 wow fadeInRight" data-wow-duration="3s">
            <h2> <i class="fa fa-truck-loading"></i> Movimientos</h2> 
            <p>Tu inventarios e artículos no es estático , se mueve constantemente con las compras ventas o entradas y salidas al sistema, ya sea por que fueron devoluciones, caduco el producto o tuvo algún desperfecto, para controlar por que un producto entro o salió de tu inventario así como quien hizo ese movimiento usa el  control de inventario del sistema mediante el modulo de movimientos. </p> 
            <br>
            <br> 
          </div>
          <div class="col-12">

          </div>
          <div class="col-md-8 wow fadeInLeft " data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/inventarios/productos/productos2.png" class="img-fluid floating">
          </div>
          <div class="col-md-4 wow  fadeInRight" data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-boxes"></i> Crear un producto  </h2>  
              <p> 
              <h3>Crear un producto </h3>
                <p>Toca  el botón <button type="button"  class="btn btn-sm btn-primary">Nuevo producto <i class="fa fa-boxes"></i>  </button>
                <p>Elige un nombre para tu familia de productos, puede ser una categoría especifica de productos o una marca. </p>
                <p>Elige la unidad, si planeas facturar no olvides investigar el numero de catalogo de la unidad. Después elige el tipo de producto. Un producto simple es una producto que se vende por unidad. Los productos compuestos contienen varios productos iguales dentro que se pueden vender por separado, un combo de producto son varios productos diferentes que se venden juntos.</p>
              
              </p> 
              <p>Si desea ver los clientes seleccione la casilla mostrar cliente.</p>
            
            </div>
          </div> 
          <div class="col-md-4 wow  fadeInLeft" data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-boxes"></i> Editar y borrar un producto  </h2>  
         
              <p><h3>Editar un producto</h3> 
              <p>Para editar un producto toca el botón <button type="button"  class="boton-editar-producto btn btn-sm btn-primary"  > <i class="fa fa-spin fa-gear"></i> Editar Datos</button>, podrás cambiar el tipo de producto, su nombre y el tipo de unidad que usa</p>
             </p>
             <br>
             <h3>Borrar un producto</h3> 
             <p>Toca el botón <button type="button" class="btn-eliminar-producto btn btn-sm btn-danger"  ><i class=" fa fa-trash"></i> Borrar</button></p>
                <p>Al borrar un producto recuerda que los artículos vinculados a esta familia de productos perderán su referencia y no podrás buscarlos por producto, hasta que les asignes un nuevo tipo de producto. </p>
             
            </div>
          </div> 
          <div class="col-md-8 wow fadeInRight  " data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/inventarios/productos/productos1.png" class="img-fluid floating">
          </div>

          <div class="col-md-4 wow fadeInLeft " data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-list"></i> Crear un campo </h2>  
              <p>Elige un producto de tu tabla de productos</p>
               <p>Toca el botón <button type="button" class="boton-campos-producto btn btn-sm btn-secondary"  > <i class="fa fa-spin fa-gear"></i> Editar Campos</button></p>
              <p>Elige el tipo de campo que deseas crear 
                <ul>
                  <li>Un campo de tipo texto te permite meter cualquier texto.</li>
                  <li>Un campo de tipo numero te permite meter una cantidad en numero.</li>
                  <li>Un campo de tipo Checkbox es una caja con una palomita.</li>
                  <li>Un campo de tipo listado te deja elegir varias opciones pre-definidas de una lista</li>
               
                </ul>
                <p>Selecciona el tipo la unidad si es que aplica  por ejemplo sí deseas crear un campo de la resolución de una cámara para un celular selecciona tipo de campo numérico, luego selecciona nombre como Resolución y la unidad pixeles.</p>
                 <p>Luego haz click en el botón crear campo, el nuevo campo se añadir a tu tabla de campos existentes </p>
                <p>La tabla de campos muestra una lista de campos existentes en tu sistema puedes borrar campos y añadir mas elementos a los campos de tipo lista desde aquí.</p>
              </p>
             
            </div>
          </div> 

           <div class="col-md-8 wow fadeInRight" data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/inventarios/productos/campos1.png" class="img-fluid floating">
          </div>
          
          <div class="col-md-8 wow fadeInLeft   " data-wow-duration="3s">
            <img src="sistema/images/imagen_promocional/documentacion/inventarios/productos/campos2.png" class="img-fluid floating">
          </div>
          <div class="col-md-4 wow  fadeInRight " data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-list"></i> Añadir campo a un producto   </h2>  
         
              <p>Para añadir un campo a un Producto dirigente hasta el final de la ventana. En donde esta el listado que dice selecciona un campo, elige el campo que quieres asignar a tu producto. </p>
              <p>Elige si lo quieres añadir al producto a los elementos del producto (Solo en caso de que sea un producto compuesto)</p>
              <p>Al añadir el nuevo campo la lista de abajo se actualizara mostrando los campos que tiene este producto, puedes borrar y añadir más campos desde aquí.</p>
              <p>Recuerda que puedes reutilizar tus campos en varios productos.</p>
            </div>
          </div>

          <div class="col-md-12 wow  fadeInRight " data-wow-duration="3s">
            <div class="px-md-5">
              <hr class="line-success">
              <h2><i class="fa fa-headset"></i> ¿Necesitas ayuda? </h2>  
              <p>Configurar los productos y campos podria parecer confuso al principio pero es lo que da flexibilidad a nuestro sistema.</p>
              <p>Si necesitas ayuda no dudes en solicitar ayuda remota por video llamada o pantalla compartida <a href="mailto:hola@landercorp.mx" class="btn btn-info btn-default btn-sm wow slideInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: slideInUp;"><i class="fa fa-envelope"></i> hola@landercorp.mx</a> </p>
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
