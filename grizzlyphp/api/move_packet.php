<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../libs/php-jwt-main/src/BeforeValidException.php';
include_once '../libs/php-jwt-main/src/ExpiredException.php';
include_once '../libs/php-jwt-main/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-main/src/JWT.php';
include_once '../libs/php-jwt-main/src/Key.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once './config/database.php';
include_once './objects/user.php';
include_once './objects/file_system.php';
include_once './objects/folder_system.php';
include_once './objects/packet_system.php';

$database = new Database();


$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$jwtData=isset($data->jwt) ? $data->jwt : "";

$folder = new FolderSystem($db);
$file = new FileSystem($db);

if($jwt){
    $decoded = JWT::decode($jwt,  new Key($key, 'HS256'));
    $packet = new PacketSystem($db);
    $packet->packet_id = $decoded->data->packet_id;
    $packet->getPacketDetails();
    $file->file_id = $packet->file_id;
    $fileDetails = $file->getFileDetails()->fetch();
    $file->filetype = $fileDetails['filetype'];
    $file->filesize = $fileDetails['filesize'];
    $file->filename = $fileDetails['filename'];
    $file->sanitized_name = $fileDetails['sanitized_name'];
    $file->user_id = $packet->receiver_id;
    
    $folder->foldername = "Mailbox";
    $folder->createFolder();
    
    //get folder id
    $file->createFile();

}