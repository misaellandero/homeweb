<?php 

$conn = require_once '../conexion.php'; 

$id_movimiento = trim($_POST['id_movimiento']);

include '../inventarios/consulta_precio_e_impuestos.php';


include '../configuracion/cargar_datos_empresa.php';

$datosEmpresa = cargarDatosEmpresa($conn);

include '../movimientos/consulta_movimiento.php';

$datosMovimiento = consultaMovimiento($id_movimiento,$conn);

$ElementosMovimiento = consultaElementosMovimientos($id_movimiento,$conn);
//var_dump($datosMovimiento);

$subtotal = 0;
$total_iva = 0;
$total_ieps = 0;
$total = 0;

?>

<div>
<img height="150px" src="images/<?php echo $datosEmpresa[0]['icon_site'];?>" alt="">
<p><?php echo $datosEmpresa[0]['nombre'];?></p>
<p><?php echo $datosEmpresa[0]['rfc'];?></p>
<p><?php echo $datosEmpresa[0]['tels'];?></p>
<p><?php echo $datosEmpresa[0]['dir'];?></p>
<p>Cajero: <?php echo $datosMovimiento[0]['usuario'];?></p>
<p><?php echo $datosMovimiento[0]['fecha'];?></p>

<table>
    <thead>
        <th>Cant.</th>
        <th>Producto</th> 
        <th>Precio</th> 
        <th>IVA</th> 
        <th>IEPS</th> 
        <th>Subtotal</th> 
    </thead>

<?php  

foreach ($ElementosMovimiento as $elemento) {
   echo "<tr>";
   echo "<td>".$elemento['cantidad']."</td>";
   echo "<td>".$elemento['nombre']."</td>";
   echo "<td>".$elemento['precioSinImpuesto']."</td>"; 
   echo "<td>".$elemento['IVA']."</td>"; 
   echo "<td>".$elemento['IEPS']."</td>"; 
   echo "<td>".$elemento['subtotal']."</td>"; 
   echo "</tr>"; 
    
   $total = $total + $elemento['subtotal'];
   $total_iva = $total_iva+ $elemento['IVA'];
   $total_ieps = $total_ieps + $elemento['IEPS'];
   $subtotal = $subtotal + $elemento['precioSinImpuesto'];
}
?>

</table>
<H6>Subtotal $ <?php echo $subtotal; ?></H6>
<H6>IVA $ <?php echo $total_iva; ?></H6>
<H6>IEPS $ <?php echo $total_ieps; ?></H6>
<H4>Total $ <?php echo $total; ?></H4>
<p></p>

<p><?php echo $datosEmpresa[0]['msj'];?></p>
<p>Sitio Web <?php echo $datosEmpresa[0]['web'];?></p>
<p>email <?php echo $datosEmpresa[0]['mail'];?></p>
</div>
 