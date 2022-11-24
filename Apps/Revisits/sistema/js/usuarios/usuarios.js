    $(document).ready(function() {
      //perfiles usuarios

      //cargar $modulos

      function cargarmodulos(){

      $.get('php/users/consulta_modulos.php', {
          },
          function(data) {

              if (data.success) {

                var modulos  = "";

                  $.each(data, function(index, record) {

                      if ($.isNumeric(index)) {

                          var checkbox = '<h5><input data-id="' + record.id + '" class="permisos_modulo" type="checkbox"> ' + record.nombre +'</h5><ul id="divSubModulos'+record.id +'"></ul><br>';
                          cargarSubModulos(record.id);
                          modulos += checkbox;

                      }
                  });

                  $('#lista_Objetos').html(modulos);
              }

          });



      }


      function cargarSubModulos(id_padre) {
        $.post('php/users/consulta_submodulos.php', {
            id_padre: id_padre
            },
            function(data) {

                if (data.success) {

                  var modulos  = "";

                    $.each(data, function(index, record) {

                        if ($.isNumeric(index)) {

                            var checkbox = '<input data-id="' + record.id + '" class="permisos_modulo" type="checkbox"> ' + record.nombre +'</br>';

                            modulos += checkbox;

                        }
                    });

                    $('#divSubModulos'+id_padre).html(modulos);
                }

            });



      }
      //crear nuevo perfil

      $('#crear_nuevo_perfil_de_usuario').on('click', function () {
            cargarmodulos();
            $('#actualizarPerfil').hide('slow');
            $('#crearPerfil').show('slow');
            $('#nombre_nuevo_perfil').val('');
          });


      //crear Perfil
      $('#li_usuarios').on('click', function () {

        cargar_perfiles();
        cargarListaSelects('php/users/consulta_perfiles.php','#perfil_usuario_editar','CLIENTE');

        var mostrar_clientes_tambien = $('#mostrar_clientes_tambien').val();
        tablaUsuarios(mostrar_clientes_tambien);
      });

      $('#crearPerfil').on('click', function () {
        var nombre = $('#nombre_nuevo_perfil').val();

        if (nombre == "") {
          alert('Se require un Nombre para el Perfil')
        } else {

          var id_modulos = [];
          var permisos = [];

          $('.permisos_modulo').each(function() {
            var input  = $(this);
            var id_modulo = input.data('id');

              var permiso = 0;

              if ($(input).prop('checked')) {
                  permiso = 1
              }

              id_modulos.push(id_modulo);
              permisos.push(permiso);

          });



          $.post('php/users/registrar_perfiles.php', {
                  nombre: nombre,
                  permisos: permisos,
                  id_modulos: id_modulos,
              },
              function(respuesta) {

                  if (respuesta == 1) {

                      alert('¡El Perfil ' + nombre + ' ha sido registrado!');

                      id_modulos = [];
                      permisos = [];

                      cargar_perfiles();

                  } else if (respuesta == "nombre no disponible") {
                    alert('Registro Fallido ' + respuesta);


                  } else {

                       alert('Registro Fallido ' + respuesta);
                  }


              });

        }
      })

    // cargar perfil
    function cargar_perfiles() {

    $.get('php/users/consulta_perfiles.php', {
        },
        function(data) {

            if (data.success) {

                var tabla_perfiles = '<table id="perfiles_usuarios" class="table">' +
                    '<thead><tr role="row">'+
                    "<th><i class='fa fa-users'></i> Perfil</th>"+
                    "<th><i class='fa fa-edit'></i> Acciones</th>"+
                    '</tr>'
                    +'</thead>' +
                    '<tbody> </tbody></table>';
                $('#div_lista_de_perfiles').html(tabla_perfiles);

                $.each(data, function(index, record) {

                    if ($.isNumeric(index)) {
                        var editar_permisos = '<button type="button" data-toggle="modal" data-nombre="'+record.nombre+'"   data-target=".modal-editar-perfil" class="boton-editar-perfil btn btn-primary" data-id=' + record.id + ' ><i class="editar_datos_usuario fa fa-spin fa-gear"></i> Editar</button>';
                        var eliminar_perfil = '<button type="button" class="btn-eliminar-perfil btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';


                        var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                        $("<td />").text(record.nombre).appendTo(row);
                        $("<td />").html(editar_permisos + eliminar_perfil).appendTo(row);

                        row.appendTo("#perfiles_usuarios");
                    }
                });


            }
            //tabla de Boletos


           $('#perfiles_usuarios').DataTable({
             responsive: true
            });
        });
}

    //editar perfiles
    function cargarObjetos(id_perfil) {

    $.get('php/users/consulta_objetos.php', {
            id_perfil: id_perfil
        },
        function(data) {
          //console.log(data);
            if (data.success) {

                var lista_objetos = "";
                $.each(data, function(index, record) {
                    var checkbox = '<input type="checkbox" class="permisos_modulo" data-id="'+ record.id +'" > ';
                    if ($.isNumeric(index)) {
                        if (record.permiso == 1) {
                            checkbox = '<input type="checkbox" class="permisos_modulo" data-id="'+ record.id +'" checked> ';
                        }

                        var objetos = '<li  class="list-group-item list_objetos_permisos" data-id=' + record.id + ' data-permiso=' + record.permiso + '>' + checkbox + ' ' + record.nombre + '<br> <div id=subObjetos_' + record.id + '></div> </li>';
                        cargar_subObjetos(record.id,id_perfil);
                        lista_objetos = lista_objetos + objetos;

                    }
                });

                $('#lista_Objetos').html(lista_objetos);
            }

        });

      }

      function cargar_subObjetos(id_padre, id_perfil){
      var lista_sub_objetos = "";

      $.get('php/users/consulta_sub_objetos.php', {
              id_perfil: id_perfil,
              id_padre: id_padre
          },
          function(data) {
              if (data.success) {
                  $.each(data, function(index, record) {
                      var checkbox = '<input type="checkbox" class="permisos_modulo" data-id="'+ record.id +'" > ';
                      if ($.isNumeric(index)) {
                          if (record.permiso == 1) {
                              checkbox = '<input type="checkbox" class="permisos_modulo" data-id="'+ record.id +'" checked> ';
                          }

                          lista_sub_objetos = lista_sub_objetos + '<li  class="list-group-item list_objetos_permisos" data-id=' + record.id + ' data-permiso=' + record.permiso + '>' + checkbox + ' ' + record.nombre + '</li>';

                      }

                  });
                  $('#subObjetos_' + id_padre).html(lista_sub_objetos);
              }

          });


  }
    $('#div_lista_de_perfiles').on('click', '.boton-editar-perfil', function() {

      var id_perfil = $(this).data('id');

      var nombre = $(this).data('nombre');
      $('#nombre_nuevo_perfil').val(nombre);
      $('#actualizarPerfil').show('slow');
      $('#crearPerfil').hide('slow');
      $('#id_perfil').val(id_perfil);
      cargarObjetos(id_perfil);
    });

    //Editar perfil

$('#actualizarPerfil').on('click', function () {
  var nombre = $('#nombre_nuevo_perfil').val();
  var id = $('#id_perfil').val();
  if (nombre == "") {
    alert('Se require un Nombre para el Perfil')
  } else {

    var id_modulos = [];
    var permisos = [];

    $('.permisos_modulo').each(function() {
      var input  = $(this);
      var id_modulo = input.data('id');

        var permiso = 0;

        if ($(input).prop('checked')) {
            permiso = 1
        }

        id_modulos.push(id_modulo);
        permisos.push(permiso);

    });

      //console.log(id_modulos);
      //console.log(permisos);

    $.post('php/users/editar_perfiles.php', {
            id:id,
            nombre: nombre,
            permisos: permisos,
            id_modulos: id_modulos,
        },
        function(respuesta) {

            if (respuesta == 1) {
                alert('¡El Perfil ' + nombre + ' ha sido Actualizado!');

                id_modulos = [];
                permisos = [];

                cargar_perfiles();

            } else if (respuesta == "nombre no disponible") {
              alert('Error: '+respuesta);

            } else {
              alert('Error: '+respuesta);
            }


        });

  }
})

  //eliminar perfiles

    function borrar_perfiles(id) {
      $.post('php/users/borrar_perfiles_usuario.php', {
              id: id
          },
          function(respuesta) {
            if (respuesta == 1) {
                  alert('¡El Perfil ha sido Borrado!');
                  cargar_perfiles();

                  }else {
                   alert('¡El Perfil NO ha sido Borrado!');
                  }

              });
    }

    function verificar_perfil(estado,id){

        $.post('php/users/aprovar_usuario.php', {
            id: id,
            estado:estado
        },
        function(respuesta) {
          if (respuesta == 1) {
                alert('¡El Perfil ha sido Actualizado!');
                tablaUsuarios(1)
                }else {
                 alert('¡El Perfil no ha sido Actualizado!');
                }

            }); 

    }

    $('#div_lista_de_perfiles').on('click', '.btn-eliminar-perfil', function() {
      var mensaje = confirm("¿Realmente desea Borrar el Perfil?");
      var id = $(this).data('id');
      //Detectamos si el usuario acepto el mensaje
        if (mensaje) {
            borrar_perfiles(id);
          } else {
          alert("¡Ok, No se borrara!");
      }
      });


      $('#rowUsers, body').on('click', '.btn-aprob', function() {
            var estado = $(this).data('status');
            var id = $(this).data('id');
            var mensaje = confirm("¿Realmente desea cambiar el status de este perfil?");
            //Detectamos si el usuario acepto el mensaje
            if (mensaje) {
                verificar_perfil(estado,id)
                } else {
                alert("¡Ok, No se cambiara!");
            }
        });

      


      //guardar nuevo usuario
  $('#guardar_usuario').on('click', function() {
  
    registrarUsuario();

  });

  $('#registrar_nuevo_usuario').on('click', function(){

      cargarListaSelects('php/users/consulta_perfiles.php','#asignar_perfil_usuario');
      $('.clienteNormal').show();
      $('.altaRapida').hide();
    });




$('#rowUsers').on('click', '.editar_datos_usuario', function() {

    var id = $(this).data("id");

    $.post('php/users/consulta_direccion_usuario.php', {
        id: id
    },
    function(respuesta) {
        if (respuesta == null ) {
            $('#DirDelUsuario')[0].reset();
            alerta = '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                     +   '<strong>Sin direcciones registradas</strong> No hay direcciones registradas para este cliente, pidale que registre sus datos o registrelos usted.'
                     + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                     +   '<span aria-hidden="true">&times;</span>'
                     +  '</button>'
                     + '</div>';
          
            $('#statusDir').html(alerta);
            
        }else{
            $('#statusDir').html('');
            $('#dir_usuario_nombre').val(respuesta[0]["nombre"]);
            $('#dir_usuario_cp').val(respuesta[0]["cp"]);
            $('#dir_usuario_estado').val(respuesta[0]["estado"]);
            $('#dir_usuario_ciudad').val(respuesta[0]["ciudad"]);
            $('#dir_usuario_calle').val(respuesta[0]["calle"]);
            $('#dir_usuario_nexterior').val(respuesta[0]["nexterior"]);
            $('#dir_usuario_ninterior').val(respuesta[0]["ninterior"]);
            $('#dir_usuario_colonia').val(respuesta[0]["colonia"]);
            $('#dir_usuario_calle').val(respuesta[0]["calle"]);
            $('#dir_usuario_nexterior').val(respuesta[0]["nexterior"]);
            $('#dir_usuario_ninterior').val(respuesta[0]["ninterior"]);
            $('#dir_usuario_colonia').val(respuesta[0]["colonia"]);
            $('#dir_usuario_municipality').val(respuesta[0]["municipality"]);
            $('#dir_usuario_country').val(respuesta[0]["country"]);
            $('#dir_usuario_dircompleota').val(respuesta[0]["dir"]); 
            
        }
     
       
    });

   
    
    $.post('php/users/consulta_permisos.php', {
                id: id
            },
            function(respuesta) {

                $('#first-name-e').val(respuesta[0]["nombre"]);
                $('#last-name-e').val(respuesta[0]["apellido"]);
                $('#mail-e').val(respuesta[0]["mail"]);
                $('#tel-e').val(respuesta[0]["telefono"]);
                $('#password-e').val(respuesta[0]["pass"]);
                $('#id_u').val(respuesta[0]["id"]);
                $('#razon_social-e').val(respuesta[0]["razon_social"]);
                $('#rfc-e').val(respuesta[0]["rfc"]);
                $('#id_usuario_dir').val(respuesta[0]["id"]);
                $("#perfil_usuario_editar option[value='" + respuesta[0]["perfil"] + "']").prop('selected', true).val(respuesta[0]["perfil"]);
                var alerta = '<div class="alert alert-info alert-dismissible fade show" role="alert">'
                     +   '<strong>INE no registrada</strong> El usuario aun no ha suministrado copia de su INE.'
                     + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                     +   '<span aria-hidden="true">&times;</span>'
                     +  '</button>'
                     + '</div>';
                     var revision = '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                     +   '<strong>INE registrada</strong> El usuario ha suministrado copia de su INE verifique sus datos y apruebelos. <div class="boton_cliente"></div>'
                     + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> '
                     +   '<span aria-hidden="true">&times;</span>'
                     +  '</button>'
                     + '</div>';
                     var yaverificado = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
                     +   '<strong>INE registrada</strong> Este usuario ya fue verificado. <div class="boton_cliente"></div>'
                     + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                     +   '<span aria-hidden="true">&times;</span>'
                     +  '</button>'
                     + '</div>';
                
                var status = [alerta, revision, yaverificado];
                $('#status_cliente').html(status[respuesta[0]["verificado"]]);
                if (respuesta[0]["ine"] == null) {
                    $('#ine_clinete').attr('src','images/ine.png');
                }else{
                    $('#ine_clinete').attr('src','data:'+respuesta[0]["tipo_archivo"]+';base64,'+respuesta[0]["ine"]);
                
                }
                
                if (respuesta[0]["verificado"] == 2) {
                    var verificado = '<button type="button" class="btn-aprob btn btn-danger" data-status="0" data-id=' + respuesta[0]["id"] + ' ><i class="fas fa-user-times"></i> Desaprobar</button>';
                     
                  } else if(respuesta[0]["verificado"] == 1){
                    var verificado = '<button type="button" class="btn-aprob btn btn-success" data-status="2" data-id=' + respuesta[0]["id"] + ' ><i class="fas fa-user-check"></i> Verificar</button>';
                 
                } else{
                    var verificado = '';
                  }

                $('.boton_cliente').html(verificado);
            });
});


    //Actualizar usuario
    $('#actualizar_usuario').on('click', function() {

        var form = '#DirDelUsuario';
        var url = 'php/users/actualizar_dir_usuario.php';
        var boton = '';
        var funcion = "";
        registrarFormulario(form, url, boton,funcion); 

    //datos
    var nombre = $('#first-name-e').val();
    var apellidos = $('#last-name-e').val();
    var clave = $('#password-e').val();
    var rclave = $('#password-e').val();
    var correo = $('#mail-e').val();
    var telefono = $('#tel-e').val();
    var id = $('#id_u').val();
    var rfc = $('#rfc-e').val();
    var razon_social = $('#razon_social-e').val();
    var perfil = $('#perfil_usuario_editar').val();
    var mostrar_clientes_tambien = $('#mostrar_clientes_tambien').val();

    if (nombre == "") {
        $('.parsley-id-5573').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    } else if (apellidos == "") {
        $('.parsley-id-5573').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-0473').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    } else if (clave == "") {
        $('.parsley-id-0474').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-7811').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    } else if (clave != rclave) {
        $('.parsley-id-7811').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-7812').html("<span class='badge alert-warning'><i class='fa fa-exclamation-circle'></i> Las contraseñas no coinciden</span>");
    } else {
        $('.parsley-id-5573').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-0474').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-0473').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-7811').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('.parsley-id-7812').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");

        $.post('php/users/actualizar_usuarios.php', {
                id: id,
                nombre: nombre,
                apellidos: apellidos,
                clave: clave,
                rfc:rfc,
                razon_social:razon_social,
                rfc:rfc,
                rclave: rclave,
                correo: correo,
                telefono:telefono,
                perfil: perfil,
            },
            function(respuesta) {

                if (respuesta == 'Datos actualizados correctamente') {
                    alert('¡El usuario ' + nombre + ' ' + apellidos + ' ha sido Actualizado!');

                    tablaUsuarios(mostrar_clientes_tambien);


                } else {
                   alert('¡El usuario ' + nombre + ' NO ha sido Actualizado!' + respuesta);
                }


            });

    }

    });

    $('#mostrar_clientes_tambien').on('change', function () {

      if ($(this).prop('checked')) {
         $(this).val(1);
      } else{
          $(this).val(0);
      }
      var mostrar_clientes_tambien = $(this).val();
      tablaUsuarios(mostrar_clientes_tambien);

    });

    //borrar usuario datos
    $('#rowUsers').on('click', '.bbu', function() {

            var id = $(this).data("id");
            var nombre = $(this).data("nombre");
            var mensaje = confirm("¿Realmente desea Borrar el Usuario?");
            //Detectamos si el usuario acepto el mensaje
              if (mensaje) {
                $.post('php/users/borrar_usuarios.php', {
                        id: id,
                        nombre:nombre
                    },

                    function(respuesta) {



                        if (respuesta == 1) {
                            alert('¡El usuario '+nombre+' ha sido Borrado!');

                            var mostrar_clientes_tambien = $('#mostrar_clientes_tambien').val();
                            tablaUsuarios(mostrar_clientes_tambien);


                        } else {
                          alert('¡El usuario  NO ha sido Borrado!');

                        }


                    });
                } else {
                alert("¡Ok, No se borrara!");
            }

    });





    });
