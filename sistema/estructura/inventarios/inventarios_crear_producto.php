<div class="jumbotron">
  <h1>Crear productos</h1>
  <p>Cree un nuevo producto con campos unicos y bien diferenciados.</p>
  <p><button id="boton_crear_nuevo_producto" type="button" data-toggle="modal" data-target="#moda_crear_producto" class="btn btn-lg btn-primary">Nuevo producto <i class="fa fa-boxes"></i>  </button> </p>
  <div id="div_tabla_productos">

  </div>
</div>


<!-- Ventana Crear producto-->

<div class="modal fade bs-example-modal-sm" id="moda_crear_producto" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Datos Producto</h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
                <form id="formCrearNuevoProducto">
                  <input class="idProdcuto" name="idProdcuto" type="text" hidden="true">
                  <div class="form-group">
                    <label for="">Nombre</label>
                    <input id="nombreProducto" class="form-control" type="text" name="nombreProducto">
                  </div>
                  <div class="form-group">
                    <label for="">Unidad</label>
                      <select id="unidadProducto" class="form-control unidades" name="unidadProducto">
                        <option value=""></option>
                      </select>
                      <button type="button" class="addElementoListaUnidades btn btn-primary"><i class="fa fa-plus"></i>  </button>
                      <button type="button" id="eliminarUnidadforRegistro" class="btn btn-danger"><i class="fa fa-trash"></i></button>

                  </div>
                  <div class="form-group">
                  <label for="">Tipo de producto</label>
                    <select id="tipo_de_producto_registro" name="producto_compuesto" >
                      <option value="0">Producto simple</option>
                      <option value="1">Producto compuesto</option>
                      <option value="2">Combo de productos</option>
                    </select>
                    <!-- 
                       <input type="checkbox" id="producto_compuesto" name="producto_compuesto" value="1"> ¿Es un producto compuesto?
                   
                    -->
                    <label for="">Seleccione el tipo de producto, los productos <b>compuestos</b> contienen varios productos iguales dentro que se pueden vender por separado, un <b>combo</b> de producto son varios productos diferentes que se venden juntos.</label>
                  </div>

                  <div id="" class="datos_elementos_compuesto form-group">
                    <label for="">Nombre de los elementos</label>
                    <input class="form-control" type="text" id="nombre_elementos_producto" name="nombre_elementos_producto">
                  </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button"   class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
               <button id="guardar_producto" class="btn btn-info" ><i class="fa fa-save"></i> Guardar </button>
               <button id="actualizar_producto" class="btn btn-success" ><i class="fa fa-save"></i> Actualizar </button>
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana Crear producto-->

<!-- Ventana Crear producto-->

<div class="modal fade bs-example-modal-sm" id="modal_editar_campos_producto" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Campos del Producto <span id="EtiquetaproductoCampos"></span>   </h4>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
              <h4>Crear Nuevo Campo</h4>
              <form id="crearCampo">
                <div class="form-group">
                  <label for="">Tipo de campo</label>
                  <select class="form-control" name="tipoCampo">
                    <option value="0">Texto</option>
                    <option value="1">Numero</option>
                    <option value="2">Checkbox</option>
                    <option value="3">Listado</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Nombre</label>
                  <input type="text"  class="form-control" name="nombreCampo">
                </div>
                <div class="form-group">
                  <label for="">Unidad</label>
                    <select id="unidadCampo" class="form-control unidades" name="unidadCampo">
                      <option value=""></option>
                    </select>
                    <button type="button" class="addElementoListaUnidades btn btn-primary"><i class="fa fa-plus"></i>  </button>
                    <button type="button" id="eliminarUnidadforRegistroCampo" class="btn btn-danger"><i class="fa fa-trash"></i></button>

                </div>
              </form>
              <div class="form-group">
                <button id="boton_crear_nuevo_campo" type="button" class="btn  btn-primary"><i class="fa fa-plus"></i>  Crear Campo</button>
              </div>

              <h4>Lista de Campos</h4>
              <div id="div_tabla_campos">

              </div>

              <h4>Campos asignados a este producto</h4>
              <form id="formAddCampoAproducto">
                <div class="form-group">
                  <input id="idPrdocutoAgregar" class="idProdcuto" name="idProdcuto" type="text" hidden="true">
                  <label for="">Seleccion un campo</label>
                  <select class="listaCamposParaAsiganar form-control" name="idCampo">
                  </select>
                  <button id="addCampoAproducto" type="button" class="btn  btn-primary"><i class="fa fa-plus"></i>  Añadir a Producto</button>
                  <button id="addCampoAElementoProducto" type="button" class="btn  btn-primary"><i class="fa fa-plus"></i>  Añadir a Elemento</button>
                </div>
              </form>
              <div id="div_tabla_campos_producto">

              </div>
            </div>

            <div class="modal-footer">
                <button type="button"  class="btn btn-default" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button>
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana Crear producto-->
