<?php
header("Access-Control-Allow-Origin: http://localhost/rest-api-authentication-example/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once '../config/database.php';
include_once 'objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$user = new User($db);
 // get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->username = $data->username;
$user->email = $data->email;
$user->password = $data->password;
if(!empty($user->firstname) && !empty($user->email) && !empty($user->password) && $user->create() ){ //if able to create user
    http_response_code(200);
    echo json_encode(array("message" => "User created."));
}else{ // if unable to create user
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create user."));
}
?>