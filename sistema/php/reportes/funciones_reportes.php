<?php

    function reporteVentas($usuario,$fechaInicial,$fechaFinal,$conn){
          if ($usuario == "Todos") {
                $periodo_de_tiempo = " `fecha` BETWEEN '$fechaInicial' AND '$fechaFinal' ";
            } else{
                $periodo_de_tiempo = " `fecha` BETWEEN '$fechaInicial' AND '$fechaFinal'  AND `id_usuario` = $usuario";
            
            }
             
             $sql = " SELECT *, 
                            (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
                            (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
                            FROM `movimientos_inventario` WHERE  $periodo_de_tiempo  ORDER BY fecha DESC";
                            
                            $result = $conn->prepare($sql) or die ($sql);
                    
                             
                
                    if (!$result->execute()) return false;

                    if ($result->rowCount() > 0) { 
                        $json = array();
                        $totalVentas = 0;

                        while ($row = $result->fetch()) { 
                            $tipo = $row['tipo']; 
                            $total = 0 + $row['costo_total'];
                            $totalVentas = $totalVentas + $total;
                            $json[] = array(
                                'id' => $row['id'],
                                'tipo' => $tipo,
                                'concepto' => $row['concepto_movimiento'],
                                'costo_total' => $total,
                                'usuario' => $row['usuario_movimiento'],
                                'detalles' => $row['detalles'],
                                'fecha' => $row['fecha']
                            );
                            
                        }
                        $json['total'] = $totalVentas;
                        //echo json_encode($json);
                        return $json;
                    } 
               

    }

    function reporteventasProducto($id_producto,$id_articulo,$usuario,$fechaInicial,$fechaFinal,$conn)
    {
        
            if ($usuario == "Todos") {
                $periodo_de_tiempo = " `fecha` BETWEEN '$fechaInicial' AND '$fechaFinal' ";
            } else{
                $periodo_de_tiempo = " `fecha` BETWEEN '$fechaInicial' AND '$fechaFinal'  AND `id_usuario` = $usuario";
            
            }
               
             $sql = " SELECT *, 
                            (SELECT `nombre` FROM `movimientos_tipo` WHERE `id` = `concepto`) as concepto_movimiento, 
                            (SELECT `nombre` FROM `usuarios_usuarios` WHERE `id` = `id_usuario`) as usuario_movimiento
                            FROM `movimientos_inventario` WHERE  $periodo_de_tiempo  ORDER BY fecha DESC";
                            
                            $result = $conn->prepare($sql) or die ($sql);
                    
                             
               
                    if (!$result->execute()) return false;

                    if ($result->rowCount() > 0) { 
                        $json = array();
                        $totalVentas = 0;
                        $cantidad_total = 0;
                      
                        while ($row = $result->fetch()) { 
                         $id_movimiento = $row['id']; 
                         $ElementosMovimiento = consultaElementosMovimientosReporte($id_movimiento,$conn);
                         
                            foreach ($ElementosMovimiento as $elemento) { 

                                if ($id_producto == 0) {

                                        if ($id_articulo == 0) {
                                    
                                            $total = 0 + $row['costo_total'];
                                            $cantidad_total = $cantidad_total +$elemento['cantidad'] ;

                                            $json[] = array(
                                            'id' => $elemento['id'],
                                            'id_movimiento' => $row['id'],
                                            'id_articulo' => $elemento['id_articulo'],
                                            'nombre' => $elemento['nombre'],
                                            'id_producto' => $elemento['id_producto'],
                                            'cantidad' => $elemento['cantidad'], 
                                            'importe' => $elemento['subtotal'],
                                            'concepto_movimiento' => $row['concepto_movimiento'],
                                            'usuario' => $row['usuario_movimiento'], 
                                            'fecha' => $row['fecha']
                                            );
                                            
                                            $totalVentas = $totalVentas + $elemento['subtotal']; 
                                    
                                        } else{
                                            if ($id_articulo == $elemento['id_articulo']) {
                                                $total = 0 + $row['costo_total'];
                                                $cantidad_total = $cantidad_total +$elemento['cantidad'] ;

                                                $json[] = array(
                                                'id' => $elemento['id'],
                                                'id_movimiento' => $row['id'],
                                                'id_articulo' => $elemento['id_articulo'],
                                                'nombre' => $elemento['nombre'],
                                                'id_producto' => $elemento['id_producto'],
                                                'cantidad' => $elemento['cantidad'], 
                                                'importe' => $elemento['subtotal'],
                                                'concepto_movimiento' => $row['concepto_movimiento'],
                                                'usuario' => $row['usuario_movimiento'], 
                                                'fecha' => $row['fecha']
                                                );
                                                
                                                $totalVentas = $totalVentas + $elemento['subtotal']; 
                                                }
                                        }
                                } else{
                                    if ($id_producto == $elemento['id_producto']) {
                                        if ($id_articulo == 0) {
                                    
                                            $total = 0 + $row['costo_total'];
                                            $cantidad_total = $cantidad_total +$elemento['cantidad'] ;

                                            $json[] = array(
                                            'id' => $elemento['id'],
                                            'id_movimiento' => $row['id'],
                                            'id_articulo' => $elemento['id_articulo'],
                                            'nombre' => $elemento['nombre'],
                                            'id_producto' => $elemento['id_producto'],
                                            'cantidad' => $elemento['cantidad'], 
                                            'importe' => $elemento['subtotal'],
                                            'concepto_movimiento' => $row['concepto_movimiento'],
                                            'usuario' => $row['usuario_movimiento'], 
                                            'fecha' => $row['fecha']
                                            );
                                            
                                            $totalVentas = $totalVentas + $elemento['subtotal']; 
                                    
                                        } else{
                                            if ($id_articulo == $elemento['id_articulo']) {
                                                $total = 0 + $row['costo_total'];
                                                $cantidad_total = $cantidad_total +$elemento['cantidad'] ;

                                                $json[] = array(
                                                'id' => $elemento['id'],
                                                'id_movimiento' => $row['id'],
                                                'id_articulo' => $elemento['id_articulo'],
                                                'nombre' => $elemento['nombre'],
                                                'id_producto' => $elemento['id_producto'],
                                                'cantidad' => $elemento['cantidad'], 
                                                'importe' => $elemento['subtotal'],
                                                'concepto_movimiento' => $row['concepto_movimiento'],
                                                'usuario' => $row['usuario_movimiento'], 
                                                'fecha' => $row['fecha']
                                                );
                                                
                                                $totalVentas = $totalVentas + $elemento['subtotal']; 
                                                }
                                        }
                                    }
                                }   
                            }    
                        }

                        $json['total'] = $totalVentas;
                        $json['totalCantidad'] = $cantidad_total;
                        
                        //echo json_encode($json);
                        return $json;
                    } 
                 

            }

?>