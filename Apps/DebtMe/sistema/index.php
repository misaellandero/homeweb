<?php 
include 'php/configuracion/cargar_datos_empresa.php';
$conn = require_once 'php/conexion.php';
$datosEmpresa = cargarDatosEmpresa($conn);
?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

   <!-- inconos -->
   <link rel="icon" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="144x144" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="114x114" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"/>
  		<link rel="apple-touch-icon" sizes="72x72" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>" />
  		<link rel="apple-touch-icon" sizes="57x57" href="images/<?php echo $datosEmpresa[0]['icon_site'];?>"" />
      <!-- fin iconos -->

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <title>Login</title>



  </head>
  <body class="bg-dark text-white">
  
    <div class="container ">
        <div class="card mb-3 bg-dark">
      <div class="row no-gutters">
        <div class="col-2">
          <img src="images/<?php echo $datosEmpresa[0]['icon_site'];?>"  class=" card-img" alt="...">
        </div>
        <div class="col-10">
          <div class="card-body">
         <h1 class="form-signin-heading">Panel de Control </h1>
         <h2 class="form-signin-heading"><?php echo $datosEmpresa[0]['nombre'];?> </h2>
          
          <p>Este sistema es solo para empleados si desea ingresar como cliente haga <a href="../">click aqui</a>
           </p>
          </div>
        </div>
      </div>
    </div>
   
       
     
        <form id="form_login_admin" >
            <input  placeholder="Correo electronico" class="form-control" type="mail" name="login_correo" value="">
            <input placeholder="Contraseña" class="form-control" type="password" name="login_clave"  value="">
        </form>
      
        <button id="boton_ingresar" class="btn btn-lg btn-primary btn-block">Ingresar</button>
        
        <div align="center">
        <br>
      <br>
      <p> 
     
        <img width="15%" src="images/<?php echo $datosEmpresa[0]['logo_empresa'];?>"  class="mx-auto d-block" alt="...">
       
        <a href="<?php echo $datosEmpresa[0]['web'];?>"><h2><?php echo $datosEmpresa[0]['web'];?> </h2></a>  &reg 2018<p> </div>

    </div>
  </body>
</html>

<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/login/login.js" type="text/javascript"></script>
