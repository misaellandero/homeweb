  function calcularExistencia(id_articulo) {
    $.ajax({
        type : 'POST',
        url  : 'php/inventarios/calcular_existencia.php',
        data : {id_articulo:id_articulo},
        beforeSend: function()
        {
        },
        success :  function(response)
           {
              return response;
            }

        });
  }

  function consultaMovimiento(id) {
  
    $.get('php/inventarios/consulta_movimiento.php', {id:id},
    function(data) {
  
        if (data.success) {
            $.each(data, function(index, record) {
  
                if ($.isNumeric(index)) {
                  var tipos = ['Entrada', 'Salida'];
                  $('#tipo_movimiento').val(tipos[record.tipo]);
                  $('#fecha_movimiento').val(record.fecha);
                  $('#concepto_movimiento').val(record.concepto);
                  $('#usuario_movimiento').val(record.usuario);
                  $('#detalles_movimiento').val(record.detalles);
                  $('#total_movimiento').val(record.total);
   
                }
            });
  
  
        }  
    });
  
  }
  $('#div_tabla_movimientos, #tabla_ventas').on('click','.ver_detalles_movimiento', function(){
     
    var id = $(this).data('id'); 
    consultaMovimiento(id);
    var tabla ="#tabla_articulos_movimiento";
    var total = "#consulta_total_movimiento";
    cargarTablaElementosMovimiento(id,tabla,total);
  });

  function cargarImagenesProducto(id_articulo,div_destino) {
    var imagenes = "";
    var cargando = '<div width="100%" class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';   
    $(div_destino).html(cargando);
    $.post('php/inventarios/consulta_imagenes_articulo.php',
    {id_articulo:id_articulo},
    function(data) {  
        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {

                var imagen = '<div class="card col-12 col-sm-6" >'+
                ' <img src="images/fotos_articulos/'+record.img+'" class="card-img-top" alt="'+record.titulo+'">' +
                '<div class="card-body">' +
                '<h5 class="card-title">'+record.titulo+'</h5>'+
                '<p class="card-text">'+record.texto+' </p>'+
                '<a href="#" class="hacer-imagen-principal btn btn-primary" data-id=' + record.id +'><i class=" fa fa-star"></i> Hacer Principal</a>' +
                '<a href="#" class="borrar-imagen-producto btn btn-danger" data-id=' + record.id + '><i class=" fa fa-trash"></i> Borrar</a>' +
                '</div>'+
                '</div>';

                imagenes = imagenes + imagen;

             }
        });
        $(div_destino).html(imagenes);
      
    });

    
  }

  function cargarImagenesModal(id_articulo,div_destino,tienda) {
    var url = 'php/inventarios/consulta_imagenes_articulo.php';
    var rutaImg = 'images/fotos_articulos/';
   
    if (tienda =='Si') {
        url = 'sistema/php/inventarios/consulta_imagenes_articulo.php';
        rutaImg = 'sistema/images/fotos_articulos/';
        botones  = "";
    }
    var active = "active";
    var imagenes = "";
    var cargando = '<div width="100%" class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';   
    $(div_destino).html(cargando);
    $.post(url,
    {id_articulo:id_articulo},
    function(data) {  
        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {
                var botones =  '<a href="#" class="hacer-imagen-principal btn btn-primary" data-id=' + record.id +'><i class=" fa fa-star"></i> Hacer Principal</a>' +
                '<a href="#" class="borrar-imagen-producto btn btn-danger" data-id=' + record.id + '><i class=" fa fa-trash"></i> Borrar</a>';
                if (tienda =='Si') {
                    botones  = "";
                }
                
                var imagen = ' <div class="carousel-item '+active+'">'
                            + '<img src="'+rutaImg+record.img+'"  alt="'+record.titulo+'" class="d-block w-100" alt="...">'
                            + '<div class="carousel-caption d-none d-md-block">'
                            //+ '<h5>'+record.titulo+'</h5>'
                            // + '<p>'+record.texto+'.</p>'
                            //+ '<p>'+botones+'</p>'
                            + '</div>'
                            + '</div>';

            
                imagenes = imagenes + imagen;
                active = "";
             }
        });
        $(div_destino).html(imagenes);
      
    });

    
  }

  /*function procesarMovimiento(tipo_movimiento){

    var impuestos = "no";
    var tipo = "usuarioActual";
    $.post('php/inventarios/procesarMovimiento.php',
    {tipo_movimiento:tipo_movimiento},
    function(data) {
        alert(data);
        if (data == 'Se añadio a tu lista de apartados') {
            cargarTablaApartados(tabla,impuestos,tipo);
        }
    });
  }*/

  //Posible eliminacion futura por no ser usada

function calcularMeses(cantidad,meses,div){ 
    var mensualidad = (cantidad/meses).toFixed(2);
    if (meses == 1) {
        $(div).html(' ' + meses+  " pago de <strong>$" + mensualidad + " MXN </strong>" /*+= " + cantidad + "MXN" + ' '*/);

    } else{
        $(div).html(' ' + meses+  " meses de <strong>$" + mensualidad + " MXN </strong>" /*+= " + cantidad + "MXN" + ' '*/);
    }
   
}

  function costosPaypal(cantidad,div_respuesta,id_respuesta){
     url = "sistema/php/pago/consultaPrecioFinal.php";
    $.get(url,
        {cantidad:cantidad},
        function(data) {
            $(div_respuesta).html(data.toFixed(2));
            $(id_respuesta).val(data.toFixed(2));
        });
  }
 

  function cargarTablaApartados(tabla,impuestos,tienda,tipo,editable) { 
       if (tienda == "Si") {
        var url = 'sistema/php/inventarios/consultar_articulos_apartados.php';
      } else{
        var url = 'php/inventarios/consultar_articulos_apartados.php';
      }
    $('.total_movimiento').html(0.00);
    $('.IVA').html(0.00);
    $('.IEPS').html(0.00);
    $('.SINI').html(0.00);
    $('.total_movimiento_input').val(0.00);
    $(tabla + '> tbody').empty(); 
    total = 0;
    var total_iva = 0;
    var total_ieps = 0;
    var total_sin_impuestos = 0;
    $.get(url,
    {tipo:tipo},
    function(data) { 
       // console.log(data);
        var cargando = '<div class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';

        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {

                var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>"); 
               
                
                $("<td />").text(record.nombre).appendTo(row);
                $("<td />").text(record.cantidad).appendTo(row);
                if(impuestos == 'desglosados'){
                    $("<td />").html(record.precioSinImpuesto).appendTo(row);
                    $("<td />").html(record.IVA).appendTo(row); 
                    $("<td />").html(record.IEPS).appendTo(row); 
                    $("<td />").html(record.subtotal).appendTo(row);
                   } else{

                 
                    $("<td />").html(record.costo).appendTo(row);
                    $("<td />").html(record.subtotal).appendTo(row); 
                        
                     
                   }
                   if (editable == "noEditable") {
                    var eliminar = "";
                    } else{
                            var eliminar = '<button data-id=' + record.id + ' type="button" class="close eliminarApartado text-danger"><span aria-hidden="true">×</span></button>';
                            $("<td />").html(eliminar).appendTo(row);
                    }
               
                if (tienda == "Si") {
                    total = total +(record.precio*record.cantidad);
                    /*calcularMeses(total.toFixed(2),3,'#3m');
                    calcularMeses(total.toFixed(2),6,'#6m');
                    calcularMeses(total.toFixed(2),9,'#9m');
                    calcularMeses(total.toFixed(2),12,'#12m');*/
                } else{
                    total = total + record.subtotal;
                }
                total_iva = total_iva + (record.IVA * record.cantidad);
                total_ieps = total_ieps + (record.IEPS * record.cantidad);
                total_sin_impuestos = total_sin_impuestos + (record.precioSinImpuesto * record.cantidad) ;
                row.appendTo(tabla);

             }
        });
        
    
    $('.total_movimiento').html(total);
    $('.IVA').html(total_iva);
    $('.IEPS').html(total_ieps);
    $('.SINI').html(total_sin_impuestos);
    $('.total_movimiento_input').val(total);

    if (tienda == "Si") {
        var div_respuesta = "#total-PayPal";
        var id_respuesta = "#input-total-PayPal"
        costosPaypal(total,div_respuesta,id_respuesta);
    }

    });

  }

  function cargarTablaElementosPedido(id_usuario,tabla,des_total) { 
    $(tabla + '> tbody').empty(); 
    total = 0;
    $.get('php/inventarios/consultar_articulos_movimiento.php',
    {id_usuario:id_usuario},
    function(data) { 
        //console.log(data);
        var cargando = '<div class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';

        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {

                var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                $("<td />").text(record.nombre).appendTo(row);
                $("<td />").text(record.cantidad).appendTo(row);
                $("<td />").html(record.costo).appendTo(row);
                $("<td />").html(record.subtotal).appendTo(row); 
                total = total + record.subtotal;
                row.appendTo(tabla);

             }
        });
        $(des_total).html(total);
      
    });

  }

  function cargarTablaElementosMovimientoFactura(id_movimiento,tabla,des_total,tienda) { 
    if (tienda == "Si") {
     var url = 'sistema/php/inventarios/consultar_articulos_movimiento.php';
    } else{
    var url = 'php/inventarios/consultar_articulos_movimiento.php';
    }

    $(tabla + '> tbody').empty(); 
    var total = 0;
    var iva = 0;
    var isr = 0;
    var ieps = 0;
    $.get(url,
    {id_movimiento:id_movimiento},
    function(data) { 
        if (data.success){
            alert("Datos encontrados");
        } else {
            alert("No se encontraron datos");
        }
        var cargando = '<div class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';

        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {
                var eliminar = '<button data-id="318" type="button" data-id="' + record.id + '" class="close eliminarElementoFactura text-danger"><span aria-hidden="true">×</span></button>';
                var row = $("<tr data-subtotal="+record.subtotal+" data-IVA='" + record.IVA + "' data-ISR='" + record.ISR + "' data-IEPS='" + record.IEPS + "' data-id='" + record.id + "' role='row' class='row-articulo-factura'/>");
                var valor_iva = (parseFloat(record.subtotal).toFixed(2) * record.IVA) / 100 ;
                var valor_isr = (parseFloat(record.subtotal).toFixed(2) * record.ISR) / 100 ;
                var valor_ieps = (parseFloat(record.subtotal).toFixed(2) * record.IEPS) / 100 ;
                $("<td />").text(record.nombre).appendTo(row);
                $("<td />").text(parseFloat(record.cantidad).toFixed(2)).appendTo(row); 
                $("<td />").html("<h6>$" +parseFloat(record.costo).toFixed(2)+ "</h6>").appendTo(row);
                var subtotal ="<h6>$" + parseFloat(record.subtotal).toFixed(2) + "</h6><br>" + "<p>IVA $"+ valor_iva +" ("+ record.IVA +"%) <br>ISR $"+valor_isr+" ("+ record.ISR +"%) <br>IEP $"+valor_ieps + " ("+ record.IEPS +"%) </p>"
                $("<td />").html(subtotal).appendTo(row); 
                $("<td />").html(eliminar).appendTo(row);  
                total = total + record.subtotal; 
                iva = iva + valor_iva; 
                isr = isr + valor_isr; 
                ieps = ieps + valor_ieps; 
                row.appendTo(tabla); 
             }
        }); 

        $(des_total).html(total); 
        $(des_total + "-input").val(total);
        $(des_total + "-IVA").html(iva); 
        $(des_total + "-ISR").html(isr); 
        $(des_total + "-IEPS").html(ieps);  
        $(des_total + "-con-impuestos").html(total);  
        
    });

  }
  function cargarTablaElementosMovimiento(id_movimiento,tabla,des_total,tienda) { 
    if (tienda == "Si") {
     var url = 'sistema/php/inventarios/consultar_articulos_movimiento.php';
    } else{
    var url = 'php/inventarios/consultar_articulos_movimiento.php';
    }

    $(tabla + '> tbody').empty(); 
    total = 0;
    $.get(url,
    {id_movimiento:id_movimiento},
    function(data) { 
        //console.log(data);
        var cargando = '<div class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';

        $.each(data, function(index, record) {
            if ($.isNumeric(index)) {

                var row = $("<tr data-IVA='" + record.IVA + "' data-ISR='" + record.ISR + "' data-IEPS='" + record.IEPS + "' data-id='" + record.id + "' role='row' class='odd'/>");
                var valor_iva = (parseFloat(record.subtotal).toFixed(2) * record.IVA) / 100 ;
                var valor_isr = (parseFloat(record.subtotal).toFixed(2) * record.ISR) / 100 ;
                var valor_ieps = (parseFloat(record.subtotal).toFixed(2) * record.IEPS) / 100 ;
                $("<td />").text(record.nombre).appendTo(row);
                $("<td />").text(parseFloat(record.cantidad).toFixed(2)).appendTo(row); 
                $("<td />").html("<h6>$" +parseFloat(record.costo).toFixed(2)+ "</h6>").appendTo(row);
                var subtotal ="<h6>$" + parseFloat(record.subtotal).toFixed(2) + "</h6><br>" + "<p>IVA $"+ valor_iva +" ("+ record.IVA +"%) <br>ISR $"+valor_isr+" ("+ record.ISR +"%) <br>IEP $"+valor_ieps + " ("+ record.IEPS +"%) </p>"
                $("<td />").html(subtotal).appendTo(row); 
                total = total + record.subtotal; 
                row.appendTo(tabla);

             }
        });
        $(des_total).html(total); 
        $(des_total + "-input").val(total); 
        
    });

  }

  function apartarArticulo(id_articulo,cantidad,costo,compuesto,tabla,impuestos,tienda,codigo_barras) {
    if (tienda == "Si") {
       var url = 'sistema/php/inventarios/apartar_articulo.php'; 
       var tipo = "usuarioActual";
    }else{
        var url = 'php/inventarios/apartar_articulo.php'; 
        var tipo = "usuarioActual";
    }

    if (tienda == "Punto de venta") {
            
     cantidad = prompt('Ingrese la cantidad', 1);
    
     if (cantidad < 0) {
        alert('Valor no valido');
        return;
     }
    } 

    $.post(url,
    {id_articulo:id_articulo,cantidad:cantidad,compuesto:compuesto,costo:costo,codigo_barras:codigo_barras},
    function(data) {
        if (tienda == "Punto de venta") {
            $('#lectorCodigoBarras').val('').focus();
            cargarTablaApartados(tabla,impuestos,tienda,tipo);
        }else{

            if (data == 'Se añadio a tu lista de apartados') {
               if (tienda == "Si") {
                alert(data);
               }
                cargarTablaApartados(tabla,impuestos,tienda,tipo);  
            }else if(data == 'Ya tienes un pedido en revisión, no puedes añadir mas productos hasta se concrete o cancele la compra.'){
                if (tienda == "Si") {
                    alert(data);
                   }
                    cargarTablaApartados(tabla,impuestos,tienda,tipo);
            } else{
                if (tienda == "Si") {
                    if (data == "Debes primero iniciar sesión Error") {
                        alert(data);
                        $('#modal-login').modal('show'); 
                    } 
                }else{
                    alert(data);
                } 
            }
        
     }  
       
     console.log(data); 
    });

  }

  
  //buscador
  function buscadorArticulos(form,selectDeDestino,respuesta_datos) {
     var cerrar = "";
      var url = 'php/buscador/buscar_articulos.php';
      var tabla  =
                '<table id="tabla_elementos_agregar_factura" class="table" style="width: 100%;">'  
                +
               "<thead><td>#</td> <td>Imagen</td> <td>Nombre Articulo</td><td>Precio</td> <td>Acciones</td></thead>"  +
               "<tbody></tbody>" +
               "</table>";

               $('#divTablaFactura').html(tabla);
               
    //console.log(form,selectDeDestino); 
        if(respuesta_datos == "producto"){
            url = 'sistema/php/buscador/buscar_articulos.php';
        }
         var data = $(form).find('form').serialize();
         var lista = "";
          $.ajax({
          type : 'POST',
          url  : url,
          data : data,
          success :  function(respuesta)
             {  
                // console.log(respuesta);
               $.each(respuesta, function(key, value) { 

                      if (value.nombre == null) {
                        
                      } else {
                        var detalles = ' <a href="#" class="info circle detalles-producto" data-id='+value.id+'  data-toggle="modal"  data-target="#modal_ver_articulos" ><i class="fa fa-search"></i> Detalles</a>';
                        var des_corta = "";
                        var words = value.des_corta.split(" ");
                        $.each(words, function(i, v) {
                            const quit = /-/gi;
                            var word = v.replace(quit," ");  
                             des_corta = des_corta + '<span class="badge badge-dark">'+word+'</span>' ;
                        });
                        var img;
                        if (value.imagen == null) {
                             img = 'box.jpg';
                        } else{
                            if (value.imagen == undefined) {
                                img = 'box.jpg';
                            }else{

                              img = 'fotos_articulos/' + value.imagen;
                            }
                        }
                        
                        if (respuesta_datos == "mosaico") {
                            if (value.elemento == 0) {

                                

                                if (value.compuesto == 1) {
                                    
                                    
                                var tarjeta = '<div class="card col-sm-4 col-4 col-lg-3">' 
                                                    + '<h5 class="card-title">'+ value.nombre + '</h5>'
                                                    + '<h5><span class="badge badge-secondary">$ '+value.precio+'</span></h5>'
                                                    + '<img src="images/'+img+'" class="card-img-top" alt="'+ value.nombre +'">'
                                                    + '<a class="btn bnt-add-a-ticket btn-primary" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>'
                                                   
                                                    + '<div class="card-body">'
                                                   // + '<p class="card-text"><b>CB:</b> <br>'+value.cb+"<br><b>Articulo: </b> <br>" + value.nombre_elemento +' ' + ' <br><b>Existencia:</b><br>' +value.existencia+' </p>'
                                                     + '</div>'
                                            + '</div>';

                                  lista += tarjeta ;
      
                                } else {
                                    var tarjeta = '<div class="card col-sm-4 col-4 col-lg-3">' 
                                                        + '<h5 class="card-title">'+ value.nombre + '</h5>'
                                                        + '<h5><span class="badge badge-secondary">$ '+value.precio+'</span></h5>'
                                                        + '<img src="images/'+img+'" class="card-img-top" alt="'+ value.nombre +'">'
                                                        + '<a class="btn bnt-add-a-ticket btn-primary" href="#" data-existencia="'+value.existencia+'" data-nombre="' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '"  >Agregar</a>'
                                                       
                                                        + '<div class="card-body">'
                                                        //+ '<p class="card-text"><b>CB:</b> <br>'+value.cb+"<br><b>Articulo: </b> <br> " + value.nombre + ' <br><b>Existencia:</b><br>' +value.existencia+' </p>'
                                                        + '</div>'
                                                + '</div>';

                                  lista += tarjeta ;
                                   
                                }
      
                              } else {
                                var tarjeta = '<div class="card col-sm-4 col-4 col-lg-3">'
                                                        + '<h5 class="card-title">'+ value.nombre + '</h5>' 
                                                        + '<h5> <span class="badge badge-secondary"> $'+value.precio+'</span></h5>'
                                                        + '<img src="images/'+img+'" class="card-img-top" alt="'+ value.nombre +'">'
                                                        + '<a class="btn bnt-add-a-ticket btn-primary" href="#" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '"  >Agregar</a>'
                                                        + '<div class="card-body">'
                                                        //+ '<p class="card-text"><b>CB:</b><br>'+value.cb+" <br><b>Articulo: </b> <br>" + value.nombre_elemento +' ' + ' <br><b>Existencia:</b><br>' +value.existencia+' </p>'
                                                       + '</div>'
                                                + '</div>';

                                lista += tarjeta ;
                            }
                        }else if (respuesta_datos == "#divTablaFactura"){ 
                        $('#divTablaFactura').html(tabla); 
                           
                                var row = $("<tr data-id='" + value.id + "' role='row' class='odd'/>");
                                
                                var img = '<img width="50%" class=" img-fluid rounded-circle" src="images/'+img+'" alt="'+ value.nombre +'"> ';
                                var add_articulo = ' <a data-id="'+ value.id +'" class="btn btn-add-elemento-factura btn-primary"  href="#" role="button"><i class="fa fa-plus"></i> Agregar Elemento </a>';

                                $("<td />").html(value.id).appendTo(row);  
                                $("<td />").html(img).appendTo(row); 
                                $("<td />").html(value.nombre).appendTo(row);  
                                $("<td />").html('$' +  value.precio).appendTo(row); 
                                $("<td />").html(add_articulo).appendTo(row); 
                                
                                row.appendTo("#tabla_elementos_agregar_factura"); 

                        } else if(respuesta_datos == "producto"){ 
                            cerrar = '<button type="button" class="btn btn-cerrar-busqueda btn-outline-primary"> <i class="fa fa-times"></i> cerrar</button>';
    
                            if (value.elemento == 0) { 
                                if (value.compuesto == 1) {
                                
                                    var tarjeta = '<li class="list-group-item list-group-item-action">'
                                    + '<h4>' + value.nombre + '</h4>'
                                    + '<p>' + des_corta + '</p>'  
                                    +'<img width="6%" class=" img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                                    
                                    +' <a class="btn btn-primary text-white" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>'
                                    + '<span class=""> $'+ value.precio +'</span>' 
                                    
                                    +'</li>';

                                /*var tarjeta = '<div class="col-lg-3 col-md-6"> '
                                    +'<div class="single-unique-product"> '
                                        +'<img class="img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                                        +'<div class="desc"> '
                                            +'<h4> '
                                            + value.nombre 
                                            +'</h4> '
                                            +des_corta 
                                           +' <h6>$ '+value.precio+'</h6> '

                                           +' <a class="  bnt-add-a-ticket primary-btn" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>'
                                           +  detalles 
                                           +'</div> '
                                   +' </div> '
                                +'</div> ';*/

                               

                                  lista += tarjeta ;
      
                                } else {
                                    var tarjeta = '<li class="list-group-item list-group-item-action">'
                                    + '<h4>' + value.nombre + '</h4>' 
                                    + '<p>' + des_corta + '</p>'
                                    +'<img width="6%" class=" img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                                    +  detalles 
                                    +' <a class="btn btn-primary text-white" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +'" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>'
                                    + '<span class=""> $'+ value.precio +'</span>' 
                                
                                    +'</li>';

                                  


                                    /*var tarjeta = '<div class="col-lg-3 col-md-6"> '
                                    +'<div class="single-unique-product"> '
                                        +'<img class="img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                                        +'<div class="desc"> '
                                            +'<h4> '
                                            + value.nombre 
                                            +'</h4> '
                                            +des_corta 
                                           +' <h6>$ '+value.precio+'</h6> '

                                           +  detalles 
                                           +'</div> '
                                   +' </div> '
                                +'</div> ';*/
 

                                     
                                  lista += tarjeta ;
                                   
                                }
      
                              } else {
                                var tarjeta = '<li class="list-group-item list-group-item-action">' 
                                + '<h4>' + value.nombre + '</h4>'
                                +  '<p>' +des_corta + '</p>' 
                                +'<img width="6%" class=" img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                                +  detalles  
                                +' <a class="btn btn-primary text-white" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>'
                                + '<span class=""> $'+ value.precio +'</span>' 
                                
                                +'</li>';


                                
 

                                lista += tarjeta ;
                            }
                        }  else{
                            if (value.elemento == 0) {
                                if (value.compuesto == 1) {
                                  
                                  lista += '<option data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" value="' + value.id + '" >CB:'+value.cb+" " + value.nombre + ' Existencia: ' +value.existencia+'  </option>';
      
                                } else {
                                  lista += '<option data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" value="' + value.id + '" >CB:'+value.cb+" " + value.nombre + ' Existencia: ' +value.existencia+' </option>';
      
                                }
      
                              } else {
                                lista += '<option data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' '+ value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" value="' + value.id + '" >CB:'+value.cb+" " + value.nombre_elemento +' '+ value.nombre + ' Existencia: ' +value.existencia+'</option>';
                              }
                        }
                      }

                  });
                  
                  if (respuesta_datos == "#divTablaFactura") {
                    $('#tabla_elementos_agregar_factura').DataTable({
                        responsive: true,
                        columns : [
                            null,
                            {"width": "6%" },
                            null,
                            null,
                            null
                        ]
                      });
                  }else {

                    $(selectDeDestino).html(cerrar +'<br>'+ lista + '<br>');
                  }
                  
              }
              

          });
  }


      //buscador
      function cargarArticulosPorCategoria(selectDeDestino,id,tienda) { 
        //console.log(tienda)
      
        var lista = ""; 
        $.get('sistema/php/inventarios/buscar_articulos_por_categoria.php', {id:id},
        function(respuesta) { 
           var contador = 1;
           var tipo = 1;
           var div = "";
           var div_fin = "";
           $.each(respuesta, function(key, value) 
           {
                if (value.nombre == null){ 

                } else{ 
                    if (tienda == "true"){
                        var agregar = '<a class="bnt-add-a-ticket primary-btn" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>';
                    } else {
                        var agregar = ' '; 
                    }

                   var detalles = '<br><a href="#" class="btn-info btn-sm  btn circle detalles-producto" data-id='+value.id+'  data-toggle="modal"  data-target="#modal_ver_articulos" ><i class="fa fa-search"></i> Detalles</a>';
                   var des_corta = "";
                   var words = value.des_corta.split(" ");
                    $.each(words, function(i, v) {
                            const quit = /-/gi;
                            var word = v.replace(quit," "); 
                        des_corta = des_corta + '<span class="badge badge-dark">'+word+'</span>' ;
                   });

                    var img;
                    if (value.imagen == null) {
                         img = 'box.jpg';
                    } else{
                        if (value.imagen == undefined) {
                            img = 'box.jpg';
                        }else{

                          img = 'fotos_articulos/' + value.imagen;
                        }
                    } 
                    
                    if (value.elemento == 0) { 
                       if (value.compuesto == 1) {
                        
                       var tarjeta = '<div class="col-lg-3 col-md-6"> '
                           +'<div class="single-unique-product"> '
                               +'<img class="img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                               +'<div class="desc"> '
                                   +'<h4> '
                                   + value.nombre
                                   +'</h4> '
                                   + des_corta
                                  
                                  +' <h6>$ '+value.precio+'</h6> '
                                      
                                  + agregar
                                  +  detalles 
                                  +'</div> '
                          +' </div> '
                       +'</div> ';

                      

                         lista += tarjeta ;

                       } else {

                           var tarjeta = '<div class="col-lg-3 col-md-6"> '
                           +'<div class="single-unique-product"> '
                               +'<img class="img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                               +'<div class="desc"> '
                                   +'<h4> '
                                   + value.nombre 

                                   +'</h4> '
                                   + des_corta
                                  +' <h6>$ '+value.precio+'</h6> '

                                  + agregar
                                  +  detalles 
                                  +'</div> '
                          +' </div> '
                       +'</div> ';


                            
                         lista += tarjeta ;
                          
                       }

                     } else {

                       var tarjeta = '<div class="col-lg-3 col-md-6"> '
                       +'<div class="single-unique-product"> '
                           +'<img class="img-fluid" src="sistema/images/'+img+'" alt="'+ value.nombre +'"> '
                           +'<div class="desc"> '
                               +'<h4> '
                               + value.nombre
                               +'</h4> '
                               + des_corta
                               
                              +' <h6>$ '+value.precio+'</h6> '
                              + agregar
                               + detalles 
                              +'</div> '
                      +' </div> '
                   +'</div> ';


                       lista += tarjeta ;
                   }
                }

            });
              
              $(selectDeDestino).html('<div class="row text-white ">' +lista + '</div>');
        });
        
                //console.log(respuesta);
               
}
 //buscador
    function cargarArticulosDestacados(selectDeDestino,tipo,tienda) { 
        
             var lista = ""; 
             $.get('sistema/php/inventarios/buscar_articulos_destacados.php', {tipo:tipo},
             function(respuesta) { 
                // console.log(respuesta); 
                $.each(respuesta, function(key, value) 
                {
                     if (value.nombre == null){ 

                     } 
                     else{ 
                        var detalles = '<br><a href="#" class="btn-info btn btn-sm circle detalles-producto" data-id='+value.id+'  data-toggle="modal"  data-target="#modal_ver_articulos" ><i class="fa fa-search"></i> Detalles</a>';
                        var des_corta = "";
                        if (tipo == 2) {
                            var img_descuento = '<img class="img-fluid" src="sistema/images/oferta.png" style="max-width: 90%; position: absolute; z-index: 3; margin-top:-1.5%; margin-left:-7%; " alt="'+ value.nombre +'">';
                            var precio_anterior = '<h6 class="text-danger"><s>$'+value.precio_anterior+'</s></h6>';
                        } else{
                            var img_descuento = ' ';
                            var precio_anterior = ' ';
                        }
                     
                       
                        if (tienda == "true") {   
                        var agregar = ' <a class="bnt-add-a-ticket primary-btn" data-existencia="'+value.existencia+'" data-nombre="'+ value.nombre_elemento +' ' + value.nombre + '" data-id_producto="'+ value.id_producto +'" data-compuesto="'+ value.compuesto +'" data-id="' + value.id + '" >Agregar</a>';
                        var nuevo_precio = '<h6><strong> $'+value.precio+'</strong></h6>';
                          
                        } else {

                        var agregar = '';
                        var nuevo_precio = '';
                        var precio_anterior = ' ';
                        }
                        
                        var words = value.des_corta.split(" ");
                        $.each(words, function(i, v) {
                            const quit = /-/gi;
                            var word = v.replace(quit," "); 
                             des_corta = des_corta + '<span class="badge badge-dark">'+word+'</span>' ;
                        });

                         var img;
                         if (value.imagen == null) {
                              img = 'box.jpg';
                         } else{
                             if (value.imagen == undefined) {
                                 img = 'box.jpg';
                             }else{
 
                               img = 'fotos_articulos/' + value.imagen;
                             }
                         } 
                         
                         if (value.elemento == 0) { 
                            if (value.compuesto == 1) {

                            var tarjeta = '<div class="col-lg-4 col-md-6"> '
                                +'<div class="single-unique-product"> '
                                    + img_descuento
                                    +'<img class="img-fluid" src="sistema/images/'+img+'"  style="max-width: 90%;" alt="'+ value.nombre +'"> '
                                    +'<div class="desc"> '
                                        +'<h4> '
                                        + value.nombre
                                        +'</h4> '
                                        + des_corta
                                        + precio_anterior
                                        + nuevo_precio
                                        + agregar
                                        +  detalles 
                                       +'</div> '
                               +' </div> '
                            +'</div> ';

                           

                              lista += tarjeta ;
  
                            } else {

                                var tarjeta = '<div class="col-lg-4 col-md-6"> '
                                +'<div class="single-unique-product"> '
                                     + img_descuento
                                    +'<img class="img-fluid" src="sistema/images/'+img+'"  style="max-width: 90%;" alt="'+ value.nombre +'"> '
                                    +'<div class="desc"> '
                                        +'<h4> '
                                        + value.nombre 

                                        +'</h4> '
                                        + des_corta
                                        + precio_anterior
                                        + nuevo_precio
                                        + agregar
                                        +  detalles 
                                       +'</div> '
                               +' </div> '
                            +'</div> ';


                                 
                              lista += tarjeta ;
                               
                            }
  
                          } else {

                            var tarjeta = '<div class="col-lg-4 col-md-6"> '
                            +'<div class="single-unique-product"> '
                                + img_descuento
                                +'<img class="img-fluid" src="sistema/images/'+img+'"  style="max-width: 90%;" alt="'+ value.nombre +'"> '
                                +'<div class="desc"> '
                                    +'<h4> '
                                    + value.nombre
                                    +'</h4> '
                                    + des_corta
                                    + precio_anterior
                                    + nuevo_precio
                                    + agregar
                                    + detalles 
                                   +'</div> '
                           +' </div> '
                        +'</div> ';


                            lista += tarjeta ;
                        }
                     }
 
                 });
                    
                   $(selectDeDestino).html(lista);
             });
             
                     //console.log(respuesta);
                    
    }
    //buscador
 
  //cargar tabla articulos
        function cargarTablaArticulos(id_producto) {
            $.post('php/inventarios/consulta_articulos.php',
                  {id:id_producto},
                function(data) {
                    if (data.success) {  
                        var nombre_elemento = "";
                        var nombre_unidad  = "";
                        var total_elementos  = 0;
                        var compuesto = 0;
                        var total_unidades = 0;
                      var cargando = '<div class="jumbotron"> <h1>Cargando datos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
                        var tabla_campos =
                            '<table id="tabla_articulos" width="100%" class="table">' +
                            '<thead><tr role="row">' +
                            "<th><i class='fa fa-barcode'></i></th>" + 
                            "<th><i class='fa fa-file-image-o'></i></th>" + 
                            "<th><i class='fa fa-cube'></i> Nombre</th>" +
                            "<th><i class='fa fa-cubes'></i> Producto</th>" +
                            "<th><i class='fa fa-edit'></i> Existencias</th>" +
                            "<th><i class='fa fa-edit'></i> Acciones</th>" +
                            '</tr>' +
                            '</thead>' +
                            '<tbody> </tbody></table>';
                        $('#div_tabla_articulos').html(tabla_campos);
                        $('#tabla_articulos > tbody').html(cargando);
                        $.each(data, function(index, record) {

                            if ($.isNumeric(index)) { 

                                
                                if (id_producto != "todos") {

                                nombre_elemento = record.nombre_elemento +'s';
                                total_elementos = parseInt(total_elementos + parseFloat(record.cantidad_elementos));
                                compuesto = record.compuesto ;
                                nombre_unidad =  record.unidad +'s';
                                total_unidades = (total_unidades + parseFloat(record.existencia_numero));
                                
             
                                }

                        
                            
                                var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                                var eliminar = '<button type="button" class="btn-eliminar-articulo btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                                var editar = '<button type="button" data-toggle="modal"  data-target="#moda_registrar_articulo" class="boton-editar-articulo btn btn-primary" data-id=' + record.id + '> <i class="fa fa-spin fa-gear"></i> Editar Datos</button>';
                                var add_imagen = '<button type="button" data-toggle="modal"  data-target="#modal_add_imagen" class="boton-add-imagen btn btn-success" data-id=' + record.id + '> <i class="fa fa-file-image-o"></i> Añadir imagen</button>';
                                var imprimirPromocinal = 
                                ' <div class="dropdown">'
                                 + '   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                  + '      Imagen Promocional'
                                   + ' </button>'
                                   + ' <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                                   + '     <a data-toggle="modal"  data-target="#modal_imagePromo" class="boton-imprimir-promo-articulol dropdown-item" data-id=' + record.id + '> <i class="fa fa-image"></i> Promo Clara</a>'
                                   + '     <a data-toggle="modal"  data-target="#modal_imagePromo" class="boton-imprimir-promo-articulo dropdown-item" data-id=' + record.id + '> <i class="fa fa-image"></i> Promo Oscura</a> '
                                   + ' </div>'
                                    + '</div>' ;
                                if (record.compuesto == 1){
                                    var ver_elementos = '<button type="button" data-toggle="modal"  data-target="#moda_ver_elementos_articulo" class="btn-elementos-articulo btn btn-info" data-id=' + record.id + ' data-nombre=' + record.nombre_elemento + ' data-articulo=' + record.nombre + '><i class=" fa fa-search" ></i> Ver '+record.nombre_elemento+'s </button>';

                                } else if(record.compuesto == 2){
                                    var ver_elementos = '<button type="button" data-toggle="modal"  data-target="#modal_contenido_combo" class="btn-elementos-combo btn btn-info" data-id=' + record.id + ' ><i class=" fa fa-spin fa-gear" ></i> Editar contenido </button>';

                                }else {
                                    var ver_elementos = '';
                                }

                                var img;
                                if (record.imagen == null) {
                                     img = 'box.jpg';
                                } else{
                                      img = 'fotos_articulos/' + record.imagen;
                                }
                                 
                                var imagen_principal = '<img src="images/'+img+'" width="20em"  class="img-fluid img-circle rounded-circle" alt="'+record.nombre+'"> ';
                                
                                $("<td />").html( record.cb ).appendTo(row); 
                                $("<td />").html( imagen_principal ).appendTo(row); 
                                $("<td />").text(record.nombre).appendTo(row);
                                $("<td />").text(record.nombre_producto).appendTo(row);
                                $("<td />").html(record.existencia+ " " +record.unidad +"s").appendTo(row);
                                $("<td />").html("<br>"+ add_imagen + editar + ver_elementos + eliminar + imprimirPromocinal).appendTo(row);
                                
                                row.appendTo("#tabla_articulos");

                             }
                        });


                    }
                    //tabla de Boletos

                    if(id_producto == "todos"){

                        $('#datos_existencia_articulos_filtrados').hide('slow');

                    }else{

                        $('#datos_existencia_articulos_filtrados').show('slow');
                        if(compuesto == 1){
                            $('#elemento_consulta_tabla_articulo').show('slow').html(nombre_elemento);
                            $('#cantidad_elemento_consulta_tabla_articulo').show('slow').html(total_elementos);
                        } else{
                            $('#elemento_consulta_tabla_articulo').hide('slow');
                            $('#cantidad_elemento_consulta_tabla_articulo').hide('slow'); 
                         
                        }
                        
                        $('#unidad_consulta_tabla_articulo').html(nombre_unidad);
                        $('#cantidad_unidades_consulta_tabla_articulo').html(total_unidades);
                    
                        
                        
                    }

                    $('#tabla_articulos').DataTable({
                        responsive: true
                    });
                });
        }
    // cargar tabla productos
    function cargarTablaProductos() {

        $.get('php/inventarios/consulta_productos.php', {},
            function(data) {

                if (data.success) {

                    var tabla_productos =
                        '<table id="tabla_productos" class="table" style="width: 100%;">' +
                        '<thead><tr role="row">' +
                        "<th><i class='fa fa-cube'></i>  Producto</th>" +
                        "<th><i class='fa fa-cubes'></i> Tipo</th>" +
                        "<th><i class='fa fa-edit'></i> Acciones</th>" +
                        '</tr>' +
                        '</thead>' +
                        '<tbody> </tbody></table>';
                    $('#div_tabla_productos').html(tabla_productos);

                    $.each(data, function(index, record) {

                        if ($.isNumeric(index)) {
                            var editar = '<button type="button" data-toggle="modal"  data-target="#moda_crear_producto" class="boton-editar-producto btn btn-primary" data-id=' + record.id + '> <i class="fa fa-spin fa-gear"></i> Editar Datos</button>';
                            var campos = '<button type="button" data-toggle="modal"  data-target="#modal_editar_campos_producto" class="boton-campos-producto btn btn-secondary" data-id=' + record.id + '> <i class="fa fa-spin fa-gear"></i> Editar Campos</button>';
                            var eliminar = '<button type="button" class="btn-eliminar-producto btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';

                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                            var tipo = ["Simple","Compuesto","Combo"];
                            
                            $("<td />").text(record.nombre).appendTo(row);
                            $("<td />").text(tipo[record.compuesto]).appendTo(row);
                            $("<td />").html(editar+ campos + eliminar).appendTo(row);

                            row.appendTo("#tabla_productos");
                        }
                    });


                } 

                $('#tabla_productos').DataTable({
                    responsive: true
                });
            });
    }
    //cargar tabla campos
    function cargarTablaCampos() {

        $.get('php/inventarios/consulta_campos.php', {},
            function(data) {

                if (data.success) {
                    var tabla_campos =
                        '<table id="tabla_campos" width="100%" class="table">' +
                        '<thead><tr role="row">' +
                        "<th><i class='fa fa-pencil'></i> Nombre</th>" +
                        "<th><i class='fa fa-list-ul'></i> Tipo</th>" +
                          "<th><i class='fa fa-list-ul'></i> Unidad</th>" +
                        "<th><i class='fa fa-list-ul'></i> Predeterminados</th>" +
                        "<th><i class='fa fa-edit'></i> Acciones</th>" +
                        '</tr>' +
                        '</thead>' +
                        '<tbody> </tbody></table>';
                    $('#div_tabla_campos').html(tabla_campos);

                    $.each(data, function(index, record) {

                        if ($.isNumeric(index)) {

                            var eliminar = '<button type="button" class="btn-eliminar-campo btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';


                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");

                            if (record.tipo == "Listado") {

                              var editar = '<select class="form-control listadoCampo'+ record.id +'" data-id=' + record.id + '></select>'
                              +'<button data-id=' + record.id + ' type="button" class="addElementoListaUnidades btn btn-primary"><i class="fa fa-plus"></i></button>'
                              +'<button data-id=' + record.id + ' type="button" class="btn btn-danger eliminarElementoListaUnidades"><i class="fa fa-trash"></i></button>';
                            } else {
                              var editar = 'No aplica';
                            }
                            if (record.unidad == undefined) {
                              var unidad = "No Aplica";
                            } else {
                              var unidad = record.unidad;
                            }
                            $("<td />").text(record.nombre).appendTo(row);
                            $("<td />").text(record.tipo).appendTo(row);
                            $("<td />").html(unidad).appendTo(row);
                            $("<td />").html(editar).appendTo(row);
                            $("<td />").html(eliminar).appendTo(row);

                            row.appendTo("#tabla_campos");

                            cargarListaSelectsCampos('php/inventarios/consulta_lista_campos_predefinidos.php','.listadoCampo'+ record.id +'', null,record.id);

                        }
                    });


                }
                //tabla de Boletos

                cargarListaSelects('php/inventarios/consulta_campos.php', '.listaCamposParaAsiganar', null);
                $('#tabla_campos').DataTable({
                    responsive: true
                });
            });
    }


    //cargar tabla campos
    function cargarTablaCamposProdcuto(id_producto) {
        $('#div_tabla_campos_producto').empty();
        $.post('php/inventarios/consulta_campos_producto.php',
              {id:id_producto},
            function(data) {
                if (data.success) {
                    var tabla_campos =
                        '<table id="tabla_campos_producto" width="100%" class="table">' +
                        '<thead><tr role="row">' +
                        "<th><i class='fa fa-pencil'></i> Nombre</th>" +
                        "<th><i class='fa fa-list-ul'></i> Tipo</th>" +
                        "<th><i class='fa fa-cubes'></i> Elemento</th>" +
                        "<th><i class='fa fa-edit'></i> Acciones</th>" +
                        '</tr>' +
                        '</thead>' +
                        '<tbody> </tbody></table>';
                    $('#div_tabla_campos_producto').html(tabla_campos);

                    $.each(data, function(index, record) {

                        if ($.isNumeric(index)) {



                            var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");

                            var eliminar = '<button type="button" class="btn-eliminar-campo-producto btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';


                            $("<td />").text(record.nombre).appendTo(row);
                            $("<td />").text(record.tipo).appendTo(row);
                            $("<td />").text(record.elemento).appendTo(row);
                            $("<td />").html(eliminar).appendTo(row);

                            row.appendTo("#tabla_campos_producto");

                         }
                    });


                }
                //tabla de Boletos


                $('#tabla_campos_producto').DataTable({
                    responsive: true
                });
            });
    }

function  cargarListaSelects(url,selectDeDestino,valorinicial){
          ////console.log(url,selectDeDestino,valorinicial);
          var lista = '';

          if (valorinicial == null ) {

          } else{
             lista += '<option value="'+valorinicial+'" >'+valorinicial+'</option>';
          }

          $.get(url,{},
              function(respuesta){
                ////console.log(respuesta);


                  $.each(respuesta, function(key, value) {

                      if (value.nombre == null) {

                      } else {
                          lista += '<option value="' + value.id + '" >' + value.nombre + '</option>';
                      }

                  });





                  $(selectDeDestino).html(lista);

              });
      };

      function  cargarListaSelectsCampos(url,selectDeDestino,valorinicial,id,default_val){
                //console.log(url,selectDeDestino,valorinicial,id,default_val);
                var lista = '';

                if (valorinicial == null ) {

                } else{
                   lista += '<option value="0" >'+valorinicial+'</option>';
                }

                $.post(url,{id:id},
                    function(respuesta){
                      //console.log(respuesta); 
                        $.each(respuesta, function(key, value) {

                            if (value.nombre == null) {

                            } else {
                                lista += '<option value="' + value.id + '" >' + value.nombre + '</option>';
                            }

                        });

                        $(selectDeDestino).html(lista);

                        $(selectDeDestino + " option[value="+default_val+"]").prop('selected', true);
                    });
            };

            function  cargarListaSelectsConCondicion(url,selectDeDestino,valorinicial,data){
            
       
                var lista = '';

                if (valorinicial == null ) {

                } else{
                   lista += '<option value="0" >'+valorinicial+'</option>';
                }

                $.post(url,data,
                    function(respuesta){
                      //console.log(respuesta);


                        $.each(respuesta, function(key, value) {

                            if (value.nombre == null) {

                            } else {
                                lista += '<option value="' + value.id + '" >' + value.nombre + '</option>';
                            }

                        });

                        $(selectDeDestino).html(lista); 
                    });
            };

function cargarTablaArticulosCombo(id){ 
    $('#div_tabla_articulos_combo').empty();
    $.post('php/inventarios/consulta_articulos_combo.php',
          {id:id},
        function(data) { 
            if (data.success) {
                var tabla_articulos =
                    '<table id="tabla_articulos_combo" width="100%" class="table">' +
                    '<thead><tr role="row">' +
                    "<th><i class='fa fa-pencil'></i> Nombre</th>" + 
                    "<th><i class='fa fa-cubes'></i> Cantidad</th>" +
                    "<th><i class='fa fa-edit'></i> Acciones</th>" +
                    '</tr>' +
                    '</thead>' +
                    '<tbody> </tbody></table>';
                $('#div_tabla_articulos_combo').html(tabla_articulos);

                $.each(data, function(index, record) {
                       // console.log(data);
                    if ($.isNumeric(index)) {

                        var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");

                        var eliminar = '<button type="button" class="btn-eliminar-articulo-combo btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Eliminar</button>';
 
                        
                        $("<td />").text( record.nombre).appendTo(row);
                       
                        
                        $("<td />").text(record.cantidad).appendTo(row); 
                        $("<td />").html(eliminar).appendTo(row);

                        row.appendTo("#tabla_articulos_combo");

                     }
                });


            }
            //tabla de Boletos


            $('#tabla_campos_producto').DataTable({
                responsive: true
            });
        });
}

function recargarPagina(){
    //location.reload();
}


function registrarFormulario(form,url,boton,funcion,id) {

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
           eval(funcion + "('"+id+"')");
          }

      });
}
function  cargarTablaReseñas(){
    $.get('php/configuracion/consulta_reseñas.php', {},
    function(data) {
       
        if (data.success) {
        
            var tabla_productos =
                '<table id="tabla_reseñas" class="table" style="width: 100%;">' +
                '<thead><tr role="row">' +
                "<th><i class='fa fa-cube'></i>  Nombre </th>" +
                "<th><i class='fa fa-cube'></i>  Opinion</th>" +
                "<th><i class='fa fa-cubes'></i> Estrellas</th>" +
                "<th><i class='fa fa-cubes'></i> Articulo</th>" +
                "<th><i class='fa fa-edit'></i> Acciones</th>" +
                '</tr>' +
                '</thead>' +
                '<tbody> </tbody></table>';
            $('#div_tabla_reseñas').html(tabla_productos);

            $.each(data, function(index, record) {

                if ($.isNumeric(index)) {
                    var eliminar = '<button type="button" class="btn-eliminar-reseña btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                     var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                    
                    
                    $("<td />").text(record.nombre).appendTo(row);
                    $("<td />").text(record.opinion).appendTo(row);
                    $("<td />").html(record.estrellas).appendTo(row);
                    $("<td />").text(record.nombre_articulo).appendTo(row); 
                    $("<td />").html(eliminar).appendTo(row);

                    row.appendTo("#tabla_reseñas");
                }
            });


        } 

        $('#tabla_reseñas').DataTable({
            responsive: true
        });
    });
}
function  cargarTablaSliders(){
    $.get('php/configuracion/consulta_sliders.php', {},
    function(data) {
       
        if (data.success) {

            var tabla_productos =
                '<table id="tabla_sliders" class="table" style="width: 100%;">' +
                '<thead><tr role="row">' +
                "<th><i class='fa fa-cube'></i>  Imagen</th>" +
                "<th><i class='fa fa-cube'></i>  Titulo</th>" +
                "<th><i class='fa fa-cubes'></i> Texto</th>" +
                "<th><i class='fa fa-cubes'></i> Boton</th>" +
                "<th><i class='fa fa-edit'></i> Acciones</th>" +
                '</tr>' +
                '</thead>' +
                '<tbody> </tbody></table>';
            $('#div_tabla_sliders').html(tabla_productos);

            $.each(data, function(index, record) {

                if ($.isNumeric(index)) {
                    var eliminar = '<button type="button" class="btn-eliminar-slider btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                    var video ='<button type="button" data-toggle="modal"  data-target="#modal_sliders_video" class="btn-video-slider btn btn-primary" data-id=' + record.id + ' ><i class=" fa fa-video"></i> Video</button>'; 
                    var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                    
                    
                    $("<td />").text(record.img).appendTo(row);
                    $("<td />").text(record.titulo).appendTo(row);
                    $("<td />").text(record.texto).appendTo(row);
                    $("<td />").text(record.boton).appendTo(row); 
                    $("<td />").html(video + eliminar).appendTo(row);

                    row.appendTo("#tabla_sliders");
                }
            });


        } 

        $('#tabla_sliders').DataTable({
            responsive: true
        });
    });
}

function  cargarTablaPqComprar(){
    $.get('php/configuracion/consulta_pq_comprar.php', {},
    function(data) {
        //console.log(data);
        if (data.success) {

            var tabla_productos =
                '<table id="tabla_pq_comprar" class="table" style="width: 100%;">' +
                '<thead><tr role="row">' + 
                "<th><i class='fa fa-cube'></i>  Texto</th>" 
                "<th><i class='fa fa-edit'></i> Acciones</th>" +
                '</tr>' +
                '</thead>' +
                '<tbody> </tbody></table>';
            $('#div_tabla_pq_comprar').html(tabla_productos);

            $.each(data, function(index, record) {

                if ($.isNumeric(index)) {
                    var eliminar = '<button type="button" class="btn-eliminar-pq-comprar btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                    var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                     
                    $("<td />").html(record.html).appendTo(row); 
                    $("<td />").html(eliminar).appendTo(row);

                    row.appendTo("#tabla_pq_comprar");
                }
            });


        } 

        $('#tabla_pq_comprar').DataTable({
            responsive: true
        });
    });
}

 
function  cargarTablaSobreNosotros(){
    $.get('php/configuracion/consulta_sobre_nosotros.php', {},
    function(data) {
       
        if (data.success) {

            var tabla_productos =
                '<table id="tabla_sobreNosotros" class="table" style="width: 100%;">' +
                '<thead><tr role="row">' + 
                "<th><i class='fa fa-cube'></i>  Titulo</th>" +
                "<th><i class='fa fa-cubes'></i> Texto</th>" + 
                "<th><i class='fa fa-edit'></i> Acciones</th>" +
                '</tr>' +
                '</thead>' +
                '<tbody> </tbody></table>';
            $('#div_tabla_sobreNosotros').html(tabla_productos);

            $.each(data, function(index, record) {

                if ($.isNumeric(index)) {
                    var eliminar = '<button type="button" class="btn-eliminar-sn btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                    var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                    
                     
                    $("<td />").text(record.titulo).appendTo(row);
                    $("<td />").text(record.texto).appendTo(row); 
                    $("<td />").html(eliminar).appendTo(row);

                    row.appendTo("#tabla_sobreNosotros");
                }
            });


        } 

        $('#tabla_sobreNosotros').DataTable({
            responsive: true
        });
    });
}
function eliminarElementoTabla(id,url,funcion,id_producto) {

  $.ajax({
      type : 'POST',
      url  : url,
      data : {id:id},
      beforeSend: function()
      {
      },
      success :  function(response)
         {
           alert(response);
           if(funcion == 'cargarTablaApartado'){
            cargarTablaApartados('#tabla_movimientos','no','usuarioActual');
           }else{
            eval(funcion + "('"+id_producto+"')");
           }
          }

      });
}
function eliminarElementoTablaApartados(id,url,funcion,tabla,impuestos,tienda,tipo) {
    if (tienda == "Si") {
        url = 'sistema/'+url; 
    } 
    $.ajax({
        type : 'POST',
        url  : url,
        data : {id:id},
        beforeSend: function()
        {
        },
        success :  function(response)
           {
             alert(response);
             cargarTablaApartados(tabla,impuestos,tienda,tipo);
            }
  
        });
  }

function addElementoLista(url,texto,refreshUrl,refreshSelect,refreshDefault) {

  var valor = prompt(texto);

    if (valor != null) {
    $.ajax({
        type : 'POST',
        url  : url,
        data : {valor:valor},
        success :  function(response)
           {
             alert(response);
             cargarListaSelects(refreshUrl,refreshSelect,refreshDefault);
            }

        });
    }

}

function addElementoListaUnidad(url,texto,refreshUrl,refreshSelect,refreshDefault) {

    var valor = prompt(texto);
    var unit_key = prompt("Codigo de catalogo (opcional para facturacion)");
      if (valor != null) {
      $.ajax({
          type : 'POST',
          url  : url,
          data : {valor:valor,unit_key:unit_key},
          success :  function(response)
             {
               alert(response);
               cargarListaSelects(refreshUrl,refreshSelect,refreshDefault);
              }
  
          });
      }
  
  }

function addElementoImpuesto() {

    var url = 'php/inventarios/add_impuesto.php';    
    var IEPS = 0;
    var ISR = 0;
    var IVA  = prompt('Ingrese el valor del IVA en numeros enteros',0);
    if (IVA < 0) {
        alert('Datos no validos');
        return
    } else{
         IEPS = prompt('Ingrese el valor del IEPS en numeros enteros',0);
        if (IEPS < 0) {
            alert('Datos no validos');
            return
        } else{
                ISR = prompt('Ingrese el valor del ISR en numeros enteros',0);
                if (ISR < 0) {
                    alert('Datos no validos');
                    return
                } else{

                    $.ajax({
                        type : 'POST',
                        url  : url,
                        data : {IVA:IVA,IEPS:IEPS,ISR:ISR},
                        success :  function(response)
                        {
                            alert(response);
                            cargarListaSelects('php/inventarios/consulta_impuestos.php','.listaImpuestos', null);
                            }
                
                        });
                }
               
        }
    }
    
  
    
  
  }

function addElementoListaCampos(url,texto,refreshUrl,refreshSelect,refreshDefault,id) {

  var valor = prompt(texto);

    if (valor != null) {
    $.ajax({
        type : 'POST',
        url  : url,
        data : {valor:valor,id:id},
        success :  function(response)
           {
             alert(response);
             cargarListaSelectsCampos(refreshUrl,refreshSelect,refreshDefault,id);
            }

        });
    }

}

function eliminarElementoListaCampo(url,id,refreshUrl,refreshSelect,refreshDefault,refreshid) {


    $.ajax({
        type : 'POST',
        url  : url,
        data : {id:id},
        success :  function(response)
           {
             alert(response);
             cargarListaSelectsCampos(refreshUrl,refreshSelect,refreshDefault,refreshid);
            }

        });


}

function eliminarElementoLista(url,id,refreshUrl,refreshSelect,refreshDefault) {


    $.ajax({
        type : 'POST',
        url  : url,
        data : {id:id},
        success :  function(response)
           {
             alert(response);
             cargarListaSelects(refreshUrl,refreshSelect,refreshDefault);
            }

        });


}

function cargarDatosArticulo(id_articulo,div_destino,editable) {
    $(div_destino).empty();
        var urlA = 'php/inventarios/cargar_datos_articulo.php';
        var urlC = 'php/inventarios/consulta_campos_articulo.php';
    if(editable == "No"){
        
        var urlA = 'sistema/php/inventarios/cargar_datos_articulo.php';
        var urlC = 'sistema/php/inventarios/consulta_campos_articulo.php';
    } 
    $.ajax({
      url: urlA,
      type: 'post',
      data: {
          id_articulo:id_articulo
      },
      dataType: 'json',
      success: function(data) {

          if (data.success) {
              $.each(data, function(index, record) {
                  if ($.isNumeric(index)) {
                    
                    if (editable == "Si") {
                        $('#id_articulo').val(record.id);
                        $('#nombreArticulo').val(record.nombre);
                        $('#CostoArticulo').val(record.costo);
                        $('#PrecioArticulo').val(record.precio);
                        $("#listaImpuestoArticulo option[value="+record.id_impuesto+"]").prop('selected', true);
                        $('#ExistenciaArticulo').val(record.existencia);
                        $('#cbArticulo').val(record.codigoBarras);
                        $("#disponibilidadArticulo option[value="+record.disponibilidad_articulo+"]").prop('selected', true);
                        $("#destacarArticulo option[value="+record.destacado+"]").prop('selected', true);
                        $('#skuArticulo').val(record.sku);     
                        $("#sucursalArticulo option[value="+record.sucursal+"]").prop('selected', true);
                        $('#desCortaArticulo').val(record.des_corta);
                        $('#desLargaArticulo').summernote('code',record.des_larga); 
                    } else {
                        $('#id_articulo').val(record.id);
                        $('#compuesto').val(record.compuesto);
                        $('#nombreArticulo').html(record.nombre); 

                        var words = record.des_corta.split(" ");
                        var des_corta = "";
                        $.each(words, function(i, v) { 
                            const quit = /-/gi;
                            var word = v.replace(quit," ");  
                            des_corta = des_corta + '<span class="badge badge-dark">'+word+'</span>' ;
                        });
                        
                        var destalleshtml = record.detalles.split("*finDes*");

                        $('#desCortaArticulo').html(des_corta);
                        $('#PrecioArticulo').html(record.precio); 
                        $('#detalles_largo_resume').html(destalleshtml[0]);
                        $('#detalles_largo').html(destalleshtml[1]);
                        if (record.existencia < 5){
                            $('#ExistenciaArticulo').html('Ultimos ' + parseInt(record.existencia)) + ' disponibles';  
                        } else if(record.existencia < 1){ 
                            $('#ExistenciaArticulo').html('Agotado');  
                       
                        } else{

                        $('#ExistenciaArticulo').html('Disponibles ' + parseInt(record.existencia));  
                        }
                    }
                 
                  }

              });
          }
      },

  });

    $.post(urlC, {id_articulo:id_articulo},
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

                        var disabled = "";
                        var botones_add_select =  '<button data-id=' + record.id_campo + ' type="button" class="addElementoListaUnidades btn btn-primary"  ><i class="fa fa-plus"></i></button>'
                         +'<button data-id=' + record.id_campo + ' type="button" class="btn btn-danger eliminarElementoListaUnidades"  ><i class="fa fa-trash"></i></button>';
                        if (editable == "No") {
                            disabled = "disabled";
                            botones_add_select = "";
                        }
                            if (record.datos == 3) {
                                var input = $('<div class="form-group">'
                                +'<label>'+record.nombre+'</label>'
                                +'<select class="form-control camposVariablesArticulo listadoCampoRegistrarArt'+ record.id_campo +'" data-id="' + record.id_campo + '" ' + disabled + ' ></select>'
                                + botones_add_select
                                +'</div>');
                              } else if (record.datos == 0) {
                                  var input = $('<div class="form-group">'
                                  +'<label>'+record.nombre+'</label>'
                                  +'<textarea data-id="' + record.id_campo + '"  class="form-control camposVariablesArticulo"  rows="2" '+ disabled + '>'+record.val+'</textarea>'
                                  +'</div>');
                                } else if (record.datos == 1) {
                                  var input = $('<div class="form-group">'
                                  +'<label>'+record.nombre+'</label>'
                                  +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo" value="'+record.val+'" placeholder="'+record.unidad+ 's'+'" type="number" '+ disabled + '>'
      
                                  +'</div>');
                                } else if (record.datos == 2) {
                                  if (record.val == 1) {
                                    var input = $('<div class="form-group">'
                                    +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo checkbox" type="checkbox" checked value="1" '+ disabled + '>'
                                    +'<label>'+record.nombre+'</label>'
                                    +'</div>');
                                  } else {
                                    var input = $('<div class="form-group">'
                                    +'<input data-id=' + record.id_campo + ' class="form-control camposVariablesArticulo checkbox" type="checkbox"  value="0" '+ disabled + '>'
                                    +'<label>'+record.nombre+'</label>'
                                    +'</div>');
                                  }
                                }

                          


                          input.appendTo(div_destino);
                         var urlS = 'php/inventarios/consulta_lista_campos_predefinidos.php';

                         if(editable == "No"){
                             urlS = 'sistema/php/inventarios/consulta_lista_campos_predefinidos.php';
                         }
                          cargarListaSelectsCampos(urlS,'.listadoCampoRegistrarArt'+ record.id_campo +'', null,record.id_campo,record.val);


                    }
                });


            }


         });


        

  }

  function actualizarEstatus(status,tienda) {

    if (tienda == 'Si') {
       var  url = "sistema/php/users/actualizar_status_pedido.php";
    } else{
       var url = "php/users/actualizar_status_pedido.php";
    } 
   $.ajax({
       type : 'POST',
       url  : url,
       data : {status:status,tienda:tienda},
       beforeSend: function()
       {
       },
       success :  function(response)
          {
            
            if (response == "Debes primero iniciar sesión") {
                alert(response); 
                $('#modal-login').modal('show'); 
            } else {
                alert(response); 
                location.reload();
            } 
           }
       });
 }

//Status del usuario 
 function consultaPedido(id_usuario){
    $('.btn-pedido').hide();
//cargarDatosUsuario
    $.ajax({
        type : 'POST',
        url  : 'php/pedidos/consulta_pedido.php',
        data : {id_usuario:id_usuario},
        beforeSend: function()
        {
        },
        success :  function(response)
        {
        
            var nombre_cliente =  response[0]['nombre'] + " " + response[0]['apellido'];
            var correo_cliente =  response[0]['email'];
            var estatus =  response[0]['pedido'];
            var tel_cliente = response[0]['telefono'];
 

            var nombre_dir_pedido = response['direccion']['nombre'];
            var estado_dir_pedido = response['direccion']['estado'];
            var ciudad_dir_pedido = response['direccion']['ciudad'];
            var cp_dir_pedido = response['direccion']['cp'];
            var dir_pedido = response['direccion']['dir'];

            var Tipoestatus = ['Sin pedidos','En espera de costos de envio','En espera de pago','Pedido Enviado'];
           
            $('#estatus_pedido').html(Tipoestatus[estatus]);
            var wts = "https://api.whatsapp.com/send?phone=521" + tel_cliente + "&text=Estamos%20revisando%20tu%20pedido,%20en%20unos%20minutos%20podras%20pagarlo.%20"; 
            $('#nombre_pedido').val(nombre_cliente);
            $('#correo_pedido').val(correo_cliente);
            $('#telefono_pedido').val(tel_cliente);
            $('#wts_pedido').attr('href',wts);
            $('#id_usuario_pedido').val(id_usuario);

            $('#nombre_dir_pedido').val(nombre_dir_pedido);
            $('#estado_dir_pedido').val(estado_dir_pedido);
            $('#ciudad_dir_pedido').val(ciudad_dir_pedido);
            $('#cp_dir_pedido').val(cp_dir_pedido);
            $('#dir_pedido').val(dir_pedido);

            $('#empresa_pedido_pedido').val('');
            $('#costo_envio_pedido').val('');
            $('#numero_guia_pedido').val('');
            $('#notas_pedido').val('');
            
            if (estatus > 1){
                cargarDatosDelEnvio(id_usuario,0);
                $('.btn-cancelar-pedido').show();
            }

            $('.noEditablesTrasPago').removeAttr("readonly");

            if (estatus == 1){
             $('.btn-enviarDatos-Paqueteria').show();
            }
            if (estatus == 2){ 
             $('.btn-actualizar-datos-envio').show();
            }

            if (estatus == 3){
                $('.noEditablesTrasPago').attr("readonly","true");
                $('.btn-enviar-numoerGuia').show();
                $('.btn-actualizar-datos-envio').show();
                $('#tabla_articulos_pedido > tbody').html('<h4>Los articulos ya fueron procesados, puedes buscar los detalles del movimiento en la seccion de inventarios</h4>');
            } else{
                var tabla = "#tabla_articulos_pedido";
                var impuestos = "no";
                var tipo = id_usuario;
                cargarTablaApartados(tabla, impuestos,'no',tipo);      
                
            }
            
 
            

          

        }

        });
        
    }
    function consultaPedidoEnviado(id_usuario,id_pedido){
        console.log(id_usuario,id_pedido);
        $('.btn-pedido').hide();
    //cargarDatosUsuario
        $.ajax({
            type : 'POST',
            url  : 'php/pedidos/consulta_pedido.php',
            data : {id_usuario:id_usuario},
            beforeSend: function()
            {
            },
            success :  function(response)
            {
            
                var nombre_cliente =  response[0]['nombre'] + " " + response[0]['apellido'];
                var correo_cliente =  response[0]['email'];
                var estatus =  response[0]['pedido'];
                var tel_cliente = response[0]['telefono'];
     
    
                var nombre_dir_pedido = response['direccion']['nombre'];
                var estado_dir_pedido = response['direccion']['estado'];
                var ciudad_dir_pedido = response['direccion']['ciudad'];
                var cp_dir_pedido = response['direccion']['cp'];
                var dir_pedido = response['direccion']['dir'];
    
                
                var wts = "https://api.whatsapp.com/send?phone=521" + tel_cliente + "&text=Estamos%20revisando%20tu%20pedido,%20en%20unos%20minutos%20podras%20pagarlo.%20"; 
                $('#nombre_pedido').val(nombre_cliente);
                $('#correo_pedido').val(correo_cliente);
                $('#telefono_pedido').val(tel_cliente);
                $('#wts_pedido').attr('href',wts);
                $('#id_usuario_pedido').val(id_usuario);
    
                $('#nombre_dir_pedido').val(nombre_dir_pedido);
                $('#estado_dir_pedido').val(estado_dir_pedido);
                $('#ciudad_dir_pedido').val(ciudad_dir_pedido);
                $('#cp_dir_pedido').val(cp_dir_pedido);
                $('#dir_pedido').val(dir_pedido);
                

                cargarDatosDelEnvio(id_usuario,id_pedido);

                $('.btn-cancelar-pedido-enviado').show();

                $('.noEditablesTrasPago').removeAttr("readonly");
                 
                $('.noEditablesTrasPago').attr("readonly","true"); 
                $('.btn-actualizar-datos-envio-enviado').show();
                   
                
     
                
    
              
    
            }
    
            });
            
        }

    //pedido ya registrado en base de datos (datos del envio)
    function cargarDatosDelEnvio(id_usuario,id_pedido,tienda){

        if (tienda == "Si") {
         var url = 'sistema/php/pedidos/consulta_datos_envio.php';
        }else{
         var url = 'php/pedidos/consulta_datos_envio.php';
        }

        $.ajax({
            type : 'POST',
            url  : url,
            data : {
                    id_usuario: id_usuario,
                    id_pedido: id_pedido 
            },
            beforeSend: function()
            {
            },
            success :  function(response)
            {
                console.log(response);

                var empresa_pedido_pedido = response['empresa_envio'];

           
                var costo_envio_pedido = response['costo_envio'];
                
                var img_pago = response['comprobante_pago']; 
                var numero_guia_pedido = response['numero_guia'];
                var notas_pedido = response['notas'];
                var status = response['status'];
                var id_envio_pedido = response['id'];
                var status_pedido = response['status'];
                var pago  = response['tipo_pago'];
                var Tipoestatus = ['Sin pedidos','En espera de costos de envio','En espera de pago','Pedido pagado, envio pendiente','Pedido enviado','Pedido cancelado'];
                var tiposDePago = ['Efectivo Punto de Venta','Tarjeta Punto de Venta', 'Deposito directo Tienda en linea', 'Pago PayPal Tienda en linea','Pago OpenPay Tienda en linea' ];
                var metodo_pago = tiposDePago[pago];

                if (tienda == "Si") {
                    $('.estatus_pedido').html(Tipoestatus[status_pedido]);
                    $('.empresa_pedido_pedido').val(empresa_pedido_pedido);
                    $('.costo_envio_pedido').val(costo_envio_pedido);
                    $('.numero_guia_pedido').val(numero_guia_pedido);
                    $('.notas_pedido').val( notas_pedido);
                    $('.id_pedido').val(id_envio_pedido);
                    $('.status_pedio').val(status_pedido);

                    if (status == 2 ) {
                        var id_movimiento  = response['id_movimiento'];
                        var des_total = ".total_movimiento";
                        var tabla = ".tabla_articulos_pedido";
                        cargarTablaElementosMovimiento(id_movimiento,tabla,des_total,tienda);
                    }
                    if (img_pago == null) {
                        $('#comprobante_pago_pedido_img').hide();
                        $('#upload_compPago').show();
                       } else{
                        $('#comprobante_pago_pedido_img').show();
                        $('#comprobante_pago_pedido_img').attr('src','sistema/images/comprobantes_pago/'+ img_pago);
                        $('#upload_compPago').hide();
                       }

                    if (status > 2 ) {
                        var id_movimiento  = response['id_movimiento'];
                        var des_total = ".total_movimiento";
                        var tabla = ".tabla_articulos_pedido";
                        cargarTablaElementosMovimiento(id_movimiento,tabla,des_total,tienda);
                    }

                   }else{
                    $('#estatus_pedido').html(Tipoestatus[status_pedido]);
                    $('#empresa_pedido_pedido').val(empresa_pedido_pedido);
                    $('#costo_envio_pedido').val(costo_envio_pedido);
                    $('#numero_guia_pedido').val(numero_guia_pedido);
                    $('#notas_pedido').val( notas_pedido);
                    $('#id_pedido').val(id_envio_pedido); 
                    $('#status_pedio').val(status_pedido);
                    $('#metodo_pago').val(metodo_pago);

                    if (img_pago == null) {
                        $('#comprobante_pago_pedido_img').hide();
                        $('#upload_compPago').show();
                       } else{
                        $('#comprobante_pago_pedido_img').show();
                        $('#comprobante_pago_pedido_img').attr('src','images/comprobantes_pago/'+ img_pago);
                        $('#upload_compPago').hide();
                       }

                    if (status > 2 ) {
                        var id_movimiento  = response['id_movimiento'];
                        var des_total = ".total_movimiento";
                        var tabla = "#tabla_articulos_pedido";
                        cargarTablaElementosMovimiento(id_movimiento,tabla,des_total,tienda);
                    }

                   }
                   
                  
                

            }
    
            });
    }
    function cargarTablaMovimientosEfectivo(div_destino,limite){
      
        $.get('php/punto_venta/consulta_movimientos_efectivo.php', {limite:limite},
        function(data) {
           console.log(data);
           var tabla = "<table id='tabla_movimientos_efectivos' class='table' style='width: 100%;'>" +
           "<thead><td>Fecha</td><td>Administrador</td><td>Cajero</td><td>Tipo</td><td>Concepto</td><td>Importe</td><td>Acciones</td></thead>"  +
           "<tbody></tbody>" +
           "</table>"; 
             $(div_destino).html(tabla);
            if (data.success) { 
            
                $.each(data, function(index, record) {

                    if ($.isNumeric(index)) {
                       
                        var row = $("<tr data-id='" + record.id + "' role='row' class='odd'/>");
                        
                        var imprimir = "<button   data-id='"+record.id+"' class='imprimir-movimiento-efectivo btn btn-primary'> <i class='fa fa-print'></i> Imprimir</button>";
                        var eliminar = '<button type="button" class="btn-eliminar-movimeinto-efectivo btn btn-danger" data-id=' + record.id + ' ><i class=" fa fa-trash"></i> Borrar</button>';
                    
                        $("<td />").text(record.fecha).appendTo(row); 
                        $("<td />").text(record.nombre_admin).appendTo(row); 
                        $("<td />").text(record.nombre_cajero).appendTo(row); 
                        $("<td />").text(record.tipo).appendTo(row); 
                        $("<td />").text(record.concepto).appendTo(row);
                        $("<td />").text(record.cantidad).appendTo(row); 
                        $("<td />").html(  imprimir +eliminar ).appendTo(row);  

                        row.appendTo("#tabla_movimientos_efectivos");
                    }
                });
 
            } 
            $('#tabla_movimientos_efectivos').DataTable({
                responsive: true
            });
        });


}
   function cargarMovimientosEfectivo(){
        var div = "#div_tabla_movimientos_efectivo";
        var limite = $('#limite-moviemintos-efectivo').val();
        cargarTablaMovimientosEfectivo(div,limite);
    }

    function cargarHistorialPedidos(filtro){

        //reinicio del contenedor
        $("#div_tabla_historial_pedidos").empty();
        var cargando = '<div class="jumbotron"> <h1>Cargando Pedidos <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
        var table_Usuarios = "<table id='tablaPedidos' width='100%' class='table responsive'> <thead><tr>" +
        "<th><i class='fa fa-user'></i> Usuario</th>"+ 
        "<th><i class='fa fa-money'></i> Importe</th>"+ 
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
                console.log(data);
                if (data.success) {
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
                            $("<td />").html(total).appendTo(row); 
                            $("<td />").html(record.estatus).appendTo(row); 
                            $("<td />").html(acciones).appendTo(row); 

                            row.appendTo("#tablaPedidos");




                        }

                    });
                }else{
                    var sindatos = '<div class="jumbotron"> <h1>Sin pedidos  <p>No hay pedidos por el momento.</p>  </div>';
                    $('#tablaPedidos > tbody').html(sindatos);
                }
                //tabla de enventos

                $('#tablaPedidos').DataTable({
                    responsive: true
                });
            },

        });
    }
 
    function tablaUsuarios(mostrar_clientes){
        //reinicio del contenedor
        $("#rowUsers").empty();
        var cargando = '<div class="jumbotron"> <h1>Cargando Usuarios <i class="fa fa-spin fa-refresh"></i> </h1> <p>Por favor espere unos segundos...</p>  </div>';
      
        var table_Usuarios = "<table id='tablaUsuarios' class='table'> <thead><tr>" +
         "<th><i class='fa fa-user'></i> Usuario</th>"+
         "<th><i class='fa fa-envelope'></i> Correo</th>"+
         "<th><i class='fa fa-envelope'></i> Telefono</th>"+
         "<th><i class='fa fa-users'></i> Perfil</th>"+
         "<th><i class='fa fa-edit'></i> Acciones</th>"+
         "</tr></thead><tbody></tbody> </table>";
        $(table_Usuarios).appendTo("#rowUsers");
        $('#tablaUsuarios > tbody').html(cargando);
        $.ajax({
            url: 'php/users/consulta_usuarios.php',
            type: 'post',
            data: {
                mostrar_clientes:mostrar_clientes
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    $.each(data, function(index, record) {
                        if ($.isNumeric(index)) {
                            var row = $("<tr role='row' class='odd'/>");
      
      
                            var borrar = '<button type="button" class="bbu btn btn-danger"    data-nombre="' + record.nombre + '" data-id=' + record.id + '  ><i class="fa fa-trash"></i> Borrar</button>';
                            var permisos  = '<button  data-id=' + record.id + ' type="button" class="editar_datos_usuario btn btn-primary" data-toggle="modal"  data-target=".modal-ed-u" ><i class="editar_datos_usuario fa fa-spin fa-gear"></i> Ver y editar</button>';
                            var foto = '<img width="20em" class="img img-fluid img-circle rounded-circle" src="images/user.png"> ';
                            var status = ["No ha enviado datos", "Datos por revisar", "Aprovado"];
                            
                           
                            if (mostrar_clientes == 1) {
      
                                if (record.verificado == 2) {
                                  var verificado = '<button type="button" class="btn-aprob btn btn-danger" data-status="0" data-id=' + record.id + ' ><i class="fas fa-user-times"></i> Desaprobar</button>';
                                } else if(record.verificado == 1){
                                  var verificado = '<button type="button" class="btn-aprob btn btn-success" data-status="2" data-id=' + record.id + ' ><i class="fas fa-user-check"></i> Verificar</button>';
                                } else{
                                  var verificado = '';
                                }
      
                            } else{
                                    var verificado = '';
                            }
      
      
      
                          $("<td />").html(foto + record.nombre ).appendTo(row);
                          $("<td />").text(record.mail).appendTo(row);
                          $("<td />").text(record.telefono).appendTo(row);
                          $("<td />").text(record.perfil).appendTo(row);
                          $("<td />").html(permisos + borrar + verificado).appendTo(row);
      
                          row.appendTo("#tablaUsuarios");
      
      
      
      
                        }
      
                    });
                }
                //tabla de enventos
      
                 $('#tablaUsuarios').DataTable({
                    responsive: true
                });
            },
      
        });
      
      
      };

    function registrarUsuario(){
          //datos
    var mostrar_clientes_tambien = $('#mostrar_clientes_tambien').val();
    var nombre = $('#first-name').val();
    var apellidos = $('#last-name').val();
    var clave = $('#password').val();
    var rclave = $('#password2').val();
    var correo = $('#mail').val();
    var telefono = $('#tel').val();
    var perfil = $('#asignar_perfil_usuario').val();
    var nivel_cliente = $('#nivel_perfil_usuario').val();
    var razon_social = $('#razon_social').val();
    var rfc = $('#razon_social').val();
    //permisos

    if (nombre == "") {
        $('#parsley-id-5573').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    } else if (apellidos == "") {
        $('#parsley-id-5573').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-0473').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    }  else if (clave == "") {
        $('#parsley-id-0474').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-7811').html("<span class='badge alert-danger'><i class='fa fa-warning'></i> Este campo es requerido</span>");
    } else if (clave != rclave) {
        $('#parsley-id-7811').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-7812').html("<span class='badge alert-warning'><i class='fa fa-exclamation-circle'></i> Las contraseñas no coinciden</span>");
    } else {
        $('#parsley-id-5573').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-0474').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-0473').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-7811').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");
        $('#parsley-id-7812').html("<span class='badge alert-info'><i class='fa fa-check'></i>Ok todo Bien</span>");

        $.post('php/users/registrar_usuarios.php', {
                nombre: nombre,
                apellidos: apellidos,
                clave: clave,
                rclave: rclave,
                telefono: telefono,
                correo: correo,
                razon_social:razon_social,
                rfc:rfc,        
                nivel_cliente:nivel_cliente,
                perfil : perfil
            },
            function(respuesta) {

              
                    alert(respuesta);

                    $('.badge').html('');
                    $('.form_ru').html('');
                    $('.form_ru').val('');
                    tablaUsuarios(mostrar_clientes_tambien); 


            });

    }

    }

