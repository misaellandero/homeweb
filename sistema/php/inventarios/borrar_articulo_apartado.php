<?php
 $conn = require_once '../conexion.php';

  $id_apartado = trim($_POST['id']);

  try
  {
          $ver_tipo = "SELECT * FROM `movimientos_articulos` WHERE `id` = ?";
          $result = $conn->prepare($ver_tipo);
          if ($result->execute([$id_apartado])) {
            $row = $result->fetch();
            $compuesto = $row['compuesto'];

            if ($compuesto == 2) { 
              include 'consulta_articulos_combo_para_apartar.php';
              eliminarElementosCombo($id_apartado,$conn);
              borrarEsteCombo($id_apartado,$conn);
              echo 'Eliminado con Exito';

            } else {
              $sql = "DELETE FROM `movimientos_articulos` WHERE `id` = (?) ";
              $result = $conn->prepare($sql);
                if ($result->execute([$id_apartado])) {
                  echo 'Eliminado con Exito';
                }
            }



          }
  } catch(PDOException $e){
   echo $e->getMessage();
  }
?>
