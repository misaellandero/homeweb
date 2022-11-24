<form>
<div class="form-buscar form-row">
    <div class="col-12">
      <input type="text" class="tipo_producto_buscador" name="tipo_producto" value="" hidden="true">
      <input type="text" class="buscador_tienda" name="buscador_tienda" value="0" hidden="true">
    	<label class="NoVisibleEnTienda" for="">Articulo</label>
    	<input type="text" class="form-control nombre_articulo_buscador" name="nombre" placeholder="Buscar articulo">
    </div>
    <div class="NoVisibleEnTienda col-md-4 col-sm-12">
    <label for="">Producto</label>
      <select class="form-control listaProductos" name="id_producto" ></select>
    </div>
    <div class="NoVisibleEnTienda col-md-3 col-sm-12">
    	<label for="">Resultados</label>
      <input type="number"   class="form-control" name="limite" value="10" >
    </div>

  </div>
</form>
