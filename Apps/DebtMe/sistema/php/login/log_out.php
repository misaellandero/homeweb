<?php
session_start();
unset($_SESSION['id_session']);
$conn = require_once '../conexion.php';
if(session_destroy())
{
header("Location:../../../index.php");
}
?>
