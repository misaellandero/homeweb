

<?php
 $conn = require_once '../conexion.php';

  $nombre_empresa_input = ($_POST['nombre_empresa_input']);
  $rfc_empresa_input = ($_POST['rfc_empresa_input']);
  $dir_empresa_input = ($_POST['dir_empresa_input']);
  $tels_empresa_input = ($_POST['tels_empresa_input']);
  $msj_empresa_input = ($_POST['msj_empresa_input']);
  $mail_empresa_input = ($_POST['mail_empresa_input']);
  $web_empresa_input = ($_POST['web_empresa_input']);
  $fb_empresa_input = ($_POST['fb_empresa_input']);
  $inst_empresa_input = ($_POST['inst_empresa_input']);
  $twtr_empresa_input = ($_POST['twtr_empresa_input']);
  $wtsp_empresa_input = ($_POST['wtsp_empresa_input']);
  $tlg_empresa_input = ($_POST['tlg_empresa_input']);
  $mgn_empresa_input = ($_POST['mgn_empresa_input']);
  $terminos_empresa_input = ($_POST['terminos_empresa_input']);
  $sobre_nosotros_corto_empresa_input = ($_POST['sobre_nosotros_corto_empresa_input']);
  $sobre_nosotros_largo_empresa_input = ($_POST['sobre_nosotros_largo_empresa_input']);
  $mision_empresa_input = ($_POST['mision_empresa_input']);
  $vision_empresa_input = ($_POST['vision_empresa_input']);
  $cambio_dolar = ($_POST['cambio_dolar_empresa_input']); 

       try
            {
              $sql = "UPDATE `configuraciones_generales` SET 
                    `nombre` = ?,
                    `rfc` = ?,
                    `dir` = ?,
                    `tels` = ?,
                    `msj` = ?,
                    `mail` = ?,
                    `web` = ?,
                    `fb` = ?,
                    `inst` = ?,
                    `twtr` = ?,
                    `wtsp` = ?,
                    `sobre_nosotros_corto` = ?, 
                    `sobre_nosotros_largo`  = ?,
                    `mision` = ?, 
                    `vision` = ?,
                    `terminos` = ?,
                    `cambio_dolar` = ?,
                    `mgn` = ?,
                    `tlg` = ?
                     WHERE `id` = 1
                     ";

            $result = $conn->prepare($sql);

            if ($result->execute([$nombre_empresa_input,
                                  $rfc_empresa_input,
                                  $dir_empresa_input,
                                  $tels_empresa_input,
                                  $msj_empresa_input,
                                  $mail_empresa_input,
                                  $web_empresa_input,
                                  $fb_empresa_input,
                                  $inst_empresa_input,
                                  $twtr_empresa_input,
                                  $wtsp_empresa_input,
                                  $sobre_nosotros_corto_empresa_input,
                                  $sobre_nosotros_largo_empresa_input,
                                  $mision_empresa_input,
                                  $vision_empresa_input,
                                  $terminos_empresa_input,
                                  $cambio_dolar,
                                  $mgn_empresa_input,
                                  $tlg_empresa_input])) {


              echo "Datos actualizados con exito, recarge el sitio para ver reflejados los cambios.";

            }else{
              var_dump($result);
              echo "Error";
            }

        } catch(PDOException $e){
                echo $e->getMessage();
            }
 
?>
