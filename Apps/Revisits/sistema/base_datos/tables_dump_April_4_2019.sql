-- -------------------------------------------------------------
-- TablePlus 2.1(204)
--
-- https://tableplus.com/
--
-- Database: tienda_inventarios_db
-- Generation Time: 2019-04-04 15:50:49.2760
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
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8;

CREATE TABLE `movimientos_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL,
  `concepto` int(11) NOT NULL,
  `costo_total` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `detalles` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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

INSERT INTO `articulos` (`id`, `nombre`, `id_producto`, `existencia`, `costo`, `precio`, `compuesto`, `id_padre`, `id_impuesto`, `id_main_pic`, `codigoBarras`, `disponibilidad_articulo`, `destacado`) VALUES ('4', 'Tela Oro', '2', '0.00', '12.00', '120.00', '1', '0', '1', '10', '0', NULL, NULL),
('5', '', '0', '0.00', '10.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('6', '', '0', '0.00', '5.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('7', '', '0', '10.00', '10.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('8', '', '0', '33.00', '10.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('9', 'Jeans Caballero', '5', '1000.00', '70.00', '240.00', '0', '0', '2', '11', '123123', NULL, NULL),
('10', '', '0', '295.00', '120.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('11', 'Botón Ajustado', '6', '888.00', '10.00', '100.00', '0', '0', '1', '12', '12', NULL, NULL),
('12', '', '0', '500.00', '230.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('13', '', '0', '242.00', '240.00', '0.00', '0', '4', '0', '0', NULL, NULL, NULL),
('14', 'prueba', '2', '0.00', '0.00', '0.00', '1', '0', '2', '0', NULL, NULL, NULL),
('17', 'Hot Dog', '7', '-3.00', '5.00', '20.00', '2', '0', '3', '0', '123', NULL, NULL),
('18', 'Hot dog Vegano', '7', '0.00', '21.00', '30.00', '2', '0', '2', '0', NULL, NULL, NULL),
('19', 'Hot dog rojo', '7', '0.00', '1.00', '12.00', '2', '0', '2', '0', NULL, NULL, NULL),
('20', 'Hot dog Chilly', '7', '0.00', '12.00', '32.00', '2', '0', '2', '0', NULL, NULL, NULL),
('21', 'Hot dog sin pan', '7', '0.00', '12.00', '32.00', '2', '0', '2', '0', NULL, NULL, NULL),
('22', 'Hot Dog con gatos', '7', '0.00', '12.00', '32.00', '2', '0', '2', '0', NULL, NULL, NULL),
('23', 'Botón con código de barras', '6', '13.00', '12.00', '12.00', '0', '0', '2', '0', '123123123', NULL, NULL),
('24', 'Salchichas Vienna', '9', '100.00', '1.00', '2.00', '0', '0', '3', '0', 'SV', '0', '0'),
('25', 'Tomate americano', '8', '1227.00', '12.00', '1.00', '0', '0', '3', '0', '1232123', NULL, NULL),
('26', 'iPhone XS Max', '10', '185.00', '15000.00', '20000.00', '0', '0', '3', '13', '1', '1', '1'),
('27', 'iPhone XR', '10', '188.00', '12000.00', '12500.00', '0', '0', '3', '14', '2', '1', '1'),
('28', 'iPhone 8 Plus', '10', '294.00', '12000.00', '12500.00', '0', '0', '3', '15', '3', '1', '1'),
('29', 'iPhone 5', '10', '123.00', '12.00', '15.00', '0', '0', '1', '16', '31231232', '1', '1'),
('30', 'Salchicha Vegana', '9', '123.00', '123.00', '250.00', '0', '0', '4', '0', '12312', '0', '0');

INSERT INTO `articulos_campos` (`id`, `id_articulo`, `id_campo`, `val`) VALUES ('16', '1', '7', '120'),
('17', '1', '5', '8'),
('18', '1', '2', '11'),
('19', '5', '7', '120'),
('20', '5', '5', '8'),
('21', '5', '2', '11'),
('22', '6', '7', '123'),
('23', '6', '5', '7'),
('24', '6', '2', '3'),
('25', '7', '7', '120'),
('26', '7', '5', '7'),
('27', '7', '2', '3'),
('28', '8', '7', '33'),
('29', '8', '5', '7'),
('30', '8', '2', '3'),
('33', '10', '7', '250'),
('34', '10', '5', '7'),
('35', '10', '2', '3'),
('56', '12', '7', '3'),
('57', '12', '5', '8'),
('58', '13', '7', '3.5'),
('59', '13', '5', '8'),
('60', '14', '2', '10'),
('61', '15', '5', '7'),
('62', '15', '2', '3'),
('63', '16', '5', '7'),
('64', '16', '2', '3'),
('66', '22', '11', 'Hot Dog con gatos arriba'),
('74', '9', '5', '8'),
('75', '9', '2', '11'),
('76', '4', '7', '120'),
('77', '4', '5', '7'),
('78', '4', '2', '10'),
('79', '11', '8', '12'),
('80', '11', '10', '20'),
('81', '23', '8', '14'),
('82', '23', '10', '12'),
('105', '26', '2', '15'),
('106', '27', '2', '15'),
('107', '28', '2', '15'),
('109', '29', '2', '15');

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

INSERT INTO `configuraciones_generales` (`id`, `nombre`, `rfc`, `dir`, `tels`, `msj`, `mail`, `web`, `fb`, `inst`, `twtr`, `wtsp`, `mgn`, `icon_site`, `logo_empresa`) VALUES ('1', 'LanderCorp', '', '', '', '', '', '', '', '', '', '', '', 'icono', 'logo');

INSERT INTO `configuraciones_tienda` (`id`, `cabezera_titulo`, `cabezara_texto`, `img_portada`, `titulo_tienda`, `ver_mas_dir`, `modo_produccion`, `paypal_com_fija`, `paypal_com_tarjeta`) VALUES ('1', 'VERANO 2019', 'Vea lo nuevo de nuestra colección', 'portada', 'Tienda', '#productos', '0', '4.64', '20.24');

INSERT INTO `impuestos` (`id`, `IVA`, `IEPS`) VALUES ('1', '0', '8'),
('2', '0', '3'),
('3', '8', '3'),
('4', '16', '0');

INSERT INTO `movimientos` (`id`, `fecha`, `id_usuario`, `detallas`, `id_modulo`, `tipo`) VALUES ('1', '2018-11-30 20:27:44', '1', 'Se elimino el usuario con el id; 5', '1', '0'),
('2', '2019-02-04 22:17:45', '1', 'Se elimino el articuloo con el id; 3', '6', '0');

INSERT INTO `movimientos_articulos` (`id`, `id_movimiento`, `id_articulo`, `cantidad`, `costo`, `compuesto`, `status`, `id_usuario`, `id_combo`) VALUES ('162', '0', '28', '1', '12500', '0', '1', '1', '0'),
('163', '30', '27', '1', '12500', '0', '0', '1', '0'),
('164', '30', '26', '1', '20000', '0', '0', '1', '0'),
('165', '32', '26', '2', '15000', '0', '0', '1', '0'),
('166', '32', '27', '1', '12000', '0', '0', '1', '0'),
('167', '32', '28', '1', '12000', '0', '0', '1', '0'),
('168', '33', '27', '1', '12500', '0', '0', '1', '0'),
('172', '34', '28', '1', '12500', '0', '0', '1', '0'),
('173', '35', '26', '1', '20000', '0', '0', '1', '0'),
('174', '36', '26', '1', '20000', '0', '0', '1', '0'),
('175', '37', '28', '1', '12500', '0', '0', '1', '0'),
('176', '38', '28', '1', '12500', '0', '0', '1', '0'),
('177', '39', '27', '1', '12500', '0', '0', '1', '0'),
('178', '40', '27', '1', '12500', '0', '0', '1', '0'),
('179', '44', '27', '1', '12500', '0', '0', '1', '0'),
('180', '45', '27', '1', '12500', '0', '0', '1', '0'),
('189', '51', '27', '1', '12500', '0', '0', '7', '0'),
('193', '46', '26', '1', '20000', '0', '0', '6', '0'),
('195', '46', '26', '1', '20000', '0', '0', '6', '0'),
('196', '47', '28', '1', '12500', '0', '0', '7', '0'),
('197', '48', '26', '1', '20000', '0', '0', '7', '0'),
('200', '49', '26', '1', '20000', '0', '0', '7', '0'),
('201', '50', '27', '1', '12500', '0', '0', '7', '0'),
('203', '52', '26', '1', '20000', '0', '0', '7', '0'),
('204', '53', '26', '1', '20000', '0', '0', '7', '0'),
('205', '54', '26', '1', '20000', '0', '0', '7', '0'),
('206', '55', '26', '1', '20000', '0', '0', '7', '0'),
('207', '58', '27', '1', '12500', '0', '0', '7', '0'),
('208', '59', '26', '1', '20000', '0', '0', '7', '0'),
('209', '60', '26', '1', '20000', '0', '0', '7', '0'),
('211', '0', '28', '1', '12500', '0', '1', '7', '0');

INSERT INTO `movimientos_inventario` (`id`, `tipo`, `concepto`, `costo_total`, `id_usuario`, `detalles`, `fecha`) VALUES ('30', '1', '3', '0', '1', 'Salida de prueba', '2019-03-15 16:25:10'),
('31', '1', '3', '0', '1', 'Salida de prueba', '2019-03-15 16:25:17'),
('32', '1', '3', '0', '1', 'Prueba 2', '2019-03-15 16:29:24'),
('33', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-15 17:44:09'),
('34', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-15 17:50:14'),
('35', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 12:34:48'),
('36', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 12:35:39'),
('37', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 12:37:58'),
('38', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:19:33'),
('39', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:20:35'),
('40', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:23:19'),
('41', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:24:14'),
('42', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:24:39'),
('43', '1', '4', '0', '1', 'Venta de Mostrador', '2019-03-19 13:24:52'),
('44', '1', '4', '12500', '1', 'Venta de Mostrador', '2019-03-19 13:29:36'),
('45', '1', '4', '12500', '1', 'Venta de Mostrador', '2019-03-19 13:31:24'),
('46', '1', '3', '0', '6', 'Prueba con nueva función', '2019-04-03 16:28:18'),
('47', '1', '5', '13000', '7', 'Compra en linea con Paypal', '2019-04-03 16:44:15'),
('48', '1', '5', '20500', '7', 'Compra en linea con Paypal', '2019-04-03 17:47:52'),
('49', '1', '5', '20600', '7', 'Compra en linea con Paypal', '2019-04-04 00:15:00'),
('50', '1', '5', '13100', '7', 'Compra en linea con Paypal', '2019-04-04 00:28:17'),
('51', '1', '5', '13100', '7', 'Compra en linea con Paypal', '2019-04-04 00:33:04'),
('52', '1', '5', '22500', '7', 'Compra en linea con Paypal', '2019-04-04 00:44:11'),
('53', '1', '5', '22500', '7', 'Compra en linea con Paypal', '2019-04-04 00:57:23'),
('54', '1', '5', '20500', '7', 'Compra en linea con Paypal', '2019-04-04 01:01:40'),
('55', '1', '5', '20600', '7', 'Compra en linea con Paypal', '2019-04-04 01:05:23'),
('56', '1', '5', '13100', '7', 'Compra en linea con Paypal', '2019-04-04 01:09:39'),
('57', '1', '5', '13100', '7', 'Compra en linea con Paypal', '2019-04-04 01:12:20'),
('58', '1', '5', '13100', '7', 'Compra en linea con Paypal', '2019-04-04 01:14:43'),
('59', '1', '5', '20600', '7', 'Compra en linea con Paypal', '2019-04-04 01:19:35'),
('60', '1', '5', '20700', '7', 'Compra en linea con Paypal', '2019-04-04 15:44:21');

INSERT INTO `movimientos_pedidos` (`id`, `id_cliente`, `status`, `id_admin`, `empresa_envio`, `costo_envio`, `notas`, `id_movimiento`, `numero_guia`) VALUES ('20', '7', '0', '1', 'DHL', '700', 'Llega en  3 dias ', '60', '2147483647');

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
('7', 'Cliente', 'Lciente ', '7717944100', 'cliente@hotmail.com', '0', '12', NULL, NULL, '0'),
('8', 'Misael', 'Landeros', '7717944100', 'fmlanderoy@hotmail.es', '0', '12', NULL, NULL, '0');




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;