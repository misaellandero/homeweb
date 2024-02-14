 <br>
          <div id="alertasSistema"></div>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn  <?php if ($datosUsuario[0]['pedido'] < 1) {
             echo 'active';  
            } else{echo 'disabled'; }  ?> " id="pills-bolsa-tab" data-toggle="pill" href="#pills-bolsa" role="tab" aria-controls="pills-bolsa" aria-selected="true"><i class="fas fa-shopping-bag"></i> Aparta productos</a>
          </li>
          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn <?php if ($datosUsuario[0]['pedido'] == 1 || $datosUsuario[0]['pedido'] == 2 ) {
              echo 'active'; 
            }else{ echo 'disabled';} ?> " id="pills-pago-tab" data-toggle="pill" href="#pills-pago" role="tab" aria-controls="pills-pago" aria-selected="false" aria-disabled="true"><i class="fas fa-credit-card"></i>  Pagar</a>
          </li>

          <li class="nav-item">
            <a class="rounded-pill btn-lg btn-primary btn <?php if ($datosUsuario[0]['pedido'] == 3) {
              echo 'active'; 
            }else{ echo 'disabled';} ?> " id="pills-guia-tab" data-toggle="pill" href="#pills-guia" role="tab" aria-controls="pills-guia" aria-selected="false" aria-disabled="true"><i class="fas fa-truck"></i>  Recibir</a>
          </li>
         
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show  <?php if ($datosUsuario[0]['pedido'] < 1) {
              echo 'active'; 
            } else{ echo 'disabled';}  ?> " id="pills-bolsa" role="tabpanel" aria-labelledby="pills-bolsa-tab">
          <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 1 de 3 </span> </h3>Haga click en <button type="button" href="#" class="crearPedido btn btn-danger rounded-pill"> <i class="fas fa-dolly-flatbed"></i> Crear Pedido</button>
              para generar un pedido y cotizar el envio, despues de eso podras elegir tu metodo de pago y los meses a los que quieres adquirir el producto.</li>
              
          </ol>
        </nav>
       
          <br>
            <?php
            
            if ($datosUsuario[0]['pedido'] < 1) {
              echo '<div class="table-responsive">
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
           
            </div>';
            }

            ?>
          </div>
          <div class="tab-pane fade show <?php if ($datosUsuario[0]['pedido'] == 1 || $datosUsuario[0]['pedido'] == 2) {
              echo 'active'; 
            } else {echo 'disabled'; }  ?> " id="pills-pago" role="tabpanel" aria-labelledby="pills-pago-tab">
          <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 2 de 3 </span> </h3> Elija metodo de pago</li>
          </ol>
         </nav> 
         <?php 
           if ($datosUsuario[0]['pedido'] == 1) {
            echo '
            <br>  
            <div class="alert alert-info alert-dismissible fade show" role="alert">
            <strong><i class="fa fa-exclamation-triangle"></i> Pedido en revisión </strong> 
            Cuando tu pedido sea aprobado te enviaremos un mensaje, si gustas puedes contactarnos en nuestros chats.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            '; 

            echo '<h4>Datos envio</h4>
            <div class="form-group datos-envio">
            <form id="datos_envio_pedido">
            
                 <input type="text" class="form-control id_pedido" name="id_pedido" hidden="true"> 
                 <input type="text" class="form-control id_usaurio_pedido" name="id_usaurio_pedido" hidden="true"> 
                 <input type="text" class="form-control status_pedio" name="status_pedido" hidden="true"> 
                <label for="">Empresa de paqueteria</label>
                <input type="text" class="form-control empresa_pedido_pedido" name="empresa_pedido" readonly> 
                <label for="">Costo envio</label>
                <input type="text" class="form-control costo_envio_pedido" name="costo_envio_pedido" readonly> 
                    
               <div class="datos-actulizar"> 
                <label for="">Numero de guia</label>
                <input type="text" class="form-control numero_guia_pedido" name="numero_guia_pedido"   readonly> 
                <label for="">Notas para el cliente</label>
                <input type="text" class="form-control notas_pedido" name="notas_pedido"   readonly> 
                </div>
                <br>
            </form>
            </div>
      <h4>Productos del Pedido</h4>              
              <table class="tabla_articulos_pedido_bolsa table" width="100%">
                <thead> 
                  <tr role="row">
                  <th><i class="fa fa-cube"></i> Producto</th>
                  <th><i class="fa fa-cubes"></i> Cantidad</th>
                  <th><i class="fa fa-money"></i> Precio</th> 
                  <th><i class="fa fa-edit"></i> Subtotal</th>
                  <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
                </tr> 
                </thead>
                <tbody>

                </tbody>
              </table> 
              <div class="alert alert-primary" role="alert">
              <p class=""> ¿<i class="fas fa-headset"> </i> Necesitas ayuda con tu pedido? contactanos para recibir soporte técnico.</p>
              <a href="tel:'.$datosEmpresa[0]['tels'].'" class="btn btn-secondary"><i class="fa fa-phone"></i> Llamar</a>
              <a href="mailto:'.$datosEmpresa[0]["mail"].'" class="btn btn-light"><i class="fa fa-envelope"></i> Escribenos</a>
              </div>';
          } elseif ($datosUsuario[0]['pedido'] == 2){
            echo '
            <br>  
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong><i class="fa fa-exclamation-triangle"></i> En espera de pago</strong> 
            Tu pedido ha sido aprobado y el costo de envio ha sido proporcionado para que hagas tu pago.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            ';

            include 'sistema/php/inventarios/consulta_total_de_apartados.php';
            $total_sin_envio = totalApartados($id_usuario,$conn);
            $status = $id_perfil = $datosUsuario[0]['pedido'];
            $total = totalApartadosYEnvio($status,$id_usuario,$conn);

            $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
            
            $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
            $totalpaypalNormal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
            $totalpaypalNormal =  $totalpaypalNormal - ($totalpaypalNormal * .1566);
           
            $totalOpenpay_0  = calcularPrecioConComisionOpenPay($total,$comisionFijaOpenPay,$comisionOpenPay_0,$conn);
            $totalOpenpay_3  = calcularPrecioConComisionOpenPay($total,$comisionFijaOpenPay,$comisionOpenPay_0 + $comisionOpenPay_3,$conn);
            $totalOpenpay_6  = calcularPrecioConComisionOpenPay($total,$comisionFijaOpenPay,$comisionOpenPay_0 + $comisionOpenPay_6,$conn);
            $totalOpenpay_9  = calcularPrecioConComisionOpenPay($total,$comisionFijaOpenPay,$comisionOpenPay_0 + $comisionOpenPay_9,$conn);
            $totalOpenpay_12 = calcularPrecioConComisionOpenPay($total,$comisionFijaOpenPay,$comisionOpenPay_0 + $comisionOpenPay_12,$conn);

            $openpay_1 = $totalOpenpay_0; 
            $openpay_3 = round(($totalOpenpay_3/3),2);
            $openpay_6 = round(($totalOpenpay_6/6),2);
            $openpay_9 = round(($totalOpenpay_9/9),2);
            $openpay_12 = round(($totalOpenpay_12/12),2);

            echo '<h4>Datos envio</h4>
            <div class="form-group datos-envio">
            <form id="datos_envio_pedido">
            
                 <input type="text" class="form-control id_pedido" name="id_pedido" hidden="true"> 
                 <input type="text" class="form-control id_usaurio_pedido" name="id_usaurio_pedido" hidden="true"> 
                 <input type="text" class="form-control status_pedio" name="status_pedido" hidden="true"> 
                <label for="">Empresa de paqueteria</label>
                <input type="text" class="form-control empresa_pedido_pedido" name="empresa_pedido" readonly> 
                <label for="">Costo envio</label>
                    <input type="text" class="form-control costo_envio_pedido" name="costo_envio_pedido" readonly> 
                    
                <div class="datos-actulizar"> 
                <label for="">Numero de guia</label>
                <input type="text" class="form-control numero_guia_pedido" name="numero_guia_pedido"   readonly> 
                <label for="">Notas para el cliente</label>
                <input type="text" class="form-control notas_pedido" name="notas_pedido"   readonly> 
                </div>
                <br>
            </form>
            </div>
      <h4>Productos del Pedido</h4>              
              <table class="tabla_articulos_pedido_bolsa table" width="100%">
                <thead> 
                  <tr role="row">
                  <th><i class="fa fa-cube"></i> Producto</th>
                  <th><i class="fa fa-cubes"></i> Cantidad</th>
                  <th><i class="fa fa-money"></i> Precio</th> 
                  <th><i class="fa fa-edit"></i> Subtotal</th>
                  <th><button type="button" class="close close-elemento-movimientos"><span aria-hidden="true">×</span></button></th>
                </tr> 
                </thead>
                <tbody>

                </tbody>
              </table> 

              <h3>Total $'.$total.'</h3>
              <input type="text" id="total_mas_envio" class="form-control total_pedido_mas_envio" name="total"  value="'.$total.'"  hidden="true"> 
              <input type="text" id="total_mas_envio_paypal" class="form-control total_pedido_mas_envio_paypal" name="total"  value="'.$totalpaypal.'"  hidden="true"> 
              <input type="text" id="total_mas_envio_paypal_normal" class="form-control total_pedido_mas_envio_paypal" name="total"  value="'.$totalpaypalNormal.'"  hidden="true"> 
              <input type="text" id="total_mas_envio_openpay" class="form-control total_pedido_mas_envio_openpay" name="total"  value="'.$total.'"  hidden="true"> 
              
              <br>
              <br>
              <div class="alert alert-primary" role="alert">
              <p class=""> ¿<i class="fas fa-headset"> </i> Necesitas ayuda con tu pedido? contactanos para recibir soporte técnico.</p>
              <a href="tel:'.$datosEmpresa[0]['tels'].'" class="btn btn-secondary"><i class="fa fa-phone"></i> Llamar</a>
              <a href="mailto:'.$datosEmpresa[0]["mail"].'" class="btn btn-light"><i class="fa fa-envelope"></i> Escribenos</a>
             </div>';
    
             if ($verificado < 2) {
              echo '  
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong><i class="fa fa-exclamation-triangle"></i> No has verificado tu identidad </strong> 
              Verifica tu identidad subiendo una copia de tu INE para poder comprar a meses sin intereses.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              '; 
              }
             if ($datosTienda[0]["paypal"] == 1) {
              $paypalActive = "";
             } else {
              $paypalActive = "hidden";
             }


             if ($datosTienda[0]["openpay"] == 1) {

              $openpayActive = "";
             } else {
              $openpayActive = "hidden";
             }


            echo '
            <br>
            <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" name="acept_terminos"  id="acepto_terminos">
            <label class="form-check-label" for="exampleCheck1">
            <h5> He leído y acepto los <a class="terminos"  data-toggle="modal" data-target="#modal-terminos" href="#" > <i class="fa fa-file-text"> Terminos y condiciones</i></a> de uso.
            </h5>
            </label>
            </div>
            <div class="pagos">
            <br>
            <h4>Elije tu metodo de pago</h4>
            
            <ul class="nav nav-tabs"  role="tablist">
             <li class="nav-item" '.$paypalActive.'>
             <a class="nav-link" id="metodo-paypal-tab" data-toggle="tab" href="#metodo-paypal" role="tab" aria-controls="metodo-paypal" aria-selected="true">Paypal</a>
             </li>
             <li class="nav-item" '.$openpayActive.'>
             <a class="nav-link" id="metodo-openpay-tab" data-toggle="tab" href="#metodo-openpay" role="tab" aria-controls="metodo-openpay" aria-selected="false">Openpay</a>
             </li>
             <li class="nav-item">
             <a class="nav-link active" id="metodo-deposito-directo-tab" data-toggle="tab" href="#metodo-deposito-directo" role="tab" aria-controls="metodo-deposito-directo" aria-selected="false">Deposito directo</a>
             </li>
              
           </ul>
            <div class="tab-content" id="myTabContent">
             <div class="tab-pane fade " id="metodo-paypal" role="tabpanel" aria-labelledby="metodo-paypal-tab">
             <br>
               <ul class="list-group">
               <li class="list-group-item active">Mensualidades PayPal</li>
               <li class="list-group-item" ><span id="1p"></span></li> 
               <li class="list-group-item" ><span id="3m"></span></li> 
               <li class="list-group-item" ><span id="6m"></span></li> 
               <li  class="list-group-item" ><span id="9m"></span></li> 
               <li  class="list-group-item" ><span id="12m"></span></li> 
               <ul>
               <br>
                <br>
               <div id="paypal-button"></div>
             </div>
             <div class="tab-pane fade active show" id="metodo-deposito-directo" role="tabpanel" aria-labelledby="metodo-deposito-directo-tab">
             <br>
             <ul class="list-group">
              <li class="list-group-item active">Un solo pago</li>
              <li class="list-group-item" >1 pago de <strong>$'.$total.'  MXN</strong></li>
              <br>
              <div class="tab-content" >
               <h5> <strong> '.$datosTienda[0]['efectivo_banco'].'</strong></h5>
               <h3> Proporciona el siguiente numero de tarjeta en el banco o en un oxxo</h3>
               
               <p>'.$datosTienda[0]['efectivo_tar'].'</p>
              </div>
              <p>Adjunta una imagen en formato jpg o png de tu ticket de oxxo o del banco. </p>
              <form id="upload_pago_efectivo" class="col-12 dropzone" action="sistema/php/pedidos/upload_comprobante_pedido.php" style="border: 1px solid #e5e5e5; height: 300px;">
                          <input name="total_pedio" value="'.$total.'" class="total_pedio" hidden="true"> 
													<input name="status_pedio"  value="2" hidden="true"> 
                         </form>
                         
              <ul>
             <br>
              <br>
             </div>
             <div class="tab-pane fade " id="metodo-openpay" role="tabpanel" aria-labelledby="metodo-openpay-tab">
                              <br>
                              <ul class="list-group">
                              <li class="list-group-item active">Mensualidades OpenPay</li>
                              <li class="list-group-item" > 1 pago de <strong>$'.$openpay_1.' MXN </strong> </li>  
                              <li class="list-group-item" > 3 meses de <strong>$'.$openpay_3.' MXN </strong> </li> 
                              <li class="list-group-item" > 6 meses de <strong>$'.$openpay_6.' MXN </strong> </li> 
                              <li class="list-group-item" > 9 meses de <strong>$'.$openpay_9.' MXN </strong> </li> 
                              <li class="list-group-item" > 12 meses de <strong>$'.$openpay_12.' MXN </strong> </li> 
                              <ul>
                              <br> 
                              <br>
                              <h4>Tarjetas Aceptadas </h4>
                              <div class="row">
                                <div class="col-6">
                                  <h5>Tarjetas de Credito</h5>
                                  <img src="sistema/images/cards1.png" alt="">
                                </div>
                                <div class="col-6">
                                  <h5>Tarjetas de Debito</h5>
                                  <img src="sistema/images/cards2.png" alt="">
                                </div>
                              </div>
                              
																<form action="#" method="POST" id="payment-form">
																		<input type="hidden" name="token_id" id="token_id">
																		<input type="hidden" name="use_card_points" id="use_card_points" value="false">
																				<div class="row">
																						<div class="col-6 form-group">
                                                <label><h5>Nombre del titular</h5></label>
                                                <input class="form-control" type="text" name="holder" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name">
																						</div>
																						<div class="col-6 form-group">
                                                <label><h5>Número de tarjeta</h5></label>
                                                <input class="form-control" type="text" name="card" autocomplete="off" data-openpay-card="card_number"></div>
																						</div>

																						<div class="row">
																								<div class="col-6 form-group">
																										<label><h5>Fecha de expiración</h5></label>
                                                    <div class="col-6">
                                                    <input class="form-control" type="text" name="month" placeholder="Mes" data-openpay-card="expiration_month"></div>
                                                    <div class="col-6">
                                                    <input class="form-control" type="text" name="year" placeholder="Año" data-openpay-card="expiration_year"></div>
																								</div>
                                                <div class="cvv form-group col-6">
                                                  <label>Código de seguridad</label>
                                                  <div class="sctn-col half l">
                                                  <input class="form-control" type="text" name="cvv" placeholder="3 0 4 dígitos" autocomplete="off" data-openpay-card="cvv2">
                                                  <br>
                                                  <img src="sistema/images/cvv.png" alt="">
                                                </div>
																								</div>
																						</div>
																						<div class="openpay"><div class="logo">Transacciones realizadas vía: <img src="sistema/images/openpay.png" alt=""></div>
																						<div class="shield">Tus pagos se realizan de forma segura con encriptación de 256 bits <img src="sistema/images/security.png" alt=""></div>
																				</div>
                                        <br> 
                                        <select id="meses_openpay" class="form-control">
                                        <option value="1" >1 Pago</option>
                                        <option value="3" >3 Meses</option>
                                        <option value="6" >6 Meses</option>
                                        <option value="9" >9 Meses</option>
                                        <option value="12" >12 Meses</option>
                                        </select>
                                        <br>
																				<button type="submit" id="btn-pagar" class="btn btn-success btn-lg" name="button"><i class="icon fa fa-credit-card"></i> Pagar con tarjeta</button>

																</form>

														</div>
           </div>
           </div>';

          }  
         ?>
         
          </div> 
          <div class="tab-pane fade show <?php if ($datosUsuario[0]['pedido'] > 2) {
              echo 'active'; 
            } else {echo 'disabled'; }  ?> " id="pills-pago" role="tabpanel" aria-labelledby="pills-pago-tab">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"> <h3> <span class="badge badge-secondary">Paso 3 de 3 </span> </h3> Tu pedido esta en camino</li>
            </ol>
          </nav> 
          <?php
              if ($datosUsuario[0]['pedido'] == 3){
                echo '
                <br>  
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                <strong><i class="fa fa-exclamation-triangle"></i> ¡Recibimos tu pago!</strong> 
                  En cuanto tengamos tu numero de guia te avisaremos.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                ';
              }
              ?>
         </div>
        </div>
   