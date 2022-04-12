<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE");
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
include_once './objects/file_system.php';

if($_SERVER['REQUEST_METHOD'] === "OPTIONS"){   //to enable calls from different domains (production mode: react :3000, php :3001)
    http_response_code(200);
    die;
}

$database = new Database(); 


$db = $database->getConnection(); //get connection
$data = json_decode(file_get_contents("php://input"));
$jwtData = isset($data->jwt) ? $data->jwt : "";

if(!$jwtData){  //if no token, deny access
    http_response_code(401);
    die( json_encode(array("message" => "Access denied."))); 
}

$file = new FileSystem($db); //create new object for method usage

$decoded = JWT::decode($jwtData,  new Key($key, 'HS256'));

$file->user_id = $decoded->data->user_id;
$file->file_id = $data->file_id;


try{
    if($file->deleteFile(false)){ //try to delete folder
        http_response_code(200);
        echo json_encode(array("message" => "Folder deleted."));
    }else{
        http_response_code(401);
        echo json_encode(array("message" => "Unable to delete folder."));
    }
}catch (Exception $e){  //if it fails, deny access
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}

//full delete and semi delete should be created

?>