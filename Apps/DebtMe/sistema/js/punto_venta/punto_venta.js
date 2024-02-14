$(document).ready(function() {

    $('#alta_rapida_cliente').on('click', function(){

        cargarListaSelects('php/users/consulta_perfiles.php','#asignar_perfil_usuario');
        
        $('.clienteNormal').hide();
        $('.altaRapida').show();

      });

    //cargar selects
    cargarListaSelects('php/inventarios/consulta_productos.php','.listaProductos', 'todos');
    //El movimiento se configura siempre en salida
    $('.tipo_producto_buscador').val(1);
    cargarTablaApartados('#tabla_tikets','desglosados','no','usuarioActual');

    $('#li_punto_de_venta').on('click', function(){
        //cargar selects
        cargarListaSelects('php/inventarios/consulta_productos.php','.listaProductos', 'todos');
        //El movimiento se configura siempre en salida
        $('.tipo_producto_buscador').val(1);
        cargarTablaApartados('#tabla_tikets','desglosados','no','usuarioActual');
        
    });

  $('#btn-cortes-caja').on('click', function(){
    
   var limite = $('#limite_cortes').val();
    cargarHistorialDeCortes('este',limite );
  })
    
  $('#pagar_efectivo').on('click', function(){
      $('#concepto_movimiento').val(4);
      $('.efectivo').show();
      $('.tarjeta').hide();
  })
  $('#pagar_tarjeta').on('click', function(){
    $('#concepto_movimiento').val(6);
    $('.efectivo').hide();
    $('.tarjeta').show();
})

    $('#div_buscador_punto_venta').on('change keyup click', 'input, select', function () {
    var form = '#div_buscador_punto_venta';
    var selectDeDestinos = ".contenedor_articulos_buscados_lg"; 
    buscadorArticulos(form,selectDeDestinos,'mosaico');
    });

    $('#boton_buscar_articulos_punto_venta').on('click ', function(){
        var form = '#div_buscador_punto_venta';
        var selectDeDestinos = ".contenedor_articulos_buscados_sm"; 
        buscadorArticulos(form,selectDeDestinos,'mosaico');
    });
    
    $('#boton_add_a_combo').on('click', function () {
        var form = '#form_add_a_combo';
        var url = 'php/inventarios/add_articulo_a_combo.php';
        var boton = '#boton_add_a_combo';
        var funcion = "cargarTablaArticulosCombo";
        var id = $('#id_combo').val();
        registrarFormulario(form, url, boton,funcion,id);
      })

    //Apartar articulo
    $('body').on('click','.bnt-add-a-ticket', function(){
        var id_articulo = $(this).data('id'); 
        var cantidad_articulo = 1;
        var costo_articulo = "precio"; 
        var tipo_producto = $(this).data('compuesto');
        apartarArticulo(id_articulo,cantidad_articulo,costo_articulo,tipo_producto,'#tabla_tikets','desglosados','Punto de venta'); 
        
    });

    

    function cargarHistorialDeVentas(div,id_movimiento){
             consultaFlujoEfectivoActual();
            $.get('php/punto_venta/consulta_ultimas_ventas.php', {id_movimiento:id_movimiento},
            function(data) {
               //console.log(data);
               var tabla = "<table id='tabla_ventas' class='table' style='width: 100%;'>" +
               "<thead>  <td>Concepto</td> <td>Usuario</td><td>Detalles</td><td>Fecha</td><td>Importe</td><td>Acciones</td></thead>"  +
               "<tbody></tbody>" +
               "</table>";
                 var total_ventas = 0;
                 $(div).html(tabla);
                if (data.success) { 
                    
                    $.each(data, function(index, record) {
    
                        if ($.isNumeric(index)) {
                           
                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            
                            var ver_detalles = "<button   data-id='"+record.id+"' class='ver_detalles_movimiento btn btn-primary'> <i class='fa fa-print'></i> Imprimir</button>";
                             
                            $("<td />").text(record.concepto).appendTo(row); 
                            $("<td />").text(record.usuario).appendTo(row); 
                            $("<td />").text(record.detalles).appendTo(row); 
                            $("<td />").text(record.fecha).appendTo(row); 
                            $("<td />").html('$' + record.costo_total).appendTo(row);  
                            $("<td />").html( ver_detalles).appendTo(row); 
                            total_ventas = total_ventas  + record.costo_total;
    
                            row.appendTo("#tabla_ventas");
                        }
                    });

                   var  total_efectivo = data.total_efectivo;

                $('#total_efectivo').html(total_efectivo.toFixed(2));    
                $('#total_ventas_corte').html(total_ventas.toFixed(2));
                $('#total_dinero').html((total_ventas + total_efectivo).toFixed(2));
                }else{
                    var row = $("<trrole='row' class='odd'/><h3>Sin ventas</h3></tr>"); 
                    row.appendTo("#tabla_ventas"); 
                    $('#total_ventas_corte').html(0);
                }
                $('#tabla_ventas').DataTable({
                    responsive: true
                });
            });
    
    
    }


    
    $('#cargarVentasActuales').on('click', function(){
        var div ="#div_ventas_corte";
        cargarHistorialDeVentas(div,'Ultimo');
    });

    $('#crearCorte').on('click', function(){
        var id_cajero = "este";
        generarcorte(id_cajero);

    });
    $('#btn-movimientos-efectivo-caja').on('click', function(){
        cargarListaSelectsCampos('php/inventarios/consulta_tipos_movimiento.php','#concepto_movimiento_efectivo',null,3,0);
        cargarListaSelects('php/users/consulta_usuarios.php','#usaurio_movimiento_efectivo',null);
        var div ="#div_tabla_movimientos_efectivo";
        var limite = $('#limite-moviemintos-efectivo').val();
        cargarTablaMovimientosEfectivo(div,limite)
    })
    $('#tipo_movimiento_efectivo').on('change', function () {
        var tipos = $(this).val();
        cargarListaSelectsCampos('php/inventarios/consulta_tipos_movimiento.php','#concepto_movimiento_efectivo',null,tipos,0);
    });    

    $('#registro_moviento_efectivo').on('click', function(){
        var form = '#form-efectivo';
        var url = 'php/punto_venta/movimiento_efectivo.php';
        var boton = '#registro_moviento_efectivo';
        var funcion = 'cargarMovimientosEfectivo';
        var id = "todos";
        registrarFormulario(form,url,boton,funcion,id);
    });
    



    function generarcorte(id_cajero) {
        $.get('php/punto_venta/corte_caja.php', {
                //fecha_nuevo_corte :fecha_nuevo_corte ,
                id_cajero: id_cajero
            },
            function(data) {
                console.log(data);
                if (data > 0) {

                    alert('El corte de caja se registro correctamente');
                    var limite = $('#limite_cortes').val();
                    cargarHistorialDeCortes(id_cajero,limite);
                    ImprimirCortesDeCaja(data);
                } else {
                    alert('Error en el registro');
                }
  
            });
      }


      $('#recargarCortes').on('click', function(){
        var limite = $('#limite_cortes').val();
        var id_cajero = "este";
        cargarHistorialDeCortes(id_cajero,limite);
      });

      function ImprimirCortesDeCaja(id_corte) {

        url = "php/formatos_impresion/imprimir_corte_caja.php";

        $.ajax({

            url: url,

            data: {
                id_corte: id_corte
            },

            type: 'post',

            success: function(datar) {
            
                //console.log(datar);
            
            var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

            var nombreDivImpresion = 'corteImpresionDiv' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre

            var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div

            $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.

            $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.

           $("#"+nombreDivImpresion).print(); //se invoca la impresion.

            $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.
                    

            }

        });

};

   
function ImprimirMovimientoEfectivo(id) {

    url = "php/formatos_impresion/imprimir_movimiento_efectivo.php";

    $.ajax({

        url: url,

        data: {
            id:id
        },

        type: 'post',

        success: function(datar) {

        var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

        var nombreDivImpresion = 'corteImpresionDiv' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre

        var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div

        $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.

        $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.

       $("#"+nombreDivImpresion).print(); //se invoca la impresion.

        $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.


        }

    });

};

$('#div_tabla_historial_cortes').on('click','.imprimir_corte', function () {
    var id = $(this).data('id');
    ImprimirCortesDeCaja(id);
  });

  $('#div_ventas_corte, #div_tabla_reportes_ventas, #tabla_reportes_ventas_producto').on('click','.ver_detalles_movimiento ', function () {
    var id = $(this).data('id');
    imprimirTiket(id);
  });

  

    function cargarHistorialDeCortes(id_cajero,limite_cortes){

        //reinicio del contenedor
        $("#div_tabla_historial_cortes").empty();
        var cargando = '<div class="jumbotron"> <h1>Cargando Cortes <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
        var tablacortes = '<table id="cortes_de_caja" class="table-hover table table-striped table-bordered dt-responsive  dataTable no-footer dtr-inline collapsed"  cellspacing="0"   role="grid" aria-describedby="example_info" style=" width: 100%;"><thead><tr role="row"><th>Usuario</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr></thead><tbody> </tbody></table>';
                    
        $(tablacortes).appendTo("#div_tabla_historial_cortes");
        $('#cortes_de_caja > tbody').html(cargando);
        $.ajax({
            url: 'php/punto_venta/consulta_cortes.php',
            type: 'get',
            data: { 
                id_cajero:id_cajero,
                limite_cortes:limite_cortes
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {

                  
                    $.each(data, function(index, record) {

                        if ($.isNumeric(index)) {
                            var boton_reeimprimir = '<button   data-id="' + record.id + '"   class="imprimir_corte btn btn-primary"> <i class="fa fa-print"></i> Imprimir</button>';
                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            $("<td />").text(record.nombreUsuario).appendTo(row);
                            $("<td />").text(record.fecha).appendTo(row);
                            $("<td />").html("$" + record.total).appendTo(row);
                            $("<td />").html(boton_reeimprimir).appendTo(row);
                            row.appendTo("#cortes_de_caja");
                        }
                    });


                }
                //tabla de enventos

                $('#cortes_de_caja').DataTable({
                    responsive: true
                });
            },

        });
    }

    $('#lectorCodigoBarras').on('change',function(){
        var id_articulo = ""; 
        var cantidad_articulo = 1;
        var costo_articulo = "precio"; 
        var tipo_producto = "";
        var codigoDeBarras = $('#lectorCodigoBarras').val();
        apartarArticulo(id_articulo,cantidad_articulo,costo_articulo,tipo_producto,'#tabla_tikets','desglosados','Punto de venta',codigoDeBarras); 

    });

    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();
    });

        //eliminar Apartados 
        $('#tabla_tikets').on('click','.eliminarApartado', function () {
            var id = $(this).data('id');
            var url = 'php/inventarios/borrar_articulo_apartado.php';
            var funcion = 'cargarTablaApartados'
            var tabla = "#tabla_tikets";
            var impuestos = "desglosados";
            eliminarElementoTablaApartados(id,url,funcion,tabla,impuestos,'no','usuarioActual');
        });

         //eliminar movimiento-efectivo
         $('#div_tabla_movimientos_efectivo').on('click','.btn-eliminar-movimeinto-efectivo', function () {
           
          
            var id = $(this).data('id');
            var url = 'php/punto_venta/borrar_movimiento_efectivo.php';
            var funcion = ' cargarMovimientosEfectivo'
            var mensaje = confirm("¿Realmente desea borrar el movimiento?");
          
            //Detectamos si el usuario acepto el mensaje
              if (mensaje) {
                eliminarElementoTabla(id,url,funcion,null);
       
                } else {
                alert("¡Ok, No se borrara!");
            }
        });

 //eliminar movimiento-efectivo
 $('#div_tabla_movimientos_efectivo').on('click','.imprimir-movimiento-efectivo', function () {
    var id = $(this).data('id');
    ImprimirMovimientoEfectivo(id);
});

       

        $('#reacargarTablaTickets').on('click', function(){
            cargarTablaApartados('#tabla_tikets','desglosados','no','usuarioActual');
        });


$('#registrar_venta').on('click', function(){
    
    var total = $('#total_pagar').val(); 
    if (total < 1){
        alert('Añada un producto primero');
        return;
    }
    var concepto_movimiento = $('#concepto_movimiento').val();
   
    var referencia_bancaria = $('#referencia_bancaria').val();

    if (concepto_movimiento == 6) {
        if (referencia_bancaria == "") {
            alert('Referencia bancaria requerida');
            return;
        }
    }

    
    $.post('php/inventarios/registar_movimiento.php', {
        tipos_movimiento:1,
        concepto_movimiento:concepto_movimiento,
        referencia_bancaria:referencia_bancaria,
        comentarios_movimiento:"Venta de Mostrador",
        total:total
       
       },
         function(data) { 
                console.log(data);
               if (data > 0) {
                cargarTablaArticulos('todos');
                cargarTablaApartados('#tabla_tikets','desglosados','no','usuarioActual');
                $("#tabla_movimientos").empty();
                total = 0;
                $('#total_movimiento').html('0.00');
                $('#pago_cliente, #pago_cliente_dolares, #cambio_cliente').val(0);
                imprimirTiket(data);
                 
               } else{
                alert('Hubo un error');
                cargarTablaArticulos('todos');
                cargarTablaApartados('#tabla_tikets','desglosados','no','usuarioActual');
                $("#tabla_movimientos").empty();
                total = 0;
                $('#total_movimiento').html('0.00');
               }
       
          });
});

$('#pago_cliente, #pago_cliente_dolares').on('change click keyup', function(){
    var total = $('#total_pagar').val();
    var pesos =  parseFloat($('#pago_cliente').val())|| 0;
    var dolares = parseFloat($('#pago_cliente_dolares').val())|| 0;
    var tipo_cambio = $('#tipo_cambio').val(); 

    var total_dolares= (dolares * tipo_cambio);
    var cambio = (parseFloat(total_dolares) + parseFloat(pesos)) - parseFloat(total);   
    console.log(total_dolares,pesos,cambio);
    $('#cambio_cliente').val(cambio);
});


//Imprimir Tiket

function imprimirTiket(id_movimiento){
     
    url = "php/formatos_impresion/tiket_venta.php";

    $.ajax({

        url: url,

        data: {
            id_movimiento: id_movimiento
        },

        type: 'post',

        success: function(datar) {

        var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

        var nombreDivImpresion = 'recibeImpresion' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre

        var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div

        $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.

        $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.

        $("#"+nombreDivImpresion).print(); //se invoca la impresion.

        $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.


        }

    });


}

function consultaFlujoEfectivoActual(){
   
    var id_movimiento = "Ultimo";
    var div = "#contendedorEfectivoCorte";
    $.get('php/punto_venta/consulta_ultimas_ventas.php', {id_movimiento:id_movimiento},
    function(data) {
       console.log(data);
       var tabla = "<table id='tabla_movimientos_efectivos_actuales' class='table' style='width: 100%;'>" +
       "<thead><td>Fecha</td><td>Administrador</td><td>Cajero</td><td>Tipo</td><td>Concepto</td><td>Importe</td><td>Acciones</td></thead>"  +
       "<tbody></tbody>" +
       "</table>"; 
        
         $(div).html(tabla);
        if (data.success) { 
            var movimientos = data.movimientos;
            $.each(movimientos, function(index, record) {

                if ($.isNumeric(index)) {
                   
                  
                   
                    var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                    
                    var imprimir = "<button   data-id='"+record.id+"' class='imprimir-movimiento-efectivo btn btn-primary'> <i class='fa fa-print'></i> Imprimir</button>";
                    
                    $("<td />").text(record.fecha).appendTo(row); 
                    $("<td />").text(record.nombre_admin).appendTo(row); 
                    $("<td />").text(record.nombre_cajero).appendTo(row); 
                    $("<td />").text(record.tipo).appendTo(row); 
                    $("<td />").text(record.concepto).appendTo(row);
                    $("<td />").text(record.cantidad).appendTo(row); 
                    $("<td />").html(  imprimir  ).appendTo(row);  

                    row.appendTo("#tabla_movimientos_efectivos_actuales");
                }
                
            });
 
        } 
        $('#tabla_movimientos_efectivos_actuales').DataTable({
            responsive: true
        });;
    });

}

      //guardar nuevo usuario
      $('#guardar_cliente').on('click', function() {
  
        registrarUsuario();
    
      });
      
});