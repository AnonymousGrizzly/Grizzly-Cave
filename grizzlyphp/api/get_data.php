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

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
    http_response_code(200);
    die;
}

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$jwtData=isset($data->jwt) ? $data->jwt : "";


if(!$jwtData){
    http_response_code(401);
    die(json_encode(array("message" => "Access denied."))); 
}

$decoded = JWT::decode($jwtData, new Key($key, 'HS256'));

$user_id = $decoded->data->user_id;
if(isset($data->parent_folder_id)){
    $parent_folder_id = $data->parent_folder_id;
}else{
    $parent_folder_id = null;
}

$file_system = new FileSystem($db);
$folder_system = new FolderSystem($db);

$files = $file_system->getFilesByFolder($user_id, $parent_folder_id);
$folders = $folder_system->getFolderByParentId($user_id, $parent_folder_id);
$storage = (int)$file_system->storageSize($user_id);

http_response_code(200);
echo json_encode(array("files" => $files, "folders" => $folders, "storage" => $storage));
?>