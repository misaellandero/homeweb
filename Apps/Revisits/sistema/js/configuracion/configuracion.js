$(document).ready(function() {

    $('#terminos_empresa_input').summernote();
    $('#sobre_nosotros_largo_empresa_input').summernote();
    $('#texto_pq_comprar').summernote();
    $('#li_configuraciones').on('click', function () {
        cargarTablaSliders();
        cargarTablaSobreNosotros();
        cargarTablaPqComprar();
        cargarTablaRese├▒as();
    });


    $('#div_tabla_sliders').on('click', '.btn-eliminar-slider', function(){
        var id = $(this).data('id');
        var url = 'php/configuracion/borrar_imagen_slider.php';
        var funcion = "cargarTablaSliders";
        eliminarElementoTabla(id,url,funcion);

    });

    $('#div_tabla_sobreNosotros').on('click', '.btn-eliminar-sn', function(){
        var id = $(this).data('id');
        var url = 'php/configuracion/borrar_sb.php';
        var funcion = "cargarTablaSobreNosotros";
        eliminarElementoTabla(id,url,funcion);

    });

    $('#div_tabla_pq_comprar').on('click', '.btn-eliminar-pq-comprar', function(){
        var id = $(this).data('id');
        var url = 'php/configuracion/borrar_pq_comprar.php';
        var funcion = "cargarTablaPqComprar";
        eliminarElementoTabla(id,url,funcion);

    });


    $('#div_tabla_sliders').on('click', '.btn-video-slider', function(){
        var id = $(this).data('id');  
        $('#id_slider').val(id);
        eliminarElementoTabla(id,url,funcion);

    });

  //guardar nuevo producto
    $('#actualizar_datos_empresa').on('click', function() {
        var form = '#form_datos_empresa';
        var url = 'php/configuracion/actualizar_datos_empresa.php';
        var boton = '#actualizar_datos_empresa';
        var funcion = " ";
        registrarFormulario(form, url, boton,funcion);

    });

    $('#guardar_nuevo_apartado_sobre_nosotros').on('click', function() {
        var form = '#form_sobre_nosotros';
        var url = 'php/configuracion/add_sobre_nosotros.php';
        var boton = '#guardar_nuevo_apartado_sobre_nosotros';
        var funcion = "cargarTablaSobreNosotros";
        registrarFormulario(form, url, boton,funcion);

    });

    $('#guardar_nuevo_apartado_pq_comprar').on('click', function() {
        var form = '#form_pq_comprar';
        var url = 'php/configuracion/add_pq_comprar.php';
        var boton = '#guardar_nuevo_apartado_pq_comprar';
        var funcion = "cargarTablaPqComprar";
        registrarFormulario(form, url, boton,funcion);

    });
    


    $('#actualizar_datos_tienda').on('click', function() {
        var form = '#form_datos_tienda';
        var url = 'php/configuracion/actualizar_datos_tienda.php';
        var boton = '#actualizar_datos_tienda';
        var funcion = " ";
        registrarFormulario(form, url, boton,funcion);

    });

    //carga  de fotos 
    

        
$(function() {
    var myDropzone = new Dropzone("#form_sliders_carousel_video");
    myDropzone.on("complete", function(file) {
        myDropzone.removeFile(file);
    });
  
    myDropzone.on("success", function() {
          
        alert('Se Agrego con Exito el video'); 
      
  
    });
  
    myDropzone.on("error", function() {
        alert('No se pudo agregar el video');
    });
  
  
  })

$(function() {
    var myDropzone = new Dropzone("#form_sliders_carousel");
    myDropzone.on("complete", function(file) {
        myDropzone.removeFile(file);
    });
  
    myDropzone.on("success", function() {
          
        alert('Se Agrego con Exito la foto'); 
        $('#slider_titulo').val('');
        $('#slider_texto').val('');
        $('#slider_boton').val('');
        $('#real_slider_titulo').val('');
        $('#real_slider_texto').val('');
        $('#real_slider_boton').val('');

        cargarTablaSliders();
  
    });
  
    myDropzone.on("error", function() {
        alert('No se pudo agregar la foto');
    });
  
  
  })


  $('#slider_titulo').on('change keyup', function(){
    $('#real_slider_titulo').val($(this).val());
  });
  $('#slider_texto').on('change keyup', function(){
    $('#real_slider_texto').val($(this).val());
  });
  $('#slider_boton').on('change keyup', function(){
    $('#real_slider_boton').val($(this).val());
  });
 
    $(function() {
      var myDropzone = new Dropzone("#form_icono_sitio_Web");
      myDropzone.on("complete", function(file) {
          myDropzone.removeFile(file);
      });
    
      myDropzone.on("success", function() {
            
          alert('Se agrego con exito el icono');  
    
      });
    
      myDropzone.on("error", function() {
          alert('No se pudo agregar la foto');
      });
    
    
    })

    $(function() {
        var myDropzone = new Dropzone("#form_logo_sitio_Web");
        myDropzone.on("complete", function(file) {
            myDropzone.removeFile(file);
        });
      
        myDropzone.on("success", function() {
              
            alert('Se agrego con exito el logo');  
      
        });
      
        myDropzone.on("error", function() {
            alert('No se pudo agregar la foto');
        });
      
      
      })
    
      

      $(function() {
        var myDropzone = new Dropzone("#form_portada_tienda");
        myDropzone.on("complete", function(file) {
            myDropzone.removeFile(file);
        });
      
        myDropzone.on("success", function() {
              
            alert('Se agrego con exito la portada');  
      
        });
      
        myDropzone.on("error", function() {
            alert('No se pudo agregar la foto');
        });
      
      
      })

      $(function() {
        var myDropzone = new Dropzone("#form_rese├▒as");
        myDropzone.on("complete", function(file) {
            myDropzone.removeFile(file);
        });
      
        myDropzone.on("success", function() {
              
            alert('Se agrego con exito la rese├▒a');   
            $('#rese├▒a_nombre').val('');
            $('#rese├▒a_opinion').val('');
            $('#rese├▒a_estrellas').val('');
            $('#rese├▒a_id_arts').val(''); 
            $('#real_rese├▒a_nombre').val('');
            $('#real_rese├▒a_opinion').val('');
            $('#real_rese├▒a_estrellas').val('');
            $('#real_rese├▒a_id_arts').val(''); 

            cargarTablaRese├▒as();
        });
      
        myDropzone.on("error", function() {
            alert('No se pudo agregar la foto');
        });
      
      
      })


      $('#rese├▒a_nombre').on('change keyup', function(){
        $('#real_rese├▒a_nombre').val($(this).val());
      });
      $('#rese├▒a_opinion').on('change keyup', function(){
        $('#real_rese├▒a_opinion').val($(this).val());
      });
      $('#rese├▒a_estrellas').on('change keyup', function(){
        $('#real_rese├▒a_estrellas').val($(this).val());
      });
      $('#rese├▒a_id_art').on('change keyup', function(){
        $('#real_rese├▒a_id_art').val($(this).val());
      });


      $('#input-logo-colores').val("claro")

      $('#select-logo-colores').on('change', function(){
 
        var valor = $(this).val() 
        $('#input-logo-colores').val(valor)
      })

});