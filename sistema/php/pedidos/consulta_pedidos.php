<?php
header('Content-Type: application/json');
include '../inventarios/consulta_total_de_apartados.php';
include '../inventarios/consulta_precio_e_impuestos.php';
		try {
			$conn = require_once '../conexion.php';  
            $sql = " SELECT * FROM `usuarios_usuarios` WHERE `pedido` > 0 ";
			 

			$result = $conn->prepare($sql) or die ($sql);

			if (!$result->execute()) return false;

			if ($result->rowCount() > 0) {
				$json = array();
				while ($row = $result->fetch()) {
                $id_usuario = $row['id'];
                $total =  totalApartados($id_usuario,$conn);
                
                $status =  [
					0 => "Sin pedidos",
					1 => "En espera de costos de envio",
					2 => "En espera de pago",
					3 => "Pedido pagado, envio pendiente."
				];

                $pedido = $row['pedido'];

					$json[] = array(
						'id' => $id_usuario,
						'nombre' => $row['nombre'],
						'apellido' => $row['apellido'],
						'pass' => $row['password'], 
						'name' => $row['nombre'],
						'mail' => $row['email'],
                        'telefono' => $row['telefono'],
						'total' => $total,
						'status_id' => $pedido,
                        'estatus' => $status[$pedido],
						'apellido' => $row['apellido']
					);
				}

				$json['success'] = true;

				echo json_encode($json);
			}
		} catch (PDOException $e) {
			echo 'Error: '. $e->getMessage();
		}

?>
