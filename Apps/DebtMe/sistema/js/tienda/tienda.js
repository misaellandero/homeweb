$(document).ready(function() {
  
  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

  cargarTablaApartados('#tabla_tikets','nodesglosados','Si','usuarioActual'); 
  var id_usuario = "mismo_login";
  var id_pedido = "no_se";
  var tienda = "Si";
  var tipo_tienda = $('#tipo_tienda').val();
  if (tipo_tienda == "true") {
    var modo_slider = true;
  } else {
    var modo_slider = false;
  }
 var reseña_mode = $('#reseña-mode').val();
  
 
  cargarDireccionesUsuario(id_usuario,"Si");

  cargarDatosDelEnvio(id_usuario,id_pedido,tienda);
  var producto_buscado = $('#producto_bsucar').val();

  if (producto_buscado > 0 ) { 
    $('#modal_ver_articulos').modal('show');

    var id_articulo = producto_buscado;
    var div_destino = "#datos-extras-articulo";
    var div_destino_img = "#contenedor-imagenes";
    var tienda = "Si"
    var editable = "No";
    $('#id_articulo').val(id_articulo);

    cargarDatosArticulo(id_articulo,div_destino,editable);
    cargarImagenesModal(id_articulo,div_destino_img,tienda)  
  }

  var total = $('#total_mas_envio_paypal').val();
  var totalNormal = $('#total_mas_envio_paypal_normal').val();
  calcularMeses((total - (total * .1566)),1,'#1p');
  calcularMeses(total,3,'#3m');
  calcularMeses(total,6,'#6m');
  calcularMeses(total,9,'#9m');
  calcularMeses(total,12,'#12m'); 
  function cargarPQ(){ 
 
  
    $.get('sistema/php/configuracion/consulta_pq_comprar.php', {},
    function(data) {
      var apartados = "";  
        if (data.success) {
            $.each(data, function(index, record) {
                
                if ($.isNumeric(index)) {
                 if (record.id > 0) {

                  var tajeta = '<div class="col-sm-3">'+record.html+'</div>'; 
                
                 apartados = apartados + tajeta;
                 
                }

                }

            });
        
            $('#pq_comprar').html(apartados);

        } 

      
    });
}
cargarPQ();
 
  $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();

      if (scroll < 30) {
        $('#logo').fadeTo(100).attr("src",'sistema/images/icono');
        $('#logo').attr("width",150 + (-scroll));
      } else{
        $('#logo').fadeTo(100).attr("src",'sistema/images/logo');  
      }
  });
  
  $('body').on('click','.btn-cerrar-busqueda', function(){ 
    $('#resultados_busqueda').empty();
  });

  $(document).mouseup(function(e) 
{
    var container = $("#resultados_busqueda");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      $('#resultados_busqueda').empty();
    }
});

  $('#resultados_busqueda').on('click','.btn-cerrar-busqueda', function(){ 
    $('#resultados_busqueda').empty();
  });

  $('.NoVisibleEnTienda').hide();

  function cargarProductosBotones(){ 
    var lista = '';
    var tabs = '';
    $.get('sistema/php/inventarios/consulta_productos.php',
    function (respuesta) { 
      $.each(respuesta, function(key, value) {

          if (value.nombre == null) {

          } else {
            lista +=  '<a data-id="'+ value.id +'" class="nav-link lista_productos btn btn-outline-primary" id="v-pills-'+ value.id +'-tab" data-toggle="pill" href="#v-pills-' + value.id +'" role="tab" aria-controls="v-pills-' + value.id +'" aria-selected="true">' + value.nombre + '</a>';
            tabs += '	<div class="tab-pane fade show row" id="v-pills-'+ value.id +'" role="tabpanel" aria-labelledby="v-pills-'+ value.id +'-tab"> Parace que no tenemos trabajos en esta categoria.</div>';
             
          }

      }); 
      $('#v-pills-tab').html(lista); 
      $('#v-pills-tabContent').html(tabs); 
      
    });
  }

    cargarProductosBotones();

    $('#v-pills-tab').on('click','.lista_productos', function(){
      var id = $(this).data('id');
      var selectDeDestino = '#v-pills-' + id ;
      cargarArticulosPorCategoria(selectDeDestino,id,tipo_tienda);
    });
 
   

    
    function cargarSobreNosotros(){  
                    $.get('sistema/php/configuracion/consulta_sobre_nosotros.php', {},
                    function(data) {
                      var apartados = "";  
                        if (data.success) {
                          
                            $.each(data, function(index, record) {
                                
                                if ($.isNumeric(index)) {
                                 if (record.id > 0) {

                                  var tajeta = '<div class="card">'
                                  + ' <div class="card-header" data-toggle="collapse" data-target="#collapse'+record.id+'" aria-expanded="true" aria-controls="collapse'+record.id+'">'
                                     + '<h5 class="mb-0">'
                                      + ' <button class="btn btn-link" >'
                                       + record.titulo
                                       + '</button>'
                                    + ' </h5>'
                                  + ' </div>'
                 
                                  + ' <div id="collapse'+record.id+'" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" style="">'
                                     + '<div class="card-body">'
                                     + record.texto
                                     + '</div>'
                                  + ' </div>'
                                + ' </div>'; 
                                
                                 apartados = apartados + tajeta;
                                 
                                }

                                }

                            });
                        
                            $('#accordion').html(apartados);
                
                        } 
                
                      
                    });
    }
    function cargarSliders(){ 
      var sliders = "";
      var indicadores = "";    
                    $.get('sistema/php/configuracion/consulta_sliders.php', {},
                    function(data) {
                        if (data.success) {
                          var contador = 0;
                            $.each(data, function(index, record) {
                                
                                if ($.isNumeric(index)) {
                                  if (contador == 0) {
                                    var activado = "active";
                                    var indicador = '<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>';
                                    
                                  } else{
                                    var activado = " ";
                                    var indicador = '<li data-target="#carouselExampleCaptions" data-slide-to="'+contador+'" class=""></li>';
                                   
                                  }
                                  var video = record.video;

                                  if (video == 'No') {
                                    var img = '<img src="sistema/images/images_carousel/'+record.img+'" style="object-fit:cover;  min-height: 500px; max-height: 500px;" class="d-block w-100" alt="'+record.titulo+'">';
                                  
                                   
                                  } else{
                                    var img = '<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"  style="object-fit:cover;  min-height: 500px; max-height: 500px;" class="d-block w-100">'
                                                + ' <source src="sistema/images/images_carousel/'+video+'" type="video/mp4">'
                                                 + ' </video>';
                                  }

                                  var slider =  '<div  class="carousel-item '+activado+'">'
                                  + img
                                  + '<div class="banner-content carousel-caption">'
                                  + '<h3 style="font-size: 2.2vw;" class="d-none d-lg-block text-uppercase"> '+record.texto+'</h3>'
                                  + '<h1 style="font-size: 6vw;">'
                                  + record.titulo
                                  + '</h1>'
                                  + record.boton
                                  + '</div>'
                                  + '</div>';

                                  
                                  sliders = sliders + slider;
                                  indicadores = indicadores + indicador;
                                  contador = contador + 1;
                                }
                            });
                            
                       
                            $('#carousel').html(sliders);
                            $('#indicadores').html(indicadores);
                
                        } 
                
                      
                    });
    }

    function cargarReseñas(modo){ 
      var sliders = "";    
                    $.get('sistema/php/configuracion/consulta_reseñas.php', {},
                    function(data) {
                        if (data.success) {
                          var contador = 0;
                            $.each(data, function(index, record) {
                                
                                if ($.isNumeric(index)) {

                                  if (contador == 0) {
                                    var activado = "active";
                                    
                                  } else{
                                    var activado = " ";
                                   
                                  } 

                                  if(modo) { 

                                    var slider = '<div  class="carousel-item '+activado+'">'           
                                               + '<div class="row single-review">'
                                               + '<div class="col-4">'
                                               + '<img src="sistema/images/images_reseñas/'+record.img+'" class="img-fluid rounded-circle img" width="100%" alt="">'
                                               +  '</div>'
                                               + '<div class="col-6">'
                                               +  '<h4>'+record.nombre+'</h4>'
                                               + '<a href="#" class="info circle detalles-producto" data-id="'+record.id_articulo+'" data-toggle="modal" data-target="#modal_ver_articulos"><i class="fa fa-mobile"></i> '+record.nombre_articulo+'</a>'
                                               +  '<h5></h5>'
                                               +  '<p>'
                                               + record.opinion
                                               + '</p>'
                                               + '<div class="star">'
                                               + record.estrellas    
                                               +'</div>'
                                               +'</div>' 
                                               +'</div>' 
                                               + '</div>';
                                  } else {
                                    var slider = '<div class="col-lg-4 col-md-6">'
                                               + '<div class="single-review">'
                                               + '<img src="sistema/images/images_reseñas/'+record.img+'" class="img-fluid rounded-circle img" width="20%" alt="">'
                                               +  '<h4>'+record.nombre+'</h4>'
                                               +  '<p>'
                                               + record.opinion
                                               + '</p>' 
                                               + '<div class="star">'
                                               + record.estrellas    
                                               +'</div>'
                                               +'</div>' 
                                               + '</div>'; 
                                  }

                                  
                                  sliders = sliders + slider; 
                                  contador = contador + 1;
                                }
                            });
                            
                       
                            $('#reseñas').html(sliders); 
                
                        } 
                
                      
                    });
    }
    //cargar los productos destacados
    cargarArticulosDestacados('#productos-destacados',1,tipo_tienda);   
    
    cargarArticulosDestacados('#productos-destacados-tienda',1,tipo_tienda); 
    cargarArticulosDestacados('#productos-oferta',2,tipo_tienda);
    cargarListaSelects('sistema/php/inventarios/consulta_productos.php','.listaProductos', 'todos');
    $('.buscador_tienda').val(1);
    cargarHistorialPedidos('#div_tabla_pedidos','todos');
    cargarTablaApartados('#tabla_tikets','nodesglosados','Si','usuarioActual');
    cargarTablaApartados('.tabla_articulos_pedido_bolsa','nodesglosados','Si','usuarioActual','noEditable');
    $('#reacargarTablaTickets').on('click', function(){
    cargarTablaApartados('#tabla_tikets','nodesglosados','Si','usuarioActual','Editable');
    cargarTablaApartados('.tabla_articulos_pedido_bolsa','nodesglosados','Si','usuarioActual','noEditable');
    
    });
    //detalle de un producto

    $('#pq_comprar, #reseñas, #carouselExampleCaptions, #productos-destacados, #resultados_busqueda, #v-pills-tabContent, #productos-oferta, #productos-destacados-tienda').on('click', '.detalles-producto', function(){
        var id_articulo = $(this).data('id');
        var div_destino = "#datos-extras-articulo";
        var div_destino_img = "#contenedor-imagenes";
        var tienda = "Si"
        var editable = "No";
        $('#id_articulo').val(id_articulo);

        cargarDatosArticulo(id_articulo,div_destino,editable);
        cargarImagenesModal(id_articulo,div_destino_img,tienda)  
    })

       //Apartar articulo
    $('#modal-detalles-añadir-producto').on('click', function(){
        
        var id_articulo = $('#id_articulo').val(); 
        var cantidad_articulo = 1;
        var costo_articulo = "precio"; 
        var tipo_producto = $('#compuesto_articulo').val(); 
        apartarArticulo(id_articulo,cantidad_articulo,costo_articulo,tipo_producto,'#tabla_tikets','No','Si','NO'); 

    });

  
    $('#div_buscador').on('change keyup click', 'input, select', function () {
        var form = '#div_buscador';
        var selectDeDestinos = "#resultados_busqueda"; 
        buscadorArticulos(form,selectDeDestinos,'producto');
        });


    $('#actualizar_datos').on('click', function(){
      var form = '#datosDelUsuario';
        var url = 'sistema/php/users/actualizar_usuarios.php';
        var boton = '#actualizar_datos';
        var funcion = " ";
        registrarFormulario(form, url, boton,funcion);
    })    

          
    //Apartar articulo
    $('body').on('click','.bnt-add-a-ticket', function(){
        var id_articulo = $(this).data('id'); 
        var cantidad_articulo = 1;
        var costo_articulo = "precio"; 
        var tipo_producto = $(this).data('compuesto');
        apartarArticulo(id_articulo,cantidad_articulo,costo_articulo,tipo_producto,'#tabla_tikets','No','Si'); 

    });

    function registrarDireccionForm(form,url,boton) {

      var data = $(form).serialize();
      //console.log('Hasta aqui funciona');
      //console.log(data);
      var boton_data = $(boton).html();
      $.ajax({
          type : 'POST',
          url  : url,
          data : data,
          beforeSend: function()
          {
           $(boton).html('Procesando...');
          },
          success :  function(response)
             {
               alert(response);
               $(boton).html(boton_data);
               
                cargarDireccionesUsuario(id_usuario,"Si");
              }
    
          });
    }

    $('#registrar_dir').on('click', function(){
        var form = '#DirDelUsuario';
        var url = 'sistema/php/users/registrar_dir_usuario.php';
        var boton = '#registrar_dir';
        var funcion = "recargarPagina";
        //location.reload();
       
        registrarDireccionForm(form, url, boton);

    });

    $('#actualizar_dir').on('click', function(){ 
        var form = '#DirDelUsuario';
        var url = 'sistema/php/users/actualizar_dir_usuario.php';
        var boton = '#actualizar_dir';
        var funcion = "recargarPagina";
        registrarFormulario(form, url, boton,funcion); 
        //location.reload();
    });

      //eliminar Apartados 
      $('#tabla_tikets').on('click','.eliminarApartado', function () {
        var id = $(this).data('id');
        var url = 'php/inventarios/borrar_articulo_apartado.php';
        var funcion = 'cargarTablaApartados'
        var tabla = "#tabla_tikets";
        var impuestos = "no";
        eliminarElementoTablaApartados(id,url,funcion,tabla,impuestos,'Si','usuarioActual');
    });

 

    //crear pedido
    $('.crearPedido').on('click', function(){ 
        actualizarEstatus(1,'Si');
    })

 var input_produccion = $('#produccion').val();
 var ambiente = "sandbox"; 
 if (input_produccion == 1) {
    ambiente = "production";
 } else {
    ambiente = "sandbox";
 }

 var statusPedido = $('#pedido').val();
 
/*
 if (statusPedido == 1) {
  new PNotify({
    title: 'Pedido en revisión',
    text: 'Tu pedido esta siendo revisado por nuestros vendedores, en cuanto sea aprovado te avisaremos para que puedas pagarlo.',
    type: 'info',
    styling: 'fontawesome' 
});
 }else if (statusPedido == 2) {
  new PNotify({
    title: '¡Pedido Aceptado!',
    text: 'Tu pedido ya ha sido aceptado, se suministro el costo de envio, paga pronto para que tu envio salga lo antes posible.',
    type: 'success',
    styling: 'fontawesome' 
});
 } else if (statusPedido == 3) {
  new PNotify({
    title: '¡Pago Aceptado!',
    text: 'Tu pago ha sido aceptado, te enviaremos tu numero de guia en cuanto este disponible.',
    type: 'success',
    styling: 'fontawesome' 
});
}else {

}*/
 /*
var openpayId = $('#openpay-id').val();
var openpayPublic = $('#openpay-public').val();
 
 

if (ambiente == 'sandbox') {
    console.log('MODO PRUEBAS'); 
    

  // IMPORTANTE!!!!! Modo Pruebas Activado
  console.log('Modo de pruebas activado');
  OpenPay.setId(openpayId);
  OpenPay.setApiKey(openpayPublic);
  OpenPay.setSandboxMode(true);


} else{
  
  // IMPORTANTE!!!!! Modo producción Activado
  console.log('ATENCION MODO PRODUCCION ACTIVO'); 
   OpenPay.setId(openpayId);
   OpenPay.setApiKey(openpayPublic);
   OpenPay.setSandboxMode(false);

    
}

//openpay 

var deviceSessionId = OpenPay.deviceData.setup();
$('#btn-pagar').on('click', function(event) {
   event.preventDefault();
   $("#btn-pagar").prop( "disabled", true);
   OpenPay.token.extractFormAndCreate('payment-form', success_callbak, error_callbak);
});

var success_callbak = function(response) {
  var token_id = response.data.id;
  $('#token_id').val(token_id);
  var meses = $('#meses_openpay').val();

   $.ajax({
       type : 'POST',
       url  : 'sistema/php/pago/ejecutar_pago_openpay.php',
       data : "token_id=" + token_id + "&device_session=" + deviceSessionId + "&meses=" + meses ,
       success :  function(response)
         {

              $("#btn-pagar").prop("disabled", false);
              if (response === 'Tu orden fue procesada con exito. Revisa en tu Perfil.') {
                  
                
                 new PNotify({
                 title: 'Exito',
                 text: response + ' Revisa tu perfil para ver el estatus de tu pedido.',
                 type: 'dark'
                }); 

                location.reload().delay(2000);


              } else {
                console.log(response);
                new PNotify({
                title: 'Error',
                text: response ,
                type: 'error'
               });
              }
         }
   });
};

var error_callbak = function(response) {
  console.log(response)
   var desc = response.data.description != undefined ?
      response.data.description : response.message;

      new PNotify({
      title: 'Error',
      text: "ERROR [" + response.status + "] " + desc ,
      type: 'error'
     });

   //alert("ERROR [" + response.status + "] " + desc);
    $("#btn-pagar").prop("disabled", false);
  } ;
 */
//paypal
paypal.Button.render({
    env: ambiente, // Or 'production'
      style: {
      layout: 'vertical',  // horizontal | vertical
      size:   'medium',    // medium | large | responsive
      shape:  'rect',      // pill | rect
      color:  'gold'       // gold | blue | silver | white | black
    },
   
    // Set up the payment:
    // 1. Add a payment callback
    payment: function(data, actions) {
      // 2. Make a request to your server
      return actions.request.post('sistema/php/pago/configurar_pago_paypal.php')
        .then(function(res) {
          if (ambiente == 'sandbox') {
            console.log(res);
          }
          // 3. Return res.id from the response
          return res.id;
        });
    },
    // Execute the payment:
    // 1. Add an onAuthorize callback
    onAuthorize: function(data, actions) {
      // 2. Make a request to your server
      return actions.request.post('sistema/php/pago/ejecutar_pago_paypal.php', {
        paymentID: data.paymentID,
        payerID:   data.payerID
      })
        .then(function(res) {
           if (ambiente == 'sandbox') {
            console.log(res);
          }
          if (res == "Su pago ha sido aprovado.") {
            var alerta = ' <br> ' 
            + '<div class="alert alert-succes alert-dismissible fade show" role="alert">'
            + '<strong><i class="fa fa-exclamation-triangle"></i> Pago  procesado. </strong> '
            + 'Tu pago fue aceptado espera en lo que recargamos la pagina'
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '  <span aria-hidden="true">&times;</span>'
            + '</button>'
          + '</div>';

            $('#alertasSistema').html(alerta); 
            location.reload();

          } else{
            var alerta = ' <br> ' 
            + '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
            + '<strong><i class="fa fa-exclamation-triangle"></i> Error tu pago no fue procesado. </strong> '
            + 'Verifica que tu conexión a internet, si el problema persiste contactanos.'
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '  <span aria-hidden="true">&times;</span>'
            + '</button>'
          + '</div>';

          $('#alertasSistema').html(alerta); 
           

          }
        });
    }
  }, '#paypal-button');


  $('.boton_bolsa').on('click', function(){

    cargarTablaApartados('#tabla_tikets','nodesglosados','Si','usuarioActual'); 
    var id_usuario = "mismo_login";
    var id_pedido = "no_se";
    var tienda = "Si";
    cargarDatosDelEnvio(id_usuario,id_pedido,tienda);

    var total = $('#total_mas_envio_paypal').val();
    var totalNormal = $('#total_mas_envio_paypal_normal').val();
    calcularMeses(totalNormal,1,'#1p');
    calcularMeses(total,3,'#3m');
    calcularMeses(total,6,'#6m');
    calcularMeses(total,9,'#9m');
    calcularMeses(total,12,'#12m'); 
  })

 
 function cargarHistorialPedidos(contenedor,filtro){
  //reinicio del contenedor 
  $(contenedor).empty();
  var cargando = '<div class="jumbotron"> <h1>Cargando Pedidos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
  var table_Usuarios = "<table id='tablaHistorialPedidos' width='100%' class='table responsive'> <thead><tr>" +
  "<th><i class='fa fa-user'></i> ID Pedido</th>"+ 
   "<th><i class='fa fa-user'></i> Numero de guia</th>"+  
   "<th><i class='fa fa-truck'></i> Estado</th>"+ 
   "<th><i class='fa fa-gear'></i> Acciones</th>"+ 
   "</tr></thead><tbody></tbody> </table>";
  $(table_Usuarios).appendTo(contenedor);
  //$('#tablaHistorialPedidos > tbody').html(cargando);
  $.ajax({
      url: 'sistema/php/pedidos/consulta_pedido_actual_cliente.php',
      type: 'post',
      data: {filtro:filtro},
      dataType: 'json',
      success: function(data) {
         // console.log(data);
          if (data.success) {
              $.each(data, function(index, record) {
                  if ($.isNumeric(index)) {
                      var row = $("<tr role='row' class='odd'/>");

                      var editar = '<button type="button" data-toggle="modal"  data-target="#modalDatosPedido" class="boton-ver-pedido btn btn-secondary" data-id-pedido=' + record.id + '> <i class="fas fa-search"></i> Ver Detalles</button>';
                      
                      var cancelar = "";
                      
                      var acciones = cancelar + editar;
                      
                     $("<td />").html(record.id).appendTo(row); 
                     $("<td />").html(record.numero_guia).appendTo(row);  
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
    
$('#div_tabla_pedidos').on('click','.boton-ver-pedido', function(){
  var id_usuario = "mismo_login";
  var id_pedido = $(this).data('id-pedido');
  var tienda = "Si";
  cargarDatosDelEnvio(id_usuario,id_pedido,tienda);
});

if( $('#acepto_terminos').prop('checked') ) {
  $("#btn-pagar").prop( "disabled", false);
  $('.pagos').show('slow');
}else {
  $("#btn-pagar").prop( "disabled", true);
  $('.pagos').hide();
}

$('#acepto_terminos').on('change click', function(){
  if( $('#acepto_terminos').prop('checked') ) {
    $("#btn-pagar").prop( "disabled", false);
    $('.pagos').show('slow');
  }else {
    $("#btn-pagar").prop( "disabled", true);
    $('.pagos').hide();
  }
});

$(function() {
  var myDropzone = new Dropzone("#upload_ine");
  myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file);
      location.reload();
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

$(function() {
  var myDropzone = new Dropzone("#upload_compPago");
  myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file); 

  });

  myDropzone.on("success", function() {
      var id_usuario = "mismo_login";
      var id_pedido = $(this).data('#id_pedido_consulta_pedido_historial');
      var tienda = "Si";
      cargarDatosDelEnvio(id_usuario,id_pedido,tienda); 
      alert('Se agrego con exito el comprobante');  

  });

  myDropzone.on("error", function() {
      alert('No se pudo agregar la foto');
  });


});

$(function() {
  var myDropzone = new Dropzone("#upload_pago_efectivo");
  myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file);
      
  });

  myDropzone.on("success", function() {
        
      alert('Recibimos su comprobante de pago, revisaremos que todo este correcto y te contactaremos.');  
      location.reload();
  });

  myDropzone.on("error", function() {
      alert('No se pudo agregar la foto');
  });


});

cargarSliders();
//console.log(reseña_mode);
if (reseña_mode == 1) {
  cargarReseñas(true);
} else {
  cargarReseñas(false);
}

cargarSobreNosotros(); 
 
});
$(window).load(function() {
  $('body').show('slow');
  $('.pre-loader').hide('slow'); 
  $('.elfsight-app-26a278d7-38b2-4cd6-b0d2-6953479af499 a').attr('style',""); 
  
});

new WOW().init();

$(window).scroll(testScroll);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function testScroll() {
  if (isScrolledIntoView($(".numbers")) && !viewed) {
      viewed = true;
      $('.value').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
  }
}


$('#div_tabla_direcciones').on('click', '.btn-eliminar-dir', function(){

    var id = $(this).data('id');
    var url = 'sistema/php/users/borrar_dir_usuario.php';
    eliminarDireccion(id,url); 

});