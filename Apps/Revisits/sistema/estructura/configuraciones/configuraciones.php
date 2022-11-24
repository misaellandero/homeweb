<div class="jumbotron">
  <h1>Datos del negocio</h1>
  <p>Edite los datos que se mostrarán al cliente</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_datos_empresa"  href="" role="button">Editar información empresa <i class="fa fa-building"></i></a>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_datos_tienda"  href="" role="button">Editar configuracion tienda <i class="fa  fa-shopping-cart"></i></a>
  </p>
</div>

<div class="jumbotron">
  <h1>Imagenes del sistema</h1>
  <p>Edite imagenes de la empresa y del sitio web</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_favicon"  href="" role="button">Icono del sitio <i class="fa fa-delicious"></i></a> 
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_logo"  href="" role="button">Logo del sitio <i class="fa fa-star"></i></a>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_portada"  href="" role="button">Portada tienda <i class="fa fa-file-o"></i></a></p>
</div>

<div class="jumbotron">
  <h1>Sliders del Carousel</h1>
  <p>Añada Sliders al carousel de la pagina principal</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_sliders"  href="" role="button">Añadir Slider <i class="fa fa-plus"></i></a>  
  <br>
  <div id="div_tabla_sliders">
  </div>
</div>

<div class="jumbotron">
  <h1>Apartado ¿Porque comprar con nosotros?</h1>
  <p>Añada apartados a la sección ¿Porque comprar con nosotros?</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_pq_comprar_con_nosotros"  href="" role="button">Añadir Apartado <i class="fa fa-plus"></i></a>  
  <br>
  <div id="div_tabla_pq_comprar">
  </div>
</div>

<div class="jumbotron">
  <h1>Apartados de sobre nosotros</h1>
  <p>Añada apartados a la sección sobre nostros</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_aboutUs"  href="" role="button">Añadir Apartado <i class="fa fa-plus"></i></a>  
  <br>
  <div id="div_tabla_sobreNosotros">
  </div>
</div>

<div class="jumbotron">
  <h1>Reseñas</h1>
  <p>Reseña de productos y de la pagina</p>
  <p>
  <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal_reseñas"  href="" role="button">Añadir Reseña <i class="fa fa-plus"></i></a>  
  <br>
  <div id="div_tabla_reseñas">
  </div>
</div>
<!--Ventana editar datos negocio -->

<div class="modal fade bs-example-modal-sm" id="modal_datos_empresa" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Información de la empresa</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
                <form id="form_datos_empresa" class="form-group">

                  <label for="">Nombre de la Empresa</label>
                  <input value="<?php echo $datosEmpresa[0]['nombre'];?>" type="text" name="nombre_empresa_input" id="nombre_empresa_input"  class="form-control" >
                  <label for="">RFC</label>
                  <input value="<?php echo $datosEmpresa[0]['rfc'];?>" type="text" name="rfc_empresa_input" id="rfc_empresa_input" class="form-control">

                  <label for="">Dirección</label>
                  <textarea  name="dir_empresa_input" id="dir_empresa_input" class="form-control"><?php echo $datosEmpresa[0]['dir'];?></textarea>
                
                  <label for="">Telefonos Contacto</label>
                  <input value="<?php echo $datosEmpresa[0]['tels'];?>" type="text"   name="tels_empresa_input" id="tels_empresa_input" class="form-control">

                  <label for="">Mensaje final tiket</label>
                  <input value="<?php echo $datosEmpresa[0]['msj'];?>" type="text"   name="msj_empresa_input" id="msj_empresa_input" class="form-control">

                  <label for="">Correo contacto</label>
                  <input value="<?php echo $datosEmpresa[0]['mail'];?>" type="text"   name="mail_empresa_input" id="mail_empresa_input" class="form-control">

                  <label for="">Sitio web</label>
                  <input value="<?php echo $datosEmpresa[0]['web'];?>" type="text"   name="web_empresa_input" id="web_empresa_input" class="form-control">

                  <label for="">Link Facebook</label>
                  <input value="<?php echo $datosEmpresa[0]['fb'];?>" type="text"   name="fb_empresa_input" id="fb_empresa_input" class="form-control">

                  <label for="">Link Instagram</label>
                  <input value="<?php echo $datosEmpresa[0]['inst'];?>" type="text"   name="inst_empresa_input" id="inst_empresa_input" class="form-control">

                  <label for="">Link Twitter</label>
                  <input value="<?php echo $datosEmpresa[0]['twtr'];?>" type="text"   name="twtr_empresa_input" id="twtr_empresa_input" class="form-control">

                  <div class="form-group">
                  <label for="">Numero Whatsapp para chat</label>
                  <input value="<?php echo $datosEmpresa[0]['wtsp'];?>" type="text"   name="wtsp_empresa_input" id="wtsp_empresa_input" class="form-control">
                  <a class="btn btn-success" href="<?php echo $datosEmpresa[0]['wtsp'];?>" target="_blank"><i class="fab fa-whatsapp"></i> Envíanos un mensaje</a>
                   
                  </div>
                  <div class="form-group">
                  <label for="">Messenger fb para chat</label>
                  <input value="<?php echo $datosEmpresa[0]['mgn'];?>" type="text"   name="mgn_empresa_input" id="mgn_empresa_input" class="form-control">
                  <a class="btn btn-primary" href="<?php echo $datosEmpresa[0]['mgn'];?>" target="_blank"><i class="fab fa-facebook-messenger"></i> Envíanos un mensaje</a>
                 
                  </div>

                  <div class="form-group">
                  <label for="">Link telegram para chat</label>
                  <input value="<?php echo $datosEmpresa[0]['tlg'];?>" type="text"   name="tlg_empresa_input" id="tlg_empresa_input" class="form-control">
                  <a class="btn btn-dark" href="<?php echo $datosEmpresa[0]['mgn'];?>" target="_blank"><i class="fab fa-telegram"></i> Envíanos un mensaje</a>
                 
                  </div>

                  <label for="">Sobre nosotros Corto (Version corta para pie de pagina)</label>
                  <input value="<?php echo $datosEmpresa[0]['sobre_nosotros_corto'];?>" type="text" name="sobre_nosotros_corto_empresa_input" id="sobre_nosotros_corto_empresa_input" class="form-control">

                  <label for="">Sobre nosotros Largo </label>
                  <textarea type="text" name="sobre_nosotros_largo_empresa_input" id="sobre_nosotros_largo_empresa_input" class="form-control"cols="30" rows="10">
                  <?php echo $datosEmpresa[0]['sobre_nosotros_largo'];?> 
                  </textarea>
                 
                  <label for="">Mision </label>
                  <input value="<?php echo $datosEmpresa[0]['mision'];?>" type="text" name="mision_empresa_input" id="mision_empresa_input" class="form-control">
                  
                  <label for="">Vision </label>
                  <input value="<?php echo $datosEmpresa[0]['vision'];?>" type="text" name="vision_empresa_input" id="vision_empresa_input" class="form-control">
                 
                  <label for="">Terminos y condiciones </label>
                  <textarea name="terminos_empresa_input" id="terminos_empresa_input" class="form-control" cols="30" rows="10"><?php echo $datosEmpresa[0]['terminos'];?>
                  </textarea>
                  
                  <label for="">Cambio Dolar </label>
                  <input value="<?php echo $datosEmpresa[0]['cambio_dolar'];?>" type="number" name="cambio_dolar_empresa_input" id="cambio_dolar_empresa_input" class="form-control">
                 

                </div>

              </form>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <button class="btn btn-success" id="actualizar_datos_empresa"> <i class="fa fa-refresh"></i> Actualizar</button>
              </div>

        </div>
    </div>
</div>

<!--Fin Ventana editar datos negocio -->
<!--Ventana editar icono del sitio  -->
<div class="modal fade bs-example-modal-sm" id="modal_favicon" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Icono del sitio web</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 

              <h4>Icono actual</h4>
              <p>El icono se muestra en la pestaña de navegacion, al agregar a favoritos, en las barras de menu, y lugares donde el aspecto requerido sea cuadrado.</p>
              <p>Se recomienda PNG y cuadrado 1:1</p>

              <img src="images/<?php echo $datosEmpresa[0]['icon_site'];?>" width="50%" class="img-fluid" alt="logo empresa" />
              <div class=""> 

                <label for="">Icono para modo</label>
                <div class="form-group">
                  <select  id="select-logo-colores" class="form-control">
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                  </Select>
                </div>
              </div>
              <h2>Subir nuevo icono</h2>
              <div> 
                
                
                <form id="form_icono_sitio_Web" class="col-12 dropzone" action="php/configuracion/form_upload.php" style=""> 
                <input  type="text" name="color-logo" id="input-logo-colores" hidden="true">
                </form>

              </div>
              
               
              </div>

             

              <div class="modal-footer">
              <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar icono del sitio  -->

<!--Ventana editar icono del sitio  -->
<div class="modal fade bs-example-modal-sm" id="modal_logo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Logo empresa</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 
              <div>
              <h4>Logo Actual</h4>
              <p>El logo se mostrara en el sitio web y en el tiket, se recomienda que sea amplio horizontalmente.</p>
              <p>El archivo debe ser png</p>
              <img src="images/<?php echo $datosEmpresa[0]['logo_empresa'];?>" class="img-fluid" alt="logo empresa" />
                
              </div>
                <br>
                <h2>Subir nuevo logo</h2>
                <form id="form_logo_sitio_Web" class="col-12 dropzone" action="php/configuracion/form_upload_logo.php" style="border: 1px solid #e5e5e5; height: 300px;"> 
                </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar icono del sitio  -->


<!--Ventana editar datos tienda -->

<div class="modal fade bs-example-modal-xl" id="modal_datos_tienda" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

              <div class="modal-header">
                <h3 class="modal-title" id="myModalLabel">Configuraciones tienda</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
              
                <form id="form_datos_tienda" class="form-group"> 
                    <div class="row">
                    <div class=" col-md-6">
                    <H4>Aspecto general pagina principal</H4>

                    <label for="">Index </label>
                    <input value="<?php echo $datosTienda[0]['index'];?>" type="text" name="index" id="index"  class="form-control" >
                    <label for="">Titulo pestaña tienda</label>
                    <input value="<?php echo $datosTienda[0]['titulo_tienda'];?>" type="text" name="titulo_tienda" id="titulo_tienda"  class="form-control" >
                    <label for="">Titulo pagina principal</label>
                    <input value="<?php echo $datosTienda[0]['cabezera_titulo'];?>" type="text" name="cabezera_titulo" id="cabezera_titulo"  class="form-control" >
                    <label for="">Mensaje bienvenida en cabezera pagina princial</label>
                    <Textarea rows="2" cols="80"  name="cabezara_texto" id="cabezara_texto" class="form-control" ><?php echo $datosTienda[0]['cabezara_texto'];?></Textarea>
                    <label for="">Css Personalizado</label>
                    <Textarea rows="2" cols="80" name="ver_mas_dir" id="ver_mas_dir"  class="form-control" ><?php echo $datosTienda[0]['ver_mas_dir'];?> </Textarea>
                  
                    </div>
                    <div class=" col-md-6">
                    <H4>Funcionalidades de la tienda</H4>
                    <label for="">Envios</label>
                    <select  name="envio_gratis" id="envio_gratis"  class="form-control">
                    <?php 
                      if ($datosTienda[0]['envio_gratis'] == 0){
                        echo '<option value="0" selected="selected"> Doble paso para cotizar costo Envio</option>
                              <option value="1"> Paso directo a pago costo de envio fijo</option>
                              <option value="2"> Paso directo a pago envio gratis/option>';
                              
                      }else if($datosTienda[0]['envio_gratis'] == 1){
                        echo '<option value="0" > Doble paso para cotizar costo Envio</option>
                        <option value="1" selected="selected"> Paso directo a pago costo de envio fijo</option>
                        <option value="2"> Paso directo a pago envio gratis</option>';
                      } else{
                        echo '<option value="0" selected="selected"> Doble paso para cotizar costo Envio</option>
                        <option value="1"> Paso directo a pago costo de envio fijo</option>
                        <option value="2" selected="selected"> Paso directo a pago envio gratis</option>';
                      }
                    ?>
                    </select> 
                    <label for="">Modo</label>
                    <Select  name="modo_tienda" id="modo_tienda"  class="form-control"> 
                    <?php 
                      if ($datosTienda[0]['modo_tienda'] == "tienda"){
                        echo '<option value="tienda" selected="selected"> Tienda en linea</option>
                              <option value="paginaweb"> Pagina Web</option> ';
                              
                      } else{
                        echo '<option value="tienda"> Tienda en linea</option>
                              <option value="paginaweb" selected="selected"> Pagina Web</option> ';
                      }
                    ?>
                    </Select>
                    
                    <label for="">Costo envio</label>
                    <?php 
                      if ($datosTienda[0]['envio_gratis'] == 1){
                        echo '<input value='.$datosTienda[0]['precio_envio'].' type="text" name="precio_envio" id="precio_envio"  class="form-control" >';
                      }else{
                        echo '<input value="0" type="text" name="precio_envio" id="precio_envio" placeholder="No aplica" class="form-control" readonly>';
                      
                      } 
                    ?>
                   <label for="">Status del sitio</label>
                    <select  name="modo_produccion" id="modo_produccion"  class="form-control">
                    <?php 
                      if ($datosTienda[0]['modo_produccion'] == 0){
                        echo '<option value="0" selected="selected"> Pruebas</option>
                              <option value="1"> Producción</option>';
                      }else{
                        echo '<option value="0" > Pruebas</option>
                              <option value="1" selected="selected"> Producción</option>';
                      }
                    ?>
                    </select> 
                    <label for="">Pagos con Paypal </label>
                    <select  name="paypal" id="paypal"  class="form-control">
                    <?php 
                      if ($datosTienda[0]['paypal'] == 0){
                        echo '<option value="0" selected="selected"> Desactivado</option>
                              <option value="1"> Activado</option>';
                      }else{
                        echo '<option value="0" > Desactivado</option>
                              <option value="1" selected="selected"> Activado</option>';
                      }
                    ?>
                    </select> 
                    <label for="">Comisión fija paypal $</label>
                    <input value="<?php echo $datosTienda[0]['paypal_com_fija'];?>" type="number" name="paypal_com_fija" id="paypal_com_fija"  class="form-control" >
                    <label for="">% Comisión paypal (normal mas credito 12 meses) </label>
                    <input value="<?php echo $datosTienda[0]['paypal_com_tarjeta'];?>" type="number" name="paypal_com_tarjeta" id="paypal_com_tarjeta"  class="form-control" >
                    <label for="">PayPal Client ID (Sandbox)</label>
                    <input value="<?php echo $datosTienda[0]['paypal_cliente_id_sandbox'];?>" type="text" name="paypal_cliente_id_sandbox" id="paypal_cliente_id_sandbox"  class="form-control" >
                    <label for="">PayPal Secret  (Sandbox)</label>
                    <input value="<?php echo $datosTienda[0]['paypal_secret_sandbox'];?>" type="text" name="paypal_secret_sandbox" id="paypal_secret_sandbox"  class="form-control" >
                    <label for="">PayPal Client ID (Production)</label>
                    <input value="<?php echo $datosTienda[0]['paypal_cliente_id'];?>" type="text" name="paypal_cliente_id" id="paypal_cliente_id"  class="form-control" >
                    <label for="">PayPal Secret (Production)</label>
                    <input value="<?php echo $datosTienda[0]['paypal_secret'];?>" type="text" name="paypal_secret" id="paypal_secret"  class="form-control" >
                    
                    <label for="">Pagos con OpenPay </label>
                    <select  name="openpay" id="openpay"  class="form-control">
                    <?php 
                      if ($datosTienda[0]['openpay'] == 0){
                        echo '<option value="0" selected="selected"> Desactivado</option>
                              <option value="1"> Activado</option>';
                      }else{
                        echo '<option value="0" > Desactivado</option>
                              <option value="1" selected="selected"> Activado</option>';
                      }
                   ?>
                    </select> 
                    <label for="">Comisión fija Openpay $</label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_fija'];?>" type="number" name="openpay_com_fija" id="openpay_com_fija"  class="form-control" >
                    <label for="">% Comisión Openpay (normal) </label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_tarjeta_0'];?>" type="number" name="openpay_com_tarjeta_0" id="openpay_com_tarjeta_0"  class="form-control" >
                    <label for="">% Comisión Openpay (3 meses) </label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_tarjeta_3'];?>" type="number" name="openpay_com_tarjeta_3" id="openpay_com_tarjeta_3"  class="form-control" >
                    <label for="">% Comisión Openpay (6 meses) </label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_tarjeta_6'];?>" type="number" name="openpay_com_tarjeta_6" id="openpay_com_tarjeta_6"  class="form-control" >
                    <label for="">% Comisión Openpay (9 meses) </label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_tarjeta_9'];?>" type="number" name="openpay_com_tarjeta_9" id="openpay_com_tarjeta_9"  class="form-control" >
                    <label for="">% Comisión Openpay (12 meses) </label>
                    <input value="<?php echo $datosTienda[0]['openpay_com_tarjeta_12'];?>" type="number" name="openpay_com_tarjeta_12" id="openpay_com_tarjeta_12"  class="form-control" >
                    
                    <label for="">Openpay Client ID (Sandbox)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_cliente_id_sandbox'];?>" type="text" name="openpay_cliente_id_sandbox" id="openpay_cliente_id_sandbox"  class="form-control" >
                    <label for="">Openpay Secret  (Sandbox)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_secret_sandbox'];?>" type="text" name="openpay_secret_sandbox" id="openpay_secret_sandbox"  class="form-control" >
                    <label for="">Openpay Public  (Sandbox)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_public_sandbox'];?>"  type="text" name="openpay_public_sandbox" id="openpay_public_sandbox"  class="form-control" >
                    <label for="">Openpay Client ID (Production)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_cliente_id'];?>" type="text" name="openpay_cliente_id" id="openpay_cliente_id"  class="form-control" >
                    <label for="">Openpay Secret (Production)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_secret'];?>" type="text" name="openpay_secret" id="openpay_secret"  class="form-control" >
                    <label for="">Openpay Public  (Production)</label>
                    <input value="<?php echo $datosTienda[0]['openpay_public'];?>"  type="text" name="openpay_public" id="openpay_public"  class="form-control" >
                    
                    <label for="">Efectivo Nombre</label>
                    <input value="<?php echo $datosTienda[0]['efectivo_titular'];?>"  type="text" name="efectivo_titular" id="efectivo_titular"  class="form-control" >
                    
                    <label for="">Efectivo Tarjeta</label>
                    <input value="<?php echo $datosTienda[0]['efectivo_tar'];?>"  type="text" name="efectivo_tar" id="efectivo_tar"  class="form-control" >
                    
                    <label for="">Efectivo Banco</label>
                    <input value="<?php echo $datosTienda[0]['efectivo_banco'];?>"  type="text" name="efectivo_banco" id="efectivo_banco"  class="form-control" >
                    

                    <label for="">API ID Facebook</label>
                    <input value="<?php echo $datosTienda[0]['fb_appId'];?>"  type="text" name="fb_appId" id="fb_appId"  class="form-control" >
                    <label for="">State Facebook</label>
                    <input value="<?php echo $datosTienda[0]['fb_state'];?>"  type="text" name="fb_state" id="fb_state"  class="form-control" >
                    <label for="">URL redirección</label>
                    <input value="<?php echo $datosTienda[0]['fb_redirect'];?>"  type="text" name="fb_redirect" id="fb_redirect"  class="form-control" >
                    <label for="">Chat Facebook</label>
                    <input value="<?php echo $datosTienda[0]['chat_fb'];?>"  type="text" name="chat_fb" id="chat_fb"  class="form-control" >
                    
                    <label for="">URL google Maps</label>
                    <input value="<?php echo $datosTienda[0]['google_maps'];?>"  type="text" name="google_maps" id="google_maps"  class="form-control" >
                    

                  </div> 

                    </div> 
                   
                  </form>

                </div>

            

              <div class="modal-footer">
                  <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <button class="btn btn-success" id="actualizar_datos_tienda"> <i class="fa fa-refresh"></i> Actualizar</button>
              </div>

        </div>
    </div>
</div>

<!-- fin Ventana editar datos tienda -->

<!--Ventana editar portada del sitio  -->
<div class="modal fade bs-example-modal-sm" id="modal_portada" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Imagen Sobre Nosotros</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 
              <div>
              <h4>Imagen actual</h4>
              <p>Esta imagen de fondo se muetra en la pagina principal de la tienda.</p>
              <p>El archivo debe ser jpg y width screen</p>
              <img src="images/<?php echo $datosTienda[0]['img_portada'];?>" class="img-fluid" alt="logo empresa" />
                
              </div>
                <br>
                <h2>Subir nueva Imagen</h2>
                <form id="form_portada_tienda" class="col-12 dropzone" action="php/configuracion/form_upload_portada.php" style="border: 1px solid #e5e5e5; height: 300px;"> 
                </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar portada del sitio  -->

 <!--Ventana editar portada del sitio  -->
<div class="modal fade" id="modal_sliders" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Sliders Carousel</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 

                  <div class="form-group"> 
                  <label for="">Titulo</label>
                  <input type="text" class="form-control" id="slider_titulo" name="slider_titulo">
                  <label for="">Texto</label>
                  <input type="text" class="form-control" id="slider_texto" name="slider_texto">
                  <label for="">Boton</label>
                  <input type="text" class="form-control" id="slider_boton" name="slider_boton">
                  </div>
              
                <br>
                <h2>Subir nueva imagen</h2>
                <form id="form_sliders_carousel" class="col-12 dropzone" action="php/configuracion/form_upload_slider.php" style="border: 1px solid #e5e5e5; height: 300px;"> 
                      <input type="text" name="titulo" id="real_slider_titulo" hidden="true">
                      <input type="text" name="texto" id="real_slider_texto" hidden="true">
                      <input type="text" name="boton" id="real_slider_boton" hidden="true">
                </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar portada del sitio  -->

  <!--Ventana editar video del sitio  -->
<div class="modal fade" id="modal_sliders_video" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Video del Slider</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 

              
                <br>
                <h2>Subir nuevo video</h2>
                <form id="form_sliders_carousel_video" class="col-12 dropzone" action="php/configuracion/form_upload_video_slider.php" style="border: 1px solid #e5e5e5; height: 300px;"> 
                      <input type="text" name="id_slider" id="id_slider" hidden="true"> 
                </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar video del sitio  -->



  <!--Ventana editar video del sitio  -->
  <div class="modal fade" id="modal_aboutUs" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Sobre nosotros</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 
                <br>
                <h2>Nuevo apartado</h2>
                 <form id="form_sobre_nosotros">
                 <div class="form-group">
                 <label for="">Titulo</label>
                 <input type="text" class="form-control" name="titulo_abtUs">
                 <label for="">Texto</label>
                 <input type="text" class="form-control" name="texto_abtUs">
                 </div>
                 </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
                  <button type="button" href="#" id="guardar_nuevo_apartado_sobre_nosotros"  class="btn btn-success" data-dismiss="modal" ><i class="fa fa-plus"></i> Añadir  </button> 
              
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar video del sitio  -->

  <!--Ventana porq ue comprar con nosotros  -->
  <div class="modal fade" id="modal_pq_comprar_con_nosotros" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">¿Por que comprar con nosotros?</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 
                <br>
                <h2>Nuevo apartado</h2>
                 <form id="form_pq_comprar">
                 <div class="form-group">
                 <label for="">Texto</label>
                 <textarea  class="form-control" name="texto_pq_comprar" id="texto_pq_comprar" cols="30" rows="10"></textarea> 
                 </div>
                 </form>
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
                  <button type="button" href="#" id="guardar_nuevo_apartado_pq_comprar"  class="btn btn-success"   ><i class="fa fa-plus"></i> Añadir  </button> 
              
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventanaeditar video del sitio  -->

  <!--Ventana reseña  -->
  <div class="modal fade" id="modal_reseñas" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Reseñas</h4>
                
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body "> 
            
                <h5>Datos de la reseña</h5>
                
                 <div class="form-group">
                 <label for="">Nombre</label> 
                 <input value="" type="text"  name="reseña_nombre" id="reseña_nombre" class="form-control">
                 <label for="">Opinion</label> 
                 <input value="" type="text"  name="reseña_opinion" id="reseña_opinion" class="form-control">
                 <label for="">Estrellas</label> 
                 <input value="" type="text"  name="reseña_estrellas" id="reseña_estrellas" class="form-control">
                 <label for="">ID Producto</label> 
                 <input value="" type="text"  name="reseña_id_art" id="reseña_id_art" class="form-control">
                 <h2>Imagen Cliente</h2>
                <form id="form_reseñas" class="col-12 dropzone" action="php/configuracion/form_upload_reseña.php" style="border: 1px solid #e5e5e5; height: 300px;"> 
                      <input type="text" name="nombre" id="real_reseña_nombre" hidden="tru">
                      <input type="text" name="opinion" id="real_reseña_opinion" hidden="tru">
                      <input type="text" name="estrellas" id="real_reseña_estrellas" hidden="tru">
                      <input type="text" name="id_art" id="real_reseña_id_art" hidden="true">
                </form>
                 </div>
                
              </div>

             

              <div class="modal-footer">
                  <button type="button" href="#"  class="btn btn-primary" data-dismiss="modal" >Listo <i class="fa fa-thumbs-up"></i>  </button> 
                  <button type="button" href="#" id="guardar_nuevo_apartado_pq_comprar"  class="btn btn-success"   ><i class="fa fa-plus"></i> Añadir  </button> 
              
               </div>

        </div>
    </div>
</div>
<!-- fin  Ventana reseña -->