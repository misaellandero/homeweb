<?php
function totalApartados($id_usuario,$conn)
{
    $total = 0;
    try {
        $sql = "SELECT * FROM `movimientos_articulos` WHERE `status`  = '1' AND `id_usuario` = ? ";
        $result = $conn->prepare($sql) or die ($sql);
        if ($result->execute([$id_usuario]))  {
            if ($result->rowCount() > 0) {
                while ($row = $result->fetch()) { 
                    $id = $row['id_articulo'];
                    $datos_precios_e_impuestos =  consultarPrecioEImpuestos($id,$compuesto,$conn);
                    $precio = $datos_precios_e_impuestos[0]['precio'];
                    $total = $total + $precio;
                }

                return $total; 
           }
        }   
    } catch (PDOException $e) {
        echo 'Error: '. $e->getMessage();
    }
}

function articulosApartados($id_usuario,$conn)
{
    $total = "";
    try {
        $sql = "SELECT * FROM `movimientos_articulos` WHERE `status`  = '1' AND `id_usuario` = ? ";
        $result = $conn->prepare($sql) or die ($sql);
        if ($result->execute([$id_usuario]))  {
            if ($result->rowCount() > 0) {
                while ($row = $result->fetch()) { 
                    $id = $row['id_articulo'];
                    $compuesto = $row['compuesto'];
                    $datos_precios_e_impuestos =  consultarPrecioEImpuestos($id,$compuesto,$conn);
                    $articulo = $datos_precios_e_impuestos[0]['nombre'];
                    $total = $total." ".$articulo; 

                }

                return $total; 
           }
        }   
    } catch (PDOException $e) {
        echo 'Error: '. $e->getMessage();
    }
}

function totalApartadosYEnvio($status,$id_usuario,$conn)
{ 
    $total = 0;
    $total_envio = 0;
    try {
        $sql = "SELECT * FROM `movimientos_articulos` WHERE `status`  = '1' AND `id_usuario` = ? ";
        $result = $conn->prepare($sql) or die ($sql);
        if ($result->execute([$id_usuario]))  {
            if ($result->rowCount() > 0) {

                while ($row = $result->fetch()) { 
                    $id = $row['id_articulo'];
                    $compuesto = $row['compuesto'];
                    $datos_precios_e_impuestos =  consultarPrecioEImpuestos($id,$compuesto,$conn);
                    $precio = $datos_precios_e_impuestos[0]['precio'];
                    $total = $total + $precio;
                }

                $consultaCostoEnvio = "SELECT `costo_envio` FROM `movimientos_pedidos` WHERE `status` = ? AND `id_cliente` = ?";
                $result2 = $conn->prepare($consultaCostoEnvio) or die ($consultaCostoEnvio);
                if ($result2->execute([$status,$id_usuario]))  {
                    if ($result2->rowCount() > 0) {
                        $row2 = $result2->fetch();
                        $total_envio = $row2['costo_envio'];
                         
                    }
                } 
                return $total + $total_envio; 
           }
        }   
    } catch (PDOException $e) {
        echo 'Error: '. $e->getMessage();
    }
}
?>