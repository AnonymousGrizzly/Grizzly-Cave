<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'config/core.php';
include_once 'libs/php-jwt-main/src/BeforeValidException.php';
include_once 'libs/php-jwt-main/src/ExpiredException.php';
include_once 'libs/php-jwt-main/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-main/src/JWT.php';
use \Firebase\JWT\JWT;

include_once 'config/database.php';
include_once 'objects/user.php';
include_once 'objects/file_system.php';

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){ //to enable calls from different domains (production mode: react :3000, php :3001)
    http_response_code(200);
    die;
}

$database = new Database();
$db = $database->getConnection(); //get connection
$user = new User($db);
$file = new FileSystem($db);
$details = new Details($db);

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";
if(!$jwt){ //if no token, deny access
    http_response_code(401);
    die( json_encode(array("message" => "Access denied."))); 
}


try{
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    $user->user_id = $decoded->data->user_id;
    $num_of_files = $file->getNumberOfFiles($user->user_id);
    $storage_size = $file->storageSize($user->user_id);
    $overall_time = 0; //še naredi
    $details->logout_procedure($overall_time, $storage_size, $user_id, $num_of_files);
}catch (Exception $e){ //deny access if fails
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ))
}

?>