<?php
 $conn = require_once '../conexion.php'; 
  $id_producto = ($_POST['id_producto']);
  $nombre_articulo = ($_POST['nombre_articulo']);
  $costo_articulo = ($_POST['costo_articulo']);
  $precio_articulo = ($_POST['precio_articulo']);
  $id_impuesto = ($_POST['id_impuesto'] ?? '');

  $ids_campo = !empty($_POST['ids_campo']) ? $_POST['ids_campo'] : '';
  $valores_campos = !empty($_POST['valores_campos']) ? $_POST['valores_campos'] : '';
  
  $ExistenciaArticulo = ($_POST['ExistenciaArticulo']);
  $codigodeBarras = ($_POST['codigodeBarras']); 
  $disponibilidadArticulo = ($_POST['disponibilidad']);
  $destacar = ($_POST['destacar']);
  $des_corta = ($_POST['des_corta']);
  $des_larga = ($_POST['des_larga']);
  $sucursal = ($_POST['sucursal']);
  $skuArticulo = ($_POST['skuArticulo']);
  $precioAnterior = ($_POST['precioAnterior'] ?? 0); 
  $compuesto = 0;



  $sql = "SELECT * FROM `productos` WHERE `id` = $id_producto";
  $result = $conn->prepare($sql) or die ($sql);

  if (!$result->execute()) return false;

  if ($result->rowCount() > 0) {
    $json = array();
    while ($row = $result->fetch()) {
      $compuesto = ($row['compuesto']);
    }

  }
  $main_pic = 0;
  if ($id_impuesto == "") { 
    $id_impuesto = 0;
  }

  if ($nombre_articulo == "") {
    echo "Indica un nombre para registrar tu producto";
  } else {
       try
  {
   $sql = " SELECT * FROM `articulos`  WHERE `nombre` = ? AND `id_producto` = ? ";
   $result = $conn->prepare($sql) or die ($sql);
   $result->execute([$nombre_articulo,$id_producto]);

    if ($result->rowCount() > 0) {
        echo "$nombre_articulo ya existe, elige otro nombre"; // wrong details
      } else {
          $row = $result->fetch();

          $sql = "INSERT INTO `articulos`
           (`nombre`,
            `id_producto`,
            `existencia`,
            `costo`,
            `precio`,
            `compuesto`,
            `id_padre`,
            `id_impuesto`,
            `id_main_pic`,
            `codigoBarras`,
            `disponibilidad_articulo`,
            `sku`,
            `sucursal`,
            `des_corta`,
            `des_larga`,
            `precio_anterior`,
            `destacado`)
            VALUES (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?)";
            $result = $conn->prepare($sql);

            if ($result->execute([$nombre_articulo,
                                  $id_producto,
                                  $ExistenciaArticulo,
                                  $costo_articulo,
                                  $precio_articulo,
                                  $compuesto,
                                  0,
                                  $id_impuesto,
                                  $main_pic,
                                  $codigodeBarras,
                                  $disponibilidadArticulo,
                                  $skuArticulo,
                                  $sucursal, 
                                  $des_corta,
                                  $des_larga, 
                                  $precioAnterior,
                                  $destacar])) {

              $id = $conn->lastInsertId($sql);
              $contador = 0;
               
              for ($i=0; $i < count($ids_campo); $i++) {
                $sql = "INSERT INTO `articulos_campos`(`id_articulo`, `id_campo`, `val`) VALUES
                (?,?,?)";
                $result = $conn->prepare($sql);
                $result->execute([$id,$ids_campo[$i],$valores_campos[$i]]);
              }

              echo "$nombre_articulo registrado con exito";

            }else{
              echo "Error $nombre_articulo no se registro";
            }

          }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }

  }
?>
