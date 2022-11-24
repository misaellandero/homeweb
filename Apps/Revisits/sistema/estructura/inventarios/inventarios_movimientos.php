<div class="jumbotron">
  <h1>Registrar Movimientos</h1>
  <p>Registre entradas o salidas al inventario.</p>
  <p><button id="boton_registrar_movimiento" type="button" data-toggle="modal" data-target="#moda_registrar_movimiento" class="btn btn-lg btn-primary">Registrar Movimiento <i class="fa fa-truck-loading"></i>  </button> 
   
    <br>
      <br>
      <div class="form-group">
      
      <label class="" for="">Limite de resutados: </label>
      <input id="limite_movimientos" type="number" class="form-control" value="10">
      </div>
      <div class="btn-group btn-group-toggle" id="botones_filtro_movimientos" data-toggle="buttons">
      <label class="btn btn-secondary active btn_filtro" data-id="todos"><input type="radio" class="btn_filtro_tabla_movimientos" name="options" autocomplete="off" value="0" checked=""> Todos</label>
      <label class="btn btn-secondary btn_filtro" data-id="0"><input type="radio" class="btn_filtro_tabla_movimientos" name="options" autocomplete="off">Entradas</label>
      <label class="btn btn-secondary btn_filtro" data-id="1"><input type="radio" class="btn_filtro_tabla_movimientos" name="options" autocomplete="off">Salidas</label>
      </div>
      <br>
      <br>
      <div id="div_tabla_movimientos">

      </div>
</div>

<!-- Ventana Movimientos-->

<div class="modal fade bs-example-modal-sm" id="moda_registrar_movimiento" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel"><span class="registar_articulo">Registrar Movimiento</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
              <div class="form-group">
               <label for="">Tipo movimiento</label>
               <select class="form-control tipos_movimientos" name="" id="tipoMoviento" >
               <option value="0">Entrada</option>
               <option value="1">Salida</option>
               </select>
             </div>
             <div class="form-group">
               <label for="">Concepto movimiento</label>
               <select class="form-control concepto_movimientos" name="" id="conceptoMoviento">
               </select>
             </div>

             <div id="buscador_movimientos"><?php include 'estructura/buscador/buscador.php'; ?></div>
             <br>
             <br>
               <div class="form-row">
                <div class="form-group col-md-12 col-sm-12">
                  <select name="" class="form-control" id="lista_articulos_movimiento"></select>
                </div>
                <div class="form-group col-md-12 col-sm-12">
                   <button type="button"   id="boton_buscar_articulo_movimiento"  class="col-md-5 col-sm-12 btn btn-primary"  ><i class="fa fa-search"></i> Buscar </button>
                   <button type="button"   id="boton_añadir_articulo_movimiento"  class="col-md-5 col-sm-12 btn btn-success"  ><i class="fa fa-plus"></i> Añadir </button>
                </div>




              </div>
              <br>
              <br>

             <div id="div_campos_elementos" ></div>
             <div id="div_tabla_elementos_movimiento">
              <table id="tabla_movimientos" width="100%" class="table">
                <thead>
                  <tr role="row">
                    <th><i class='fa fa-cube'></i> Producto</th>
                    <th><i class='fa fa-cubes'></i> Cantidad</th>
                    <th><i class='fa fa-edit'></i> Costo</th>
                    <th><i class='fa fa-edit'></i> Subtotal</th>
                    <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
              <h4>Costo total: $<span class="total_movimiento" id="total_movimiento">0.00</span> </h4>
              <div class="form-group">
                <label for="">Comentarios</label>
                <textarea class="form-control" id="comentarios_movimiento" name="name" rows="4" cols="80"></textarea>
              </div>
             </div>
            </div>

            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
               <button id="registrar_movimiento" class="btn btn-info registrar_moviento" ><i class="fa fa-save"></i> Guardar </button>
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana Movimientos-->

