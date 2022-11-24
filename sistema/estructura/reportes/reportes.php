<div class="jumbotron">
  <h1>Reporte de movimientos por producto</h1>
  <p>Configure un nuevo reporte</p>
  <form id="formReporteVentasProducto">
  <div class="form-row">
    <div class="col-12 col-sm-4">
      <label for="">Fecha de inicio</label>
      <div class="input-group date timePiker" id="datetimepicker3" data-target-input="nearest">
                    <input type="text" name="fechaInicioReporte" class="form-control datetimepicker-input" data-target="#datetimepicker3"/>
                    <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
      </div>
    </div>
    <div class="col-12 col-sm-4">
        <label for="">Fecha de fin</label>
        <div class="input-group date timePiker" id="datetimepicker4" data-target-input="nearest">
                      <input type="text" name="fechaFinReporte" class="form-control datetimepicker-input" data-target="#datetimepicker4"/>
                      <div class="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                          <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                       </div>
        </div>
    </div>
   
      <div class="col-12 col-sm-4">
        <label for="">Usuarios</label>
        <select  class="form-control usuariosReporteProducto" name="usuariosReporteProducto" id="usuariosReporteProducto"></select>
      </div>
      <div class="col-12 col-sm-6">
        <label for="">Productos</label>
        <select  class="form-control productosReporteProducto" name="productosReporteProducto" id="productosReporteProducto"></select>
      </div>
      <div class="col-12 col-sm-6">
        <label for="">Articulos</label>
        <select  class="form-control articulosReporteProducto" name="articulosReporteProducto" id="articulosReporteProducto"></select>
      </div>
     
      </form>
  </div>
  

<br>
  <p><button class="btn btn-primary btn-lg"  id="reporteVentasPorProducto" role="button">Generar reporte <i class="fa fa-gears"></i></button>
  <button class="btn btn-primary btn-lg"  id="imprimirReporteVentasProducto" role="button">Imprimir reporte <i class="fa fa-print"></i></button></p>
  <h1>Lista de ventas</h1>
  
  <div id="div_tabla_reportes_ventas_producto"></div>
  <h4>Total $<span id="totalVentasReporteProducto"></span> </h4>
  <h4>Total de unidades vendidas <span id="totalVendido"></span></h4>
</div>
