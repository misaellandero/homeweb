<?php
header('Content-Type: application/json'); 

$conn = require_once '../conexion.php';
include '../configuracion/cargar_datos_empresa.php';
include 'consulta_precio_e_impuestos.php';
include '../pago/calcular_comision_paypal.php';
$datosEmpresa = cargarDatosEmpresa($conn);
$datosTienda = cargarDatosTienda($conn); 
$comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
$comisionPorciento = $datosTienda[0]['paypal_com_tarjeta']; 

        $id_movimiento = trim($_GET['id_movimiento']);
        $tipo_moviento = 0;

        $id_movimiento = trim($_GET['id_movimiento']);
        $consultar_tipoMovimiento = "SELECT `tipo` FROM `movimientos_inventario` WHERE `id` = ?";
        $result = $conn->prepare($consultar_tipoMovimiento ) or die ($consultar_tipoMovimiento );
        if ($result->execute([$id_movimiento]))  {
            if ($result->rowCount() > 0) {
                while ($row = $result->fetch()) { 
                    $tipo_moviento = $row['tipo'];
                }
            }
        }
         
		try {
			$sql = "SELECT * FROM `movimientos_articulos` WHERE `id_movimiento` = ?  ";
			$result = $conn->prepare($sql) or die ($sql);
         
			if ($result->execute([$id_movimiento]))  {
                if ($result->rowCount() > 0) {

                    $json = array();
                    
                    while ($row = $result->fetch()) { 
                        
                        $id = $row['id_articulo'];  
                        $compuesto = $row['compuesto'];   
                        if ($compuesto == 1) {  
                            if ($tipo_moviento == 0) {
                                /*$consultar_datos_articulo = "SELECT `id_padre` FROM `articulos` WHERE `id` = ?";
                            $result2 = $conn->prepare($consultar_datos_articulo) or die ($consultar_datos_articulo);*/
                            
                           //if ($result2->execute([$id]))  {
                            //while ($row2 = $result2->fetch()) {
                                $id_padre = $id; 
                                    $consultar_datos_articulo_padre = "SELECT `nombre`, 
                                    (SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as elemento 
                                    ,(SELECT `IVA` FROM `impuestos` WHERE `id` = `id_impuesto`) as IVA
                                    ,(SELECT `IEPS` FROM `impuestos` WHERE `id` = `id_impuesto`) as IEPS
                                    ,(SELECT `ISR` FROM `impuestos` WHERE `id` = `id_impuesto`) as ISR
                                    FROM `articulos` WHERE `id` = ?";
                                    $result3 = $conn->prepare($consultar_datos_articulo_padre) or die ($consultar_datos_articulo_padre);
                                    
                                    if ($result3->execute([ $id_padre ]))  { 
                                        while ($row3 = $result3->fetch()) {

                                            $total = $row['costo'];
                                            $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
                                            $row['costo_paypal'] =  $totalpaypal;
                                  
                                            $json[] = array(
                                                'id' => $row['id'],
                                                'nombre' => $row3['elemento'].' '.$row3['nombre'],
                                                'cantidad' => $row['cantidad'],
                                                'costo' => $row['costo'],
                                                'IVA' => $row3['IVA'],
                                                'IEPS' => $row3['IEPS'],
                                                'ISR' => $row3['ISR'],
                                                'subtotal' => $row['costo']*$row['cantidad'],
                                                'costo_paypal' => $row['costo_paypal'],
                                                'subtotal_paypal' => $row['costo_paypal']*$row['cantidad']
                                            );
                                        }
                                    }
                                //}
                            //}
                            } else {

                            $consultar_datos_articulo = "SELECT `id_padre` FROM `articulos` WHERE `id` = ?";
                            $result2 = $conn->prepare($consultar_datos_articulo) or die ($consultar_datos_articulo);
                            
                           if ($result2->execute([$id]))  {
                            while ($row2 = $result2->fetch()) {
                                     $id_padre = $row2['id_padre'];  
                                      
                                    $consultar_datos_articulo_padre = "SELECT `nombre`, (SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as elemento , (SELECT `IVA` FROM `impuestos` WHERE `id` = `id_impuesto`) as IVA
                                    ,(SELECT `IEPS` FROM `impuestos` WHERE `id` = `id_impuesto`) as IEPS
                                    ,(SELECT `ISR` FROM `impuestos` WHERE `id` = `id_impuesto`) as ISR FROM `articulos` WHERE `id` = ?";
                                    $result3 = $conn->prepare($consultar_datos_articulo_padre) or die ($consultar_datos_articulo_padre);
                                    
                                    if ($result3->execute([ $id_padre]))  { 
                                        while ($row3 = $result3->fetch()) {

                                            $total = $row['costo'];
                                            $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
                                            $row['costo_paypal'] =  $totalpaypal;
                                  
                                            $json[] = array(
                                                'id' => $row['id'],
                                                'nombre' => $row3['elemento'].' '.$row3['nombre'],
                                                'cantidad' => $row['cantidad'],
                                                'costo' => $row['costo'],
                                                'IVA' => $row3['IVA'],
                                                'IEPS' => $row3['IEPS'],
                                                'ISR' => $row3['ISR'],
                                                'subtotal' => $row['costo']*$row['cantidad'],
                                                'costo_paypal' => $row['costo_paypal'],
                                                'subtotal_paypal' => $row['costo_paypal']*$row['cantidad']
                                            );
                                        }
                                    }
                                }
                            }
                            }
                            
                             
                        

                        } else{ 
                            $consultar_datos = "SELECT `nombre`,(SELECT `IVA` FROM `impuestos` WHERE `id` = `id_impuesto`) as IVA
                            ,(SELECT `IEPS` FROM `impuestos` WHERE `id` = `id_impuesto`) as IEPS
                            ,(SELECT `ISR` FROM `impuestos` WHERE `id` = `id_impuesto`) as ISR  FROM `articulos`  WHERE `id` = ?";
                            $result4 = $conn->prepare($consultar_datos) or die ($consultar_datos);
                            if ($result4->execute([$id]))  {
                                while ($row4 = $result4->fetch()) {
                                    $total = $row['costo'];
                                    $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
                                    $row['costo_paypal'] =  $totalpaypal;
                                    $json[] = array(
                                        'id' => $row['id'],
                                        'nombre' => $row4['nombre'],
                                        'cantidad' => $row['cantidad'],
                                        'costo' => $row['costo'],
                                        'IVA' => $row4['IVA'],
                                        'IEPS' => $row4['IEPS'],
                                        'ISR' => $row4['ISR'],
                                        'subtotal' => $row['costo']*$row['cantidad'],
                                        'costo_paypal' => $row['costo_paypal'],
                                        'subtotal_paypal' => $row['costo_paypal']*$row['cantidad']

                                    );
                                }
                            }
                        }
                        
    
                    }
                    $json['success'] = true;
                    echo json_encode($json);
                }
				
            }

            
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}
?>