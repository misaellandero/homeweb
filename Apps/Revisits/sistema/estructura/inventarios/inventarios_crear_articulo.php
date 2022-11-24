<div class="jumbotron">
  <h1>Crear Articulo</h1>
  <p>Registre articulos para vender desde el punto de venta o en su tienda en linea.</p>
    <p>
    <button id="boton_registrar_Articulo" type="button" data-toggle="modal" data-target="#moda_registrar_articulo" class="btn btn-lg btn-primary">Registrar Articulo <i class="fa fa-pallet"></i>  </button> 
    <button id="crear_lista_clientes_vip" type="button"   class="btn btn-lg btn-primary">Crear lista clientes VIP <i class="fa fa-th-list"></i>  </button> 
    <button id="crear_lista_clientes" type="button"   class="btn btn-lg btn-primary">Crear lista Clientes <i class="fa fa-clipboard-list"></i>  </button> 
    <button id="editar_varios_articulos" type="button"  data-toggle="modal" data-target="#modal-editar-varios-a-la-vez"  class="btn btn-lg btn-primary">Editar varios a la vez <i class="fa fa-edit"></i>  </button> 
    
    </p>
    <div class="btn-group-toggle" id="botones_filtro_productos" data-toggle="buttons">
    </div>
    <h5 id="datos_existencia_articulos_filtrados">
    <span id="elemento_consulta_tabla_articulo"></span> 
    <span id="cantidad_elemento_consulta_tabla_articulo" class="badge badge-secondary"></span> 
    <span id="unidad_consulta_tabla_articulo"></span> 
    <span id="cantidad_unidades_consulta_tabla_articulo" class="badge badge-secondary"></span></h5>
    <br>
      <br>
  <div id="div_tabla_articulos">

  </div>

</div>

<!-- Ventana Crear articulo -->

<div class="modal fade bs-example-modal-sm" id="moda_registrar_articulo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"> 
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel"><span class="registar_articulo">Registrar Articulo</span> <span class="editar_articulo">Editar Articulo</span> </h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
                <form id="registrarArticulo">
                  <div class="form-group registrar_articulo">
                    <label for="">Seleccione un producto</label>
                    <select id="listaProductoArticulo" class="form-control listaProductoArticulo" name="">

                    </select>
                  </div>

                    <div class="form-group">
                    <label for="">Nombre del articulo</label>
                    <input type="text" class="form-control" id="nombreArticulo">
                    <label for="">Descripción corta</label>
                    <input type="text" class="form-control" name="desCortaArticulo" id="desCortaArticulo">
                    <label for="">Descripción Larga</label> 
                    <textarea name="desLargaArticulo" id="desLargaArticulo" ></textarea> 
                    </div>
                    <div class="form-group">
                    <label for="">Codigo</label>
                    <input type="text" class="form-control" id="cbArticulo">
                    <label for="">SKU</label>
                    <input type="text" class="form-control" id="skuArticulo">
                    </div>
                    <div class="form-group">
                    <label for="">Costo</label>
                    $<input value="0" type="number" class="form-control" id="CostoArticulo">
                    </div>
                    <div class="form-group">
                    <label for="">Precio</label>
                    $<input value="0" type="number" class="form-control" id="PrecioArticulo">
                    </div>
                    <div class="form-group">
                    <label for="">Precio Anterior</label>
                    $<input type="number" value="0" class="form-control" id="PrecioAnteriorArticulo">
                    </div>
                    <div class="form-group">
                    <label for="">Impuesto</label>
                    <select id="listaImpuestoArticulo" class="form-control listaImpuestos" name="">

                    </select>
                    <button type="button" class="addElementoImpuesto btn btn-primary"><i class="fa fa-plus"></i>  </button>
                    <div class="form-group">
                        <label for="">Disponibilidad</label>
                        <select class="form-control" name="disponibilidadArticulo" id="disponibilidadArticulo">
                        <option value="0">Activo solo en punto de venta</option>
                        <option value="1">Activo en punto de venta y online</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Sucursal</label>
                        <select class="form-control" name="sucursal" id="sucursal"  disabled="false">
                        <option value="0">Matriz</option> 
                        </select>
                    </div>
                    <div class="form-group tiendaOptions">
                        <label for="">Destacar en tienda</label>
                        <select class="form-control" name="destacarArticulo" id="destacarArticulo">
                        <option value="0">No destacar en pagina principal</option>
                        <option value="1">Destacar en pagina principal</option>
                        <option value="2">Destacar en ofertas</option>
                        </select>
                    </div>
                    
                    </div>
                    <div class="form-group">
                    <label for="">Existencia en inventario</label>
                    <input type="number" value="1" class="form-control" id="ExistenciaArticulo" disabled="false">
                    </div>
                
                    <div id="div_campos_producto" class="">
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
               <button id="registrar_articulo" class="btn btn-info registrar_articulo" ><i class="fa fa-save"></i> Guardar </button>
               <button id="editar_articulo" class="btn btn-success editar_articulo" ><i class="fa fa-save"></i> Actualizar </button>
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana articulo-->

<!-- Ventana ver elementos articulo -->

<div class="modal fade bs-example-modal-sm" id="moda_ver_elementos_articulo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"> 
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel"><span id="nombre_elementos_consulta"></span> de <span id="nombre_articulo_consulta_elementos"></span></h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
             <div id="div_tabla_elementos_articulo"></div>
            </div>
 
            <div class="jumbotron">
                <h1>Detalles</h1>

                <div class="form-group">
                    <label for="">Codigo</label>
                    <input id="id_elemento_consulta" type="number" class="form-control" disabled="true">
                </div>
                <div class="form-group">
                    <label for="">Costo</label>
                    <input value="0" id="CostoArticulo_elemento" type="number" class="form-control" disabled="true">
                </div>
                <div class="form-group">
                    <label for="">Existencia</label>
                    <input value="0" id="ExistenciaArticulo_elemento" type="number" class="form-control" disabled="true">
                </div>


                <div id="datos_del_elemeto">
              
                <p>Seleccione un elemento de la tabla primero...</p> 
                </div>
            </div> 

            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana ver elementos articulo-->


<!-- Ventana ver imagenes articulo --> 
<div class="modal fade bs-example-modal-sm" id="modal_add_imagen" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Añadir imagen</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

                <div class="modal-body"> 

                    
                    <h4>Añadir imagenes Extra</h4>
                    <div class="row">
        
                            <div class="col-12 form-group">
                            <label   for="">Titulo</label>
                            <textarea id="tit_notas" class="form-control" rows="2" cols="80"></textarea>
                            </div>
                            <div class="col-12 form-group">
                            <label   for="">Detalles</label>
                            <textarea id="text_notas" class="form-control" rows="8" cols="80"></textarea>
                            </div>
                        
                                <form id="upload_fotos" class="col-12 dropzone" action="php/inventarios/form_upload.php" style="border: 1px solid #e5e5e5; height: 300px;">
                                <input name="id_articulo"  id="id_articulo" hidden="true">
                                <input type="text"  name="titulo_img" id="titulo_img" hidden="true">
                                <input type="text"  name="texto_img" id="texto_img" hidden="true">
                                </form>
                        

                    </div>
                    <h4>Imagenes registradas</h4>
                    <div id="contenedor_imagenes" class="row"></div>
                        
                </div>
 
            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana imagenes articulo-->

<!-- Ventana contenido combo --> 
<div class="modal fade bs-example-modal-sm" id="modal_contenido_combo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Editar articulos contenidos</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

                <div class="modal-body"> 

                    
                    <h5>Seleccione articulos para añadir al combo</h5>
                        <div class="row">
                            <div id="div_buscador_combo" class="col-12">
                            <?php include 'estructura/buscador/buscador.php'; ?> 
                          
                            </div>

                            <div class="col-12">
                            <form id="form_add_a_combo">
                                <input id="id_combo" name="id_combo" type="text" hidden="true">  
                                <div class="form-group">
                                    <label for="">Seleccione producto</label>
                                    <select class="form-control" name="id_articulo_add_combo" id="select_productos_combo"></select>
                                </div>
                                <div class="form-group">
                                    <label for="">Cantidad</label>
                                    <input name="cantidad" class="form-control" type="number">
                                </div>
                            </form>
                            <button id="boton_add_a_combo" class="btn btn-primary">Agregar al combo <i class="fa fa-plus"></i></button>
                            <br>
                            </div>
                           
                        </div>
                    <h5>Edite articulos del combo</h5>
                    <div id="div_tabla_articulos_combo">
                    Esto no deberia verse, pero si lo ves ¡recuerda terner un buen dia, que eres increible!
                    </div>
                        
                </div>
 
            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
            </div>

        </div>
    </div>
</div>


<!-- ventana contenido combo-->

<!-- Ventana ver imagenes articulo --> 
<div class="modal fade bs-example-modal-sm" id="modal_imagePromo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Imagen Promocional</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

                <div class="modal-body"> 
 
                    <div id="imagenPromocional">
                    </div>
                    <div id="img-out" align="center"></div>
                </div>
 
            <div class="modal-footer">
            <button type="button" id="descargarImagenPromo"  class="btn btn-success"  ><i class="fa fa-download"></i> Descargar </button> 
           
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
            </div>

        </div>
    </div>
</div>

<!-- Fin Ventana imagenes articulo-->

<!-- Ventana ver editar varios articulos  --> 
<div class="modal fade bs-example-modal-sm" id="modal-editar-varios-a-la-vez" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Editar varios a la vez</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

                <div class="modal-body"> 
                    <div class="form-group">
                        <label for="">Producto</label>
                        <div class="row">
                            <div class="col-9"><select class="form-control productos-editar-varios" name="productos-varios" id="productos-varios"></select>
                            </div>
                            <div class="col-3"><button type="button" id="cargar-campos-productos"  class="btn btn-primary"  ><i class="fa fa-search"></i> Cargar </button> 
                            </div>
                        </div>
                        <br>
                        <div id="div-tabla-productos-editar-varios" class="col-12">
                        
                        </div>
                    </div>
                    
                </div>
 
            <div class="modal-footer">
             <button type="button" id="actulizar-varios-a-la-vez"  class="btn btn-success"  ><i class="fa fa-save"></i> Guardar </button> 
           
              <button type="button"  class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
            </div>

        </div>
    </div>
</div>

<!-- Fin Ventana editar varios articulos--->