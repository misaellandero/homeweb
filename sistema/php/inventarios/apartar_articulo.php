<?php
session_start();
if (isset($_SESSION['id_session'])) {
  $id_usuario = $_SESSION['id_session'];
} else{
  echo 'Debes primero iniciar sesión';
}
$conn = require_once '../conexion.php';  
include '../users/permisos_perfil.php';
$datosUsuario = datosUsuario($id_usuario,$conn);
$pedido = $datosUsuario[0]['pedido'];

  if ($pedido > 0) {
    echo 'Ya tienes un pedido en revisión, no puedes añadir mas productos hasta se concrete o cancele la compra.';
    die();
  }

		try {
			$id_articulo = trim($_POST['id_articulo']);
      $cantidad = trim($_POST['cantidad']);
      $costo = trim($_POST['costo']);
      $compuesto = trim($_POST['compuesto']);

      
      
      if ($id_articulo == "") {
        
        $codigo_barras = trim($_POST['codigo_barras']);
        
        if ($codigo_barras == "") {
          echo "Seleccione un articulo primero";
          die();
        } else {
      
          $buscarPorCodigoDeBarras = "SELECT * FROM `articulos` WHERE `codigoBarras` = '$codigo_barras'";
          $result = $conn->prepare($buscarPorCodigoDeBarras) or die ($buscarPorCodigoDeBarras);
         
            if (!$result->execute()) return false;
    
            if ($result->rowCount() > 0) {
              while ($row = $result->fetch()) {
                $id_articulo = $row['id']; 
                $compuesto = $row['compuesto'];
              }
              
            }
        }
       
      } if ($costo == "precio") {

        include 'consulta_precio_e_impuestos.php';
        $precio =  consultarPrecioEImpuestos($id_articulo,$compuesto,$conn);
        $precio_sin_impuestos = $precio[0]['precio'];
        $IVA =  $precio[0]['impuestos'][0]['IVA'];
        $IEPS =  $precio[0]['impuestos'][0]['IEPS'];
        $costo = $precio_sin_impuestos; 
       
      }
      
      include 'calcular_existencia.php'; 

      $divisible = consultarEsDivisible($id_articulo,$conn);
 

      if ($divisible == 1) {
        $cantidad = intval($cantidad);
        if ($cantidad < 1) {
          echo "La cantidad no puede ser cero";
          die();
        }
      }

      if ($compuesto == 2) {

        if ($cantidad < 1) {
          echo "La cantidad no puede ser cero";
          die();
        }


        
        include 'consulta_articulos_combo_para_apartar.php';
        
        $registrar_apartado = "INSERT INTO `movimientos_articulos`(`id_articulo`, `cantidad`, `status`, `id_usuario`,`compuesto`,`costo`)
        VALUES (?,?,?,?,?,?)";

         $result = $conn->prepare($registrar_apartado);
           if ($result->execute([$id_articulo,$cantidad,1,$id_usuario,2,$costo])) {
             $id_combo = $conn->lastInsertId($registrar_apartado);
             $articulos = articulosCombo($id_articulo,$conn);    
              foreach ($articulos as $articulo) {

                        $id_elemento = $articulo['id_articulo'];
                        $cantidad_elemento = $cantidad * $articulo['cantidad'];
                       
                        $existencia = consultaExistencias($id_elemento,$conn);
                        $elemento_compuesto = $articulo['compuesto'];
                
                        if ($existencia < 0){
                          echo "Se ha agotado un elemento del combo";
                               eliminarElementosCombo($id_combo,$conn);
                               borrarEsteCombo($id_combo,$conn);
                              die();
                        } else {
                            if ($cantidad_elemento > $existencia) {
                              echo "Existencias insuficientes de un elemento";
                              eliminarElementosCombo($id_combo,$conn);
                              borrarEsteCombo($id_combo,$conn);
                              die();
                            } else {
                              $registrar_apartado = "INSERT INTO `movimientos_articulos`(`id_articulo`, `cantidad`, `status`, `id_usuario`,`compuesto`,`costo`,`id_combo`)
                                                    VALUES (?,?,?,?,?,?,?)";

                                                    $result = $conn->prepare($registrar_apartado);
                                                      if ($result->execute([$id_elemento,$cantidad_elemento,1,$id_usuario,$elemento_compuesto,0,$id_combo])) {
                                                        
                                                      }else{
                                                        echo 0;
                                                      }

                            }
                        }
                }



             echo "Se añadio a tu lista de apartados";

           }else{
             echo 0;
             die();
           }

       

      } else{
        $existencia = consultaExistencias($id_articulo,$conn);
 
        if ($existencia < 0){
          echo "Existencias insuficientes.";
        } else {

            if ($cantidad > $existencia) {
              echo "Existencias insuficientes.";
            } else {
              $registrar_apartado = "INSERT INTO `movimientos_articulos`(`id_articulo`, `cantidad`, `status`, `id_usuario`,`compuesto`,`costo`)
                                    VALUES (?,?,?,?,?,?)";

                                     $result = $conn->prepare($registrar_apartado);
                                     	if ($result->execute([$id_articulo,$cantidad,1,$id_usuario,$compuesto,$costo])) {
                                     		echo "Se añadio a tu lista de apartados";
                                     	}else{
                                   
                                     		echo ' Error';
                                     	}

            }
        }
      }
        
		} catch (PDOException $e) {
			echo ' Error: '. $e->getMessage();
		}

?>
