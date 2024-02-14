$(document).ready(function() {
    //crear producto.
    $('#desLargaArticulo').summernote();
    //ocultar dato elementos compuestos
    $('.datos_elementos_compuesto').hide();
    $('#tipo_de_producto_registro').on('change', function() {

      var value = $('#tipo_de_producto_registro').val()

        if (value == 1) {
            $('.datos_elementos_compuesto').show('slow');
        } else {
            $('.datos_elementos_compuesto').hide('slow');
        }
    })

    $('#boton_crear_nuevo_producto').on('click', function() {
        $('#guardar_producto').show();
        //quitar elementos de actualización
        $('#actualizar_producto').hide();
        $('#formCrearNuevoProducto')[0].reset();
    })

    //añadir a unidades a lista
    $('.addElementoListaUnidades').on('click', function() {
     
        var refreshUrl = 'php/inventarios/consulta_unidades.php';
        var refreshSelect = '.unidades';
        var refreshDefault = null;
        addElementoListaUnidad('php/inventarios/add_unidades.php', 'Ingrese una nueva unidad de medida:', refreshUrl, refreshSelect, refreshDefault);

    })

    //elimiar unidad de lista
    $('#eliminarUnidadforRegistro').on('click', function() {

        var mensaje = confirm("¿Realmente desea Borrar esta unidad?");
        //Detectamos si el usuario acepto el mensaje
        if (mensaje) {
            var refreshUrl = 'php/inventarios/consulta_unidades.php';
            var refreshSelect = '.unidades';
            var refreshDefault = null;
            var id = $('#unidadProducto').val();
            eliminarElementoLista('php/inventarios/borrar_unidades.php', id, refreshUrl, refreshSelect, refreshDefault);

        } else {
            alert("¡Ok, No se borrara!");
        }


    });
    //elimiar unidad de lista
    $('#eliminarUnidadforRegistroCampo').on('click', function() {

        var mensaje = confirm("¿Realmente desea Borrar esta unidad?");
        //Detectamos si el usuario acepto el mensaje
        if (mensaje) {
            var refreshUrl = 'php/inventarios/consulta_unidades.php';
            var refreshSelect = '.unidades';
            var refreshDefault = null;
            var id = $('#unidadCampo').val();
            eliminarElementoLista('php/inventarios/borrar_unidades.php', id, refreshUrl, refreshSelect, refreshDefault);

        } else {
            alert("¡Ok, No se borrara!");
        }


    });
    
    //guardar nuevo producto
    $('#guardar_producto').on('click', function() {

        var form = '#formCrearNuevoProducto';
        var url = 'php/inventarios/add_producto.php';
        var boton = '#guardar_producto';
        var funcion = "cargarTablaProductos";
        registrarFormulario(form, url, boton,funcion);

    })


  //crear tabla trasladada a funciones generales

  //cargar tabla al hacer click en li
  $('#li_inventarios').on('click', function () {
    cargarTablaProductos();
    cargarProductosBotones();
    cargarTablaArticulos('todos');
    cargarTablaMovimientos('10','todos','#div_tabla_movimientos'); 
    cargarListaSelects('php/inventarios/consulta_unidades.php', '.unidades', "No aplica");
    $('.tipo_producto_buscador').val(0); 
  });

  
  //editar producto
  $('#div_tabla_productos').on('click','.boton-editar-producto', function(){

      //quitar elementos de crear
        $('#actualizar_producto').show();
        $('#guardar_producto').hide();
        $('#formCrearNuevoProducto')[0].reset()

      //datos
      var id = $(this).data('id');

      $('.idProdcuto').val(id);

      $.ajax({
      url: 'php/inventarios/cargar_datos_producto.php',
      type: 'post',
      data: {
          id:id
      },
      dataType: 'json',
      success: function(data) {
          if (data.success) {
              $.each(data, function(index, record) {
                  if ($.isNumeric(index)) {

                    $('#idProducto').val(record.id);
                    $('#nombreProducto').val(record.nombre);
                    $("#unidadProducto option[value="+record.id_unidad+"]").prop('selected', true);
                    $("#tipo_de_producto_registro option[value="+record.compuesto+"]").prop('selected', true);
                    if (record.compuesto == 1) { 
                       $('.datos_elementos_compuesto').show();
                    } else{ 
                      $('.datos_elementos_compuesto').hide();
                    }
                    $('#nombre_elementos_producto').val(record.nombre_elemento);
                  }

              });
          }
      },

  });
  });


   $('#actualizar_producto').on('click', function () {
        var form = '#formCrearNuevoProducto';
        var url = 'php/inventarios/editar_producto.php';
        var boton = '#actualizar_producto';
        var funcion = "cargarTablaProductos";
        registrarFormulario(form, url, boton,funcion);


   })

   //elimiar producto
   $('#div_tabla_productos').on('click','.btn-eliminar-producto', function() {

       var mensaje = confirm("¿Realmente desea Borrar este producto?");
       //Detectamos si el usuario acepto el mensaje
       if (mensaje) {
          var id = $(this).data('id');
          var url = "php/inventarios/borrar_producto.php";
          var funcion = "cargarTablaProductos";
          eliminarElementoTabla(id,url,funcion)

       } else {
           alert("¡Ok, No se borrara!");
       }


   });

   //elimiar campo
   $('#div_tabla_campos').on('click','.btn-eliminar-campo', function() {

       var mensaje = confirm("¿Realmente desea Borrar este Campo?");
       //Detectamos si el usuario acepto el mensaje
       if (mensaje) {
          var id = $(this).data('id');
          var url = "php/inventarios/borrar_campo.php";
          var funcion = "cargarTablaCampos";
          eliminarElementoTabla(id,url,funcion)
          cargarListaSelects('php/inventarios/consulta_campos.php', '.listaCamposParaAsiganar', null);
       } else {
           alert("¡Ok, No se borrara!");
       }


   });



   $('#div_tabla_productos').on('click','.boton-campos-producto', function() {
     var id = $(this).data('id');
     cargarTablaCampos();

     $('.idProdcuto').val(id);
     cargarTablaCamposProdcuto(id);

   });

   $("#precioCampo").hide("hide");

   $("#tipoDeCampo").on('change', function(){
     
      if ($(this).val() == 4) {
        $("#precioCampo").show("slow");
      } else {
        $("#precioCampo").hide("hide");
      }

   });
   //crear campo
   $('#boton_crear_nuevo_campo').on('click', function () {
     
        var form = '#crearCampo';
        var url = 'php/inventarios/add_campo.php';
        var boton = '#boton_crear_nuevo_campo';
        var funcion = "cargarTablaCampos";
        registrarFormulario(form, url, boton,funcion);

   });

   //añadir a predeterminados a lista de un campo
   $('#div_tabla_campos').on('click','.addElementoListaUnidades', function() {
       var id = $(this).data('id');
       var refreshUrl = 'php/inventarios/consulta_lista_campos_predefinidos.php';
       var refreshSelect = '.listadoCampo' + id;
       var refreshDefault = null;
       addElementoListaCampos('php/inventarios/add_lista_campo_predefinido.php', 'Ingrese una nuevo valor:', refreshUrl, refreshSelect, refreshDefault, id);

   })

   //elimiar predeterminado de ista de un campo
   $('#div_tabla_campos').on('click','.eliminarElementoListaUnidades',function() {

       var mensaje = confirm("¿Realmente desea Borrar este elemento de la lista?");
       //Detectamos si el usuario acepto el mensaje
       if (mensaje) {
           var id = $(this).data('id');
           var refreshUrl = 'php/inventarios/consulta_lista_campos_predefinidos.php';
           var refreshSelect = '.listadoCampo' + id;
           var refreshDefault = null;
           var id_a_borrar = $('.listadoCampo' + id).val();
           eliminarElementoListaCampo('php/inventarios/borrar_campo_lista_predeterminado.php', id_a_borrar, refreshUrl, refreshSelect, refreshDefault,id);

       } else {
           alert("¡Ok, No se borrara!");
       }


   });

   //añadir campos a producto

   $('#addCampoAproducto').on('click', function () {
     var form = '#formAddCampoAproducto';
     var url = 'php/inventarios/add_campo_a_producto.php';
     var boton = '#addCampoAproducto';
     var funcion = "cargarTablaCamposProdcuto";
     var id = $('#idPrdocutoAgregar').val();
     registrarFormulario(form, url, boton,funcion,id );
   })
   //añadir campos a elemento producto

   $('#addCampoAElementoProducto').on('click', function () {
     var form = '#formAddCampoAproducto';
     var url = 'php/inventarios/add_campo_a_elemento_producto.php';
     var boton = '#addCampoAElementoProducto';
     var funcion = "cargarTablaCamposProdcuto";
     var id = $('#idPrdocutoAgregar').val();
     registrarFormulario(form, url, boton,funcion,id );
   })
   //elimiar campo producto
   $('#div_tabla_campos_producto').on('click','.btn-eliminar-campo-producto', function() {

       var mensaje = confirm("¿Realmente desea Borrar este Campo?");
       //Detectamos si el usuario acepto el mensaje
       if (mensaje) {
          var id = $(this).data('id');
          var url = "php/inventarios/borrar_campo_producto.php";
          var funcion = "cargarTablaCamposProdcuto";
          var id_producto = $('#idPrdocutoAgregar').val();
          eliminarElementoTabla(id,url,funcion,id_producto)
       } else {
           alert("¡Ok, No se borrara!");
       }


   });

//articulos

    $('#boton_registrar_Articulo').on('click', function() {
        $('.registrar_articulo').show();
        $('.editar_articulo').hide();
        $('#registrarArticulo')[0].reset();
        cargarListaSelects('php/inventarios/consulta_productos.php', '.listaProductoArticulo', 'Seleccione un producto');
        cargarListaSelects('php/inventarios/consulta_impuestos.php','.listaImpuestos', null);
        $('#div_campos_producto').empty();
        $('#ExistenciaArticulo').prop('disabled', false);
    })

    function cargarDatosArticuloMovimiento(id_articulo,nombre,existencia,compuesto) { 
      var div_destino = '#div_campos_elementos';
      $.ajax({
        url: 'php/inventarios/cargar_datos_articulo.php',
        type: 'post',
        data: {
            id_articulo:id_articulo
        },
        dataType: 'json',
        success: function(data) {

            if (data.success) {
                $.each(data, function(index, record) {
                    if ($.isNumeric(index)) {

                      var div = $('<div class="jumbotron">'
                      +'<h3>Datos '+nombre+'</h3>'
                       +'<div class="form-group">'
                       +'<label>Costo </label>'
                       +'<input class="form-control id_articulo_movimiento" type="number" value="'+id_articulo+'"  hidden="true">'
                       +'<input class="form-control nombre_articulo_movimiento" type="text" value="'+nombre+'"  hidden="true">'
                        +'<input class="form-control existencia_articulo_movimiento" type="text" value="'+existencia+'"  hidden="true">'
                       +'<input class="form-control tipo_articulo_movimiento" type="number" value="'+compuesto+'"  hidden="true">'
                       +'<input class="costo_articulo_movimiento form-control" type="number"  value='+record.costo+'>'
                       +'</div>'
                       +'<div class="form-group">'
                       +'<label>Cantidad</label>'
                       +'<input class="cantidad_articulo_movimiento form-control" type="number"  value=0>'
                       +'</div>'
                       +'</div>');

                       $(div_destino).html(div);

                    }

                });



            }
        },

    });
    }
//carga campos de elemento para llenar
function cargarCamposElemento(id_producto,id_articulo,nombre) { 
  var div_destino = '#div_campos_elementos';
  if (id_producto == 0) {
    $(div_destino).html('Seleccione un producto');
  }
   $.post('php/inventarios/consulta_campos_elemento_f.php', {id:id_producto},
      function(data) { 
        console.log(data);

        var div = $('<div class="jumbotron">'

        +'<h3>Datos '+nombre+'</h3>'
        +'<div class="form-group">'
        +'<label>Costo </label>'
        +'<input class="form-control id_articulo_movimiento" type="number" value="'+id_articulo+'"  hidden="true">'
        +'<input class="form-control nombre_articulo_movimiento" type="text" value="'+nombre+'"  hidden="true">'
        +'<input class="form-control tipo_articulo_movimiento" type="number" value="1"  hidden="true">'
        +'<input class="costo_articulo_movimiento form-control" type="number"  value=0>'
        +'</div>'
        +'<div class="form-group">'
        +'<label>Cantidad</label>'
        +'<input class="cantidad_articulo_movimiento form-control" type="number"  value=0>'
        +'</div>'
        +'</div>');
          if (data.success) {


              $.each(data, function(index, record) {

                  if ($.isNumeric(index)) {

                      if (record.unidad == 'null') {
                        var unidad = "";
                      } else {
                        var unidad = record.unidad;
                      }

                      if (record.datos == 3) {
                        var input = $('<div class="form-group">'
                        +'<label>'+record.nombre+'</label>'
                        +'<select class="form-control camposElementoMovimiento listadoCampoRegistrarArt'+ record.id_campo +'" data-nombre="'+record.nombre+'" data-id=' + record.id_campo + '></select>'
                        +'</div>');
                      } else if (record.datos == 0) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<textarea data-nombre="'+record.nombre+'" data-id=' + record.id_campo + ' class="form-control camposElementoMovimiento"  rows="2" ></textarea>'
                          +'</div>');
                        } else if (record.datos == 1) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<input data-nombre="'+record.nombre+'" data-id=' + record.id_campo + ' class="form-control camposElementoMovimiento" placeholder="'+record.unidad+ 's'+'" type="number" >'

                          +'</div>');
                        } else if (record.datos == 2) {
                          var input = $('<div class="form-group">'
                          +'<input data-nombre="'+record.nombre+'" data-id=' + record.id_campo + ' class="form-control camposElementoMovimiento" type="checkbox" value="0" >'
                          +'<label>'+record.nombre+'</label>'
                          +'</div>');
                        }


                        input.appendTo(div);

                      cargarListaSelectsCampos('php/inventarios/consulta_lista_campos_predefinidos.php','.listadoCampoRegistrarArt'+ record.id_campo +'', null,record.id_campo);

                  }
              });
              $(div_destino).html(div);

          }


       });

}
// cargar campos del articulo para llenar

function cargarCamposProducto(id_producto) {
  var div_destino = '#div_campos_producto';
  var div_elementos = '#div_campos_elementos';
  if (id_producto == 0) {
    $(div_destino).html('Seleccione un producto');
  }
  $(div_destino).empty();
  $(div_elementos).empty();
  $.post('php/inventarios/consulta_campos_producto_f.php', {id:id_producto},
      function(data) {

          if (data.success) {
              $.each(data, function(index, record) {

                  if ($.isNumeric(index)) { 
                      if (record.compuesto == 0) {

                        $('#ExistenciaArticulo').val(0);
                        $('#ExistenciaArticulo').removeAttr('disabled'); 
                        //var boton_elemento = $('<button data-id=' + id_producto + ' type="button"  class="addElementoArticulo btn btn-primary"><i class="fa fa-plus"></i> añadir '+record.elemento+'</button>');
                        //boton_elemento.appendTo(div_destino);
                      } else{ 
                        $('#ExistenciaArticulo').attr('disabled','true');
                      }

                      if (record.unidad == 'null') {
                        var unidad = "";
                      } else {
                        var unidad = record.unidad;
                      }

                      if (record.datos == 3) {
                        var input = $('<div class="form-group">'
                        +'<label>'+record.nombre+'</label>'
                        +'<select class="form-control camposVariablesArticulo listadoCampoRegistrarArt'+ record.id_campo +'" data-id=' + record.id_campo + '></select>'
                        +'<button data-id=' + record.id_campo + ' type="button" class="addElementoListaUnidades btn btn-primary"><i class="fa fa-plus"></i></button>'
                        +'<button data-id=' + record.id_campo + ' type="button" class="btn btn-danger eliminarElementoListaUnidades"><i class="fa fa-trash"></i></button>'

                        +'</div>');
                      } else if (record.datos == 0) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<textarea data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo"  rows="2" ></textarea>'
                          +'</div>');
                        } else if (record.datos == 1) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo" placeholder="'+record.unidad+ 's'+'" type="number" >'

                          +'</div>');
                        } else if (record.datos == 2) {
                          var input = $('<div class="form-group">'
                          +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo checkbox" type="checkbox" value="0" >'
                          +'<label>'+record.nombre+'</label>'
                          +'</div>');
                        }


                        input.appendTo(div_destino);

                        cargarListaSelectsCampos('php/inventarios/consulta_lista_campos_predefinidos.php','.listadoCampoRegistrarArt'+ record.id_campo +'', null,record.id_campo);

                  }
              });


          } else {
            $('#ExistenciaArticulo').attr('disabled','true');
          }


       });
}



    $('#listaProductoArticulo').on('change', function () {
      var id_producto = $(this).val();
      cargarCamposProducto(id_producto);
    })

    //añadir a predeterminados a lista de un campo
    $('#div_campos_producto').on('click','.addElementoListaUnidades', function() {
        var id = $(this).data('id');
        var refreshUrl = 'php/inventarios/consulta_lista_campos_predefinidos.php';
        var refreshSelect = '.listadoCampoRegistrarArt' + id;
        var refreshDefault = null;
        addElementoListaCampos('php/inventarios/add_lista_campo_predefinido.php', 'Ingrese una nuevo valor:', refreshUrl, refreshSelect, refreshDefault, id);

    })

    //elimiar predeterminado de ista de un campo
    $('#div_campos_producto').on('click','.eliminarElementoListaUnidades',function() {

        var mensaje = confirm("¿Realmente desea Borrar este elemento de la lista?");
        //Detectamos si el usuario acepto el mensaje
        if (mensaje) {
            var id = $(this).data('id');
            var refreshUrl = 'php/inventarios/consulta_lista_campos_predefinidos.php';
            var refreshSelect = '.listadoCampoRegistrarArt' + id;
            var refreshDefault = null;
            var id_a_borrar = $('.listadoCampoRegistrarArt' + id).val();
            eliminarElementoListaCampo('php/inventarios/borrar_campo_lista_predeterminado.php', id_a_borrar, refreshUrl, refreshSelect, refreshDefault,id);

        } else {
            alert("¡Ok, No se borrara!");
        }
      })



    $('#registrar_articulo').on('click', function () {
       var id_producto = $('#listaProductoArticulo').val();
       var nombre_articulo = $('#nombreArticulo').val();
       var costo_articulo = $('#CostoArticulo').val();
       var precio_articulo = $('#PrecioArticulo').val();
       var id_impuesto = $('#listaImpuestoArticulo').val();
       var ExistenciaArticulo = $('#ExistenciaArticulo').val();
       var codigodeBarras = $('#cbArticulo').val();
       var disponibilidad = $('#disponibilidadArticulo').val();
       var destacar = $('#destacarArticulo').val();
       var des_corta = $('#desCortaArticulo').val();
       var des_larga  =  $('#desLargaArticulo').summernote('code');
       var sucursal = $('#sucursal').val();
       var skuArticulo = $('#skuArticulo').val();
       var precioAnterior = $('#PrecioAnteriorArticulo').val();
       //capturar campos varibles
       if (nombre_articulo == "" ) {
        alert('El Nombre es requerido');
      } else if (precio_articulo == "") {
        alert("El precio es Requerido");
      } else if (id_producto == 0) {
        alert("Seleccione un producto primero");
      } else {

        var ids_campo = [null];
        var valores_campos = [null];


        $('.camposVariablesArticulo').each(function(key, value) {
                 var input = $(this);
                 var id_campo = input.data('id');
                 var valor_campo = input.val();

                  if (input.hasClass("checkbox")) {
                    if ($(input).prop('checked')) {
                        valor_campo = 1;
                    }else {
                      valor_campo = 0;
                    }
                  }
                  ids_campo.push(id_campo);
                  valores_campos.push(valor_campo);  
           });
 
           $.post('php/inventarios/registar_articulo.php', {
             id_producto:id_producto,
             nombre_articulo:nombre_articulo,
             costo_articulo:costo_articulo,
             precio_articulo:precio_articulo,
             destacar:destacar,
             id_impuesto:id_impuesto,
             ids_campo:ids_campo,
             disponibilidad:disponibilidad,
             valores_campos:valores_campos,
             ExistenciaArticulo:ExistenciaArticulo,
             codigodeBarras:codigodeBarras,
             des_corta : des_corta,
             skuArticulo: skuArticulo,
             precioAnterior:precioAnterior,
             des_larga : des_larga,
             sucursal : sucursal
            },
              function(data) {

                    alert(data);
                    cargarTablaArticulos('todos');

               });
      }


    });

    function cargarProductosBotones(){

      var lista = '<label class="btn btn-secondary active btn_filtro" data-id="todos">'+
                  '<input type="radio" class="btn_filtro_tabla_articulos" name="options"  autocomplete="off"value="0"  checked> Todos'+
                  '</label>';
      $.get('php/inventarios/consulta_productos.php',
      function (respuesta) {
        $.each(respuesta, function(key, value) {

            if (value.nombre == null) {

            } else {
                lista +=  '<label class="btn btn-secondary btn_filtro" data-id="' + value.id +'">'+
                          '<input type="radio" class="btn_filtro_tabla_articulos"  name="options"  autocomplete="off">' + value.nombre + 
                          ' <span class="badge badge-light">'+value.articulos_por_producto+'</span>'+
                          '</label>';
            }

        });
        $('#botones_filtro_productos').html(lista); 
      });
    }



        $('#botones_filtro_productos').on('click','.btn_filtro', function () {
          var id = $(this).data('id');
          cargarTablaArticulos(id);
        });

    

      $('#div_tabla_articulos').on('click','.btn-eliminar-articulo', function() {

          var mensaje = confirm("¿Realmente desea Borrar este articulo?");
         //Detectamos si el usuario acepto el mensaje
         if (mensaje) {
            var id = $(this).data('id');
            var url = "php/inventarios/borrar_articulo.php";
            var funcion = "cargarTablaArticulos";
            eliminarElementoTabla(id,url,funcion,'todos');

         } else {
             alert("¡Ok, No se borrara!");
         }
       });

       $('#div_tabla_articulos_combo').on('click','.btn-eliminar-articulo-combo', function() {
        var mensaje = confirm("¿Quitar del combo este articulo?");
       //Detectamos si el usuario acepto el mensaje
       if (mensaje) {
          var id = $(this).data('id');
          var url = "php/inventarios/borrar_articulo_combo.php";
          var funcion = "cargarTablaArticulosCombo";
          var id_combo = $('#id_combo').val();
          eliminarElementoTabla(id,url,funcion,id_combo);

       } else {
           alert("¡Ok, No se borrara!");
       }
     });
     

      $('#div_tabla_articulos').on('click','.boton-editar-articulo', function() {
        var id = $(this).data('id');
        $('.registrar_articulo').hide();
        $('.editar_articulo').show();
        cargarListaSelects('php/inventarios/consulta_impuestos.php','.listaImpuestos', null);
        $('#div_campos_producto').empty();
        var div_destino = '#div_campos_producto';
        cargarDatosArticulo(id,div_destino,"Si");
        $('#ExistenciaArticulo').prop('disabled', true);
      });

      $('#editar_articulo').on('click', function () {
         var id_articulo = $('#id_articulo').val();
         var nombre_articulo = $('#nombreArticulo').val();
         var costo_articulo = $('#CostoArticulo').val();
         var precio_articulo = $('#PrecioArticulo').val();
         var id_impuesto = $('#listaImpuestoArticulo').val();
         var codigoBarras = $('#cbArticulo').val();
         var disponibilidadArticulo = $('#disponibilidadArticulo').val();
         var destacar = $('#destacarArticulo').val();
         var des_corta = $('#desCortaArticulo').val();
         var des_larga  =  $('#desLargaArticulo').summernote('code');
         var sucursal = $('#sucursalArticulo').val();
         var skuArticulo = $('#skuArticulo').val();
         var precioAnterior = $('#PrecioAnteriorArticulo').val(); 

       
        
         //capturar campos varibles
         if (nombre_articulo == "" ) {
          alert('El Nombre es requerido');
        } else if (precio_articulo == "") {
          alert("El precio es Requerido");
        } else if (id_articulo == 0) {
          alert("Seleccione un producto primero");
        } else {

          var ids_campo = [];
          var valores_campos = [];


          $('.camposVariablesArticulo').each(function(key, value) {
                   var input = $(this);
                   var id_campo = input.data('id');
                   var valor_campo = input.val();

                    if (input.hasClass("checkbox")) {
                      if ($(input).prop('checked')) {
                          valor_campo = 1;
                      }else {
                        valor_campo = 0;
                      }
                    }

                   ids_campo.push(id_campo);
                   valores_campos.push(valor_campo);
             });

             $.post('php/inventarios/actualizar_articulo.php', {
               id_articulo:id_articulo,
               nombre_articulo:nombre_articulo,
               costo_articulo:costo_articulo,
               precio_articulo:precio_articulo,
               destacar:destacar,
               id_impuesto:id_impuesto,
               ids_campo:ids_campo,
               codigoBarras:codigoBarras,
               disponibilidadArticulo:disponibilidadArticulo,
               valores_campos:valores_campos,
               des_corta : des_corta,
               skuArticulo: skuArticulo,
               des_larga : des_larga,
               precioAnterior : precioAnterior,
               sucursal : sucursal
             },
                function(data) {

                      alert(data);
                      cargarTablaArticulos('todos');
                 });
        }


      });

$('#boton_registrar_movimiento').on('click', function(){
    var tipos = $('#tipoMoviento').val();
    cargarListaSelectsCampos('php/inventarios/consulta_tipos_movimiento.php','.concepto_movimientos',null,tipos,0);
    cargarListaSelects('php/inventarios/consulta_productos.php','.listaProductos', 'todos');

});

var total = 0;

$('#tipoMoviento').on('change', function () {
  var tipos = $(this).val();
  cargarListaSelectsCampos('php/inventarios/consulta_tipos_movimiento.php','.concepto_movimientos',null,tipos,0);
  $("#tabla_movimientos > tbody").empty();
  total = 0;
  $('#total_movimiento').html('0.00');

  var tipos_movimiento = $('#tipoMoviento').val();
  $('.tipo_producto_buscador').val(tipos_movimiento); 
  if (tipos_movimiento == 1) {
  cargarTablaApartados('#tabla_movimientos','no','no','usuarioActual');
  var form = '#buscador_movimientos';
  var selectDeDestinos = "#lista_articulos_movimiento";
   buscadorArticulos(form,selectDeDestinos);
  }
})

$('#buscador_movimientos').on('change', 'input, select', function () {
  var form = '#buscador_movimientos';
  var selectDeDestinos = "#lista_articulos_movimiento";
   buscadorArticulos(form,selectDeDestinos);
})

//Combo de articulos
$('#div_buscador_combo').on('change', 'input, select', function () {
  var form = '#div_buscador_combo';
  var selectDeDestinos = "#select_productos_combo";
  $('.tipo_producto_buscador').val(1);
   buscadorArticulos(form,selectDeDestinos);
})

$('#boton_add_a_combo').on('click', function () {
  var form = '#form_add_a_combo';
  var url = 'php/inventarios/add_articulo_a_combo.php';
  var boton = '#boton_add_a_combo';
  var funcion = "cargarTablaArticulosCombo";
  var id = $('#id_combo').val();
  registrarFormulario(form, url, boton,funcion,id);
})

//eliminar Apartados 
$('#tabla_movimientos').on('click','.eliminarApartado', function () {
  var id = $(this).data('id');
  var url = 'php/inventarios/borrar_articulo_apartado.php';
  var funcion = 'cargarTablaApartados'
  var tabla = '#tabla_movimientos';
  eliminarElementoTablaApartados(id,url,funcion,tabla,'no','no','usuarioActual');
     
});

$('#boton_buscar_articulo_movimiento').on('click', function () {
  var selected = $('#lista_articulos_movimiento').find('option:selected');
  var compuesto = selected.data('compuesto');
  var id_producto = selected.data('id_producto');
  var existencia = selected.data('existencia');
  var id_articulo = $('#lista_articulos_movimiento').val();
  var nombre = selected.data('nombre');
  var tipos_movimiento = $('#tipoMoviento').val(); 
 if (tipos_movimiento == 0) {
   if (compuesto == 1) {
     console.log("Aqui deberia ir");
       cargarCamposElemento(id_producto,id_articulo,nombre);
   } else {
       cargarDatosArticuloMovimiento(id_articulo,nombre,existencia,compuesto);
   }
 } else {
   cargarDatosArticuloMovimiento(id_articulo,nombre,existencia,compuesto);
 }

})



 $('#boton_añadir_articulo_movimiento').on('click', function () {

   var id_articulo = $('.id_articulo_movimiento').val();
   var costo_articulo = $('.costo_articulo_movimiento').val();
   var cantidad_articulo = $('.cantidad_articulo_movimiento').val();
   var tipo_producto = $('.tipo_articulo_movimiento').val();
   var nombre_articulo = $('.nombre_articulo_movimiento').val();
   var tipos_movimiento = $('#tipoMoviento').val();

   var datos = "";

   if (tipos_movimiento == 1) {  
     apartarArticulo(id_articulo,cantidad_articulo,costo_articulo,tipo_producto,'#tabla_movimientos'); 

  } else {
    if (tipo_producto == 1) {

      $('.camposElementoMovimiento').each(function(key, value) {
               var input = $(this);
               var id_campo = input.data('id');
               var valor_campo = input.val();
               var nombre_campo = input.data('nombre');
               var nombre_valor = input.text();
 
                if (input.hasClass("checkbox")) {
                  if ($(input).prop('checked')) {
                      valor_campo = 1;
                  }else {
                    valor_campo = 0;
                  }
                }
 
             var dato = '<span class="datos_extas" data-id="'+id_campo+'" data-valor="'+valor_campo+'"> </span>';
             datos = datos + dato;
         });
 
 
    } else if (tipo_producto == 2){
      alert('Los combonos no tienen existencia, añada cada elemento por separado');
    }
 
 
 
    if (cantidad_articulo < 1) {
      alert('La cantidad debe ser por lo menos uno');
    }else {
      var Subtotal = cantidad_articulo*costo_articulo;
 
      var row = $("<tr data-cantidad='"+cantidad_articulo+"' data-costo='"+costo_articulo+"' data-subtotal='" + Subtotal + "' data-compuesto='" + tipo_producto + "' data-id='" + id_articulo + "' role='row' class='datos_movimiento'/>");
 
      $("<td />").html(nombre_articulo + datos).appendTo(row);
      $("<td />").text(cantidad_articulo).appendTo(row);
      $("<td />").text(costo_articulo).appendTo(row);
 
      var eliminar = '<button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button>';
 
 
       $("<td />").text(Subtotal).appendTo(row);
       $("<td />").html(eliminar).appendTo(row);
       total = total + Subtotal; 
       $('.total_movimiento').html(total);
      row.appendTo("#tabla_movimientos");
 
    }
  }

   


 })

$('#tabla_movimientos').on('click','.close-elemento-movimientos', function () {
  var td = $(this).parent();
  var tr = $(td).parent();

  var subtotal = tr.data('subtotal'); 

  total = total - subtotal;
  $('#total_movimiento').html(total);

  tr.remove();
})

//registrar movimiento

$('#registrar_movimiento').on('click', function () {
  var tipos_movimiento = $('#tipoMoviento').val();
  var concepto_movimiento = $('#conceptoMoviento').val();
  var comentarios_movimiento = $('#comentarios_movimiento').val();
  var id_articulo = [];
  var costo_articulo = [];
  var cantidad_articulo = [];
  var datos_extas = [];
  var id_datos_extras = [];
  var compuesto_articulo = [];
  var total = $('#total_movimiento').html()
  var contador = 0;

if (tipos_movimiento == 1 ) {
   //registrar_moviento
$.post('php/inventarios/registar_movimiento.php', {

  tipos_movimiento:tipos_movimiento,
  concepto_movimiento:concepto_movimiento,
  comentarios_movimiento:comentarios_movimiento,
  total:total
 
 },
   function(data) { 

        
           cargarTablaArticulos('todos');
           cargarTablaApartados('#tabla_movimientos','no','no','usuarioActual');
          var limite = $('#limite_movimientos').val();
          cargarTablaMovimientos(limite,'todos','#div_tabla_movimientos');
           $("#tabla_movimientos").empty();
           total = 0;
           $('#total_movimiento').html('0.00');
    
 
    });

} else{

  $('.datos_movimiento').each(function(key, value) {
    contador = contador +1;
   var tr = $(this);

   var id = tr.data('id');
   var costo = tr.data('costo');
   var cantidad = tr.data('cantidad');
   var compuesto = tr.data('compuesto');
   var id_datos_articulo = [];
   var datos_articulo = [];

   id_articulo.push(id);
   costo_articulo.push(costo);
   cantidad_articulo.push(cantidad);
   compuesto_articulo.push(compuesto);

   if (compuesto == 1) {
     tr.find('.datos_extas').each(function(key, value) {
       var dato = $(this);
       var id = dato.data('id');
       var valor = dato.data('valor');

       id_datos_articulo.push(id);
       datos_articulo.push(valor);
     });

   }else {
     id_datos_articulo.push('na');
     datos_articulo.push('na');
   }

   datos_extas.push(datos_articulo);
   id_datos_extras.push(id_datos_articulo);

});

if (contador < 1) {
alert('Ingrese un articulo Primero')
} else {
//registrar_moviento
$.post('php/inventarios/registar_movimiento.php', {

 tipos_movimiento:tipos_movimiento,
 concepto_movimiento:concepto_movimiento,
 comentarios_movimiento:comentarios_movimiento,
 id_articulo: id_articulo,
 costo_articulo:costo_articulo,
 cantidad_articulo: cantidad_articulo,
 datos_extas:datos_extas,
 id_datos_extras: id_datos_extras,
 compuesto_articulo:compuesto_articulo,
 total:total

},
  function(data) {
        alert(data);
         
        //if (data == "Movimiento registrado con exito") {
          cargarTablaArticulos('todos');
          cargarTablaApartados('#tabla_movimientos','no','no','usuarioActual');
          var limite = $('#limite_movimientos').val();
          cargarTablaMovimientos(limite,'todos','#div_tabla_movimientos');
          $("#tabla_movimientos").empty();
          total = 0;
          $('#total_movimiento').html('0.00');
       // }

   });
}


}


});

function cargarTablaMovimientos(limite,tipo,div) { 
        $.get('php/inventarios/consulta_movimientos.php', {limite:limite, tipo:tipo},
        function(data) {
            //console.log(data);
            if (data.success) { 

              var tabla = "<table id='tabla_movimientos_registrados' class='table' style='width: 100%;'>" +
              "<thead><td>#</td> <td>Tipo</td> <td>Concepto</td> <td>Usuario</td><td>Detalles</td><td>Fecha</td><td>Acciones</td></thead>"  +
              "<tbody></tbody>" +
              "</table>";

                $(div).html(tabla);

                $.each(data, function(index, record) {

                    if ($.isNumeric(index)) {
                       
                        var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                        var tipos = ['Entrada', 'Salida'];
                        var ver_detalles = "<button data-toggle='modal'  data-target='#modal-ver_movimiento'   data-id='"+record.id+"' class='ver_detalles_movimiento btn btn-info'> <i class='fa fa-search'></i> Ver detalles</button>";
                        $("<td />").text(record.id).appendTo(row); 
                        $("<td />").text(tipos[record.tipo]).appendTo(row);
                        $("<td />").text(record.concepto).appendTo(row); 
                        $("<td />").text(record.usuario).appendTo(row); 
                        $("<td />").text(record.detalles).appendTo(row); 
                        $("<td />").text(record.fecha).appendTo(row); 
                        $("<td />").html( ver_detalles).appendTo(row); 
                       

                        row.appendTo("#tabla_movimientos_registrados");
                    }
                });


            } 

            $('#tabla_movimientos_registrados').DataTable({
                responsive: true,
                order: [[ 0, 'desc' ]]
            });
        });

}

 







$('#botones_filtro_movimientos').on('click','.btn_filtro', function () {
  var tipo = $(this).data('id'); 
  var limite = $('#limite_movimientos').val();
  cargarTablaMovimientos(limite,tipo,'#div_tabla_movimientos');
});

//ver elementos articulo 

$('#div_tabla_articulos').on('click','.btn-elementos-articulo', function() {
  var id = $(this).data('id');
  var elemento = $(this).data('nombre');
  var articulo = $(this).data('articulo');

  $('#nombre_elementos_consulta').html(elemento +'s');
  $('#nombre_articulo_consulta_elementos').html(articulo);
  cargarElementosArticulo(id);

});

$('#div_tabla_articulos').on('click','.btn-elementos-combo', function() {
  var id = $(this).data('id');  
  $('#id_combo').val(id);
  cargarTablaArticulosCombo(id);
});
 

function cargarElementosArticulo(id_articulo) {
          $.post('php/inventarios/consulta_elementos_articulo.php',
            {id_articulo:id_articulo},
          function(data) {
              if (data.success) { 

                      var tabla = "<table id='tabla_elementos_articulo' width='100%' class='table'>"
                        +"<thead>"
                        +"<td><i class='fa fa-barcode'></i> Codigo</td><td>Existencia</td><td>Acciones</td>"
                        +"</thead>"
                        +"<tbody>"
                        +"</tbody>"
                        +"</table>";

                  $('#div_tabla_elementos_articulo').html(tabla);

                  $.each(data, function(index, record) {

                      if ($.isNumeric(index)) {

                          var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");

                          var ver = '<button type="button" class="btn-ver-detalle-elemento btn btn-info" data-id=' + record.id + ' ><i class="fa fa-search"></i> Ver a detalle</button>';


                          $("<td />").text(record.id).appendTo(row);
                          $("<td />").text(record.existencia).appendTo(row);
                          $("<td />").html(ver).appendTo(row); 

                          row.appendTo("#tabla_elementos_articulo");

                       }
                  });


              }
              //tabla de Boletos 

              $('#tabla_elementos_articulo').DataTable({
                  responsive: true
              });
          });

}



function cargarDatosElementoArticulo(id_articulo) {  
  var div_destino = '#datos_del_elemeto';
  $(div_destino).empty();

  $.ajax({
    url: 'php/inventarios/cargar_datos_articulo.php',
    type: 'post',
    data: {
        id_articulo:id_articulo
    },
    dataType: 'json',
    success: function(data) {
        if (data.success) {
            $.each(data, function(index, record) {
                if ($.isNumeric(index)) { 
                  $('#id_elemento_consulta').val(record.id); 
                  $('#CostoArticulo_elemento').val(record.costo); 
                  $('#ExistenciaArticulo_elemento').val(record.existencia); 
                }

            });
        }
    },

});

  $.post('php/inventarios/consulta_campos_articulo.php', {id_articulo:id_articulo},
      function(data) {
          if (data.success) { 

              $.each(data, function(index, record) {

                  if ($.isNumeric(index)) {

                      $('#ExistenciaArticulo').attr('disabled','true');

                      if (record.unidad == 'null') {
                        var unidad = "";
                      } else {
                        var unidad = record.unidad;
                      }

                      if (record.datos == 3) {
                        var input = $('<div class="form-group">'
                        +'<label>'+record.nombre+'</label>'
                        +'<select class="form-control camposVariablesArticulo listadoCampoRegistrarArt'+ record.id_campo +'" data-id=' + record.id_campo + ' disabled="true"></select>'
                        +'</div>');
                      } else if (record.datos == 0) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<textarea data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo"  rows="2" value="'+record.val+'"></textarea>'
                          +'</div>');
                        } else if (record.datos == 1) {
                          var input = $('<div class="form-group">'
                          +'<label>'+record.nombre+'</label>'
                          +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo" value="'+record.val+'" placeholder="'+record.unidad+ 's'+'" type="number" disabled="true">'

                          +'</div>');
                        } else if (record.datos == 2) {
                          if (record.val == 1) {
                            var input = $('<div class="form-group">'
                            +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo checkbox" type="checkbox" checked value="1" disabled="true">'
                            +'<label>'+record.nombre+'</label>'
                            +'</div>');
                          } else {
                            var input = $('<div class="form-group">'
                            +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo checkbox" type="checkbox"  value="0" disabled="true">'
                            +'<label>'+record.nombre+'</label>'
                            +'</div>');
                          }

                        }


                        input.appendTo(div_destino);

                        cargarListaSelectsCampos('php/inventarios/consulta_lista_campos_predefinidos.php','.listadoCampoRegistrarArt'+ record.id_campo +'', null,record.id_campo,record.val);


                  }
              });


          }


       });
}


$('#div_tabla_elementos_articulo').on('click','.btn-ver-detalle-elemento', function () {
  var id_articulo = $(this).data('id');
  cargarDatosElementoArticulo(id_articulo); 
});

$('#div_tabla_articulos').on('click','.boton-add-imagen', function () {
  var id_articulo = $(this).data('id');
  $('#id_articulo').val(id_articulo);
  var div_destino = "#contenedor_imagenes";
  cargarImagenesProducto(id_articulo,div_destino)

});


$('#tit_notas').on('change', function() {
  var titulo = $(this).val();
  $('#titulo_img').val(titulo);
});

$('#text_notas').on('change', function() {
  var texto = $(this).val();
  $('#texto_img').val(texto);
});
//carga  de fotos 

$(function() {
  var myDropzone = new Dropzone("#upload_fotos");
  myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file);
  });

  myDropzone.on("success", function() {
        
      alert('Se Agrego con Exito la foto'); 
      $('#tit_notas').val('');
      $('#titulo_img').val('');
      $('#text_notas').val('');
      $('#texto_img').val('');

  });

  myDropzone.on("error", function() {
      alert('No se pudo agregar la foto');
  });


})

$('#contenedor_imagenes').on('click','.borrar-imagen-producto', function(){
  var id_imagen = $(this).data('id');  
  borrarImagenArticulo(id_imagen,this);
  

});

$('#contenedor_imagenes').on('click','.hacer-imagen-principal', function(){
  var id_imagen = $(this).data('id');  
  var id_articulo = $('#id_articulo').val();
  hacerImagenPrincipal(id_imagen,id_articulo);
});



function borrarImagenArticulo(id,elemento) {
  var mensaje = confirm("¿Realmente desea borrar esta imagen?");
  //Detectamos si el usuario acepto el mensaje
  if (mensaje) { 
    var url = "php/inventarios/borrar_imagen_articulo.php"; 
    $.ajax({
      type : 'POST',
      url  : url,
      data : {id:id},
      beforeSend: function()
      {
      },
      success :  function(response)
         {
           if (response == "Imagen eliminada con exito") {
             $(elemento).parent().parent().remove();
           }
           alert(response); 
            
          }

      });
  } else {
      alert("¡Ok, No se borrara!");
  }
}

function hacerImagenPrincipal(id_imagen,id_articulo) { 
  
    var url = "php/inventarios/hacer_imagen_principal.php"; 
    $.ajax({
      type : 'POST',
      url  : url,
      data : {id_imagen:id_imagen,id_articulo:id_articulo},
      beforeSend: function()
      {
      },
      success :  function(response)
         {
           alert(response);   
          }

      });
   
}

$('.addElementoImpuesto').on('click', function(){
  addElementoImpuesto();
});

$('#div_tabla_articulos').on('click','.boton-imprimir-promo-articulo', function(){
 
  var id_articulo = $(this).data('id');  
  var dark = "true";
  ImprimirImagenPromocional(id_articulo,dark);
   
});


$('#div_tabla_articulos').on('click','.boton-imprimir-promo-articulol', function(){
 
  var id_articulo = $(this).data('id');  
  var dark = "false";
  ImprimirImagenPromocional(id_articulo,dark);
   
});

//Funcion de imprimir 
function ImprimirImagenPromocional(id_articulo,dark) {
 
  url = "php/formatos_impresion/imprimir_imagen_promocional.php";
 
  $.ajax({

      url: url,

      data: {
        id_articulo: id_articulo,
        dark: dark
      },

      type: 'post',

      success: function(datar) {
      
      console.log(datar);
      
      var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

      var nombreDivImpresion = 'imagenPromocional' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre

      var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div

      $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.

      $("#imagenPromocional").html(datar); //se asigna la pagina que viene desde el servidor.

     //$("#"+nombreDivImpresion).print(); //se invoca la impresion.

      //$("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.

         html2canvas($("#imagenPromocional"), {
          onrendered: function(canvas) {
              theCanvas = canvas;
              document.body.appendChild(canvas); 
              canvas.toBlob(function(blob) {
                saveAs(blob, id_articulo + "Promo.png"); 
              });
              
          }
      });   
    
       
      }

  });

};

$('#descargarImagenPromo').on('click', function(){
  html2canvas($("#imagenPromocional").html(), {
    onrendered: function(canvas) {
        theCanvas = canvas;
        document.body.appendChild(canvas); 
        canvas.toBlob(function(blob) {
          saveAs(blob, id_articulo + "Promo.png"); 
        });
        
    }
});
})

 
function ImprimirListaDeprecios(id,tipo) {

  if (tipo == "vip") { 
  var  url = "php/formatos_impresion/imprimir_lista_precios_cliente_vip.php";
  } else {
  var  url = "php/formatos_impresion/imprimir_lista_precios_cliente.php";

  }

  $.ajax({

      url: url,

      data: {
          id: id
      },

      type: 'post',

      success: function(datar) {
      
          //console.log(datar);
      
      var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

      var nombreDivImpresion = 'listaPImpresionDiv' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre

      var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div

      $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.

      $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.

     $("#"+nombreDivImpresion).print(); //se invoca la impresion.

      $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.
              

      }

  });

};


$('#crear_lista_clientes_vip').on('click', function(){

  var id = "todos";
  var tipo = "vip";
  ImprimirListaDeprecios(id,tipo); 

});

$('#crear_lista_clientes').on('click', function(){

  var id = "todos";
  var tipo = "otros";
  ImprimirListaDeprecios(id,tipo); 

});

$('#editar_varios_articulos').on('click', function(){
  cargarListaSelects('php/inventarios/consulta_productos.php', '.productos-editar-varios', 'Todos');

});

function cargarEditables(id){
  var tabla = "<table id='tabla_datos_edicion_rapida' width='100%' class='table responsive'>"
  +"<thead>"
  +"<td>Codigo</td><td> Producto</td><td> Nombre</td><td> Descripción corta</td><td> Costo</td><td> Precio</td>"
  +"</thead>"
  +"<tbody>"
  +"</tbody>"
  +"</table>";
  var div_tabla = $("#div-tabla-productos-editar-varios");
  div_tabla.html(tabla); 

  var url = "php/inventarios/consulta_articulos.php";
  
  $.ajax({
    type : 'POST',
    url  : url,
    data : {id:id},
    beforeSend: function()
    {
    },
    success :  function(data)
       { 
    
          $.each(data, function(index, record) {
              if ($.isNumeric(index)) { 

                var id_articulo = record.id;

                var row = $("<tr data-id='" + id_articulo + "' role='row' class='datos_articulos_editables'/>");
                var des_corta = "<input class='form-control des_corta_editabes' value='"+record.des_corta+"'></input>";
                var costo = "<input class='form-control costo_editabes' value='"+record.costo+"'></input>";
                var precio = "<input class='form-control precio_editabes' value='"+record.precio+"'></input>";
                 
                $("<td />").html(record.cb).appendTo(row);
                $("<td />").html(record.nombre_producto).appendTo(row);
                $("<td />").html(record.nombre).appendTo(row);
                $("<td />").html(des_corta).appendTo(row);
                $("<td />").html(costo).appendTo(row);
                $("<td />").html(precio).appendTo(row);
           
                row.appendTo('#tabla_datos_edicion_rapida'); 
              }

          }); 
          $('#tabla_datos_edicion_rapida').DataTable({
            responsive: true
        });
      } 

   

    }); 
}

$('#cargar-campos-productos').on('click', function(){
  var productos = $('#productos-varios').val();
  cargarEditables(productos);

});

function actualizarVarios(){
 
    var ids = [];
    var des_corta = [];
    var costos = [];
    var precios = []; 

    $('#div-tabla-productos-editar-varios .datos_articulos_editables').each(function(key, value) {
      var row = $(this);
      var id_articulo = row.data('id');   
      ids.push(id_articulo);   

      row.find('.des_corta_editabes').each(function() { 
        var des = $(this).val();
        des_corta.push(des);    
      });

      row.find('.costo_editabes').each(function() { 
        var costo = $(this).val();
        costos.push(costo);    
      });

      row.find('.precio_editabes').each(function() { 
        var precio = $(this).val();
        precios.push(precio);    
      }); 
 

    });
    var url = "php/inventarios/actualizar_articulos_varios.php";
    //registrar_moviento
    $.post(url, { 
      ids: ids,
      des_corta:des_corta,
      costo:costos,
      precio: precios 
    },
      function(data) {
            alert(data); 
            cargarTablaArticulos('todos');
            cargarTablaMovimientos('10','todos','#div_tabla_movimientos'); 
           
        });

}

$('#actulizar-varios-a-la-vez').on('click', function(){
  actualizarVarios(); 
});

});

