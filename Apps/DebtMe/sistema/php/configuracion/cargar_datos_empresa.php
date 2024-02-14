<?php
function cargarDatosEmpresa($conn){
  try{ 
    $sql = "SELECT * FROM `configuraciones_generales` WHERE `id` = 1 ";
    $result = $conn->prepare($sql) or die ($sql);
    if (!$result->execute()) return false;
  
      if ($result->rowCount() > 0) {
  
  
        $json = array();
  
        while ($row = $result->fetch()) {
  
           $json[] = $row;
        }
  
        return $json;
    }      
  } catch(PDOException $e){
          echo $e->getMessage();
      }

  
}

function cargarDatosTienda($conn){

  try{ 
    $sql = "SELECT * FROM `configuraciones_tienda` WHERE `id` = 1 ";
    $result = $conn->prepare($sql) or die ($sql);
    if (!$result->execute()) return false;
  
      if ($result->rowCount() > 0) {
  
  
        $json = array();
  
        while ($row = $result->fetch()) {
  
           $json[] = $row;
        }
  
        return $json;
    }      
  } catch(PDOException $e){
          echo $e->getMessage();
      }

  
}
 
 
?>
