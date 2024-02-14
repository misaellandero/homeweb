<?php 
$conn = require_once '../conexion.php'; 
$id = ($_POST['id_pedido']);

$empresa = ($_POST['empresa_pedido']);
$costo_envio = ($_POST['costo_pedido']);
$numero_guia = ($_POST['numero_guia_pedido']);
$notas = ($_POST['notas_pedido']);
$status = ($_POST['status_pedido']);
$id_usuario = ($_POST['id_usaurio_pedido']);

try {   
 
    $sql = "UPDATE `movimientos_pedidos` SET 
    `empresa_envio` = ?,  
    `costo_envio` = ?,
    `numero_guia` = ?,
    `notas` = ?,
    `status` = ?
    WHERE `id` = ? ";
 
    $result = $conn->prepare($sql) or die ($sql);

    if ($result->execute([$empresa,$costo_envio,$numero_guia,$notas,$status,$id])) {
         if ($status == 4) {
            
            $actualizar_usuario = "UPDATE `usuarios_usuarios` SET  
                                    `pedido` = ?
                                    WHERE `id` = ? ";
             $result = $conn->prepare($actualizar_usuario) or die ($actualizar_usuario);
             if ($result->execute([0,$id_usuario])) {
                echo "Datos de envio actulizados exitosamente";
             }

         } else if ($status == 5) {
            
            $actualizar_usuario = "UPDATE `usuarios_usuarios` SET  
                                    `pedido` = ?
                                    WHERE `id` = ? ";
             $result = $conn->prepare($actualizar_usuario) or die ($actualizar_usuario);
             if ($result->execute([0,$id_usuario])) {
                echo "Pedido cancelado, si el pedido ya fue pagado debe hacer un ajuste en inventario y un reembolso al usuario.";
             }

         }else{
            echo "Datos de envio actulizados exitosamente";
         }
    } else{
        
    }

} catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
}
       	 
?>
