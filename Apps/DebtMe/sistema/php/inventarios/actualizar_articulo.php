<?php
 $conn = require_once '../conexion.php';

  $id_articulo = ($_POST['id_articulo']);
  $nombre_articulo = ($_POST['nombre_articulo']);
  $costo_articulo = ($_POST['costo_articulo']);
  $precio_articulo = ($_POST['precio_articulo']);
  $id_impuesto = ($_POST['id_impuesto']);
  $ids_campo = ($_POST['ids_campo']);
  $valores_campos = ($_POST['valores_campos']);
  $codigoBarras = ($_POST['codigoBarras']);
  $disponibilidadArticulo  = ($_POST['disponibilidadArticulo']);
  $destacar = ($_POST['destacar']);
  $des_corta = ($_POST['des_corta']);
  $des_larga = ($_POST['des_larga']);
  $sucursal = ($_POST['sucursal']);
  $skuArticulo = ($_POST['skuArticulo']);
  $precioAnterior = ($_POST['precioAnterior']); 
 
  if ($nombre_articulo == "") {
    echo "Indica un nombre para registrar tu producto";
  } else {
       try
  {
            $sql = "UPDATE `articulos` SET 
            `codigoBarras` = ?,
            `nombre` = ?,
            `costo` = ?,
            `precio` = ?,
            `id_impuesto` = ?,
            `disponibilidad_articulo` = ?,
            `destacado` = ?,
            `sku` = ?,
            `sucursal` = ?,
            `des_corta` = ?,
            `precio_anterior` = ?,
            `des_larga` = ?
            WHERE `id` = ?
             ";
            $result = $conn->prepare($sql); 
             
            if ($result->execute([$codigoBarras,
                                  $nombre_articulo,
                                  $costo_articulo,
                                  $precio_articulo,
                                  $id_impuesto,
                                  $disponibilidadArticulo,
                                  $destacar,
                                  $skuArticulo,
                                  $sucursal,
                                  $des_corta,
                                  $precioAnterior,
                                  $des_larga,
                                  $id_articulo
                                  ])) {


              $sql = "DELETE FROM `articulos_campos` WHERE `id_articulo` = ?";
              $result = $conn->prepare($sql);
              $result->execute([$id_articulo]);
              $contador = 0;
              for ($i=0; $i < count($ids_campo); $i++) {
                $sql = "INSERT INTO `articulos_campos`(`id_articulo`, `id_campo`, `val`) VALUES
                (?,?,?)";
                $result = $conn->prepare($sql);
                $result->execute([$id_articulo,$ids_campo[$i],$valores_campos[$i]]);
              }
              echo "$nombre_articulo actualizado con exito";

            }else{
              echo "Error $nombre_articulo no se actualizo";
            }

          } catch(PDOException $e){
   echo $e->getMessage();
  }

  }
?>
