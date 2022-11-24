$('#li_facturacion').on('click', function () { 
    $('#lista_clientes_para_facturar').hide();
    $('#direccion_fiscal').hide();
    $('#buscar_venta').hide();
    $('#crear_aparir_de_venta').prop("checked", false);
    $('#tipo_add_elemtos_factura').prop("checked", true);
    $('#tax-included-false').hide();  
    $('.elemento-desde-nuevo').hide('slow'); 
    //cargar Usuarios 
    cargarListaSelects('php/users/consulta_usuarios.php', '.usuariosReporte', "Todos");
    cargarListaSelects('php/users/consulta_usuarios.php', '.usuariosReporteProducto', "Todos");
    cargarListaSelectsCampos('php/inventarios/consulta_productos.php','.productosReporteProducto',"Todos","todos","Todos");
    cargarListaSelectsCampos('php/inventarios/consulta_articulos.php','.articulosReporteProducto',"Todos","todos","Todos");

});


$('#BuscarVentasPorUsuario').on('click', function(){
     $.post('php/reportes/reporte_ventas_usuario.php', $('#formBuscarVentasUsuario').serializeArray(),
    function(data) {
       
      // console.log(data);
            
           var tabla  =
                '<table id="tabla_reportes_ventas_f" class="table" style="width: 100%;">'  
                +
               "<thead><td>#</td>  <td>Concepto</td> <td>Usuario</td><td>Detalles</td><td>Fecha</td><td>Importe</td><td>Acciones</td></thead>"  +
               "<tbody></tbody>" +
               "</table>";
            $('#div_tabla_buscar_ventas_factura').html(tabla);

              var total_ventas = data['total']; 
                    $.each(data, function(index, record) {
    
                        if ($.isNumeric(index)) {
                           
                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            
                            var ver_detalles = "<button  data-id='"+record.id+"' class='buscar-elementos-movimiento btn-factura btn btn-info btn-cargar'><i class='fab fa-searchengin'></i> Validar</button>";
                            $("<td />").text(record.id).appendTo(row); 
                            $("<td />").text(record.concepto).appendTo(row); 
                            $("<td />").text(record.usuario).appendTo(row); 
                            $("<td />").text(record.detalles).appendTo(row); 
                            $("<td />").text(record.fecha).appendTo(row); 
                            $("<td />").html('$' + record.costo_total).appendTo(row);  
                            $("<td />").html( ver_detalles).appendTo(row);  
    
                            row.appendTo("#tabla_reportes_ventas_f");
                        }
                    });
                  
        $('#tabla_reportes_ventas_f').DataTable({
            responsive: true
        }); 
    });
});

    $('#mostrar_clientes_para_facturar').on('change', function () {

        if ($(this).prop('checked')) {
        
           $(this).val(1);
           var mostrar_clientes_tambien = $(this).val();
           var data = {mostrar_clientes : mostrar_clientes_tambien};
           var url = 'php/users/consulta_usuarios.php';
           var selectDeDestino = "#lista_clientes_para_facturar";
           var valorinicial = 'Elije un cliente';
           cargarListaSelectsConCondicion(url,selectDeDestino,valorinicial,data);
           $('#lista_clientes_para_facturar').show();
        } else{
            $(this).val(0);
            $('#lista_clientes_para_facturar').hide();
        }
       
  
      });


      $('#lista_clientes_para_facturar').on('change', function(){

        var id = $(this).val();

        $.post('php/users/consulta_permisos.php', {
            id: id
        },
        function(respuesta) { 
            $('#mail-factura').val(respuesta[0]["mail"]); 
            $('#razon_social-factura').val(respuesta[0]["razon_social"]);
            $('#rfc-factura').val(respuesta[0]["rfc"]); 
        });

        $.post('php/users/consulta_direccion_usuario.php', {
            id: id
        },
        function(respuesta) { 
                $('#cp-factura').val(respuesta[0]["cp"]);
                $('#estado-factura').val(respuesta[0]["estado"]);
                $('#ciudad-factura').val(respuesta[0]["ciudad"]);
                $('#calle-factura').val(respuesta[0]["calle"]);
                $('#nexterior-factura').val(respuesta[0]["nexterior"]);
                $('#ninterior-factura').val(respuesta[0]["ninterior"]);
                $('#colonia-factura').val(respuesta[0]["colonia"]);
                $('#calle-factura').val(respuesta[0]["calle"]);
                $('#dir_usuario_nexterior').val(respuesta[0]["nexterior"]);
                $('#dir_usuario_ninterior').val(respuesta[0]["ninterior"]); 
                $('#municipio-factura').val(respuesta[0]["municipality"]);
                $('#pais-factura').val(respuesta[0]["country"]); 
              
        });

      })


    $('#dirección_para_facturar').on('change', function () {

        if ($(this).prop('checked')) {
            $(this).val(1);
            $('#direccion_fiscal').show('slow');
        } else{
            $(this).val(0);
            $('#direccion_fiscal').hide('slow');
        }
       
  
      });


    $('#crear_aparir_de_venta').on('change', function () {

        if ($(this).prop('checked')) {
            $(this).val(1);
            $('#buscar_venta').show('slow');
        } else{
            $(this).val(0);
            $('#buscar_venta').hide('slow');
        }
       
  
      });

      // impuestos includios
      $('#tax_included').on('change', function () {
        var des_total = '#total-factura'; 

        if ($(this).prop('checked')) {
            $(this).val(true);
            $('#tax-included-true').show('slow'); 
            $('#tax-included-false').hide('slow');
            recalcularTotalImpuestos(true,des_total);
           
        } else{
            $(this).val(false);
            $('#tax-included-false').show('slow'); 
            $('#tax-included-true').hide('slow');
            recalcularTotalImpuestos(false,des_total);
        }
        
      });

      //cargar elementos de factura apartir de venta
      $('#buscar-elementos-movimiento').on('click', function(){
        
        $('#tax_included').prop("checked", true);
         $('#tax_included').val(true);
         $('#tax-included-true').show('slow'); 
         $('#tax-included-false').hide('slow');

          var id_movimiento = $('#id-movimiento-para-facturar').val();
          var tabla = '#tabla-elementos-factura';
          var des_total = '#total-factura'; 
          cargarTablaElementosMovimientoFactura(id_movimiento,tabla,des_total); 
      });

      $('#div_tabla_buscar_ventas_factura').on('click','.buscar-elementos-movimiento', function(){
        
        $('#tax_included').prop("checked", true);
         $('#tax_included').val(true);
         $('#tax-included-true').show('slow'); 
         $('#tax-included-false').hide('slow');

          var id_movimiento = $(this).data('id');
          $('#id-movimiento-para-facturar').val(id_movimiento);
          var tabla = '#tabla-elementos-factura';
          var des_total = '#total-factura'; 
          cargarTablaElementosMovimientoFactura(id_movimiento,tabla,des_total); 
      });

      
      $('#tabla-elementos-factura').on('click','.eliminarElementoFactura', function () {
        var td = $(this).parent();
        var tr = $(td).parent();  
        tr.remove();
        var des_total = '#total-factura';
        if ($('#tax_included').prop('checked')) {  
            recalcularTotalImpuestos(true,des_total);
        
        } else{ 
            recalcularTotalImpuestos(false,des_total);
        }

      });
       
      function recalcularTotalImpuestos(impuestoIncluidos,des_total){
          var total_iva = 0
          var total_ieps = 0
          var total_isr = 0
          var totalSinImpuestos = 0
          var total = 0

         
            $('#tabla-elementos-factura > tbody  > tr').each(function(){
              
                var row = $(this);
                var iva = row.data('iva');
                var isr = row.data('isr');
                var ieps  = row.data('ieps');
                var subtotal = row.data('subtotal');
                
                total_iva += iva;
                total_isr += isr;
                total_ieps += ieps;
                totalSinImpuestos += subtotal;
                total += iva + isr + ieps + subtotal;
               
               }); 

                $(des_total).html(totalSinImpuestos); 
                $(des_total + "-input").val(totalSinImpuestos);
                $(des_total + "-IVA").html(total_iva); 
                $(des_total + "-ISR").html(total_isr); 
                $(des_total + "-IEPS").html(total_ieps);  
                if (impuestoIncluidos) {
                    $(des_total + "-con-impuestos").html(totalSinImpuestos);
                } else { 
                    $(des_total + "-con-impuestos").html(total);
                }

             
          }

          $('#div_buscador_factura').on('change keyup click', 'input, select', function () {
            var form = '#div_buscador_factura';
            console.log(form);
            var selectDeDestinos = ".contenedor_articulos_buscados_lg"; 
            buscadorArticulos(form,selectDeDestinos,'#divTablaFactura');
            });

            $('#divTablaFactura').on('click', '.btn-add-elemento-factura', function(){
                var id = $(this).data('id');
                alert(id); 
            });


            $('#tipo_add_elemtos_factura').on('change', function () {
             
                if ($(this).prop('checked')) {
                    $(this).val(true); 

                    $('.elemento-desde-sistema').show('slow'); 
                    $('.elemento-desde-nuevo').hide('slow'); 

                } else{
                    $(this).val(false);  
                    $('.elemento-desde-nuevo').show('slow'); 
                    $('.elemento-desde-sistema').hide('slow'); 
                }
                
              });