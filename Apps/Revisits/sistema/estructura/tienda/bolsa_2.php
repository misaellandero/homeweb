<br>
<div id="alertasSistema"></div>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn  active" id="pills-bolsa-tab" data-toggle="pill" href="#pills-bolsa" role="tab" aria-controls="pills-bolsa" aria-selected="true"><i class="fas fa-shopping-bag"></i> Aparta productos</a>
          </li>

          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn    " id="pills-dir-tab" data-toggle="pill" href="#pills-direc" role="tab" aria-controls="pills-direc" aria-selected="false" aria-disabled="true"><i class="fas fa-home"></i> Selecciona Dirección</a>
          </li>
        
          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn    " id="pills-pago-tab" data-toggle="pill" href="#pills-pago" role="tab" aria-controls="pills-pago" aria-selected="false" aria-disabled="true"><i class="fas fa-credit-card"></i>  Pagar</a>
          </li> 

          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn   " id="pills-guia-tab" data-toggle="pill" href="#pills-guia" role="tab" aria-controls="pills-guia" aria-selected="false" aria-disabled="true"><i class="fas fa-truck"></i>  Recibir</a>
          </li> 

          
</ul>

<div class="tab-content" id="pills-tabContent">

  <div class="tab-pane fade show  active" id="pills-bolsa" role="tabpanel" aria-labelledby="pills-bolsa-tab">
    <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 1 de 4 </span> </h3>Haga click en <button type="button" href="#" class="crearPedido btn btn-danger rounded-pill"> <i class="fas fa-dolly-flatbed"></i> Crear Pedido</button>
              para generar un pedido y cotizar el envio, despues de eso podras elegir tu metodo de pago y los meses a los que quieres adquirir el producto.</li>
           </ol>
    </nav>

    <br>
      <div class="table-responsive">
              <table id="tabla_tikets" width="100%" class="table table-striped table-bordered">
                  <thead>
                    <tr role="row">
                      <th><i class="fa fa-cube"></i> Producto</th>
                      <th><i class="fa fa-cubes"></i> Cantidad</th>
                      <th><i class="fa fa-money"></i> Precio</th> 
                      <th><i class="fa fa-edit"></i> Subtotal</th>
                      <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
                    </tr>
                  </thead>
              </table>
              <p>Aqui apareceran los articulos conforme los vayas añadiendo a tu compra, estos articulos estan apartados por 30min despues de lo cual si no confirmas tu pedido seran liberados para que otros usuarios los puedan adquirir.</p>
     
              <hr class="my-4">
              <input class="total_movimiento" id="total_venta" type="number" hidden="true">
              <h2 > <span class="badge badge-pill badge-success ">    Total productos $<span class="total_movimiento"></span> MXN</span> </h2> 
              <button href="#"  type="button" class="crearPedido btn btn-lg btn-danger rounded-pill"> <i class="fas fa-dolly-flatbed"></i> Crear Pedido</button>
              <br>
             <br>
            <br>
           
        </div>

  </div>

  <div class="tab-pane fade show  disabled" id="pills-direc" role="tabpanel" aria-labelledby="pills-direc-tab">
     <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 2 de 4 </span> </h3> Elija su dirección de Envio</li>
          </ol>
    </nav> 
  </div>
 

  <div class="tab-pane fade show  disabled" id="pills-pago" role="tabpanel" aria-labelledby="pills-pago-tab">
  <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 2 de 3 </span> </h3> Elija metodo de pago</li>
          </ol>
    </nav> 
  </div>

  <div class="tab-pane fade show  disabled" id="pills-guia" role="tabpanel" aria-labelledby="pills-guia-tab">
    <p>Envio</p>
  </div>

  
</div>