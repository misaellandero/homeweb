<div class="jumbotron">
  <h1>Roles de Usuario</h1>
  <p>Cree un Rol de usuario para asignar privilegios y restricciones a varios usuarios.</p>
  <p>
    <button id="crear_nuevo_perfil_de_usuario" type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target=".modal-editar-perfil">
        Nuevo Rol <i class="fa fa-users"></i>
    </button>
  </p>
  <p>
    <div id="div_lista_de_perfiles">
       <table class="table">
         <tr>
           <td>Rol</td><td>Acciones</td>
         </tr>
       </table>
    </div>
  </p>
</div>


 


       <!-- Ventana crear perfil-->

       <div class="modal fade modal-editar-perfil" tabindex="-1" role="dialog" aria-hidden="true">
           <div class="modal-dialog modal-lg">
               <div class="modal-content">

                   <div class="modal-header">
                     <h4 class="modal-title">Crear Rol de Usuarios</h4>
                       <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                       </button>

                   </div>



                   <div class="modal-body">

                     <div class="form-group">

                       <label for="nombre_nuevo_perfil" class="control-label">Nombre del Rol</label>
                       <input type="text"  class="form-control" id="nombre_nuevo_perfil" >
                       <input type="text" id="id_perfil" name="" value="" hidden="true">
                     </div>

                     <div id="lista_Objetos">

                     </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-default" data-dismiss="modal"><i class="text-danger fa fa-times-circle"></i> Cancelar</button>
                       <button id="actualizarPerfil" type="button" class="btn btn-success" ><i class="fa fa-save"></i> Actualizar Rol</button>
                       <button id="crearPerfil" type="button" class="btn btn-info" ><i class="fa fa-save"></i> Crear Rol</button>
                   </div>

               </div>
           </div>
       </div>
       <!-- Fin Ventana Editar Permisos-->
