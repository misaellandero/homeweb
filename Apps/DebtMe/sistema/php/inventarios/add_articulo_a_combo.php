<?php
 $conn = require_once '../conexion.php';


  $id_articulo = trim($_POST['id_articulo_add_combo']);
  $cantidad = trim($_POST['cantidad']);
  $id_combo = trim($_POST['id_combo']);

  try
  {
   $sql = " SELECT * FROM `articulos_combo` WHERE `id_articulo` = ? AND `id_combo` = ?";
   $result = $conn->prepare($sql) or die ($sql);
    $result->execute([$id_articulo,$id_combo]);

    if ($result->rowCount() > 0) {
        echo "Ya ha asigando este producto a este combo anteriormente"; // wrong details
      } else {

          $consulta_tipo_articulo = "SELECT `compuesto` FROM `articulos` WHERE `id`= ? AND `compuesto` = 0";
          $result = $conn->prepare( $consulta_tipo_articulo) or die ( $consulta_tipo_articulo);
          $result->execute([$id_articulo]);
          if ($result->rowCount() > 0) {

            $sql = "INSERT INTO `articulos_combo`(`id_combo`, `id_articulo` ,`cantidad`) VALUES (?,?,?) ";
            $result = $conn->prepare($sql);

              if ($result->execute([$id_combo,$id_articulo,$cantidad])) {
                echo "Añadido con exito";
              }else{
                echo "Error no se registro";
              }
              
          } else{
            echo "Este tipo de articulo no es asignable al combo"; // wrong details
          
          }

         
      }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
?>
