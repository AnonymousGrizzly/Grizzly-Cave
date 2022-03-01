<?php
include_once 'config/database.php';
include_once 'objects/user.php';
include_once 'objects/file_system.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));


?>