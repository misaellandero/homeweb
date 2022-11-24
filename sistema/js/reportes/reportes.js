$('.timePiker').datetimepicker(
    
);
 
$('#li_reportes').on('click', function () { 

    //cargar Usuarios 
    cargarListaSelects('php/users/consulta_usuarios.php', '.usuariosReporte', "Todos");
    cargarListaSelects('php/users/consulta_usuarios.php', '.usuariosReporteProducto', "Todos");
    cargarListaSelectsCampos('php/inventarios/consulta_productos.php','.productosReporteProducto',"Todos","todos","Todos");
    cargarListaSelectsCampos('php/inventarios/consulta_articulos.php','.articulosReporteProducto',"Todos","todos","Todos");

});

$('#productosReporteProducto').on('change', function(){
    var id_producto = $(this).val();
    if (id_producto == 0) { 
        id_producto = "todos"; 
    } 
    cargarListaSelectsCampos('php/inventarios/consulta_articulos.php','#articulosReporteProducto',"Todos",id_producto,"Todos");

})
$('#reporteVentasPorUsuario').on('click', function(){
    
    $.post('php/reportes/reporte_ventas_usuario.php', $('#formReporteVentasUsuario').serializeArray(),
    function(data) {
       
       //console.log(data);
            
           var tabla  =
                '<table id="tabla_reportes_ventas" class="table" style="width: 100%;">'  
                +
               "<thead><td>#</td>  <td>Concepto</td> <td>Usuario</td><td>Detalles</td><td>Fecha</td><td>Importe</td><td>Acciones</td></thead>"  +
               "<tbody></tbody>" +
               "</table>";
            $('#div_tabla_reportes_ventas').html(tabla);

              var total_ventas = data['total'];
                
                    
                    $.each(data, function(index, record) {
    
                        if ($.isNumeric(index)) {
                           
                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            
                            var ver_detalles = "<button   data-id='"+record.id+"' class='ver_detalles_movimiento btn btn-primary'> <i class='fa fa-print'></i> Imprimir</button>";
                            $("<td />").text(record.id).appendTo(row); 
                            $("<td />").text(record.concepto).appendTo(row); 
                            $("<td />").text(record.usuario).appendTo(row); 
                            $("<td />").text(record.detalles).appendTo(row); 
                            $("<td />").text(record.fecha).appendTo(row); 
                            $("<td />").html('$' + record.costo_total).appendTo(row);  
                            $("<td />").html( ver_detalles).appendTo(row);  
    
                            row.appendTo("#tabla_reportes_ventas");
                        }
                    });
                  
                   $('#totalVentasReporte').html(parseFloat(total_ventas).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    
        $('#tabla_reportes_ventas').DataTable({
            responsive: true
        }); 
    });
});
           
function reporteVentas(form) {

    $.post('php/formatos_impresion/imprimir_reporte_ventas.php', $(form).serializeArray(),
    function(datar) { 
             //console.log(datar);
        
             var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

             var nombreDivImpresion = 'ReporteVentas' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre
     
             var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div
     
             $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.
     
             $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.
     
            $("#"+nombreDivImpresion).print(); //se invoca la impresion.
     
             $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.
              
    });
    
 

};


$('#imprimirReporteVentas').on('click', function(){
    var form = "#formReporteVentasUsuario";
    reporteVentas(form);
});


$('#reporteVentasPorProducto').on('click', function(){
    
    $.post('php/reportes/reporte_ventas_producto.php', $('#formReporteVentasProducto').serializeArray(),
    function(data) {
       
       //console.log(data);
            
           var tabla  =
                '<table id="tabla_reportes_ventas_producto" class="table datatable" style="width: 100%;">'  
                +
               "<thead>  <td>Producto</td> <td>Usuario</td><td>Tipo Movimiento</td><td>Fecha</td><td>Cantidad</td><td>Importe</td></thead>"  +
               "<tbody></tbody>" +
               "</table>";
            $('#div_tabla_reportes_ventas_producto').html(tabla);

              var total_ventas = data['total'];
              var totalVendido = data['totalCantidad']; 
                    $.each(data, function(index, record) {
    
                        if ($.isNumeric(index)) {
                           
                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            
                            var ver_detalles = "<button   data-id='"+record.id_movimiento+"' class='ver_detalles_movimiento btn btn-primary'> <i class='fa fa-print'></i> Imprimir</button>";
                             
                            $("<td />").text(record.nombre).appendTo(row); 
                            $("<td />").text(record.usuario).appendTo(row);  
                            $("<td />").text(record.concepto_movimiento).appendTo(row);
                            $("<td />").text(record.fecha).appendTo(row); 
                            $("<td />").text(record.cantidad).appendTo(row); 
                            $("<td />").html('$' + record.importe).appendTo(row);  
                            $("<td />").html( ver_detalles).appendTo(row);  
    
                            row.appendTo("#tabla_reportes_ventas_producto");
                        }
                    });
                  
                   $('#totalVentasReporteProducto').html(parseFloat(total_ventas).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                   $('#totalVendido').html(totalVendido);
        $('#tabla_reportes_ventas_producto').DataTable({
            responsive: true
        }); 
    });
});

function reporteVentasProducto(form) {

    $.post('php/formatos_impresion/imprimir_reporte_ventas_producto.php', $(form).serializeArray(),
    function(datar) { 
             //console.log(datar);
        
             var randomDivImpresion = Math.floor(Math.random()); //Numero aleatorio

             var nombreDivImpresion = 'ReporteVentasProducto' + randomDivImpresion; //Div temporal con numero aleatorio en el nombre
     
             var div_impresion = '<div id="' + nombreDivImpresion + '"></div>'; //codigo html del div
     
             $(div_impresion).appendTo('body'); //se agrega al elemento body, para hacerlo funcional.
     
             $("#" + nombreDivImpresion).html(datar); //se asigna la pagina que viene desde el servidor.
     
            $("#"+nombreDivImpresion).print(); //se invoca la impresion.
     
             $("#"+nombreDivImpresion).remove(); //se remueve el div temporal despues de la impresion.
              
    });
    
 

};


$('#imprimirReporteVentasProducto').on('click', function(){
    var form = "#formReporteVentasProducto";
    reporteVentasProducto(form);
});