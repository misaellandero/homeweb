<?php
session_start();
// Initialize variables
$app_id = '279600229630513';
$secret = '094f22da6431bddd0085790ff4bdcaf9';
$version = 'v1.1'; // 'v1.1' for example

// Method to send Get request to url
function doCurl($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $data = json_decode(curl_exec($ch), true);
  curl_close($ch);
  return $data;
}

// Exchange authorization code for access token
$token_exchange_url = 'https://graph.accountkit.com/'.$version.'/access_token?'.
  'grant_type=authorization_code'.
  '&code='.$_GET['code'].
  "&access_token=AA|$app_id|$secret";
$data = doCurl($token_exchange_url);
$user_id = $data['id'];
$user_access_token = $data['access_token'];
$refresh_interval = $data['token_refresh_interval_sec'];

// Get Account Kit information
$me_endpoint_url = 'https://graph.accountkit.com/'.$version.'/me?'.
  'access_token='.$user_access_token;
$data = doCurl($me_endpoint_url);
$phone = isset($data['phone']) ? $data['phone']['number'] : '';
$email = isset($data['email']) ? $data['email']['address'] : '';

try
{
    $conn = require_once 'sistema/php/conexion.php';
    $telefono = '';
    $token = $user_access_token;
    $state = $data['state'];
    $nombre = $_SESSION['nombre'];
    $apellido = $_SESSION['apellidos'];
    $id_perfil = 0;
    $password = '';

    $id = 0;
    $sql = "SELECT * FROM `usuarios_usuarios` WHERE `email` = '$email' ";
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

        header("Location: index.php");

    }
    catch(PDOException $e){
    return json_encode([ 'error' => $e->getMessage() ]);
    }
?>

<head>
  <title>Account Kit PHP App</title>
</head>
<body>
  <div>User ID: <?php echo $user_id; ?></div>
  <div>Phone Number: <?php echo $phone; ?></div>
  <div>email: <?php echo $email; ?></div>
  <div>Access Token: <?php echo $user_access_token; ?></div>
  <div>Refresh Interval: <?php echo $refresh_interval; ?></div>
</body>
