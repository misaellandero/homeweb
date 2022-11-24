<?php
function registrarMovimiento($id_usuario,$tipos_movimiento,$concepto_movimiento,$comentarios_movimiento,$total,$conn,$referencia_bancaria,$post)
  
 {
  $id_movimiento = 0;
   if($referencia_bancaria === NULL) {
    $referencia_bancaria = "No Aplica";
  }
  
  try{
    $sql = "INSERT INTO `movimientos_inventario`
    (`tipo`, `concepto`, `costo_total`, `id_usuario`, `detalles`,`refbancaria`)
     VALUES (?, ?, ?, ?, ?, ?)";
     $result = $conn->prepare($sql);
 
     if ($result->execute([$tipos_movimiento,
                           $concepto_movimiento,
                           $total,
                           $id_usuario,
                           $comentarios_movimiento,
                           $referencia_bancaria])) {

       $id = $conn->lastInsertId($sql);
       $id_movimiento = $id;

       if ($tipos_movimiento == 1) {
         
         $actualizar_existencia_articulos_movimiento = "SELECT `id_articulo`, `cantidad` FROM `movimientos_articulos`
                                                         WHERE `id_usuario` = ?
                                                         AND `status` = 1";

          $result = $conn->prepare($actualizar_existencia_articulos_movimiento) or die ($actualizar_existencia_articulos_movimiento);

           if ($result->execute([$id_usuario]))  { 
                 if ($result->rowCount() > 0) { 
                    while ($row = $result->fetch()) { 
                         $id_articulo = $row['id_articulo'];
                         $cantidad = $row['cantidad'];  
                         $update_articulo = "UPDATE `articulos` SET `existencia` = (`existencia` - ?) WHERE `articulos`.`id` = ?"; 
                         $result2 = $conn->prepare($update_articulo);
                         $result2->execute([$cantidad,$id_articulo]);
     
                         }
                    }
             }

         $actualizar_status_articulos_movimiento = "UPDATE `movimientos_articulos` 
                                                     SET `id_movimiento` = ?,
                                                     `status` = '0'
                                                     WHERE `id_usuario` = ?
                                                     AND `status` = 1";
         $result3 = $conn->prepare($actualizar_status_articulos_movimiento);
         $result3->execute([$id,$id_usuario]);                                            

       }else{
         $id_articulo = ($post['id_articulo']);
         $costo_articulo = ($post['costo_articulo']);
         $cantidad_articulo = ($post['cantidad_articulo']);
         $datos_extas = ($post['datos_extas']);
         $id_datos_extras = ($post['id_datos_extras']);
         $compuesto_articulo = ($post['compuesto_articulo']);
       
         for ($i=0; $i < count($id_articulo); $i++) {
          
           $sql = "INSERT INTO `movimientos_articulos`(`id_movimiento`, `id_articulo`, `cantidad`,`costo`,`compuesto`,`status`,`id_usuario`) VALUES
           (?,?,?,?,?,?,?)";
           $result = $conn->prepare($sql);
           //var_dump($sql);
          // var_dump($id,$id_articulo[$i],$cantidad_articulo[$i],$costo_articulo[$i],$compuesto_articulo[$i],0,$id_usuario);
          $result->execute([$id,$id_articulo[$i],$cantidad_articulo[$i],$costo_articulo[$i],$compuesto_articulo[$i],0,$id_usuario]);
          

        

           //entrada
           if ($tipos_movimiento == 0) {
             //articulo compuesto
             if ($compuesto_articulo[$i] == '1' ) {
              
               $sql = "INSERT INTO `articulos`(`id_padre`,`existencia`,`costo`,`nombre`,`id_producto`,`precio`, `compuesto`, `id_impuesto`, `id_main_pic`, `precio_anterior` ) VALUES
               (?,?,?,?,?,?,?,?,?,?)";
               $result = $conn->prepare($sql);
               $result->execute([$id_articulo[$i],$cantidad_articulo[$i],$costo_articulo[$i],'elemento','0',0,0,0,0,0]);
               $id_compuesto = $conn->lastInsertId($sql);
               for ($e=0; $e < count($id_datos_extras[$i]); $e++) {
                 $sql = "INSERT INTO `articulos_campos`(`id_articulo`, `id_campo`, `val`) VALUES
                 (?,?,?)";
                 $result = $conn->prepare($sql); 
                 $result->execute([$id_compuesto,$id_datos_extras[$i][$e],$datos_extas[$i][$e]]);
               }

             } else {
               //actualizar existencias
               $costoEntrada = $cantidad_articulo[$i] * $costo_articulo[$i];
               $sql = "UPDATE `articulos` SET `existencia` = `existencia` + ?, `costo` = (((`existencia`*`costo`) +(?))/(`existencia` + ?)) WHERE `articulos`.`id` = ?;";
               $result = $conn->prepare($sql);
               $result->execute([$cantidad_articulo[$i],$costoEntrada,$cantidad_articulo[$i],$id_articulo[$i]]);

             }
           }else {

            /* //actualizar existencias
             $sql = "UPDATE `articulos` SET `existencia` = `existencia` - '?', WHERE `articulos`.`id` = ?;";
             $result = $conn->prepare($sql);
             $result->execute([$cantidad_articulo[$i],$id_articulo[$i]]);*/

           }

         
       }

     }
     if ($comentarios_movimiento == "Venta de Mostrador" || $comentarios_movimiento == "Pago PayPal Tienda en linea" || $comentarios_movimiento == "Pago OpenPay Tienda en linea" || $comentarios_movimiento == "Deposito directo Tienda en linea"){
       return $id_movimiento;
     }else{
       return "Movimiento registrado con exito";
     }
      

     }else{
       return "Error Movimiento no se registro";
     }
}
catch(PDOException $e){
return $e->getMessage();
}

 }
 

 function registrarPago($medioPago,$conn,$id_usuario,$total,$comprobante_pago)
          {
            $tipos_movimiento = 1;
            $concepto_movimiento = 5;
            $mediosPago = ['Efectivo Punto de Venta','Tarjeta Punto de Venta', 'Deposito directo Tienda en linea', 'Pago PayPal Tienda en linea','Pago OpenPay Tienda en linea' ];
            $comentarios_movimiento = $mediosPago[$medioPago];
            $movimiento = registrarMovimiento($id_usuario,$tipos_movimiento,$concepto_movimiento,$comentarios_movimiento,$total,$conn,'No aplica');
              if ($movimiento > 0) {
                $sql = "UPDATE `usuarios_usuarios`
                SET `pedido` = 3
                WHERE  `id` = '$id_usuario' ";

                if ($conn->query($sql) == TRUE) {
                
                  $sql2 = "UPDATE `movimientos_pedidos`
                  SET `id_movimiento` = $movimiento,
                  `comprobante_pago` = '$comprobante_pago',
                  `status` = 3,
                  `tipo_pago` = $medioPago  
                  WHERE  `id_cliente` = '$id_usuario' AND `status` = 2 ";
                    if ($conn->query($sql2) == TRUE) {
                      return "Aprobado";
                  }

              }
            
              //echo 'Pago Aceptado, revisa tu perfil para ver los datos de envio. Se actualizo con exito tu perfil a '.$status[$nuevo_status];
            }
          } 

?>
