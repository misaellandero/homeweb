
<div class="jumbotron">
  <h1>Administrar pedidos</h1>
  <p>Administra tus pedidos desde Aqui</p> 
  <br>
  <button  class="btn btn-lg btn-primary actulizar_tablas_pedidos"> Recargar tabla <i class="fa fa-refresh"></i> </button>
  <br>
  <br>
      <div id="div_tabla_pedidos"></div>


<!-- Ventana ver pedidos-->
      <div class="modal fade bs-example-modal-sm" id="modal-ver-pedido" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel"><span class="registar_articulo">Detalles Pedido</h4>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>
                  </div>

                  <div class="modal-body"> 
                    <form>
                      <h4>Estado del pedido</h4>
                      <div class="alert alert-secondary" role="alert">
                        <span id="estatus_pedido">  </span>
                      </div>
                      <h4>Datos del cliente</h4>
                        <div class="form-group">
                          <label for="">Nombre</label>
                          <input type="text" class="form-control" id="nombre_pedido"> 
                          <input type="text" class="form-control" id="id_usuario_pedido" hidden="true"> 
                        </div>
                        <div class="form-group"> 
                          <label for="">Nombre de quien recibe producto</label>
                          <input type="text" class="form-control" id="nombre_dir_pedido">
                          <label for="">Estado</label>
                          <input type="text" class="form-control" id="estado_dir_pedido">  
                          <label for="">Ciudad</label>
                          <input type="text" class="form-control" id="ciudad_dir_pedido">  
                          <label for="">Codigo Postal</label>
                          <input type="text" class="form-control" id="cp_dir_pedido">  
                          <label for="">Dirección y referencias</label>
                          <textarea  class="form-control" id="dir_pedido" id="" cols="30" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="">Correo y Telefono</label>
                          <input type="text" class="form-control" id="correo_pedido"> 
                          <input type="text" class="form-control" id="telefono_pedido"> 
                          <br>
                          <a class="btn btn-success" id="wts_pedido" href="#"  target="_blank"><i class="fab fa-whatsapp"></i> Envíar mensaje</a>
                        </div>  
                        <h4>Productos del Pedido</h4>              
                        <table id="tabla_articulos_pedido" width="100%" class="table">
                          <thead> 
                            <tr role="row">
                            <th><i class='fa fa-cube'></i> Producto</th>
                            <th><i class='fa fa-cubes'></i> Cantidad</th>
                            <th><i class='fa fa-money'></i> Precio</th> 
                            <th><i class='fa fa-edit'></i> Subtotal</th>
                            <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
                          </tr> 
                          </thead>
                          <tbody>

                          </tbody>
                        </table> 

                        <div class="form-group"> 
                          <h2 > <span class="badge badge-pill badge-success">    Total productos $<span class="total_movimiento"></span> MXN</span> </h2> 
                        </div>

                      </form>

                      <h4>Datos envio</h4>
                      <div class="form-group datos-envio">
                        <form id="datos_envio_pedido">
                          <input type="text" class="form-control" id="id_pedido" name="id_pedido" hidden="true"> 
                          <input type="text" class="form-control" id="id_usaurio_pedido" name="id_usaurio_pedido" hidden="true"> 
                          <input type="text" class="form-control" id="status_pedio" name="status_pedido" hidden="true"> 
                          <label for="">Empresa de paqueteria</label>
                          <input type="text" class="form-control"  id="empresa_pedido_pedido" name="empresa_pedido"> 
                          <label for="">Costo del envio</label>
                          <input type="number" class="noEditablesTrasPago form-control"  name="costo_pedido" id="costo_envio_pedido"> 
                          <div class="datos-actulizar"> 
                          <label for="">Numero de guia</label>
                          <input type="text" class="form-control" name="numero_guia_pedido" id="numero_guia_pedido"> 
                          <label for="">Notas para el cliente</label>
                          <input type="text" class="form-control" name="notas_pedido" id="notas_pedido"> 
                          </div>
                          <br>
                        </form>
                      </div>
                      <h2>Comprobante de pago</h2>
											<img class="img-fluid" id="comprobante_pago_pedido_img" src="">

                      <label for="">Metodo de pago que uso el cliente</label>
                      <input type="text" class="form-control" name="metodo_pago" id="metodo_pago" readonly> 
                      <br>
                      <button id="cancelarPedido"  type="button" class="btn-pedido btn-cancelar-pedido btn btn-lg btn-danger rounded-pill"> <i class="fa fa-times"></i> Cancelar pedido</button>
                      <button id="cancelarPedidoEnviado"  type="button" class="btn-pedido btn-cancelar-pedido-enviado btn btn-lg btn-danger rounded-pill"> <i class="fa fa-times"></i> Cancelar pedido</button>
                  
                      <button id="enviarDatosPaqueteria"  type="button" class="btn-pedido btn-enviarDatos-Paqueteria btn btn-lg btn-danger rounded-pill"> <i class="fas fa-dolly-flatbed"></i> Aprobar pedido</button>
                      <button id="actualizarDatosEnvio"  type="button" class="btn-pedido btn-actualizar-datos-envio btn btn-lg btn-success rounded-pill"> <i class="fas fa-refresh"></i> Actualizar datos envio</button>
                      <button id="enviarNumeroGuia"  type="button" class="btn-pedido btn-enviar-numoerGuia btn btn-lg btn-primary rounded-pill"> <i class="fas fa-truck"></i> Marcar como enviado</button>
                    
                      <button id="actualizarDatosEnvioEnviado"  type="button" class="btn-pedido btn-actualizar-datos-envio-enviado btn btn-lg btn-success rounded-pill"> <i class="fas fa-refresh"></i> Actualizar datos envio</button>
                    

                  </div>

                  <div class="modal-footer">
                      <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
                     <!--<button id="registrar_cambio_movimiento" class="btn btn-info" ><i class="fa fa-save"></i> Guardar </button>-->
                  </div>

              </div>
          </div>
      </div>
<!-- Fin Ventana ver pedidos-->

</div>

<div class="jumbotron">
  <h1>Historial de pedidos</h1>
  <p>Aqui apareceran los pedidos ya pagados y a los que suministraste su numero de guia.</p>
  <br>
  <button  class="btn btn-lg btn-primary actulizar_tablas_pedidos"> Recargar tabla <i class="fa fa-refresh"></i> </button>
  <br>
  <br>
 <div id="div_historial_pedidos">
 
 </div>
</div>
