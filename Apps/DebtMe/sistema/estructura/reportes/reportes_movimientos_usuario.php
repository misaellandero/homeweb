<div class="jumbotron">
  <h1>Reporte de movimientos por usuario</h1>
  <p>Configure un nuevo reporte</p>
  <form id="formReporteVentasUsuario">
    <div class="form-row">
        <div class="col-12 col-sm-3">
          <label for="">Fecha de inicio</label>
          <div class="input-group date timePiker" id="datetimepicker1" data-target-input="nearest">
                        <input type="text" name="fechaInicioReporte" class="form-control datetimepicker-input" data-target="#datetimepicker1"/>
                        <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
          </div>
        </div>
        <div class="col-12 col-sm-3">
            <label for="">Fecha de fin</label>
            <div class="input-group date timePiker" id="datetimepicker2" data-target-input="nearest">
                          <input type="text" name="fechaFinReporte" class="form-control datetimepicker-input" data-target="#datetimepicker2"/>
                          <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
            </div>
        </div>
    
        <div class="col-12 col-sm-6">
          <label for="">Usuarios</label>
          <select  class="form-control usuariosReporte" name="usuariosReporte" id="usuariosReporte"></select>
        </div>
    </div>
     
  </form>
  <br>
  <p><a class="btn btn-primary btn-lg" href="#" id="reporteVentasPorUsuario" role="button">Generar reporte <i class="fa fa-gears"></i></a>
  <a class="btn btn-primary btn-lg imprimirReporteVentas" href="#" id="imprimirReporteVentas" role="button">Imprimir reporte <i class="fa fa-print"></i></a></p>
  <h1>Lista de ventas</h1>
  
  <div id="div_tabla_reportes_ventas"></div>
  <h4>Total $<span id="totalVentasReporte"></span> </h4>
</div>
