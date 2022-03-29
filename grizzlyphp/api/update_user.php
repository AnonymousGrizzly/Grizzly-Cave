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
include_once 'libs/php-jwt-main/src/Key.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once 'config/database.php';
include_once 'objects/user.php';

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
    http_response_code(200);
    die;
}

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";

if($jwt){
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        $user->user_id = $decoded->data->user_id;
        
        if(empty($data->username) ){
            $result = $user->getUserByUserId()->fetch();
            $user->username = $result['username'];
        }else{
            $user->username = $data->username;
            $stmt = $user->getUserByUsername();
            if($stmt->rowCount()>0){
                http_response_code(409);
                echo json_encode(array("message" => "Username already exists"));
                exit();
            }
        }
        if(empty($data->email)){
            $result = $user->getUserByUserId()->fetch();
            $user->email = $result['email'];
        }else{
            $user->email = $data->email;
            $stmt = $user->getUserByEmail();
            if($stmt->rowCount()>0){
                http_response_code(409);
                echo json_encode(array("message" => "Email already exists"));
                exit();
            }
        }
        if(empty($data->password)){
            if($user->updateWithoutPassword()){
                $token = array(
                    "iat" => $issued_at,
                    "exp" => $expiration_time,
                    "iss" => $issuer,
                    "data" => array(
                        "user_id" => $user->user_id,
                        "username" => $user->username
                    )
                 );
    
                $jwt = JWT::encode($token, $key, 'HS256');
                http_response_code(200);
                echo json_encode(
                    array(
                        "message" => "User was updated.",
                        "jwt" => $jwt
                    )
                );
                exit();
            }else{
            http_response_code(401);
            echo json_encode(array("message" => "Unable to update user."));
            exit();
        }
        }else{
            $user->password = $data->password;
        }
        if($user->update()){
            $token = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "iss" => $issuer,
                "data" => array(
                    "user_id" => $user->user_id,
                    "username" => $user->username
                )
             );

            $jwt = JWT::encode($token, $key, 'HS256');
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "User was updated.",
                    "jwt" => $jwt
                )
            );
        }else{
            http_response_code(401);
            echo json_encode(array("message" => "Unable to update user."));
        }
    }catch (Exception $e){
        http_response_code(401);
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}else{
    http_response_code(401);
    echo json_encode(array("message" => "Access denied."));
}
?>