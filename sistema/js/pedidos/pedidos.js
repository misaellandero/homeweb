$(document).ready(function(){

    
    $('#li_pedidos').on('click', function () {
        cargarPedidos();
        cargarHistorialPedidos('#div_historial_pedidos','Todos');
      });

    function cargarPedidos(){
        //reinicio del contenedor
        $("#div_tabla_pedidos").empty();
        var cargando = '<div class="jumbotron"> <h1>Sin Pedidos   </h1> <p>Por favor espere antes de volver a recargar...</p>  </div>';
        var table_Usuarios = "<table id='tablaPedidos' width='100%' class='table responsive'> <thead><tr>" +
         "<th><i class='fa fa-user'></i> Usuario</th>"+  
         "<th><i class='fa fa-truck'></i> Estado</th>"+ 
         "<th><i class='fa fa-gear'></i> Acciones</th>"+ 
         "</tr></thead><tbody></tbody> </table>";
        $(table_Usuarios).appendTo("#div_tabla_pedidos");
        $('#tablaPedidos > tbody').html(cargando);
        $.ajax({
            url: 'php/pedidos/consulta_pedidos.php',
            type: 'post',
            data: { 
            },
            dataType: 'json',
            success: function(data) {
                //console.log(data);
                if (data.success) {
                    var cargando = '<div class="jumbotron"> <h1>Cargando Pedidos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere antes de volver a recargar...</p>  </div>';
                    $('#tablaPedidos > tbody').html(cargando);
                    $.each(data, function(index, record) {
                        if ($.isNumeric(index)) {
                            var row = $("<tr role='row' class='odd'/>");

                            var editar = '<button type="button" data-toggle="modal"  data-target="#modal-ver-pedido" class="boton-editar-pedido btn btn-secondary" data-id=' + record.id + '> <i class="fa fa-spin fa-gear"></i> Editar</button>';
                            
                            var cancelar = "";
                            
                            var acciones = cancelar + editar;
                            
                            if (record.status_id == 3) {
                                var total = 'Pedido pagado';
                            } else{
                                var total = '$' + record.total;

                            }

                            
                            
                           $("<td />").html(record.nombre).appendTo(row); 
                          // $("<td />").html(total).appendTo(row); 
                           $("<td />").html(record.estatus).appendTo(row); 
                           $("<td />").html(acciones).appendTo(row); 
      
                          row.appendTo("#tablaPedidos");
      
      
      
      
                        }
      
                    });
                }else{
                    
        
                }
                //tabla de enventos
      
                 $('#tablaPedidos').DataTable({
                    responsive: true
                });
            },
      
        });
    
      };

//editar pedido
$('#div_tabla_pedidos').on('click','.boton-editar-pedido', function(){

 var id = $(this).data('id');
 $('#id_usaurio_pedido').val(id);
    consultaPedido(id);
});

$('#div_historial_pedidos').on('click','.boton-editar-pedido', function(){
    var id = $(this).data('id');
    var id_pedido = $(this).data('id-pedido');
    $('#id_usaurio_pedido').val(id);
    consultaPedidoEnviado(id,id_pedido);
   });
   


    $('#enviarDatosPaqueteria').on('click', function(){
        var empresa_envios = $('#empresa_pedido_pedido').val();
        var costo_envios = $('#costo_envio_pedido').val(); 
        var id_usuario_pedido = $('#id_usuario_pedido').val();
        var notas =  $('#notas_pedido').val();
        var status = 2;
        console.log(empresa_envios,costo_envios);
        if (empresa_envios == ""){
            alert('Se riqueire un nombre de empresa');   
        }else{ 
            if (costo_envios < 0 ){
                alert('Ingrese el valor del envio'); 
            } else{ 
                crearPedido(id_usuario_pedido,empresa_envios,costo_envios,notas,status);
            }
        }
    });

    function crearPedido(id_usuario_pedido,empresa_envio,costo_envio,notas,status){

        $.ajax({
            type : 'POST',
            url  : 'php/pedidos/crear_pedido.php',
            data : {
                    id_usuario_pedido:id_usuario_pedido,
                    empresa_envio:empresa_envio,
                    costo_envio:costo_envio,
                    notas:notas,
                    status:status

            
            },
            beforeSend: function()
            {
            },
            success :  function(response)
            {
                alert(response);
             if (response == "Pedido aprobado, estatus actualizado en espera de pago."){
                consultaPedido(id_usuario_pedido);
                cargarPedidos(); 
                cargarHistorialPedidos('#div_historial_pedidos','Todos');

                }
            }
    
            });

    }

  
  $('#actualizarDatosEnvio').on('click', function(){
      var form = $('#datos_envio_pedido');
      var url = "php/pedidos/actualizar_datos_envio.php";
      var boton ='#actualizarDatosEnvio';
      var funcion = "consultaPedido";
      var id = $('#id_usuario_pedido').val();
      registrarFormulario(form,url,boton,funcion,id); 
  });
    
  $('#actualizarDatosEnvioEnviado').on('click', function(){
    var form = $('#datos_envio_pedido');
    var url = "php/pedidos/actualizar_datos_envio.php";
    var boton ='#actualizarDatosEnvio';
    var funcion = "consultaPedidoEnviado";
    var id = $('#id_usuario_pedido').val();  
    registrarFormulario(form,url,boton,funcion,id); 
 
});

$('#cancelarPedido').on('click', function(){

    var bool=confirm("Seguro desea cancelar el pedido");
    if(bool){
        var form = $('#datos_envio_pedido');
        var url = "php/pedidos/actualizar_datos_envio.php";
        var boton ='#actualizarDatosEnvio';
        $('#status_pedio').val(5);
        var funcion = "onsultaPedido";
        var id = $('#id_usuario_pedido').val();  
        registrarFormulario(form,url,boton,funcion,id); 
    }else{
        alert("cancelo la solicitud");
      }
 
});


$('#cancelarPedidoEnviado').on('click', function(){
    var bool=confirm("Seguro desea cancelar el pedido");
    if(bool){
    var form = $('#datos_envio_pedido');
    var url = "php/pedidos/actualizar_datos_envio.php";
    var boton ='#actualizarDatosEnvio';
    $('#status_pedio').val(5);
    var funcion = "consultaPedidoEnviado";
    var id = $('#id_usuario_pedido').val();  
    registrarFormulario(form,url,boton,funcion,id); 
    }else{
        alert("cancelo la solicitud");
    }
});
  

  $('#enviarNumeroGuia').on('click', function(){
    var form = $('#datos_envio_pedido');
    var url = "php/pedidos/actualizar_datos_envio.php";
    var boton ='#actualizarDatosEnvio';
    $('#status_pedio').val(4);
    var id = $('#id_usuario_pedido').val(); 
    $('#id_usaurio_pedido').val(id);
    var funcion = "consultaPedido";
    registrarFormulario(form,url,boton,funcion,id); 
    
  })



  function cargarHistorialPedidos(contenedor,filtro){
    //reinicio del contenedor
    $(contenedor).empty();
    var cargando = '<div class="jumbotron"> <h1>Cargando Pedidos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
    var table_Usuarios = "<table id='tablaHistorialPedidos' width='100%' class='table responsive'> <thead><tr>" +
     "<th><i class='fa fa-user'></i> Usuario</th>"+ 
     "<th><i class='fa fa-money'></i> Importe</th>"+ 
     "<th><i class='fa fa-truck'></i> Estado</th>"+ 
     "<th><i class='fa fa-gear'></i> Acciones</th>"+ 
     "</tr></thead><tbody></tbody> </table>";
    $(table_Usuarios).appendTo(contenedor);
    $('#tablaHistorialPedidos > tbody').html(cargando);
    $.ajax({
        url: 'php/pedidos/consulta_historial_envios.php',
        type: 'post',
        data: {filtro:filtro},
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            if (data.success) {
                $.each(data, function(index, record) {
                    if ($.isNumeric(index)) {
                        var row = $("<tr role='row' class='odd'/>");

                        var editar = '<button type="button" data-toggle="modal"  data-target="#modal-ver-pedido" class="boton-editar-pedido btn btn-secondary" data-id-pedido=' + record.id + ' data-id=' + record.id_cliente + '> <i class="fa fa-spin fa-gear"></i> Editar</button>';
                        
                        var cancelar = "";
                        
                        var acciones = cancelar + editar;
                        

                       $("<td />").html(record.nombre).appendTo(row); 
                       $("<td />").html('$' + record.total +" (envio $" + record.costo_envio + ")").appendTo(row); 
                       $("<td />").html(record.pedido).appendTo(row); 
                       $("<td />").html(acciones).appendTo(row); 
  
                      row.appendTo("#tablaHistorialPedidos");
   
                    }
  
                });
            }
            //tabla de enventos
  
             $('#tablaHistorialPedidos').DataTable({
                responsive: true
            });
        },
  
    });

  };


$('.actulizar_tablas_pedidos').on('click', function(){
    cargarPedidos(); 
    cargarHistorialPedidos('#div_historial_pedidos','Todos');
})


});


