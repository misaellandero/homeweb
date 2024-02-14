<?php
session_start();
$conn = require_once 'php/conexion.php';
$id_usuario = $_SESSION['id_session'];
include 'php/users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$id_perfil = $datosUsuario[0]['id_perfil'];
$permisos = PermisosSistema($id_perfil,$conn);
//var_dump($datosUsuario);
//var_dump($permisos);
if(($id_perfil) < 1)
{
 session_destroy();
 header("Location: index.php");
}

include 'php/configuracion/cargar_datos_empresa.php';

$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn);
//var_dump($datosEmpresa);

?>



<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>

      <!-- inconos -->
      <link rel="icon" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="144x144" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="114x114" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="72x72" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="57x57" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"" />
      <!-- fin iconos -->

      <!-- metadatos-->
      <meta charset="utf-8">
      <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <meta name="keywords" content=" ">
      <meta name="description" content=" ">

      <!-- fin metadatos-->

    <!-- Forzar cargar sin cache -->
   	<meta http-equiv="Expires" content="0">

   	<meta http-equiv="Last-Modified" content="0">

   	<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">

   	<meta http-equiv="Pragma" content="no-cache">

      <title>Panel de control <?php echo $datosEmpresa[0]['nombre'];?> </title>
      <!-- estilos CSS -->

      <!-- Bootstrap core CSS -->
      <link href="css/bootstrap.min.css" rel="stylesheet">
      <!-- DropZones -->
      <link href="css/dropzone.css"    rel="stylesheet">
      <!-- iconos font-awesome -->
      <!-- Font Awesome -->
	    <link href="css/fonts/css/all.min.css" rel="stylesheet">
      <!-- DataTables -->
      <link rel="stylesheet" type="text/css" href="js/dataTables/datatables.min.css"/>

      <style>
       @font-face {
            font-family: "FredokaOne";
            src: url("images/imagen_promocional/FredokaOne-Regular.otf");
            }
      </style>

</head>
<body>
	<div>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
  <img src="images/<?php echo $datosEmpresa[0]['icon_site'];?>" width="30" height="30" class="d-inline-block align-top" alt="">
    Panel de control
  </a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul id="menu" class="nav navbar-nav mr-auto nav-tab">
      <?php
      $li = '<li role="presentation" id="li_punto_de_venta" class="nav-item"><a class="nav-link" href="#punto_de_venta" aria-controls="home" role="tab" data-toggle="tab">Punto de venta</a></li>';
      echo permisoMostrarElemento($permisos[5]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_restaurant" class="nav-item"><a class="nav-link" href="#restaurant" aria-controls="restaurant" role="tab" data-toggle="tab">Restaurant</a></li>';
      echo permisoMostrarElemento($permisos[17]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_pedidos" class="nav-item"><a class="nav-link" href="#pedidos" aria-controls="home" role="tab" data-toggle="tab">Pedidos</a></li>';
      echo permisoMostrarElemento($permisos[12]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_facturacion" class="nav-item"><a class="nav-link" href="#facturacion" aria-controls="home" role="tab" data-toggle="tab">Facturacion</a></li>';
      echo permisoMostrarElemento($permisos[17]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_inventarios" class="nav-item"><a class="nav-link" href="#inventarios" aria-controls="home" role="tab" data-toggle="tab">Inventarios</a></li>';
      echo permisoMostrarElemento($permisos[6]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_reportes" class="nav-item"><a class="nav-link" href="#reportes" aria-controls="home" role="tab" data-toggle="tab">Reportes</a></li>';
      echo permisoMostrarElemento($permisos[7]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_usuarios" class="nav-item"><a class="nav-link" href="#usuarios" aria-controls="home" role="tab" data-toggle="tab">Usuarios</a></li>';
      echo permisoMostrarElemento($permisos[1]["permiso"],1,$li); ?>
      <?php
      $li = '<li role="presentation" id="li_configuraciones" class="nav-item"><a class="nav-link" href="#configuraciones" aria-controls="home" role="tab" data-toggle="tab">Configuraciones</a></li>';
      echo permisoMostrarElemento($permisos[8]["permiso"],1,$li); ?>

    </ul>
    <div class="form-inline my-2 my-lg-0">
      <img width="20em" class="img img-fluid img-circle rounded-circle" src="images/user.png">
      <?php echo $datosUsuario[0]['nombre']; ?>
         <br>
    </div>
    <div class="form-inline my-2 my-lg-0">


       <a href="php/login/log_out.php"><button class="btn btn-outline-danger my-2 my-sm-0">
          <i class="fa fa-times-circle"></i> Salir</button>  
       </a>



    </div>
  </div>
</nav>

<!-- Ventana ver movimientos-->

<div class="modal fade bs-example-modal-sm" id="modal-ver_movimiento" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel"><span class="registar_articulo">Detalles Movimiento</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body"> 
            <form id="datos_movimiento">

                  <div class="form-group">
                    <label for="">Tipo Movimiento</label>
                     
                    <input type="text" class="form-control" id="tipo_movimiento">
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="">Fecha y hora del movimiento</label> 
                    <input type="text" class="form-control" id="fecha_movimiento">
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="">Concepto</label>
                     
                    <input type="text" class="form-control" id="concepto_movimiento">
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="">Usuario</label> 
                    <input type="text" class="form-control" id="usuario_movimiento">
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="">Detalles</label>  
                    <textarea class="form-control"  id="detalles_movimiento" cols="30" rows="10"></textarea>
                    </select>
                  </div>
                  
                
                  <table id="tabla_articulos_movimiento" width="100%" class="table">
                    <thead>
                      <tr role="row">
                        <th><i class='fa fa-cube'></i> Producto</th>
                        <th><i class='fa fa-cubes'></i> Cantidad</th>
                        <th><i class='fa fa-edit'></i> Costo</th>
                        <th><i class='fa fa-edit'></i> Subtotal</th>
                       </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table> 

                  <div class="form-group">
                    <label for="">Total</label>  
                     $<span id="consulta_total_movimiento">0.00</span>
                     </select>
                  </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
               <!--<button id="registrar_cambio_movimiento" class="btn btn-info" ><i class="fa fa-save"></i> Guardar </button>-->
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana ver Movimientos-->

<!-- ventana registrar usuario-->
  <div class="modal fade bs-rusuario-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
       <div class="modal-dialog modal-lg">
             <div class="modal-content">
                  <div class="modal-header">
                        <h4 class="modal-title altaRapida" id="myModalLabel">Registrar Nuevo Usuario</h4>
                        <h4 class="modal-title clienteNormal" id="myModalLabel">Registrar Nuevo Usuario</h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span> </button>
                  </div>
                  <div class="modal-body">
                        <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">
                              <div class="form-group">
                                   <label class=" " for="first-name">Nombre(s)<span class="required">*</span> </label>
                                        <div class="form-group">
                                            <input type="text" id="first-name" required="required" class="form-control" data-parsley-id="5573"><div id="parsley-id-5573"></div>
                                        </div>
                              </div>
                              <div class="form-group">
                                                         <label class=" " for="last-name">Apellidos <span class="required">*</span>
                                                         </label>
                                                         <div class="form-group">
                                                             <input type="text" id="last-name" name="last-name" required="required" class="form-control" data-parsley-id="0473"><div id="parsley-id-0473"></div>
                                                         </div>
                                                     </div>

                                                     <div class="form-group">
                                                         <label for="middle-name" class=" ">Correo </label>
                                                         <div class="form-group">
                                                             <input id="mail" class="form-control" placeholder="*Necesario para recuperar contraseña." type="mail" name="mail" data-parsley-id="7280"><ul class="parsley-errors-list" id="parsley-id-7280"></ul>
                                                         </div>
                                                     </div>
                                                     <div class="form-group">
                                                         <label for="middle-name" class=" ">Telefono </label>
                                                         <div class="form-group">
                                                             <input id="tel" class="form-control" placeholder="" type="phone" name="phone" data-parsley-id="7281"><ul class="parsley-errors-list" id="parsley-id-7281"></ul>
                                                         </div>
                                                     </div>
                                                     <div class="form-group clienteNormal">
                                                         <label class=" ">Perfil</label>
                                                          <div class="form-group">
                                                           <select class="form-control" id="asignar_perfil_usuario"></select>

                                                         </div>

                                                     </div>

                                                     <div class="form-group">
                                                         <label class=" ">Nivel cliente</label>
                                                          <div class="form-group">
                                                           <select class="form-control" name="nivel_perfil_usuario" id="nivel_perfil_usuario">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                           </select>

                                                         </div>

                                                     </div>

                                                     <div class="form-group clienteNormal">
                                                         <label class=" ">Contraseña <span class="required">*</span>
                                                         </label>
                                                         <div class="form-group clienteNormal">
                                                             <input id="password" class="form_ru date-picker form-control col-md-7 col-xs-12" required="required" type="password" data-parsley-id="7811"><div id="parsley-id-7811"></div>
                                                         </div>
                                                     </div>

                                                     <div class="form-group clienteNormal">
                                                         <label class="">Confirmar <span class="required">*</span>
                                                         </label>
                                                         <div class="form-group">
                                                             <input id="password2" class="form_ru date-picker form-control col-md-7 col-xs-12" required="required" type="password" data-parsley-id="7811"><div id="parsley-id-7812"><div>
                                                         </div>
                                                     </div>
                                                     <div class="ln_solid"></div>
                                                     <h4>Datos fiscales</h4>
                                                                   <div class="form-group">
                                                                   <label for="middle-name" class=" ">Razon Social </label>
                                                                        <input id="razon_social" class="form-control"  type="text" name="razon_social" data-parsley-id="7281"><ul class="parsley-errors-list" class="parsley-id-728rf"></ul>
                                                                    </div>
                                                                    <div class="form-group">
                                                                    <label for="middle-name" class=" ">RFC </label>
                                                                        <input id="rfc" class="form-control"  type="text" name="rfc" data-parsley-id="7281"><ul class="parsley-errors-list" class="parsley-id-728rf"></ul>
                                                                    </div>

                                               </form>
                                               
                                             </div>

                                           <br>
                                           <br>
                                           <br>
                                           <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="text-danger fa fa-times-circle"></i> Cerrar</button>
                                                <button type="button" id="guardar_usuario" class="btn btn-info clienteNormal" ><i class="fa fa-save"></i> Guardar</button>
                                                <button type="button" id="guardar_cliente" class="btn btn-info altaRapida" ><i class="fa fa-save"></i> Guardar</button>
                                           </div>

                                       </div>
                  </div>
             </div>
        </div>
  </div>
<!-- Fin ventana registrar usuario-->
  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="punto_de_venta">
      <?php
        $file = permisoMostrarElemento($permisos[5]["permiso"],1,'estructura/punto_de_venta/punto_de_venta.php');
        include ($file);
      ?>
    </div>
    <div role="tabpanel" class="tab-pane " id="inventarios">
      <?php
        $file = permisoMostrarElemento($permisos[9]["permiso"],1,'estructura/inventarios/inventarios_crear_producto.php');
        include ($file);
      ?>
      <?php
        $file = permisoMostrarElemento($permisos[10]["permiso"],1,'estructura/inventarios/inventarios_crear_articulo.php');
        include ($file);
      ?>
      <?php
        $file = permisoMostrarElemento($permisos[11]["permiso"],1,'estructura/inventarios/inventarios_movimientos.php');
        include ($file);
      ?>
    </div>
    <div role="tabpanel" class="tab-pane " id="reportes">
      <?php
        $file = permisoMostrarElemento($permisos[7]["permiso"],1,'estructura/reportes/reportes_movimientos_usuario.php');
        include ($file);
        $file = permisoMostrarElemento($permisos[7]["permiso"],1,'estructura/reportes/reportes.php');
        include ($file);
        
      ?>
    </div>
    <div role="tabpanel" class="tab-pane " id="facturacion">
      <?php
        $file = permisoMostrarElemento($permisos[17]["permiso"],1,'estructura/facturacion/facturacion.php');
        include ($file);
      ?>
    </div>
    <div role="tabpanel" class="tab-pane" id="usuarios">
      <?php
        $file = permisoMostrarElemento($permisos[3]["permiso"],1,'estructura/usuarios/usuarios_perfiles.php');
        include ($file);
      ?>
      <?php
        $file = permisoMostrarElemento($permisos[2]["permiso"],1,'estructura/usuarios/usuarios_datos.php');
        include ($file);
      ?>
    </div>
    
    <div role="tabpanel" class="tab-pane" id="configuraciones">
      <?php
        $file = permisoMostrarElemento($permisos[8]["permiso"],1,'estructura/configuraciones/configuraciones.php');
        include ($file);
      ?>
    </div>

    <div role="tabpanel" class="tab-pane" id="pedidos">
      <?php
        $file = permisoMostrarElemento($permisos[12]["permiso"],1,'estructura/pedidos/pedidos.php');
        include ($file);
      ?>
    </div>
    <div role="tabpanel" class="tab-pane" id="restaurant">
      <?php
        $file = permisoMostrarElemento($permisos[17]["permiso"],1,'estructura/restaurant/restaurantpv.php');
        include ($file);
      ?>
    </div>

  </div>

</div>

</body>
</html>

<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

<script src="js/bootstrap.min.js"></script>
<!-- DropZone.js -->
<script src="js/dropzone.js"></script>
<!-- Moment.js -->
<script src="js/moment.js"></script>
<!-- Tempusdominus -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/js/tempusdominus-bootstrap-4.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/css/tempusdominus-bootstrap-4.min.css" />
<!-- PrintArea -->
<script src="js/jQuery.print.min.js"></script>
<!-- DataTables-->
<script type="text/javascript" src="js/dataTables/datatables.min.js"></script>
<!-- Summernote css/js -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.js"></script>
<!-- funciones para guardardiv como img-->
<script src="js/filesaver.js"></script>
<script src="js/html2canvas.js"></script>
<!-- funciones Generales-->
<script src="js/funciones_generales.js"></script>

<!-- funciones usuarios-->
<script src="js/usuarios/usuarios.js"></script>
<!-- funciones inventarios-->
<script src="js/inventarios/inventarios.js"></script>
<!-- funciones punto de venta-->
<script src="js/punto_venta/punto_venta.js"></script>
<!-- funciones pedidos-->
<script src="js/pedidos/pedidos.js"></script>
<!-- funciones configuraciones-->
<script src="js/configuracion/configuracion.js"></script>
<!-- funciones reportes-->
<script src="js/reportes/reportes.js"></script>
<!-- funciones facturacion-->
<script src="js/facturacion/facturacion.js"></script>