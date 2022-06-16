<?php
header("Access-Control-Allow-Origin: https://www.grizzly-cave.com");
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

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){ //enables calls from diff. domains
    http_response_code(200); 
    die;
}

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$jwt = isset($data->jwt) ? $data->jwt : "";

if (!$jwt) {
    http_response_code(401);
    die(json_encode(array("message"=>"Must be logged in.")));
}

$decoded = JWT::decode($jwt,  new Key($key, 'HS256'));

$file = new FileSystem($db);
$fileId = $data->fileId;
$userId = $decoded->data->user_id;
$file->user_id = $userId;
$fileDetails = $file->getFileDetails($fileId, $userId)->fetch(); //get details of file we want to download

if($fileDetails == NULL){ //no details, no file
    http_response_code(404);
    die(json_encode(array("message"=>"File doesn't exist."))); 
}
$file->filesize = $fileDetails['filesize']; //get details
$file->filename = $fileDetails['filename'];
$file->sanitized_name = $fileDetails['sanitized_name']; //for database usage

$path = $file->getPath(); //get path for downloading files
header("Content-Description: File Transfer");
// header ("Content-Disposition: attachment; filename=".$file->filename);

if(readfile($path)){ //try download
    http_response_code(200);
}else{
    http_response_code(401);
}

    


?>