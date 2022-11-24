<?php
 $conn = require_once '../conexion.php';

  $index = ($_POST['index']); 
  $titulo_tienda = ($_POST['titulo_tienda']);
  $cabezera_titulo = ($_POST['cabezera_titulo']);
  $cabezara_texto = ($_POST['cabezara_texto']);
  $ver_mas_dir  = ($_POST['ver_mas_dir']);
  $modo_produccion  = ($_POST['modo_produccion']);
  $paypal_com_fija  = ($_POST['paypal_com_fija']);
  $paypal_com_tarjeta  = ($_POST['paypal_com_tarjeta']);
  $paypal = ($_POST['paypal']);
  $paypal_cliente_id_sandbox = ($_POST['paypal_cliente_id_sandbox']);
  $paypal_secret_sandbox = ($_POST['paypal_secret_sandbox']);
  $paypal_cliente_id = ($_POST['paypal_cliente_id']);
  $paypal_secret = ($_POST['paypal_secret']);
  $chat_fb = ($_POST['chat_fb']);
  $envio_gratis = ($_POST['envio_gratis']);
  $precio_envio = ($_POST['precio_envio']);

  $modo_tienda = ($_POST['modo_tienda']);
  
  $openpay_com_fija  = ($_POST['openpay_com_fija']);
  $openpay_com_tarjeta_0  = ($_POST['openpay_com_tarjeta_0']);

  $openpay_com_tarjeta_3  = ($_POST['openpay_com_tarjeta_3']);
  $openpay_com_tarjeta_6  = ($_POST['openpay_com_tarjeta_6']);
  $openpay_com_tarjeta_9  = ($_POST['openpay_com_tarjeta_9']);
  $openpay_com_tarjeta_12  = ($_POST['openpay_com_tarjeta_12']);

  $openpay = ($_POST['openpay']);
  $openpay_cliente_id_sandbox = ($_POST['openpay_cliente_id_sandbox']);
  $openpay_secret_sandbox = ($_POST['openpay_secret_sandbox']);
  $openpay_cliente_id = ($_POST['openpay_cliente_id']);
  $openpay_secret = ($_POST['openpay_secret']);

  $openpay_public_sandbox = ($_POST['openpay_public_sandbox']);
  $openpay_public = ($_POST['openpay_public']);


  $efectivo_titular = ($_POST['efectivo_titular']);
  $efectivo_tar = ($_POST['efectivo_tar']);
  $efectivo_banco = ($_POST['efectivo_banco']); 

  $fb_appId = ($_POST['fb_appId']);
  $fb_state = ($_POST['fb_state']);
  $fb_redirect = ($_POST['fb_redirect']);
  $google_maps = ($_POST['google_maps']); 

       try
            {
              $sql = "UPDATE `configuraciones_tienda` SET 
                    `index` = ?, 
                    `titulo_tienda` = ?,
                    `cabezera_titulo` = ?,
                    `cabezara_texto` = ?,
                    `ver_mas_dir` = ?,
                    `modo_produccion` = ?,
                    `paypal_com_fija` = ?,
                    `paypal_com_tarjeta` = ?,
                    `paypal`= ?,
                    `paypal_cliente_id_sandbox`= ?,
                    `paypal_secret_sandbox`= ?,
                    `paypal_cliente_id`= ?,
                    `paypal_secret`= ?,
                    `openpay_com_fija` = ?,
                    `openpay_com_tarjeta_0` = ?,
                    `openpay_com_tarjeta_3` = ?,
                    `openpay_com_tarjeta_6` = ?,
                    `openpay_com_tarjeta_9` = ?,
                    `openpay_com_tarjeta_12` = ?,  
                    `openpay`= ?,
                    `openpay_cliente_id_sandbox`= ?,
                    `openpay_secret_sandbox`= ?,
                    `openpay_cliente_id`= ?,
                    `openpay_secret`= ?,
                    `openpay_public_sandbox`= ?,
                    `openpay_public`= ?,
                    `efectivo_titular` = ?,
                    `efectivo_tar` = ?,
                    `fb_appId` = ?, 
                    `fb_state` = ?,
                    `fb_redirect` = ?,
                    `google_maps` = ?,        
                    `efectivo_banco` = ?, 
                    `envio_gratis`= ?, 
                    `precio_envio`= ?, 
                    `chat_fb` = ?,
                    `modo_tienda` = ?
                     WHERE `id` = 1
                     ";

             $result = $conn->prepare($sql); 
            if ($result->execute( [
                                  $index,           
                                  $titulo_tienda,
                                  $cabezera_titulo,
                                  $cabezara_texto,
                                  $ver_mas_dir,
                                  $modo_produccion,
                                  $paypal_com_fija,
                                  $paypal_com_tarjeta,
                                  $paypal,
                                  $paypal_cliente_id_sandbox,
                                  $paypal_secret_sandbox, 
                                  $paypal_cliente_id,
                                  $paypal_secret,
                                  $openpay_com_fija,
                                  $openpay_com_tarjeta_0,
                                  $openpay_com_tarjeta_3,
                                  $openpay_com_tarjeta_6,
                                  $openpay_com_tarjeta_9,
                                  $openpay_com_tarjeta_12,
                                  $openpay,
                                  $openpay_cliente_id_sandbox,
                                  $openpay_secret_sandbox,
                                  $openpay_cliente_id,
                                  $openpay_secret,
                                  $openpay_public_sandbox,
                                  $openpay_public,
                                  $efectivo_titular,
                                  $efectivo_tar,
                                  $fb_appId, 
                                  $fb_state,
                                  $fb_redirect,
                                  $google_maps,        
                                  $efectivo_banco,      
                                  $envio_gratis,
                                  $precio_envio,
                                  $chat_fb,
                                  $modo_tienda
                                  ])) {

              echo "Datos actualizados con exito, recarge el sitio para ver reflejados los cambios.";

            }else{   
              $arr = $result->errorInfo(); 
              echo ($arr);
              echo "Error";
            } 

        } catch(PDOException $e){
                echo $e->getMessage();
            }
 
?>