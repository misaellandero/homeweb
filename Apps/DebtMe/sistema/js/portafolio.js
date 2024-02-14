$(document).ready(function() {
    var id_usuario = "mismo_login";
    var id_pedido = "no_se";
    var tienda = "Si";
    var tipo_tienda = $('#tipo_tienda').val()
    $('.todos-portafolio-text').hide()

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

      cargarSliders();
      cargarArticulosDestacados('#productos-destacados',1,tipo_tienda);   
    
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
    
        $('#v-pills-tab').on('click','.lista_productos', function(){
          var id = $(this).data('id');
          var selectDeDestino = '#v-pills-' + id ;
          cargarArticulosPorCategoria(selectDeDestino,id,tipo_tienda);
        });


    $('#ver_mas_portafolio').on('click', function(){ 
        $(this).hide('slow');
        $('.todos-portafolio').show('slow')
        cargarProductosBotones();
    });
    $('.elfsight-app-26a278d7-38b2-4cd6-b0d2-6953479af499 a').attr('style',""); 
 });


 $(window).scroll(function() {
    $('.elfsight-app-26a278d7-38b2-4cd6-b0d2-6953479af499 a').attr('style',""); 
    })


    function cargarPQ(){  
      $.get('sistema/php/configuracion/consulta_pq_comprar.php', {},
      function(data) {
        var apartados = "";  
          if (data.success) {
              $.each(data, function(index, record) {
                  
                  if ($.isNumeric(index)) {
                   if (record.id > 0) {
  
                    var tajeta =  record.html; 
                  
                   apartados = apartados + tajeta;
                   
                  }
  
                  }
  
              });
          
              $('#pq_comprar').html(apartados);
  
          } 
  
        
      });
  }
  cargarPQ();

  new WOW().init();

 