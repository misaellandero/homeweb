<div class="jumbotron">
<h1>Punto de venta</h1>
  <div class="row">
    <div class="col-lg">
      <h2>Productos</h2>
        <p>Seleccione un producto para añadir a la venta.</p>
       <div id="div_buscador_punto_venta">
       <?php include  'estructura/buscador/buscador.php'?>
       </div>
        <br>
        <p>
          <a class="btn btn-dark btn-lg" id="botonModoLector" data-target="#modal_modo_lector" data-toggle="modal" href=""> Modo lector <i class="fa fa-barcode"></i></a>
        </p>
        <p>
          <a class="btn btn-primary btn-lg d-lg-none  d-xl-none"  data-target="#modal_resultado_buscar_articulos" data-toggle="modal" id="boton_buscar_articulos_punto_venta" href=""> Buscar <i class="fa fa-search"></i></a>
        
        </p>
        <div class="d-none d-lg-block">
        <div class="contenedor_articulos_buscados_lg row">
          
        </div>
        </div>
       
    </div>

    <div class="col-lg">
      <h2>Lista de venta</h2>
        <p>Añada productos desde el buscador</p>
  
        <a id="reacargarTablaTickets" class="btn btn-primary btn-lg"  href="#">Recargar <i class="fa fa-refresh"></i></a>
        <a id="pagar_efectivo" class="btn btn-success btn-lg" href="#" data-toggle="modal" data-target="#modal_pagar"  role="button">Pagar Efectivo<i class="fa fa-money"></i> </a>
        <a id="pagar_tarjeta" class="btn btn-info btn-lg" href="#" data-toggle="modal" data-target="#modal_pagar"  role="button">Pagar Tarjeta <i class="fa fa-credit-card"></i> </a>
        <a id="btn-cortes-caja" class="btn btn-secondary btn-lg" href="#" data-toggle="modal" data-target="#modal_corte_caja"  role="button">Corte de caja <i class="fas fa-cash-register"></i></a>
        <?php
          $file = permisoMostrarElemento($permisos[16]["permiso"],1,' <a id="btn-movimientos-efectivo-caja" class="btn btn-warning btn-lg" href="#" data-toggle="modal" data-target="#modal_movimientos_efectivo"  role="button">Movimientos efectivo <i class="fas fa-coins"></i></a>');
          echo ($file);
        ?>
        <?php
          $file = permisoMostrarElemento($permisos[18]["permiso"],1,'<button id="alta_rapida_cliente" type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target=".bs-rusuario-modal-lg">
          Nuevo Usuario <i class="fa fa-user"></i>
        </button>');
          echo ($file);
        ?>
        <div class="jumbotron jumbotron-fluid">
        <div class="table-responsive">
        <table id="tabla_tikets" width="100%" class="table table-striped table-bordered">
            <thead>
               <tr role="row">
                 <th><i class='fa fa-cube'></i> Producto</th>
                 <th><i class='fa fa-cubes'></i> Cantidad</th>
                 <th><i class='fa fa-money'></i> Precio</th>
                 <th><i class='fa fa-bank'></i> IVA</th>
                 <th><i class='fa fa-bank'></i> IEPS</th>
                 <th><i class='fa fa-edit'></i> Subtotal</th>
                <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
              </tr>
            </thead>
        </table>
        
          <p>IVA $ <span class="IVA"></span></p>
          <p>IEPS $ <span class="IEPS"></span></p>
          <p>Subtotal $ <span class="SINI"></span></p>
          <hr class="my-4">
          <input class="total_movimiento" id="total_venta" type="number" hidden="true">
          <h1 class="display-4 ">Total $<span class="total_movimiento"></span></h1> </div>
        </div>
   
    </div>
  </div>
  
</div>


<!-- Ventana resultado busqueda -->

<div class="modal fade bs-example-modal-sm" id="modal_resultado_buscar_articulos" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Resultados de la busqueda</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
                <div class="contenedor_articulos_buscados_sm row"></div>
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-dark" data-dismiss="modal" ><i class="fa fa-thumbs-up"></i> Listo </button> 
              </div>

        </div>
    </div>
</div>
<!-- resultado busqueda-->

<!-- Ventana resultado busqueda -->

<div class="modal fade bs-example-modal-sm" id="modal_modo_lector" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Codigo de barras</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
                 <div class="form-group">
                  <label for="">Codigo de barras</label>
                  <input type="text" id="lectorCodigoBarras" class="form-control" autofocus>
                 </div>
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-dark" data-dismiss="modal" ><i class="fa fa-thumbs-up"></i> Listo </button> 
              </div>

        </div>
    </div>
</div>
<!-- resultado busqueda--


<!-- Ventana pagar -->

<div class="modal fade bs-example-modal-sm" id="modal_pagar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Información de pago</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <input type="number" id="tipo_cambio" value="<?php echo $datosEmpresa[0]['cambio_dolar'];?>"  hidden="true">
              <div class="modal-body ">
                <div class="form-group">
                <input id="concepto_movimiento" type="text" hidden="true">
                <label for="">Total</label>
                <input type="number" id="total_pagar"  class="form-control total_movimiento_input"  readonly>
                <label class="efectivo"  for="">Pesos</label>
                <input type="number"  id="pago_cliente" value='0' class="efectivo form-control">
                <label  class="efectivo" for="">Dolares</label>
                <input type="number"  id="pago_cliente_dolares" value='0' class="efectivo form-control">
                <label  class="tarjeta" for="">Referencia Bancaria</label>
                <input type="text"  id="referencia_bancaria" value='0' class="tarjeta form-control">
                <label for="">Cambio</label>
                <input type="number"  id="cambio_cliente" class="form-control"   >
                
                </div>
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <button class="btn btn-success" id="registrar_venta"> Registrar Venta</button>
              </div>

        </div>
    </div>
</div>



<!-- Ventana pagar -->

<div class="modal fade bs-example-modal-sm" id="modal_pagar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Información de pago</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
                <div class="form-group">
                <label for="">Total</label>
                <input type="number" id="total_pagar"  class="form-control total_movimiento_input"  readonly>
                <label for="">Pago</label>
                <input type="number"  id="pago_cliente" class="form-control"  >
                <label for="">Cambio</label>
                <input type="number"  id="cambio_cliente" class="form-control"   >
                
                </div>
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <button class="btn btn-success" id="registrar_venta"> Registrar Venta</button>
              </div>

        </div>
    </div>
</div>


<!-- Ventana corte de caja-->

<div class="modal fade bs-example-modal-sm" id="modal_corte_caja" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Corte de caja</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
               <h4>Historial de cortes </h4>
               <div class="form-group">
               <label for="">Limite, mostrar los</label>
               <input id="limite_cortes" type="number" class="form-control" value="10">
               <label for="">mas recientes</label>
               
               </div> 
               
               <div id="div_tabla_historial_cortes"></div>
               
               <h4>Ventas del corte</h4>
               <div id="div_ventas_corte"> </div>
               <h5>Total ventas $ <span id="total_ventas_corte"></span></h5>
               <h4>Flujos de efectivo</h4>
               <h5>Total efectivo $ <span id="total_efectivo"></span></h5>
               <h4>Efectivo en caja</h4>
               <div id="contendedorEfectivoCorte"></div>
               <h5>Total $ <span id="total_dinero"></span></h5>
              
               <a class="btn btn-success" href="#" id="recargarCortes">Recargar historial cortes <i class="fa fa-refresh"> </i>  </a>
              
               <a id="cargarVentasActuales" class="btn btn-primary"  href="#">Ventas actuales <i class="fa fa-refresh"></i></a>
              
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-secondary" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <a id="crearCorte" class="btn btn-info"  href="#">Crear Corte <i class="fas fa-cash-register"></i></a>
       
              </div>

        </div>
    </div>
</div>
<!-- Ventana movimientos efectivo-->

<div class="modal fade bs-example-modal-sm" id="modal_movimientos_efectivo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Movimientos de efectivo</h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body ">
              <h4>Lista de movimientos de efectivo</h4> 
               <div class="form-group">
               <label for="">Limite, mostrar los</label>
               <input id="limite-moviemintos-efectivo" type="number" class="form-control" value="10">
               <label for="">mas recientes</label>
               </div> 
                <div id="div_tabla_movimientos_efectivo"></div>

                <h4>Nuevo de movimientos de efectivo</h4> 
              <form id="form-efectivo">
              <div class="form-group">
                <label for="">Tipo</label>
                <select class="form-control" name="tipo_movimiento_efectivo" id="tipo_movimiento_efectivo">
                  <option value="3">Entrada de efectivo</option>
                  <option value="2">Salida de efectivo</option>
                </select> 
                <label for="">Concepto</label>
                <select class="form-control"  name="concepto_movimiento_efectivo" id="concepto_movimiento_efectivo"> 
                </select>

                <label for="">Usuario</label>
                <select class="form-control" id="usaurio_movimiento_efectivo" name="usaurio_movimiento_efectivo"  > 
                </select>

                <label for="">Cantidad</label>
                <input class="form-control" id="cantidad_movimiento_efectivo" name="cantidad_movimiento_efectivo" type="number">
                
              
                </div>
              </form>

              
              </div>

              <div class="modal-footer">
                  <button type="button"   class="btn btn-secondary" data-dismiss="modal" ><i class="fa fa-times"></i> Regresar </button> 
                  <button type="button" id="registro_moviento_efectivo"  class="btn btn-primary" data-dismiss="modal" ><i class="fa fa-save"></i> Registrar </button> 
             
              </div>

        </div>
    </div>
</div>