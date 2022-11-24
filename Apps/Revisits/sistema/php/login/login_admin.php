<?php
  session_start();
  $conn = require_once '../conexion.php';
  $email = trim($_POST['login_correo']);
  $user_password = trim($_POST['login_clave']);

  try
  {
   $sql = "SELECT * FROM `usuarios_usuarios` WHERE `email` = '$email' AND `id_perfil` > 0 ";
   $result = $conn->prepare($sql) or die ($sql);
    
    if (!$result->execute()) return false;

    if ($result->rowCount() > 0) {
      while ($row = $result->fetch()){

               if($row['password']==$user_password){

                 echo "ok"; // log in
                 $_SESSION['id_session'] = $row['id'];
                 $_SESSION['nombre_session'] = $row['nombre'];
                 $_SESSION['apellido_session'] = $row['apellido'];
                 $_SESSION['telefono_session'] = $row['telefono'];
                 $_SESSION['email_session'] = $row['email'];
                 $_SESSION['pass_session'] = $row['password'];
                 $_SESSION['id_perfil'] = $row['id_perfil'];

                } else{
                       echo "¡Contraseña incorrecta!"; // wrong details
                      }

      }

    }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
