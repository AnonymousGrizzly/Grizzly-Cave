<?php
include_once 'config/database.php';
include_once 'objects/user.php';
include_once 'objects/file_system.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$file = new File_System();
$file->fileName = $data->filename; //kako dobit file id za download? 
$path = $file->getPath();
$path += $file->getSanitizedName();

 //treba se dokoncat


?>