
<div class="jumbotron">
<h1>Facturas</h1>
<a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal-facturas"  href="" role="button">Nueva Factura <i class="fa fa-plus"></i></a>  
<p>Crea facturas de las ventas del sistema o facturas independientes usando datos del sistema.</p> 
</div>
 

 <!-- Ventana Editar foto usuario-->

 <div class="modal fade bs-example-modal-lg" id="modal-facturas" tabindex="-1" role="dialog" aria-hidden="true">
                         <div class="modal-dialog modal-lg">
                             <div class="modal-content">

                                 <div class="modal-header">
                                 <h4 class="modal-title" id="myModalLabel">Nueva factura</h4>
                                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                     </button>
                                    
                                 </div>
                                 <div class="modal-body">
                                    <div id="Nueva-factura">
                                         <h3>Tipo de factura</h3>  
                                            <input id="crear_aparir_de_venta" type="checkbox" value="0"> Copiar a partir de venta
                                             
                                            <div class="form-group" id="buscar_venta"> 
                                                <div id="datosDelaVenta">
                                                <h4>ID del movimiento</h4> 
                                                    <div class="row">
                                                            <div class="col-md-8">
                                                                <input type="text" id="id-movimiento-para-facturar" placeholder="Numero de movimiento" class="form-control">
                                                            </div>
                                                            <div class="col-md-4"> 
                                                                <a id="buscar-elementos-movimiento" href="#" class="buscar-elementos-movimiento btn btn-primary btn-lg"><i class="fab fa-searchengin"></i> Validar </a>
                                                            </div>
                                                            <div class="col-12">
                                                            <p>Si conoces el ID de tu movimiento escríbelo y si no lo conoces encuéntralo con el buscador de abajo</p>
                                                           
                                                            </div>

                                                            
                                                            <br>
                                                    </div>
                                                          
                                                    <h4>Buscar movimientos por usuario</h4> 
                                                    <form id="formBuscarVentasUsuario">
                                                        <div class="form-row">
                                                            <div class="col-12 col-sm-3">
                                                            <label for="">Fecha de inicio</label>
                                                            <div class="input-group date timePiker" id="datetimepicker11" data-target-input="nearest">
                                                                            <input type="text" name="fechaInicioReporte" class="form-control datetimepicker-input" data-target="#datetimepicker11"/>
                                                                            <div class="input-group-append" data-target="#datetimepicker11" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                                                            </div>
                                                            </div>
                                                            </div>
                                                            <div class="col-12 col-sm-3">
                                                                <label for="">Fecha de fin</label>
                                                                <div class="input-group date timePiker" id="datetimepicker21" data-target-input="nearest">
                                                                            <input type="text" name="fechaFinReporte" class="form-control datetimepicker-input" data-target="#datetimepicker21"/>
                                                                            <div class="input-group-append" data-target="#datetimepicker21" data-toggle="datetimepicker">
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
                                                    <p><a class="btn btn-primary btn-lg" href="#" id="BuscarVentasPorUsuario" role="button">Buscar Movimientos <i class="fa fa-search"></i></a>
                                                     <h1>Lista de ventas</h1>
                                                    
                                                    <div id="div_tabla_buscar_ventas_factura"></div>
                                            </div>
                                        </div>
                                        <br>
                                        <br>
                                        <h4>Datos del Cliente</h4>
                                        <div class="form-group"> 
                                            <input id="mostrar_clientes_para_facturar" type="checkbox" value="0"> Elegir desde el sistema
                                            <br>
                                            
                                            <Select class="form-control" id="lista_clientes_para_facturar" ></Select>
                                            
                                            <div class="form-factura-cliente">
                                                <label for="">Razon Social</label>
                                                <input type="text"  id="razon_social-factura" class="form-control">
                                                <label for="">Email</label>
                                                <input type="text" id="mail-factura"  class="form-control">
                                                <label for="">RFC</label>
                                                <input type="text" id="rfc-factura" class="form-control">
                                            </div>

                                        </div>
                                        <div class="form-group"> 
                                        <br>
                                        <h4>Direccion Fiscal</h4>
                                        <input id="dirección_para_facturar" type="checkbox" value="0"> Incluir Direccion Fiscal
                                            <br>
                                            <div id="direccion_fiscal" class="row">
                                                
                                                <div class="col-md-6">
                                                    <label for="">Codigo Postal</label>
                                                    <input type="text" id="cp-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Numero Interior</label>
                                                    <input type="text" id="ninterior-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Numero Exterior</label>
                                                    <input type="text" id="nexterior-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Calle</label>
                                                    <input type="text" id="calle-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Colonia</label>
                                                    <input type="text" id="colonia-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Ciudad</label>
                                                    <input type="text" id="ciudad-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Municipio o Delegación</label>
                                                    <input type="text" id="municipio-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Estado</label>
                                                    <input type="text" id="estado-factura" class="form-control">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="">Pais</label>
                                                    <input type="text" id="pais-factura" class="form-control">
                                                </div>
                                            </div>

                                         
                                        </div>

                                        <div class="form-group">  
                                            <h4>Elementos de la factura</h4>

                                            <input id="tipo_add_elemtos_factura" type="checkbox" value="0"> Añadir elemento desde sistema
                                            <div class="elemento-desde-sistema">
                                                <div id="div_buscador_factura">
                                                    <?php include  'estructura/buscador/buscador.php'?>
                                                </div>
                                                <br>
                                                <label for="">Resultados busqueda</label>
                                                <div id="divTablaFactura">
                                                </div>
                                            </div>
                                            <div class="elemento-desde-nuevo">
                                                <div class="form-group">
                                                <label for="">Cantidad</label>
                                                <input type="number" class="form-control" id="quantity">
                                                <label for="">Descripción</label>
                                                <input type="number" class="form-control" id="description">
                                                <label for="">Clave catalogo SAT</label>
                                                <p>Clave de unidad de medida, del catálogo del SAT.</p>
                                                <input type="text" class="form-control" id="product_key">
                                                <label for="">Nombre Unidad</label>
                                                <p>Nombre de la unidad de medida como aparecerá en la factura.</p>
                                                <input type="text" class="form-control" id="unit_name">
                                                <label for="">Precio</label>
                                                <input type="number" class="form-control" id="price">
                                                <label for="">Sku</label>
                                                <p>Identificador de uso interno designado por la empresa.</p>
                                                <input type="text" class="form-control" id="sku">
                                                <label for="">IVA</label>
                                                <input type="number" class="form-control" id="impuestos-iva">
                                                <label for="">ISR</label>
                                                <input type="number" class="form-control" id="impuestos-isr">
                                                <label for="">IEPS</label>
                                                <input type="number" class="form-control" id="impuestos-ieps">
                                                
                                                </div>
                                                <a class="btn btn-primary"  href="" role="button"><i class="fa fa-plus"></i> Agregar a factura </a>
                                           
                                            </div>
                                            

                                            <br>
                                            <br>
                                            <table id="tabla-elementos-factura" width="100%" class="table table-striped">
                                                <thead>
                                                <tr role="row">
                                                    <th><i class='fa fa-cube'></i> Producto</th>
                                                    <th><i class='fa fa-cubes'></i> Cantidad</th>
                                                    <th><i class='fa fa-edit'></i> Costo</th>
                                                    <th><i class='fa fa-edit'></i> Subtotal</th>
                                                    <th><i class='fa fa-edit'></i> <button data-id="318" type="button" class="close eliminarApartado"><span aria-hidden="true">×</span></button></th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                            <h5>Impuestos</h5>  
                                            <h5>Subtotal $<span id="total-factura">0.00</span></h5>
                                            <h6>IVA $<span id="total-factura-IVA">0.00</span></h6>
                                            <h6>IEPS $<span id="total-factura-IEPS">0.00</span></h6>
                                            <h6>ISR $<span id="total-factura-ISR">0.00</span></h6>
                                            <input type="text" id="total-factura-input" class="form-control" hidden="true"> 
                                            <input id="tax_included" type="checkbox" value="true" checked>  Impuestos Incluidos
                                            <p id="tax-included-true">Todos los impuestos aplicables están incluídos en el precio y se desglosarán automáticamente al emitir la factura.</p>
                                            <p id="tax-included-false">El Precio no incluye impuestos, por lo que aquellos impuestos a aplicar se sumarán en el precio final.</p>
                                            <br>
                                            <h4>Total $<span id="total-factura-con-impuestos"></span></h4>
                                        </div>
                                    </div>
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-default" data-dismiss="modal"><i class="text-danger fa fa-times-circle"></i> Cerrar</button>

                                 </div>

                             </div>
                         </div>
                     </div>
<!-- Fin Ventana Editar foto usuario-->