<?php
  session_start();
  $conn = require_once '../conexion.php';
  $telefono = trim($_POST['telefono']);
  $token = trim($_POST['token']);
  $state = trim($_POST['state']);
  $nombre = trim($_POST['nombre']);
  $apellido = trim($_POST['apellidos']);
  $password = trim($_POST['password']);

  $email = trim($_POST['email']);
  $id_perfil = 0; 

  try
  {
   $id = 0;
   $sql = "SELECT * FROM `usuarios_usuarios` WHERE `telefono` = '$telefono' ";
   $result = $conn->prepare($sql) or die ($sql);

    if (!$result->execute()) return false;

    if ($result->rowCount() > 0) {
      while ($row = $result->fetch()){
          $id = $row['id'];
      }

    } else {
       $sql = "INSERT INTO `usuarios_usuarios` (nombre, apellido, telefono, email, id_perfil, password, token, state) values (:nombre, :apellido, :telefono, :email, :id_perfil, :password, :token, :state)";
       $result = $conn->prepare($sql) or die ($sql);
       $result->bindParam(':nombre', $nombre);
       $result->bindParam(':apellido', $apellido);
       $result->bindParam(':telefono', $telefono);
       $result->bindParam(':email', $email);
       $result->bindParam(':id_perfil', $id_perfil);
       $result->bindParam(':password', $password);
       $result->bindParam(':token', $token);
       $result->bindParam(':state', $state);

       if (!$result->execute()) {
           print_r($result->errorInfo());
           return json_encode([ 'response' => false ]);
        }

       $id = $conn->lastInsertId();
    }

   $sql = "SELECT * FROM `usuarios_usuarios` WHERE `id` = '$id' ";
   $result = $conn->prepare($sql) or die ($sql);

    if (!$result->execute()) return false;

    if ($result->rowCount() > 0) {
      while ($row = $result->fetch()){

         $_SESSION['id_session'] = $row['id'];
         $_SESSION['nombre_session'] = $row['nombre'];
         $_SESSION['apellido_session'] = $row['apellido'];
         $_SESSION['telefono_session'] = $row['telefono'];
         $_SESSION['email_session'] = $row['email'];
         $_SESSION['pass_session'] = $row['password'];
         $_SESSION['id_perfil'] = $row['id_perfil'];

      }

    }

    return json_encode([ 'response' => true ]);

  }
  catch(PDOException $e){
   return json_encode([ 'error' => $e->getMessage() ]);
  }
?>
