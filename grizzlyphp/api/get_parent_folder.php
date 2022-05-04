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
include_once 'objects/folder_system.php';

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
  http_response_code(200);
  die;
}

$database = new Database();
$db = $database->getConnection();
$folder = new FolderSystem($db);

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";

if($jwt){
  $decoded = JWT::decode($jwt,  new Key($key, 'HS256'));
  $folder->folder_id  = $data->folder_id;
  $result = $folder->getParentFolder()->fetch();

  http_response_code(200);
  echo json_encode(array("data" => array(
  "parentfolder_id" => $result['parentfolder_id'],
  )));
}else{
  http_response_code(401);
  echo json_encode(array("message"=>"Unable to retrieve data."));
}


?>