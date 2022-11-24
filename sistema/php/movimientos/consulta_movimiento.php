<?php

 function consultaMovimiento($id,$conn){
  try {
 
    $sql = " SELECT *, 
             (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
             (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
             FROM `movimientos_inventario` WHERE `id` = $id ";
    $result = $conn->prepare($sql) or die ($sql);
  
    if (!$result->execute()) return false;
  
    if ($result->rowCount() > 0) { 
        $json = array();
  
        while ($row = $result->fetch()) { 
            $tipo = $row['tipo']; 
            $json[] = array(
                'id' => $row['id'],
                'tipo' => $tipo,
                'concepto' => $row['concepto_movimiento'],
                'costo_total' => $row['costo_total'],
                'usuario' => $row['usuario_movimiento'],
                'detalles' => $row['detalles'],
                'fecha' => $row['fecha'],
                'total' => $row['costo_total']
            );
              
        } 
  
       return $json ;
    }
  } catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
  }

 }

function consultaElementosMovimientos($id_movimiento,$conn){ 
  try { 
    $sql = "SELECT * FROM `movimientos_articulos` WHERE `id_movimiento` = ?  ";
    $result = $conn->prepare($sql) or die ($sql);
    if ($result->execute([$id_movimiento]))  {
      if ($result->rowCount() > 0) {

        $json = array();
        
        while ($row = $result->fetch()) { 
        
            $compuesto = $row['compuesto'];
            $id = $row['id_articulo'];  


            $padre_combo = $row['id_combo'];
           
            if ($padre_combo > 0 ) {

               
                $precio = 0;
                $IVA =  0;
                $IEPS =  0;
                
                $total_impuestos = 0;
                
    
                $precioSinImpuesto =  floatval(0);
              
                $total_IVA =  floatval(0);
                $total_IEPS =  floatval(0);
                
            }else{
              
                $datos_precios_e_impuestos =  consultarPrecioEImpuestos($id,$compuesto,$conn);
           
          
                $precio = $datos_precios_e_impuestos[0]['precio'];
                $IVA =  $datos_precios_e_impuestos[0]['impuestos'][0]['IVA'];
                $IEPS =  $datos_precios_e_impuestos[0]['impuestos'][0]['IEPS']; 
                
                $total_impuestos = $IVA  + $IEPS ;
                
    
                $precioSinImpuesto =  floatval($precio - (($precio * $total_impuestos)/100));
              
                $total_IVA =  floatval(($precio * $IVA )/100);
                $total_IEPS =  floatval(($precio * $IEPS )/100);
                 
            }
           
            
            if ($compuesto == 1) {

                $consultar_datos_articulo = "SELECT `id_padre` FROM `articulos` WHERE `id` = ?";
                $result2 = $conn->prepare($consultar_datos_articulo) or die ($consultar_datos_articulo);
               

                if ($result2->execute([$id]))  {
                    while ($row2 = $result2->fetch()) {
                        $id_padre = $row2['id_padre'];  
                        $consultar_datos_articulo_padre = "SELECT `nombre`,`id_producto`, (SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as elemento FROM `articulos` WHERE `id` = ?";
                        $result3 = $conn->prepare($consultar_datos_articulo_padre) or die ($consultar_datos_articulo_padre);
                        if ($result3->execute([$id_padre]))  { 
                            while ($row3 = $result3->fetch()) {
                                $cantidad = number_format($row['cantidad'], 2, '.', '');  
                                $json[] = array(
                                    'id' => $row['id'],
                                    'nombre' => $row3['elemento'].' '.$row3['nombre'],
                                    'cantidad' => $cantidad,
                                    'costo' => $row['costo'],
                                    'id_articulo' => $row['id_articulo'],
                                    'id_producto' => $row3['id_producto'],
                                    'precio' => $precio,
                                    'IVA' =>$total_IVA ,
                                    'IEPS' =>$total_IEPS,
                                    'precioSinImpuesto' =>$precioSinImpuesto, 
                                    'subtotal' => $row['costo']*$row['cantidad']
                                );
                            }
                        }
                       
                    }
                }
            }  else{ 
                $consultar_datos = "SELECT `nombre` ,`id_producto` FROM `articulos` WHERE `id` = ?";
                $result4 = $conn->prepare($consultar_datos) or die ($consultar_datos);
                if ($result4->execute([$id]))  {
                    while ($row4 = $result4->fetch()) {
                        $cantidad = number_format($row['cantidad'], 2, '.', '');  
                                
                        $json[] = array(
                            'id' => $row['id'],
                            'nombre' => $row4['nombre'],
                            'id_articulo' => $row['id_articulo'],
                            'id_producto' => $row4['id_producto'],
                            'cantidad' => $cantidad,
                            'costo' => $row['costo'],
                            'precio' => $precio,
                            'IVA' =>$total_IVA ,
                            'IEPS' =>$total_IEPS,
                            'precioSinImpuesto' =>$precioSinImpuesto,
                            'subtotal' => $precio*$row['cantidad']

                        );
                    }
                }
            }
            

        }
        
        return ($json);
    }
      
          }

          
  } catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
  }
}

function consultaElementosMovimientosReporte($id_movimiento,$conn){ 
    try { 
      $sql = "SELECT * FROM `movimientos_articulos` WHERE `id_movimiento` = ?  ";
      $result = $conn->prepare($sql) or die ($sql);
      if ($result->execute([$id_movimiento]))  {
        if ($result->rowCount() > 0) {
  
          $json = array();
          
          while ($row = $result->fetch()) { 
          
              $compuesto = $row['compuesto'];
              $id = $row['id_articulo'];  
  
  
              $padre_combo = $row['id_combo'];
             
              
  
                 
                  $precio = 0;
                  $IVA =  0;
                  $IEPS =  0;
                  
                  $total_impuestos = 0;
                  
      
                  $precioSinImpuesto =  floatval(0);
                
                  $total_IVA =  floatval(0);
                  $total_IEPS =  floatval(0);
                  
               
            
                  $consultar_datos = "SELECT `nombre` ,`id_producto` FROM `articulos` WHERE `id` = ?";
                  $result4 = $conn->prepare($consultar_datos) or die ($consultar_datos);
                  if ($result4->execute([$id]))  {
                      while ($row4 = $result4->fetch()) {
                          $cantidad = number_format($row['cantidad'], 2, '.', '');  
                                  
                          $json[] = array(
                              'id' => $row['id'],
                              'nombre' => $row4['nombre'],
                              'id_articulo' => $row['id_articulo'],
                              'id_producto' => $row4['id_producto'],
                              'cantidad' => $cantidad,
                              'costo' => $row['costo'],
                              'precio' => $precio,
                              'IVA' =>$total_IVA ,
                              'IEPS' =>$total_IEPS,
                              'precioSinImpuesto' =>$precioSinImpuesto,
                              'subtotal' => $precio*$row['cantidad']
  
                          );
                      }
                  }
              
              
  
          }
          
          return ($json);
      }
        
            }
  
            
    } catch (PDOException $e) {
      echo 'Error: '. $e->getMessage();
    }
  }

?>
