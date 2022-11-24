<!-- Ventana Crear articulo --> 
 
<div class="modal fade bs-example-modal-sm" tabindex="-1" id="modal_ver_articulos" role="dialog"  aria-hidden="true">
    <div class="modal-dialog  modal-xl">
        <div class="modal-content"> 
            <div class="modal-header">
              <h1 class="modal-title" id="myModalLabel"> Detalles Artículo    </h1>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>

            </div>

            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div id="contenedor-imagenes" class="carousel-inner">
                                <div class="carousel-item active">
                                <img src="..." class="d-block w-100" alt="...">
                                </div>
                             
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                            </div>
                        </div>
                        <div class="col-md-6"> 
                        <h1 id="nombreArticulo">Nombre del producto</h1> 
                        <?php 
                          if (($datosTienda[0]['modo_tienda']) == "tienda") { 
                              echo '
                                 <h1 id="desCortaArticulo">Nombre del producto</h1> 
                                <input type="number" id="id_articulo" hidden="true">
                                <input type="number" id="compuesto_articulo" hidden="true"> 
                                <div id="datos-extras-articulo"></div> 
                                <p id="ExistenciaArticulo"></p>
                                <h2><span class="badge badge-secondary">$ <span id="PrecioArticulo"></span></span></h2>
                               ';
                         
                        }  else {
                            echo '
                                 <h1 id="desCortaArticulo">Nombre del producto</h1> 
                                 <div id="detalles_largo_resume"></div>
                                <input type="number" id="id_articulo" hidden="true"> 
                                 
                                <div id="datos-extras-articulo"></div>  
                                ';
                        }
                        ?>
                      
                      
                        
                        </div>
                        <div class="col-12">
                        <?php 
                          if (($datosTienda[0]['modo_tienda']) == "tienda") { 
                              echo '
                                <br>
                               <h2>Detalles</h2>
                                <div id="detalles_largo">';
                         
                        }  else {
                            echo '
                                
                                <br>
                                <div id="detalles_largo">
                                ';
                        }
                        ?>
                        </div>
                        </div>
                    </div>
                </div>
               
            </div>

            <div class="modal-footer">
                <button type="button"   class="btn btn-light" data-dismiss="modal" ><i class="text-danger fa fa-times-circle"></i> Cerrar </button> 
                <?php 
                          if (($datosTienda[0]['modo_tienda']) == "tienda") { 
                            echo '<button type="button" id="modal-detalles-añadir-producto" class="btn btn-primary" data-dismiss="modal" > <i class="fas fa-plus-square"></i>  Añadir a bolsa</button> 
                            ';
                          } else {

                          }
                ?>
                
            </div>

        </div>
    </div>
</div>
<!-- Fin Ventana articulo-->