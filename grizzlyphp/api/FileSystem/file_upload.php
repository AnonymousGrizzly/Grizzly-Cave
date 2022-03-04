<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Content-Type: application/json; charset=UTF-8");
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

if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
    http_response_code(200);
    die;
}

$database = new Database();
$db = $database->getConnection();

$jwt = $_POST['token'];

if (!$jwt) {
    http_response_code(401);
    die(json_encode(array("message"=>"Must be logged in.")));
}

$bannedExtensions = array('exe', 'php', 'dll', 'lnk', 'sys', 'jar', 'swf', 'gzquar', 'scr', 'zix', 'js', 'com', 'bat', 'vbs', 'ocx', 'bin', 'ws', 'class', 'drv', 'ozd', 'aru', 'wmf', 'shs', 'chm', 'pgm', 'dev', 'pif', 'xnxx', 'xlm', 'vbe', 'vxd', 'tps', 'boo', 'vba', '0_full_0_tgod_signed', 'pcx', '386', 'sop', 'tsa', 'hlp', 'vb', 'exe1', 'scr', 'bkd', 'exe_renamed', 'rhk', 'lik', 'vbx', 'osa', 'cih', 'mjz', 'php3', 'dyz', '.9', 'hlw', 'dom', 'dlb', 'dxz', 'mfu', 's7p', 'bup', 'mfu', 's7p', 'cla', 'mjg', 'dyv', 'kcd', 'upa', 'ceo', 'plc', 'blf', 'zvz', 'cc', 'ce0', 'pr', 'qit', 'lok', 'lpaq5', 'fuj', 'atm', 'hsq', 'crypt1', 'nls');

if(isset($_FILES['uploadedFile']) && $_FILES['uploadedFile']['error'] === UPLOAD_ERR_OK){
    $decoded = JWT::decode($jwt,  new Key($key, 'HS256'));

    $fileName = $_FILES['uploadedFile']['name'];
    $fileSize = $_FILES['uploadedFile']['size'];
    $fileType = $_FILES['uploadedFile']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));
    
    $sanitizedFileName = md5(time() . $fileName) . '.' . $fileExtension;
    if(!in_array($fileExtension, $bannedExtensions)){
        
        $files = new FileSystem($db);
        $files->filename = $fileName;
        $files->filesize = $fileSize;
        $files->filetype = $fileType;
        $files->sanitized_name = $sanitizedFileName;
        $files->user_id = $decoded->data->user_id;
        $files->createFile();

        $uploadFileDir = $files->getPath();
        $destinationPath = $uploadFileDir . $sanitizedFileName;

        if ( ! is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0777, true);
        }

        if(move_uploaded_file($_FILES["uploadedFile"]["tmp_name"], $destinationPath)){
            http_response_code(201);
            echo json_encode(array("message"=>"Uploaded successfully"));
        }else{
            http_response_code(401);
            echo json_encode(array("message"=>"Failed to upload."));
        }
    }else{
        http_response_code(401);
        echo json_encode(array("message"=>"Banned or unknown extension!"));
    }

}else{
    http_response_code(401);
    echo json_encode(array("message"=>"Failed to upload."));
}





?>