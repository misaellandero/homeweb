-- -------------------------------------------------------------
-- TablePlus 2.1(204)
--
-- https://tableplus.com/
--
-- Database: tienda_inventarios_db
-- Generation Time: 2019-04-08 16:47:06.4670
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `id_producto` int(11) NOT NULL,
  `existencia` decimal(10,2) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `id_padre` int(11) NOT NULL,
  `id_impuesto` int(11) NOT NULL,
  `id_main_pic` int(11) NOT NULL,
  `codigoBarras` text,
  `disponibilidad_articulo` int(11) DEFAULT NULL,
  `destacado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

CREATE TABLE `articulos_campos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_articulo` int(11) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `val` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

CREATE TABLE `articulos_combo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_articulo` int(11) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `id_combo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE `articulos_imagenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text NOT NULL,
  `texto` text NOT NULL,
  `img` text NOT NULL,
  `id_articulo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `campos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `tipo` int(11) NOT NULL,
  `fijo` int(11) NOT NULL,
  `id_unidad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE `configuraciones_generales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text,
  `rfc` text,
  `dir` text,
  `tels` text,
  `msj` text,
  `mail` text,
  `web` text,
  `fb` text,
  `inst` text,
  `twtr` text,
  `wtsp` text,
  `mgn` text,
  `icon_site` text,
  `logo_empresa` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `configuraciones_tienda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabezera_titulo` text NOT NULL,
  `cabezara_texto` text NOT NULL,
  `img_portada` text NOT NULL,
  `titulo_tienda` text,
  `ver_mas_dir` text,
  `modo_produccion` int(11) DEFAULT NULL,
  `paypal_com_fija` decimal(10,2) DEFAULT NULL,
  `paypal_com_tarjeta` decimal(10,2) DEFAULT NULL,
  `cordenada_mapa` text,
  `paypal` int(11) NOT NULL,
  `paypal_cliente_id_sandbox` text,
  `paypal_secret_sandbox` text,
  `paypal_cliente_id` text,
  `paypal_secret` text,
  `openpay` int(11) DEFAULT NULL,
  `openpay_com_fija` decimal(10,2) DEFAULT NULL,
  `openpay_com_tarjeta_0` decimal(10,2) DEFAULT NULL,
  `openpay_cliente_id_sandbox` text,
  `openpay_secret_sandbox` text,
  `openpay_cliente_id` text,
  `openpay_secret` text,
  `openpay_public_sandbox` text,
  `openpay_public` text,
  `openpay_com_tarjeta_3` decimal(10,2) NOT NULL,
  `openpay_com_tarjeta_6` decimal(10,2) NOT NULL,
  `openpay_com_tarjeta_9` decimal(10,2) NOT NULL,
  `openpay_com_tarjeta_12` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `impuestos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `IVA` int(11) NOT NULL,
  `IEPS` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_usuario` int(11) NOT NULL,
  `detallas` text NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos_articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_movimiento` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_combo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL,
  `concepto` int(11) NOT NULL,
  `costo_total` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `detalles` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `empresa_envio` text,
  `costo_envio` decimal(10,0) DEFAULT NULL,
  `notas` text,
  `id_movimiento` int(11) DEFAULT NULL,
  `numero_guia` int(15) DEFAULT NULL,
  `tipo_pago` int(11) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos_tipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `tipo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `id_unidad` int(11) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `nombre_elemento` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE TABLE `productos_campos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_campo` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `elemento` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `productos_campos_predefinidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_campo` int(11) NOT NULL,
  `predeterminado` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etiqueta` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios_direcciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cp` text,
  `estado` text,
  `ciudad` text,
  `dir` text,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios_modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etiqueta` text NOT NULL,
  `tipo` int(11) NOT NULL,
  `id_padre` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios_perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etiqueta` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios_permisos_perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_perfil` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `permiso` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `apellido` text NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_perfil` int(11) NOT NULL,
  `password` varchar(90) DEFAULT NULL,
  `verificado` int(11) DEFAULT NULL,
  `ine` text,
  `pedido` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

INSERT INTO `articulos` (`id`, `nombre`, `id_producto`, `existencia`, `costo`, `precio`, `compuesto`, `id_padre`, `id_impuesto`, `id_main_pic`, `codigoBarras`, `disponibilidad_articulo`, `destacado`) VALUES ('26', 'iPhone XS Max', '10', '184.00', '15000.00', '20000.00', '0', '0', '3', '13', '1', '1', '1'),
('27', 'iPhone XR', '10', '185.00', '12000.00', '12500.00', '0', '0', '3', '14', '2', '1', '1'),
('28', 'iPhone 8 Plus', '10', '292.00', '12000.00', '12500.00', '0', '0', '3', '15', '3', '1', '1'),
('29', 'iPhone 5', '10', '123.00', '12.00', '15.00', '0', '0', '1', '16', '31231232', '1', '1'),
('30', 'Salchicha Vegana', '9', '123.00', '123.00', '250.00', '0', '0', '4', '0', '12312', '0', '0');

INSERT INTO `articulos_campos` (`id`, `id_articulo`, `id_campo`, `val`) VALUES ('16', '1', '7', '120'),
('17', '1', '5', '8'),
('18', '1', '2', '11'),
('19', '5', '7', '120');

INSERT INTO `articulos_combo` (`id`, `id_articulo`, `cantidad`, `id_combo`) VALUES ('2', '5', '10', '20'),
('5', '13', '12', '19'),
('6', '11', '12', '19'),
('10', '25', '1', '17'),
('11', '24', '1', '17');

INSERT INTO `articulos_imagenes` (`id`, `titulo`, `texto`, `img`, `id_articulo`) VALUES ('10', 'foto_articulo', '', '4foto_articuloraso-carnaval-oro-viejo.jpg', '4'),
('11', 'Jeans de caballero', '', '9Jeans de caballero001G.jpg', '9'),
('12', 'Solo una prueba', '', '11Solo una prueba01.jpg', '11'),
('13', 'iPhone Xs', '32gb', '26iPhoneXs53761334_2323266114588206_1616537849543262208_n.jpg', '26'),
('14', 'foto_articulo', '', '27foto_articulo54277948_2323334844581333_2337480511410143232_n.jpg', '27'),
('15', 'foto_articulo', '', '28foto_articulo53838521_2323313704583447_3231874856295333888_n.jpg', '28'),
('16', 'foto_articulo', '', '29foto_articuloiPhone_6_PLUS_in-hand-with-5s.jpg', '29'),
('17', 'Varios colores', '', '27Varios colores55628873_2330941050487379_3544837750081454080_n.jpg', '27');

INSERT INTO `campos` (`id`, `nombre`, `tipo`, `fijo`, `id_unidad`) VALUES ('2', 'Marca', '3', '0', '0'),
('5', 'Color', '3', '0', '0'),
('7', 'Ancho', '1', '0', '13'),
('8', 'Color botón', '3', '0', '1'),
('10', 'Diametro', '1', '0', '15'),
('11', 'Sabor', '0', '0', '0');

INSERT INTO `configuraciones_generales` (`id`, `nombre`, `rfc`, `dir`, `tels`, `msj`, `mail`, `web`, `fb`, `inst`, `twtr`, `wtsp`, `mgn`, `icon_site`, `logo_empresa`) VALUES ('1', 'LanderCorp', '', '', '7717944100', '', 'soporte@landercorp.mx', '', '', '', '', '', '', 'icono', 'logo');

INSERT INTO `configuraciones_tienda` (`id`, `cabezera_titulo`, `cabezara_texto`, `img_portada`, `titulo_tienda`, `ver_mas_dir`, `modo_produccion`, `paypal_com_fija`, `paypal_com_tarjeta`, `cordenada_mapa`, `paypal`, `paypal_cliente_id_sandbox`, `paypal_secret_sandbox`, `paypal_cliente_id`, `paypal_secret`, `openpay`, `openpay_com_fija`, `openpay_com_tarjeta_0`, `openpay_cliente_id_sandbox`, `openpay_secret_sandbox`, `openpay_cliente_id`, `openpay_secret`, `openpay_public_sandbox`, `openpay_public`, `openpay_com_tarjeta_3`, `openpay_com_tarjeta_6`, `openpay_com_tarjeta_9`, `openpay_com_tarjeta_12`) VALUES ('1', 'VERANO 2019', 'Vea lo nuevo de nuestra colección', 'portada', 'Tienda', '#productos', '0', '4.64', '20.24', NULL, '1', 'Abbn8ekpCn589HtRk1wfKm4s4M9qBW8z1b81QtPT2meNupzhXZXP4WiXCOcLO7tIbUX4rRbxyZYVT_i2', 'ENZfMD8OSZCZ3iJIVrKgbxkwKiKWEp8iT55bUxzKpAM2wOs-WdQoH3Obf8jceNynWW8W18obDYYjTJD5', 'AcieaxHeJbhBGb1olIangnAReC9pbNjSdRLJRXwVTP-X6fmniyKybQSDrx3y2ETX4Dj9g3a8zvwBm4sz', 'ECKmzpVn-4yeKOeCacMfZgt2iwNN0yUVxZ_-hqHXF6bujoXQLIHycg4zHcfRe08UHgxWAYHhk92X9R_I', '1', '4.00', '2.90', 'mccoygxz4bxfobm2vpo2', 'sk_c4cade22b6fa4ecfb61b6167fad6aba8', ' ', '', 'pk_2660475754774df084c6951144ef3fb2', ' ', '4.80', '7.80', '10.80', '13.80');

INSERT INTO `impuestos` (`id`, `IVA`, `IEPS`) VALUES ('1', '0', '8'),
('2', '0', '3'),
('3', '8', '3'),
('4', '16', '0');

INSERT INTO `movimientos` (`id`, `fecha`, `id_usuario`, `detallas`, `id_modulo`, `tipo`) VALUES ('1', '2018-11-30 20:27:44', '1', 'Se elimino el usuario con el id; 5', '1', '0'),
('2', '2019-02-04 22:17:45', '1', 'Se elimino el articuloo con el id; 3', '6', '0');

INSERT INTO `movimientos_articulos` (`id`, `id_movimiento`, `id_articulo`, `cantidad`, `costo`, `compuesto`, `status`, `id_usuario`, `id_combo`) VALUES ('162', '0', '28', '1', '12500', '0', '1', '1', '0'),
('163', '30', '27', '1', '12500', '0', '0', '1', '0');

INSERT INTO `movimientos_inventario` (`id`, `tipo`, `concepto`, `costo_total`, `id_usuario`, `detalles`, `fecha`) VALUES ('30', '1', '3', '0', '1', 'Salida de prueba', '2019-03-15 16:25:10'),
('31', '1', '3', '0', '1', 'Salida de prueba', '2019-03-15 16:25:17'),
('32', '1', '3', '0', '1', 'Prueba 2', '2019-03-15 16:29:24');

INSERT INTO `movimientos_pedidos` (`id`, `id_cliente`, `status`, `id_admin`, `empresa_envio`, `costo_envio`, `notas`, `id_movimiento`, `numero_guia`, `tipo_pago`, `fecha`) VALUES ('20', '7', '5', '1', 'DHL', '700', 'Existencia insuficiente', '60', '2147483647', NULL, '2019-04-05 00:45:23'),
('22', '7', '4', '1', 'FEDEX', '300', 'Pagar antes de las 12 del día', '62', '123123123', '2', '2019-04-06 00:03:36'),
('23', '7', '4', '1', 'DHL', '500', 'Tu pedido ha sido enviado', '66', '123123131', '2', '2019-04-08 15:56:47'),
('24', '7', '4', '1', 'DHL', '500', 'Pagar antes de las 12 del día', '67', '2147483647', '4', '2019-04-08 16:22:41');

INSERT INTO `movimientos_tipo` (`id`, `nombre`, `tipo`) VALUES ('1', 'Ajuste Inventario', '0'),
('2', 'Compra', '0'),
('3', 'Ajuste Inventario', '1'),
('4', 'Venta', '1'),
('5', 'Venta Online Paypal', '1');

INSERT INTO `productos` (`id`, `nombre`, `id_unidad`, `compuesto`, `nombre_elemento`) VALUES ('2', 'Tela', '13', '1', 'Rollo'),
('5', 'Pantalón', '11', '0', 'No aplica'),
('6', 'Boton', '1', '0', ''),
('7', 'Hot dog', '1', '2', ''),
('8', 'Jitomate', '2', '0', ''),
('9', 'Salchicha', '1', '0', ''),
('10', 'iPhone', '1', '0', '');

INSERT INTO `productos_campos` (`id`, `id_campo`, `id_producto`, `elemento`) VALUES ('5', '2', '2', '0'),
('6', '2', '10', '0'),
('7', '7', '2', '1'),
('8', '5', '2', '1'),
('10', '5', '5', '0'),
('11', '8', '6', '0'),
('13', '10', '6', '0'),
('14', '2', '5', '0'),
('17', '11', '7', '0');

INSERT INTO `productos_campos_predefinidos` (`id`, `id_campo`, `predeterminado`) VALUES ('3', '2', 'Samsung'),
('7', '5', 'Azul'),
('8', '5', 'Negro'),
('9', '2', 'Hawei'),
('10', '2', 'Ceyeme'),
('11', '2', 'Dockers'),
('12', '8', 'Transparente'),
('13', '8', 'Negro'),
('14', '8', 'Azul'),
('15', '2', 'Apple');

INSERT INTO `unidades` (`id`, `etiqueta`) VALUES ('1', 'Pieza'),
('2', 'Kilo'),
('3', 'Caja'),
('5', 'Litro'),
('6', 'Gramo'),
('10', 'Paquete'),
('11', 'Docena'),
('13', 'Metro'),
('15', 'Centimetros');

INSERT INTO `usuarios_modulos` (`id`, `etiqueta`, `tipo`, `id_padre`) VALUES ('1', 'Usuarios', '0', '0'),
('2', 'Crear y Editar Usuarios', '1', '1'),
('3', 'Crear y Editar Perfiles', '1', '1'),
('5', 'Punto de Venta', '0', '0'),
('6', 'Inventarios', '0', '0'),
('7', 'Reportes', '0', '0'),
('8', 'Configuraciones', '0', '0'),
('9', 'Crear y Editar Producto', '1', '6'),
('10', 'Registrar y Editar Articulo', '1', '6'),
('11', 'Registrar Entradas y Salidas', '1', '6'),
('12', 'Pedidos', '0', '0');

INSERT INTO `usuarios_perfiles` (`id`, `etiqueta`) VALUES ('1', 'ADMINISTRADOR'),
('2', 'ENCARGADO INVENTARIOS'),
('3', 'VENDEDOR');

INSERT INTO `usuarios_permisos_perfiles` (`id`, `id_perfil`, `id_modulo`, `permiso`) VALUES ('127', '2', '1', '0'),
('128', '2', '2', '0'),
('129', '2', '3', '0'),
('130', '2', '5', '0'),
('131', '2', '6', '1'),
('132', '2', '9', '0'),
('133', '2', '10', '1'),
('134', '2', '11', '1'),
('135', '2', '7', '0'),
('136', '2', '8', '0'),
('137', '2', '12', '0'),
('138', '3', '1', '0'),
('139', '3', '2', '0'),
('140', '3', '3', '0'),
('141', '3', '5', '1'),
('142', '3', '6', '0'),
('143', '3', '9', '0'),
('144', '3', '10', '0'),
('145', '3', '11', '0'),
('146', '3', '7', '0'),
('147', '3', '8', '0'),
('148', '3', '12', '1'),
('149', '1', '1', '1'),
('150', '1', '2', '1'),
('151', '1', '3', '1'),
('152', '1', '5', '1'),
('153', '1', '6', '1'),
('154', '1', '9', '1'),
('155', '1', '10', '1'),
('156', '1', '11', '1'),
('157', '1', '7', '1'),
('158', '1', '8', '1'),
('159', '1', '12', '1');

INSERT INTO `usuarios_usuarios` (`id`, `nombre`, `apellido`, `telefono`, `email`, `id_perfil`, `password`, `verificado`, `ine`, `pedido`) VALUES ('1', 'Francisco', 'Landeros', '7717944100', 'admin@landercorp.mx', '1', '1', NULL, NULL, '0'),
('6', 'Nestor', 'Licona', '7711850330', 'admin@minarte.com', '1', 'admin', NULL, NULL, '0'),
('7', 'Cliente', 'Lciente ', '7717944100', 'cliente@hotmail.com', '0', '12', NULL, NULL, '1'),
('8', 'Misael', 'Landeros', '7717944100', 'fmlanderoy@hotmail.es', '0', '12', NULL, NULL, '0');




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;