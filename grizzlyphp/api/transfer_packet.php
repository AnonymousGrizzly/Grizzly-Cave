<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/core.php';
include_once 'libs/php-jwt-main/src/BeforeValidException.php';
include_once 'libs/php-jwt-main/src/ExpiredException.php';
include_once 'libs/php-jwt-main/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-main/src/JWT.php';
include_once 'libs/php-jwt-main/src/Key.php';

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
$jwtData = isset($data->jwt) ? $data->jwt : "";



if(!$jwtData){
    http_response_code(401);
    die(json_encode(array("message" => "Access denied."))); 
}

$decoded = JWT::decode($jwtData,  new Key($key, 'HS256'));

$packet = new PacketSystem($db);
$packet->packet_id = $data->packet_id;

$user_id = $decoded->data->user_id;

$packet_details = $packet->getPacketDetails();

if ($packet_details === false) {
    http_response_code(400);
    die(json_encode(array("message" => "Unknown packet"))); 
}

if ($packet_details['receiver_id'] !== $user_id) {
    http_response_code(400);
    die(json_encode(array("message" => "Unknown packet"))); 
}

// $folder = new FolderSystem($db);
$file = new FileSystem($db);


$fileDetails = $file->getFileDetails($packet_details['file_id'], $packet_details['sender_id'])->fetch(PDO::FETCH_ASSOC);

if ($fileDetails === false) {
    http_response_code(400);
    die(json_encode(array("message" => "File does not exist anymore."))); 
}

// $file->filetype = $fileDetails['filetype'];
// $file->filesize = $fileDetails['filesize'];
// $file->filename = $fileDetails['filename'];
// $file->sanitized_name = $fileDetails['sanitized_name'];
// $file->user_id = $packet->receiver_id;

$file->folder_id = null;
$file->sanitized_name = $fileDetails['sanitized_name'];
$file->filesize = $fileDetails['filesize'];
$file->filetype = $fileDetails['filetype'];
$file->user_id = $user_id;
$file->filename = $fileDetails['filename'];

$file->createFile();

$packet->receiver_id = $user_id;
$packet->packet_id = $packet_details['packet_id'];

$packet->deletePacket();

http_response_code(201);
die(json_encode(array("message" => "Packet successfully transfered."))); 


