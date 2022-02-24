<?php
class FileSystem{
    private $target_dir = "../fileUploads/";
    private $max_size = 500000000;
    private $table = "files";
    
    private $folder_id;
    private $foldername;
    private $parenfolder_id;

    private $created_at;
    private $modified_at;
    private $user_id;
    private $deleted = 0;

    public function update(){
        try{
            $table = $this->table;
            $connection = $this->conn; 
            $query = "UPDATE".$table." 
                SET filetype = ?, folder_id=?, modified_at=?, filesize=?, filename=?
                WHERE file_id = ?";
            $stmt = $connection->prepare($query);
            $stmt->bindParam(1, $this->filetype, PDO::PARAM_STR);
            //$stmt->bindParam(2, $id, PDO::PARAM_STR);
            //$stmt->bindParam(3, $modified_at, PDO::PARAM_STR);
            //$stmt->bindParam(4, $this->, PDO::PARAM_STR);
        }catch(PDOException $e){
            return false;
        }
    }

    public function delete($fullDelete){
        if($fullDelete){

        }else{
            $query = "SET
                deleted = 1
                WHERE file_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam();


        }
    }

}
?>