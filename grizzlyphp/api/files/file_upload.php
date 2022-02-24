<?php 
$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$files = new File($db);


$bannedExtensions = array('exe', 'dll', 'lnk', 'sys', 'jar', 'swf', 'gzquar', 'scr', 'zix', 'js', 'com', 'bat', 'vbs', 'ocx', 'bin', 'ws', 'class', 'drv', 'ozd', 'aru', 'wmf', 'shs', 'chm', 'pgm', 'dev', 'pif', 'xnxx', 'xlm', 'vbe', 'vxd', 'tps', 'boo', 'vba', '0_full_0_tgod_signed', 'pcx', '386', 'sop', 'tsa', 'hlp', 'vb', 'exe1', 'scr', 'bkd', 'exe_renamed', 'rhk', 'lik', 'vbx', 'osa', 'cih', 'mjz', 'php3', 'dyz', '.9', 'hlw', 'dom', 'dlb', 'dxz', 'mfu', 's7p', 'bup', 'mfu', 's7p', 'cla', 'mjg', 'dyv', 'kcd', 'upa', 'ceo', 'plc', 'blf', 'zvz', 'cc', 'ce0', 'pr', 'qit', 'lok', 'lpaq5', 'fuj', 'atm', 'hsq', 'crypt1', 'nls');
$uploadFileDir=$this->$target_dir;
if( isset($_POST['upload']) == 'upload' ){
    if(isset($_FILES['uploadedFile']) && $_FILES['uploadedFile']['error'] === UPLOAD_ERR_OK){
        $filename = $_FILES['uploadedFile']['name'];
        $fileSize = $_FILES['uploadedFile']['size'];
        $fileType = $_FILES['uploadedFile']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        
        $sanitizedFileName = md5(time() . $fileName) . '.' . $fileExtension;
        if(!in_array($fileExtension, $bannedExtensions)){
            $destinationPath = $uploadFileDir.$sanitizedFileName;
            if(move_uploaded_file($fileTmpPath, $destinationPath)){
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
}



?>