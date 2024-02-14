$(document).ready(function() {

  /* login submit */
  $('#boton_ingresar').on('click', function(){


   var data = $("#form_login_admin").serialize();
     $.ajax({

     type : 'POST',
     url  : 'php/login/login_admin.php',
     data : data,
     beforeSend: function()
     {
      $("#boton_ingresar").html('Validando...');
     },
     success :  function(response)
        {
                console.log(response);
                  if(response=="ok"){
                       $("#boton_ingresar").html('Ingresando...');
                       window.location.href = "home.php"; 
               } else {
                $("#boton_ingresar").html('Ingresar');
                alert('¡Error al Ingresar!' + response);
              }

         }
     });
   });

   

     /* login submit */
  $('#boton_ingresar_tienda').on('click', function(){
    var data = $("#form_login_tienda").serialize();

    console.log('loading tienda ' + data);
      $.ajax({
      type : 'POST',
      url  : 'sistema/php/login/login_tienda.php',
      data : data,
      beforeSend: function()
      {
       $("#boton_ingresar_tienda").html('Validando...');
      },
      success :  function(response)
         {
                 console.log(response);
                   if(response=="ok"){
                        $("#boton_ingresar_tienda").html('Ingresando...');
                        alert('¡Bievenido!');
                        window.location.href = "index.php"; 
                } else {
                 $("#boton_ingresar_tienda").html('Ingresar');
 
                 alert('¡Error al Ingresar!' + response);
               }
 
          }
      });
    });

})
