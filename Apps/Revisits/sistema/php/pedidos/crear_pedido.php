<?php 
 $conn = require_once '../conexion.php';

  $id_cliente = trim($_POST['id_usuario_pedido']);
  session_start();

  $id_admin = $_SESSION['id_session'];
  $empresa_envio =  trim($_POST['empresa_envio']);
  $costo_envio = trim($_POST['costo_envio']);
  $notas = trim($_POST['notas']);
  $status = trim($_POST['status']);

  try
  {
   $sql = " SELECT * FROM `usuarios_usuarios` WHERE `id` = ? AND `pedido` = 1";
   $result = $conn->prepare($sql) or die ($sql); 
   $result->execute([$id_cliente]);

    if ($result->rowCount() > 0) {
         $crearPedido = "INSERT  
         INTO `movimientos_pedidos` 
         (`id_cliente`, `id_admin` ,`status`,`empresa_envio`,`costo_envio`,`notas`) 
          VALUES (?,?,?,?,?,?)";

            $result = $conn->prepare($crearPedido) or die ($crearPedido); 
            if ($result->execute([$id_cliente,$id_admin,$status,$empresa_envio,$costo_envio,$notas])){
             
              $axtualziarStatus = "UPDATE `usuarios_usuarios`
                                  SET `pedido` = '2' 
                                  WHERE  `id` = ?";
              $result = $conn->prepare($axtualziarStatus) or die ($axtualziarStatus);  

              if ($result->execute([$id_cliente])) {
                echo "Pedido aprobado, estatus actualizado en espera de pago.";
              }else{
                echo "Error no se registro";
              }

              if ($conn->query($axtualziarStatus) == TRUE) {
                $status =  [
                  0 => "Sin pedidos",
                  1 => "En espera de costos de envio",
                  2 => "En espera de pago",
                  3 => "Pedido Enviado"
                ]; 

                echo 'Se actualizo con exito el pedido a '.$status[$status];

              }

            }else{
              echo "Error no se registro";
            }
      } else { 
       
          		echo "Error este cliente no tiene pedidos pendientes";
         
          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>