<?php
 
 
	$conn = require_once '../conexion.php';
	include '../inventarios/funciones_articulo.php';

    include '../pago/calcular_comision_paypal.php';
    include '../configuracion/cargar_datos_empresa.php';

    $datosEmpresa = cargarDatosEmpresa($conn);
    $datosTienda = cargarDatosTienda($conn); 

    $comisionFijaPayPal = $datosTienda[0]['paypal_com_fija'];
    $comisionPorciento = $datosTienda[0]['paypal_com_tarjeta'];
 
                $id_producto = ($_POST['id_producto']);  
                $dark = ($_POST['dark']); 
                $datosArticulos =  datosArticulo($id_producto, $conn); 
                $bk = "darkBK.png";
                $bkl = "ligthBK.png";
                $logol = "logoForDark.png";
                $logo = "logoForLigth.png";
                $tema = "dark";
                $subTema = "Subdark";
                $temal = "ligth";
                $subTemal = "Subligth";
                $total = $datosArticulos[0]["precio"];
                $Paypallogo = "paypalForDark.png";
                $Paypallogol = "paypalForLigth.png";
                $totalpaypal = calcularPrecioConComision($total,$comisionFijaPayPal,$comisionPorciento,$conn);
                /*$publicidad = ('<p>'.$datosArticulos[0]["nombre"].'</p> 
                 <p>' .$datosArticulos[0]["des_corta"].'</p> 
                 <p> Envio 🚚 gratis 🥳  </p>  
                 <p> a todo el pais 🇲🇽  </p>  
                 <p> Garantia de un año </p>  
                 <p> o Paga $'.round(($totalpaypal/12),2).'MXN a 12 meses con paypal </p>  
                 <p> vista www.micel.store </p> ');*/
 
?>
 <!DOCTYPE html>
 <html lang="es" dir="ltr">
 	<head>
 		<meta charset="utf-8">
 		<title></title>
			 <!-- Bootstrap core CSS -->

			 <style>

			 @page{
				 size 10in 10in;

			 }

             @font-face {
            font-family: "FredokaOne";
            src: url("images/imagen_promocional/FredokaOne-Regular.otf");
            }

             #bkDiv {
                width:48em;
                max-width:100em;
                height:48em;
                max-height:100em;
                position:relative;
             }
             .imagenLogo{
                position:absolute;
             }
             .imagenPrincipal{
                margin-top: 14em;
                position:absolute;
                width:28em;
                height:28em;
             }

          
             .titulo{
                margin-top: 4em;
                margin-left: 53%;
                position:absolute;
                font-family: "FredokaOne", regular;
                font-size: 250%;
                
             }
             .precio{
                margin-top: 8em;
                margin-left: 12em;
                position:absolute;
                font-family: "FredokaOne", regular;
                font-size: 250%;
                
             }
             .aSolo{
                margin-top: 14em;
                margin-left: 17em;
                position:absolute;
                font-family: "FredokaOne", regular;
                font-size: 150%;
                
             }

             .wb{
                margin-top: 30em;
                margin-left: 38%;
                position:absolute;
                font-family: "FredokaOne", regular;
                font-size: 150%;
                
             }

             .ms{
                margin-top: 27em;
                margin-left: 50%;
                position:absolute;
                font-family: "FredokaOne", regular;
                font-size: 150%;
                
             }
             .desCorta{
                margin-top: 12em;
                margin-left: 17em;
                position:absolute;
                font-family: "FredokaOne", bold;
                font-size: 150%;
                
             }
            .dark {
                color:#fff8f8
                
            }

            .ligth{
                color:#000000
            }

            .Subdark {
                color:#9a9999
                
            }

            .Subligth{
                color:#363535
            }

            .payPalLogo{

            }

			 </style>
			</head>

 	<body>

 	</body>
 </html>

	<html>
	<head> 
<?php

 
 


															$tr = '	';
															$trb = ' ';
													 
                                                            $td = '
                                                            <div id="imagenPromoL">
                                                            <div id="bkDiv" style="background-image:url(images/imagen_promocional/'.$bkl.')">
                                                            <img height="100%" class="imagenLogo" src="images/imagen_promocional/'.$logo.'" alt="">
                                                            
                                                            <img height="100%" class="imagenPrincipal" src="images/fotos_articulos/'.$datosArticulos[0]["imagen"].'" alt="">
                                                            <P class="titulo '.$temal.'"> '.$datosArticulos[0]["nombre"].' </P>
                                                            <span class="aSolo '.$subTemal.'">a solo </span>
                                                            <span class="desCorta '.$temal.'">'.$datosArticulos[0]["des_corta"].'</span>
                                                            <span class="precio '.$temal.'">$'.$datosArticulos[0]["precio"].'MXN </span>
                                                            <span class="ms '.$temal.'">o Paga $'.round(($totalpaypal/12),2).'MXN a 12 meses con </span>

                                                            <span class="wb '.$subTemal.'">'.$datosEmpresa[0]['web'].'</span>
                                                            <img height="100%" class="payPalLogo" src="images/imagen_promocional/'.$Paypallogol.'" alt=""> 
                                                            </div>
                                                         </div>  '.$publicidad.' ';

                                                            $tdd ='
                                                            <div id="imagenPromoD">
                                                                     <div id="bkDiv" style="background-image:url(images/imagen_promocional/'.$bk.')">
                                                                    <img height="100%" class="imagenLogo" src="images/imagen_promocional/'.$logol.'" alt="">
                                                                    
                                                                    <img height="100%" class="imagenPrincipal" src="images/fotos_articulos/'.$datosArticulos[0]["imagen"].'" alt="">
                                                                    <P class="titulo '.$tema.'"> '.$datosArticulos[0]["nombre"].' </P>
                                                                    <span class="aSolo '.$subTema.'">a solo </span>
                                                                    <span class="desCorta '.$tema.'">'.$datosArticulos[0]["des_corta"].'</span>
                                                                    <span class="precio '.$tema.'">$'.$datosArticulos[0]["precio"].'MXN </span>
                                                                    <span class="ms '.$tema.'">o Paga $'.round(($totalpaypal/12),2).'MXN a 12 meses con </span>

                                                                    <span class="wb '.$subTema.'">'.$datosEmpresa[0]['web'].'</span>
                                                                    <img height="100%" class="payPalLogo" src="images/imagen_promocional/'.$Paypallogo.'" alt=""> 
                                                                    </div> 
                                                            </div>  
                                                             '.$publicidad.' 
														    ';

                                if ($dark == "true") {
                                    $boletos = $boletos.$tr.$tdd.$trb;
                                }else{
                                    $boletos = $boletos.$tr.$td.$trb;
                                }
								

					 

						$html2 ='</body></html>';
						$html = $html.$boletos.$html2;


						echo $html;


 






?>
