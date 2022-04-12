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
 

$database = new Database();
$db = $database->getConnection(); //get connection with database
 
$user = new User($db);
$data = json_decode(file_get_contents("php://input"));
 

$user->username = $data->username; 

$stmt = $user -> getUserByUsername(); //searches for username

if($stmt->rowCount() == 0){ //if database returns a row, there's a username
    http_response_code(400);
    echo json_encode(array("message" => "User does not exist")); //return code
    exit();
}

$user_id = $stmt->fetch(PDO::FETCH_ASSOC)['user_id'];

http_response_code(200);
echo json_encode(array("message" => "User exists", "id" => $user_id)); //return that it there is a user

?>
