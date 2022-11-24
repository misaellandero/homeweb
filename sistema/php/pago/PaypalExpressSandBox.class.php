<?php

class PaypalExpress{

   const paypalURL = "https://api.sandbox.paypal.com";
   const paypalClientID  = 'Abbn8ekpCn589HtRk1wfKm4s4M9qBW8z1b81QtPT2meNupzhXZXP4WiXCOcLO7tIbUX4rRbxyZYVT_i2';
   const paypalSecret   = 'ENZfMD8OSZCZ3iJIVrKgbxkwKiKWEp8iT55bUxzKpAM2wOs-WdQoH3Obf8jceNynWW8W18obDYYjTJD5';


    public function executeThePayment($paymentID,$payerID,$total_boletos,$paypalClientID,$paypalSecret){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::paypalURL."/v1/payments/payment/".$paymentID."/execute");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERPWD, $paypalClientID.":".$paypalSecret);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json'
        ));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $data = '{
                            "payer_id": "'.$payerID.'",

                          "transactions":[
                            {
                              "amount":{
                                "total":'.$total_boletos.',
                                "currency":"MXN"
                              }
                            }
                          ]
                        }';

        curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $response = curl_exec($ch);

        if(empty($response)){
            return false;
            $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            var_dump($httpStatusCode);
        }else{
             // Transaction data
          return $response;
            /*$result = json_decode($response, true);
            return $result['id'];*/
        }

        curl_close($ch);

    }

    public function Setupthepayment($total_boletos,$paypalClientID,$paypalSecret){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::paypalURL."/v1/payments/payment");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERPWD,$paypalClientID.":".$paypalSecret);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json'
        ));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $data = '{
                          "intent":"sale",
                          "redirect_urls":{
                            "return_url":"http://localhost:8888/inventario_punto_venta//index.php",
                            "cancel_url":"http://localhost:8888/inventario_punto_venta//index.php"
                          },
                          "payer":{
                            "payment_method":"paypal"
                          },
                          "transactions":[
                            {
                              "amount":{
                                "total":'.$total_boletos.',
                                "currency":"MXN"
                              }
                            }
                          ]
                        }';

        curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $response = curl_exec($ch);

        if(empty($response)){
            return false;
            $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            var_dump($httpStatusCode);
        }else{
             // Transaction data
          return $response;
            /*$result = json_decode($response, true);
            return $result['id'];*/
        }

        curl_close($ch);

    }

}
?>
