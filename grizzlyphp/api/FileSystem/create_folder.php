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

include_once '../config/database.php';
include_once '../objects/user.php';
include_once 'file_system.php';
include_once 'folder_system.php';
include_once 'packet_system.php';

$database = new Database();

$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$jwtData=isset($data->jwt) ? $data->jwt : "";

if(!$jwtData){
    http_response_code(401);
    die( json_encode(array("message" => "Access denied."))); 
}

$folder = new FolderSystem($db);

$decoded = JWT::decode($jwtData,  new Key($key, 'HS256'));

$folder->user_id = $decoded->data->user_id;
$folder->parentfolder_id = $data->folder_id;
$folder->foldername = $data->foldername;


try{
    if($folder->createFolder()){
        http_response_code(200);
        echo json_encode(array("message" => "Folder created."));
    }else{
        http_response_code(401);
        echo json_encode(array("message" => "Unable to create folder."));
    }
    
}catch (Exception $e){
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}
