<?php
$conn = require_once '../conexion.php';
header('Content-Type: application/json'); 
session_start();
$tipo = trim($_GET['tipo']);
if ($tipo == 'usuarioActual') {
    $id_usuario = $_SESSION['id_session'];
} else {
    $id_usuario  = $tipo;
}
include 'consulta_precio_e_impuestos.php';
include '../pago/calcular_comision_paypal.php';
include  '../configuracion/cargar_datos_empresa.php';
include '../users/permisos_perfil.php';
 $datosTienda = cargarDatosTienda($conn);
 $comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
 $comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];

		try {
			$sql = "SELECT * FROM `movimientos_articulos` WHERE `status`  = ? AND `id_usuario` = ? ";
			$result = $conn->prepare($sql) or die ($sql);
      
			if ($result->execute([1,$id_usuario]))  {
                if ($result->rowCount() > 0) {

                    $json = array();
                    
                    while ($row = $result->fetch()) { 
                    
                        $compuesto = $row['compuesto'];
                        $id = $row['id_articulo'];  

                         
                        $datos_precios_e_impuestos =  consultarPrecioEImpuestos($id,$compuesto,$conn);
                       
                      
                        $precio = $datos_precios_e_impuestos[0]['precio'];
                        $IVA =  $datos_precios_e_impuestos[0]['impuestos'][0]['IVA'];
                        $IEPS =  $datos_precios_e_impuestos[0]['impuestos'][0]['IEPS']; 
                        
                        $total_impuestos = $IVA  + $IEPS ;
                        

                        $precioSinImpuesto =  floatval($precio - (($precio * $total_impuestos)/100));
                      
                        $total_IVA =  floatval(($precio * $IVA )/100);
                        $total_IEPS =  floatval(($precio * $IEPS )/100);
                       
                        $resultado = calcularPrecioConComision($precio,$comisionFijaPayPal,$comisionPorciento,$conn);
                        $precioPayPal =  round($resultado,2);                           
                      
                        
                        if ($compuesto == 1) {

                            $consultar_datos_articulo = "SELECT `id_padre` FROM `articulos` WHERE `id` = ?";
                            $result2 = $conn->prepare($consultar_datos_articulo) or die ($consultar_datos_articulo);
                    
                            if ($result2->execute([$id]))  {
                                while ($row2 = $result2->fetch()) {
                                    $id_padre = $row2['id_padre'];  
                                    $consultar_datos_articulo_padre = "SELECT `nombre`, (SELECT `nombre_elemento` FROM `productos` WHERE `id` = `id_producto`) as elemento FROM `articulos` WHERE `id` = ?";
                                    $result3 = $conn->prepare($consultar_datos_articulo_padre) or die ($consultar_datos_articulo_padre);
                                    if ($result3->execute([$id_padre]))  { 
                                        while ($row3 = $result3->fetch()) {  
                                            $json[] = array(
                                                'id' => $row['id'],
                                                'nombre' => $row3['elemento'].' '.$row3['nombre'],
                                                'cantidad' => $row['cantidad'],
                                                'costo' => $row['costo'],
                                                'precio' => $precio,
                                                'IVA' =>$total_IVA ,
                                                'IEPS' =>$total_IEPS,
                                                'precioSinImpuesto' =>$precioSinImpuesto, 
                                                'subtotal' => $row['costo']*$row['cantidad'],
                                                'precioPayPal' => $precioPayPal
                                            );
                                        }
                                    }
                                   
                                }
                            }
                        }  else{ 
                            $consultar_datos = "SELECT `nombre` FROM `articulos` WHERE `id` = ?";
                            $result4 = $conn->prepare($consultar_datos) or die ($consultar_datos);
                            if ($result4->execute([$id]))  {
                                while ($row4 = $result4->fetch()) {
                                    $json[] = array(
                                        'id' => $row['id'],
                                        'nombre' => $row4['nombre'],
                                        'cantidad' => $row['cantidad'],
                                        'costo' => $row['costo'],
                                        'precio' => $precio,
                                        'IVA' =>$total_IVA ,
                                        'IEPS' =>$total_IEPS,
                                        'precioSinImpuesto' =>$precioSinImpuesto,
                                        'precioPayPal' => $precioPayPal,
                                        'subtotal' => $row['costo']*$row['cantidad']

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