-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 12-03-2019 a las 00:42:35
-- Versión del servidor: 5.6.38
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `tienda_inventarios_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `id_producto` int(11) NOT NULL,
  `existencia` decimal(10,0) NOT NULL,
  `costo` decimal(10,0) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `id_padre` int(11) NOT NULL,
  `id_impuesto` int(11) NOT NULL,
  `id_main_pic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `nombre`, `id_producto`, `existencia`, `costo`, `precio`, `compuesto`, `id_padre`, `id_impuesto`, `id_main_pic`) VALUES
(4, 'Tela Oro', 2, '0', '12', '120', 1, 0, 2, 10),
(5, '', 0, '0', '10', '0', 0, 4, 0, 0),
(6, '', 0, '5', '5', '0', 0, 4, 0, 0),
(7, '', 0, '10', '10', '0', 0, 4, 0, 0),
(8, '', 0, '33', '10', '0', 0, 4, 0, 0),
(9, 'Jeans Caballero', 5, '1000', '70', '240', 0, 0, 2, 11),
(10, '', 0, '300', '120', '0', 0, 4, 0, 0),
(11, 'Botón Ajustado', 6, '900', '10', '100', 0, 0, 0, 12),
(12, '', 0, '500', '230', '0', 0, 4, 0, 0),
(13, '', 0, '242', '240', '0', 0, 4, 0, 0),
(14, 'prueba', 2, '0', '0', '0', 1, 0, 2, 0),
(17, 'Hot Dog Tocino', 7, '0', '5', '20', 2, 0, 2, 0),
(18, 'Hot dog Vegano', 7, '0', '21', '30', 2, 0, 2, 0),
(19, 'Hot dog rojo', 7, '0', '1', '12', 2, 0, 2, 0),
(20, 'Hot dog Chilly', 7, '0', '12', '32', 2, 0, 2, 0),
(21, 'Hot dog sin pan', 7, '0', '12', '32', 2, 0, 2, 0),
(22, 'Hot Dog con gatos', 7, '0', '12', '32', 2, 0, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos_campos`
--

CREATE TABLE `articulos_campos` (
  `id` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `val` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos_campos`
--

INSERT INTO `articulos_campos` (`id`, `id_articulo`, `id_campo`, `val`) VALUES
(16, 1, 7, '120'),
(17, 1, 5, '8'),
(18, 1, 2, '11'),
(19, 5, 7, '120'),
(20, 5, 5, '8'),
(21, 5, 2, '11'),
(22, 6, 7, '123'),
(23, 6, 5, '7'),
(24, 6, 2, '3'),
(25, 7, 7, '120'),
(26, 7, 5, '7'),
(27, 7, 2, '3'),
(28, 8, 7, '33'),
(29, 8, 5, '7'),
(30, 8, 2, '3'),
(31, 9, 5, '8'),
(32, 9, 2, '11'),
(33, 10, 7, '250'),
(34, 10, 5, '7'),
(35, 10, 2, '3'),
(49, 4, 7, '120'),
(50, 4, 5, '7'),
(51, 4, 2, '10'),
(54, 11, 8, '12'),
(55, 11, 10, '20'),
(56, 12, 7, '3'),
(57, 12, 5, '8'),
(58, 13, 7, '3.5'),
(59, 13, 5, '8'),
(60, 14, 2, '10'),
(61, 15, 5, '7'),
(62, 15, 2, '3'),
(63, 16, 5, '7'),
(64, 16, 2, '3'),
(66, 22, 11, 'Hot Dog con gatos arriba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos_imagenes`
--

CREATE TABLE `articulos_imagenes` (
  `id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `texto` text NOT NULL,
  `img` text NOT NULL,
  `id_articulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos_imagenes`
--

INSERT INTO `articulos_imagenes` (`id`, `titulo`, `texto`, `img`, `id_articulo`) VALUES
(10, 'foto_articulo', '', '4foto_articuloraso-carnaval-oro-viejo.jpg', 4),
(11, 'Jeans de caballero', '', '9Jeans de caballero001G.jpg', 9),
(12, 'Solo una prueba', '', '11Solo una prueba01.jpg', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artículos_carrito`
--

CREATE TABLE `artículos_carrito` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `artículos_carrito`
--

INSERT INTO `artículos_carrito` (`id`, `id_cliente`, `id_articulo`, `cantidad`) VALUES
(1, 1, 2147483647, 1),
(2, 1, 2147483647, 1),
(3, 1, 2147483647, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artículos_cotizacion`
--

CREATE TABLE `artículos_cotizacion` (
  `id` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campos`
--

CREATE TABLE `campos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `tipo` int(11) NOT NULL,
  `fijo` int(11) NOT NULL,
  `id_unidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `campos`
--

INSERT INTO `campos` (`id`, `nombre`, `tipo`, `fijo`, `id_unidad`) VALUES
(2, 'Marca', 3, 0, 0),
(5, 'Color', 3, 0, 0),
(7, 'Ancho', 1, 0, 13),
(8, 'Color botón', 3, 0, 1),
(10, 'Diametro', 1, 0, 15),
(11, 'Sabor', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuraciones_generales`
--

CREATE TABLE `configuraciones_generales` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `borrar_ceros` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuraciones_tienda`
--

CREATE TABLE `configuraciones_tienda` (
  `id` int(11) NOT NULL,
  `cabezara_titulo` text NOT NULL,
  `cabezara_texto` text NOT NULL,
  `img_cabezara` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `configuraciones_tienda`
--

INSERT INTO `configuraciones_tienda` (`id`, `cabezara_titulo`, `cabezara_texto`, `img_cabezara`) VALUES
(1, 'OTOÑO 2017', 'Vea lo nuevo de nuestra colección de otoño', 'foto_modeloIMG_4083.JPG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuestos`
--

CREATE TABLE `impuestos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `impuestos`
--

INSERT INTO `impuestos` (`id`, `nombre`, `valor`) VALUES
(2, 'IVA', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_usuario` int(11) NOT NULL,
  `detallas` text NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id`, `fecha`, `id_usuario`, `detallas`, `id_modulo`, `tipo`) VALUES
(1, '2018-12-01 02:27:44', 1, 'Se elimino el usuario con el id; 5', 1, 0),
(2, '2019-02-05 04:17:45', 1, 'Se elimino el articuloo con el id; 3', 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos_articulos`
--

CREATE TABLE `movimientos_articulos` (
  `id` int(11) NOT NULL,
  `id_movimiento` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `movimientos_articulos`
--

INSERT INTO `movimientos_articulos` (`id`, `id_movimiento`, `id_articulo`, `cantidad`, `costo`, `compuesto`, `status`, `id_usuario`) VALUES
(1, 1, 4, 10, 10, 1, 0, 0),
(2, 1, 3, 10, 120, 0, 0, 0),
(3, 2, 4, 10, 10, 1, 0, 0),
(4, 2, 3, 10, 120, 0, 0, 0),
(5, 3, 3, 10, 120, 0, 0, 0),
(6, 3, 4, 20, 5, 1, 0, 0),
(7, 4, 3, 10, 5, 0, 0, 0),
(8, 5, 4, 10, 10, 1, 0, 0),
(9, 6, 3, 120, 113, 0, 0, 0),
(10, 7, 3, 10, 113, 0, 0, 0),
(11, 8, 4, 33, 10, 1, 0, 0),
(12, 9, 8, 100, 10, 0, 0, 0),
(23, 9, 3, 200, 0, 0, 0, 1),
(24, 9, 5, 10, 0, 1, 0, 1),
(25, 9, 6, 10, 0, 1, 0, 1),
(26, 20, 3, 10, 113, 0, 0, 1),
(27, 20, 3, 10, 113, 0, 0, 1),
(28, 20, 5, 10, 10, 1, 0, 1),
(29, 20, 6, 5, 5, 1, 0, 1),
(30, 21, 4, 300, 120, 1, 0, 0),
(31, 22, 4, 500, 230, 1, 0, 0),
(32, 22, 3, 250, 113, 0, 0, 0),
(33, 22, 11, 40, 10, 0, 0, 0),
(34, 23, 3, 20, 113, 0, 0, 0),
(35, 23, 9, 900, 70, 0, 0, 0),
(36, 23, 11, 60, 10, 0, 0, 0),
(37, 23, 4, 242, 240, 1, 0, 0),
(38, 24, 11, 100, 10, 0, 0, 1),
(39, 24, 11, 100, 10, 0, 0, 1),
(40, 24, 3, 50, 113, 0, 0, 1),
(41, 25, 5, 10, 10, 1, 0, 1),
(42, 0, 6, 5, 5, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos_inventario`
--

CREATE TABLE `movimientos_inventario` (
  `id` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `concepto` int(11) NOT NULL,
  `costo_total` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `detalles` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `movimientos_inventario`
--

INSERT INTO `movimientos_inventario` (`id`, `tipo`, `concepto`, `costo_total`, `id_usuario`, `detalles`, `fecha`) VALUES
(1, 0, 1, 1300, 1, 'Pruebas', '2019-01-30 03:15:05'),
(2, 0, 1, 1300, 1, 'Pruebas', '2019-01-30 03:15:05'),
(3, 0, 1, 1300, 1, 'Pruebas', '2019-01-30 03:15:05'),
(4, 0, 1, 50, 1, 'Pruebas', '2019-01-30 03:15:05'),
(5, 0, 1, 100, 1, '', '2019-01-30 03:15:05'),
(6, 0, 1, 13560, 1, 'pruebas', '2019-01-30 03:15:05'),
(7, 0, 1, 1130, 1, '', '2019-01-30 03:15:05'),
(8, 0, 1, 330, 1, '', '2019-01-30 03:15:05'),
(9, 1, 3, 1000, 1, '', '2019-01-30 03:15:05'),
(10, 1, 3, 0, 1, 'Salida de inventario por ajuste', '2019-01-30 03:15:05'),
(11, 1, 3, 0, 1, 'Salida de inventario por ajuste', '2019-01-30 03:15:05'),
(12, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(13, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(14, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(15, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(16, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(17, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(18, 1, 3, 0, 1, '', '2019-01-30 03:15:05'),
(19, 1, 3, 0, 1, 'Prueba final', '2019-01-30 03:15:05'),
(20, 1, 3, 0, 1, 'Prueba final de movimientos', '2019-01-30 03:15:05'),
(21, 0, 1, 36000, 1, 'Entrada de tela', '2019-02-01 21:49:32'),
(22, 0, 2, 143650, 1, 'Compra a provedor Casa Dias', '2019-02-05 03:55:20'),
(23, 0, 1, 123940, 1, 'Compra a Justino ', '2019-02-05 04:00:10'),
(24, 1, 3, 0, 1, 'Salia a ruta', '2019-02-05 04:14:50'),
(25, 1, 4, 0, 1, 'Prueba de movimiento', '2019-03-12 00:17:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos_tipo`
--

CREATE TABLE `movimientos_tipo` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `movimientos_tipo`
--

INSERT INTO `movimientos_tipo` (`id`, `nombre`, `tipo`) VALUES
(1, 'Ajuste Inventario', 0),
(2, 'Compra', 0),
(3, 'Ajuste Inventario', 1),
(4, 'Venta', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `id_unidad` int(11) NOT NULL,
  `compuesto` int(11) NOT NULL,
  `nombre_elemento` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `id_unidad`, `compuesto`, `nombre_elemento`) VALUES
(2, 'Tela', 13, 1, 'Rollo'),
(5, 'Pantalón', 11, 0, 'No aplica'),
(6, 'Boton', 1, 0, ''),
(7, 'Hot dog', 1, 2, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_campos`
--

CREATE TABLE `productos_campos` (
  `id` int(11) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `elemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos_campos`
--

INSERT INTO `productos_campos` (`id`, `id_campo`, `id_producto`, `elemento`) VALUES
(5, 2, 2, 0),
(6, 2, 10, 0),
(7, 7, 2, 1),
(8, 5, 2, 1),
(10, 5, 5, 0),
(11, 8, 6, 0),
(13, 10, 6, 0),
(14, 2, 5, 0),
(17, 11, 7, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_campos_predefinidos`
--

CREATE TABLE `productos_campos_predefinidos` (
  `id` int(11) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `predeterminado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos_campos_predefinidos`
--

INSERT INTO `productos_campos_predefinidos` (`id`, `id_campo`, `predeterminado`) VALUES
(3, 2, 'Samsung'),
(7, 5, 'Azul'),
(8, 5, 'Negro'),
(9, 2, 'Hawei'),
(10, 2, 'Ceyeme'),
(11, 2, 'Dockers'),
(12, 8, 'Transparente'),
(13, 8, 'Negro'),
(14, 8, 'Azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades`
--

CREATE TABLE `unidades` (
  `id` int(11) NOT NULL,
  `etiqueta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `unidades`
--

INSERT INTO `unidades` (`id`, `etiqueta`) VALUES
(1, 'Pieza'),
(2, 'Kilo'),
(3, 'Caja'),
(5, 'Litro'),
(6, 'Gramo'),
(10, 'Paquete'),
(11, 'Docena'),
(13, 'Metro'),
(15, 'Centimetros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_modulos`
--

CREATE TABLE `usuarios_modulos` (
  `id` int(11) NOT NULL,
  `etiqueta` text NOT NULL,
  `tipo` int(11) NOT NULL,
  `id_padre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios_modulos`
--

INSERT INTO `usuarios_modulos` (`id`, `etiqueta`, `tipo`, `id_padre`) VALUES
(1, 'Usuarios', 0, 0),
(2, 'Crear y Editar Usuarios', 1, 1),
(3, 'Crear y Editar Perfiles', 1, 1),
(5, 'Punto de Venta', 0, 0),
(6, 'Inventarios', 0, 0),
(7, 'Reportes', 0, 0),
(8, 'Configuraciones', 0, 0),
(9, 'Crear y Editar Producto', 1, 6),
(10, 'Registrar y Editar Articulo', 1, 6),
(11, 'Registrar Entradas y Salidas', 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_perfiles`
--

CREATE TABLE `usuarios_perfiles` (
  `id` int(11) NOT NULL,
  `etiqueta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios_perfiles`
--

INSERT INTO `usuarios_perfiles` (`id`, `etiqueta`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'ENCARGADO INVENTARIOS'),
(3, 'VENDEDOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_permisos_perfiles`
--

CREATE TABLE `usuarios_permisos_perfiles` (
  `id` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios_permisos_perfiles`
--

INSERT INTO `usuarios_permisos_perfiles` (`id`, `id_perfil`, `id_modulo`, `permiso`) VALUES
(95, 1, 1, 1),
(96, 1, 2, 1),
(97, 1, 3, 1),
(98, 1, 5, 1),
(99, 1, 6, 1),
(100, 1, 9, 1),
(101, 1, 10, 1),
(102, 1, 11, 1),
(103, 1, 7, 1),
(104, 1, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_usuarios`
--

CREATE TABLE `usuarios_usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `apellido` text NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_perfil` int(11) NOT NULL,
  `password` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios_usuarios`
--

INSERT INTO `usuarios_usuarios` (`id`, `nombre`, `apellido`, `telefono`, `email`, `id_perfil`, `password`) VALUES
(1, 'Francisco', 'Landeros', '7717944100', 'admin@landercorp.mx', 1, '1'),
(6, 'Nestor', 'Licona', '7711850330', 'admin@minarte.com', 1, 'admin'),
(7, 'Cliente', 'Lciente ', '7717944100', 'cliente@hotmail.com', 0, '12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `articulos_campos`
--
ALTER TABLE `articulos_campos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `articulos_imagenes`
--
ALTER TABLE `articulos_imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `artículos_carrito`
--
ALTER TABLE `artículos_carrito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `artículos_cotizacion`
--
ALTER TABLE `artículos_cotizacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `campos`
--
ALTER TABLE `campos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuraciones_generales`
--
ALTER TABLE `configuraciones_generales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuraciones_tienda`
--
ALTER TABLE `configuraciones_tienda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `impuestos`
--
ALTER TABLE `impuestos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movimientos_articulos`
--
ALTER TABLE `movimientos_articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movimientos_tipo`
--
ALTER TABLE `movimientos_tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_campos`
--
ALTER TABLE `productos_campos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_campos_predefinidos`
--
ALTER TABLE `productos_campos_predefinidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_modulos`
--
ALTER TABLE `usuarios_modulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_perfiles`
--
ALTER TABLE `usuarios_perfiles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_permisos_perfiles`
--
ALTER TABLE `usuarios_permisos_perfiles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_usuarios`
--
ALTER TABLE `usuarios_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `articulos_campos`
--
ALTER TABLE `articulos_campos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `articulos_imagenes`
--
ALTER TABLE `articulos_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `artículos_carrito`
--
ALTER TABLE `artículos_carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `artículos_cotizacion`
--
ALTER TABLE `artículos_cotizacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `campos`
--
ALTER TABLE `campos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `configuraciones_generales`
--
ALTER TABLE `configuraciones_generales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `configuraciones_tienda`
--
ALTER TABLE `configuraciones_tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `impuestos`
--
ALTER TABLE `impuestos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `movimientos_articulos`
--
ALTER TABLE `movimientos_articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `movimientos_tipo`
--
ALTER TABLE `movimientos_tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos_campos`
--
ALTER TABLE `productos_campos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `productos_campos_predefinidos`
--
ALTER TABLE `productos_campos_predefinidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidades`
--
ALTER TABLE `unidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios_modulos`
--
ALTER TABLE `usuarios_modulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios_perfiles`
--
ALTER TABLE `usuarios_perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios_permisos_perfiles`
--
ALTER TABLE `usuarios_permisos_perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `usuarios_usuarios`
--
ALTER TABLE `usuarios_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
