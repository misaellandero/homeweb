<div class="jumbotron">
  <h1>Usuarios</h1>
  <p>Cree y modifique los datos de sus usuarios, tanto clientes como empleados. Asigne un rol a cada usuario para determinar sus privilegios.</p>
  <p>
    <button id="registrar_nuevo_usuario" type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target=".bs-rusuario-modal-lg">
      Nuevo Usuario <i class="fa fa-user"></i>
    </button>
  </p>
  <p>
    <div class="form-group">

      <input id="mostrar_clientes_tambien" type="checkbox" value="0"> Mostrar Clientes
    </div>
  </p>
  <p>
    <div id="rowUsers">

    </div>
  </p>
</div> 
                     <!-- Ventana Editar foto usuario-->

                     <div class="modal fade bs-example-modal-sm modal-c-fu" tabindex="-1" role="dialog" aria-hidden="true">
                         <div class="modal-dialog modal-sm">
                             <div class="modal-content">

                                 <div class="modal-header">
                                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                     </button>
                                     <h4 class="modal-title" id="myModalLabel">Actualizar Imagen de Perfil</h4>
                                 </div>
                                 <div class="modal-body">
                                   <form id="upload_foto" class="dropzone" action="funciones/php/users/form_upload.php" style="border: 1px solid #e5e5e5; height: 300px;">
                                   <input type="hidden" name="input_id_usuario" id="input_id_usuario" value="" >
                                   <input type="hidden" name="input_email" id="input_email" value="" >
                                   </form>
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-default" data-dismiss="modal"><i class="text-danger fa fa-times-circle"></i> Cerrar</button>

                                 </div>

                             </div>
                         </div>
                     </div>
                     <!-- Fin Ventana Editar foto usuario-->
                     <!-- Ventana Editar datos usuario-->
                           <div class="modal-ed-u modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                                               <div class="modal-dialog modal-lg">
                                                   <div class="modal-content">

                                                       <div class="modal-header">
                                                         <h4 class="modal-title" id="myModalLabel">Editar Usuario</h4>
                                                           <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                                           </button>

                                                       </div>
                                                       <div class="modal-body">
                                                         <h3>
                                                           Perfil de Usuario
                                                           <small class="text-muted">Editar nombre y datos personales</small>
                                                         </h3>
                                                           <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">

                                                                   <input type="number" id="id_u" hidden="true">
                                                                   <div class="form-group">
                                                                       <label class=" " for="first-name">Nombre(s)<span class="required">*</span>
                                                                       </label>
                                                                       <div class="form-group">
                                                                           <input type="text" id="first-name-e" required="required" class="form-control" data-parsley-id="5573"><div class="parsley-id-5573"></div>
                                                                       </div>
                                                                   </div>
                                                                   <div class="form-group">
                                                                       <label class=" " for="last-name">Apellidos <span class="required">*</span>
                                                                       </label>
                                                                       <div class="form-group">
                                                                           <input type="text" id="last-name-e" name="last-name" required="required" class="form-control" data-parsley-id="0473"><div class="parsley-id-0473"></div>
                                                                       </div>
                                                                   </div>
                                                                   <div class="form-group">
                                                                       <label for="middle-name" class=" ">Correo </label>
                                                                       <div class="form-group">
                                                                           <input id="mail-e" class="form-control" placeholder="*Necesario para recuperar contraseña." type="mail" name="mail" data-parsley-id="7280"><ul class="parsley-errors-list" class="parsley-id-7280"></ul>
                                                                       </div>
                                                                   </div>
                                                                   <div class="form-group">
                                                                       <label for="middle-name" class=" ">Telefono </label>
                                                                       <div class="form-group">
                                                                           <input id="tel-e" class="form-control"  type="phone" name="phone" data-parsley-id="7281"><ul class="parsley-errors-list" class="parsley-id-7281"></ul>
                                                                       </div>
                                                                   </div>
                                                                   <div class="form-group">
                                                                       <label class=" ">Rol</label>
                                                                       <div class="form-group">
                                                                        <select class="form-control" id="perfil_usuario_editar"></select>

                                                                      </div>
                                                                   </div>
                                                                   <div class="form-group">
                                                                       <label class=" ">Contraseña <span class="required">*</span>
                                                                       </label>

                                                                           <input id="password-e" class="form-control" required="required" type="password" data-parsley-id="7811"><div class="parsley-id-7811"></div>

                                                                   </div>

                                                                   <h4>Datos fiscales</h4>
                                                                   <div class="form-group">
                                                                   <label for="middle-name" class=" ">Razon Social </label>
                                                                        <input id="razon_social-e" class="form-control"  type="text" name="razon_social-e" data-parsley-id="7281"><ul class="parsley-errors-list" class="parsley-id-728rf"></ul>
                                                                    </div>
                                                                    <div class="form-group">
                                                                    <label for="middle-name" class=" ">RFC </label>
                                                                        <input id="rfc-e" class="form-control"  type="text" name="rfc-e" data-parsley-id="7281"><ul class="parsley-errors-list" class="parsley-id-728rf"></ul>
                                                                    </div>
                                                                   <div class="ln_solid"></div>
                                                                    <h4>Confirmar identidad del cliente</h4>
                                                                    <span id="status_cliente"></span>
                                                                    <h4>INE</h4>
                                                                    <img  id="ine_clinete" class="img-fluid" src="" alt="">

                                                                    
                                                           
                                                                    
                                                             </form>
                                                            <br>
                                                            <br>
                                                             <h4>Direcciones Registradas</h4>
                                                                    
                                                                    <form id="DirDelUsuario">
                                                                    <input type="number" class="form-control" value="1" id="id_usuario_dir" name="id_usuario_dir" hidden="true">
                                                                        <div id="statusDir"></div>
                                                                        <div class="form-group">

                                                                            <label for="formGroupExampleInput">Destinatario</label>
                                                                            <input type="text" class="form-control"   id="dir_usuario_nombre"  name="nombre" placeholder="Persona que recibira el paquete">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Estado</label>
                                                                            <input type="text" class="form-control"   id="dir_usuario_estado"  name="estado">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Ciudad o Localidad</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_ciudad"   name="ciudad">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Codigo Postal</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_cp"   name="cp">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Calle</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_calle"   name="calle">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Numero Exterior</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_nexterior"   name="nexterior">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Numero Interior</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_ninterior"   name="ninterior">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Colonia</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_colonia"   name="colonia">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Municipio o Delegación</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_municipality"   name="municipality">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Pais</label>
                                                                            <input type="text" class="form-control"  id="dir_usuario_country" value="México"   name="country">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="formGroupExampleInput2">Notas y referencias </label>
                                                                            <textarea id="dir_usuario_dircompleota" class="form-control" placeholder="Calle, colonia, numero exterior e interior y referencias"  name="dir"   cols="30" rows="10"></textarea> 
                                                                        </div>
                                                                    </form>

                                                       </div>

                                                         <br>
                                                         <br>
                                                         <br>
                                                         <div class="modal-footer">
                                                            <div class="boton_cliente"></div>
                                                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="text-danger fa fa-times-circle"></i> Cerrar</button>
                                                           <button type="button" id="actualizar_usuario" class="btn btn-success" ><i class="fa fa-save"></i> Actualizar</button>
                                                         </div>

                             </div>
                             <!-- FIN Ventana Editar datos usuario-->

                           



                             </div>
                 </div>
