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
include_once './objects/packet_system.php';

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
    http_response_code(200);
    die;
}

$database = new Database();

$db = $database->getConnection(); //get connection
$data = json_decode(file_get_contents("php://input"));
$jwtData=isset($data->jwt) ? $data->jwt : "";

$packet = new PacketSystem($db); //create new object for method usage

$decoded = JWT::decode($jwtData,  new Key($key, 'HS256'));

$packet->packet_id = $data->packet_id;
$packet->receiver_id = $decoded->data->user_id;

if(!$jwtData){ //if no token, deny access
    http_response_code(401);
    die( json_encode(array("message" => "Access denied."))); 
}

try{
    if($packet->deletePacket()){
        http_response_code(200);
        echo json_encode(array("message" => "Packet deleted.")); //return message
    }else{
        http_response_code(401);
        echo json_encode(array("message" => "Unable to delete packet."));  //return message
    }
}catch (Exception $e){ //if it fails, deny access
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}
?>
