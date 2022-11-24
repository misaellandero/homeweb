<?php

class PaypalExpress{

   const paypalURL = "https://api.paypal.com";
   //const paypalClientID  = 'AcieaxHeJbhBGb1olIangnAReC9pbNjSdRLJRXwVTP-X6fmniyKybQSDrx3y2ETX4Dj9g3a8zvwBm4sz';
   //const paypalSecret   = 'ECKmzpVn-4yeKOeCacMfZgt2iwNN0yUVxZ_-hqHXF6bujoXQLIHycg4zHcfRe08UHgxWAYHhk92X9R_I';


    public function executeThePayment($paymentID,$payerID,$total,$paypalClientID,$paypalSecret){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::paypalURL."/v1/payments/payment/".$paymentID."/execute");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERPWD,$paypalClientID.":".$paypalSecret);
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
                                "total":'.$total.',
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

    public function Setupthepayment($total,$paypalClientID,$paypalSecret){

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
                            "return_url":"http://localhost:8888/filavip.mx/index.php",
                            "cancel_url":"http://localhost:8888/filavip.mx/index.php"
                          },
                          "payer":{
                            "payment_method":"paypal"
                          },
                          "transactions":[
                            {
                              "amount":{
                                "total":'.$total.',
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
