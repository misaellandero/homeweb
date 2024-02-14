<?php

function datosUsuario($id_usuario,$conn){
  $sql = "SELECT * FROM `usuarios_usuarios` WHERE `id` = $id_usuario ";
  $result = $conn->prepare($sql) or die ($sql);
  if (!$result->execute()) return false;

    if ($result->rowCount() > 0) {


      $json = array();

      while ($row = $result->fetch()) {

         $json[] = $row;
      }

      return $json;
  }
}

        function PermisosSistema($id_perfil,$conn){

          $sql = "SELECT * FROM `usuarios_modulos`";
          $result = $conn->prepare($sql) or die ($sql);
          if (!$result->execute()) return false;


          if ($result->rowCount() > 0) {

            $permiso = 0;

            $json = array();

            while ($row = $result->fetch()) {

              $id_objeto = $row['id'];
              $consulta_permiso = "SELECT * FROM  `usuarios_permisos_perfiles`  WHERE `id_perfil` ='$id_perfil' and `id_modulo` = '$id_objeto' ";


              $result2 = $conn->prepare($consulta_permiso) or die ($consulta_permiso);

              if (!$result2->execute()) return false;
              if ($result2->rowCount() > 0) {

                while ($row2 = $result2->fetch()) {
                  $permiso = $row2['permiso'];
                }
              }

              $json[$id_objeto] = array(
                'id' => $id_objeto,
                'tipo' => $row['tipo'],
                'permiso' => $permiso,
                'nombre' => $row['etiqueta']
              );
              $permiso = 0;
            }

            return $json;
        }
  }

  function permisoMostrarElemento($permiso,$condicion,$elemento)
  {
   if ($permiso == $condicion){
     return $elemento;
   }
  }


  function DirUsuario($id_usuario,$conn){
 
    $sql = "SELECT * FROM `usuarios_direcciones` WHERE `id_usuario` = $id_usuario";
    $result = $conn->prepare($sql) or die ($sql);

   
    if (!$result->execute()) return false;
  
      if ($result->rowCount() > 0) {
  
        $json = array();

        while ($row = $result->fetch()) {
  
           $json[] = $row;
        }
  
        return $json;
    }
  }

?>
