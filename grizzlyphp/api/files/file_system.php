<?php
class FileSystem{
    private $conn;
    public $target_dir = "../fileUploads/";
    public $max_size = 500000000;
    private $table = "files";
    
    //object properties
    public $file_id;
    public $filename;
    public $filesize;
    public $filetype;
    
    //time
    public $created_at;
    public $modified_at;
    
    //owner
    public $user_id;

    //default
    public $deleted = 0;
    public $folder_id=0;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        $query ="INSERT INTO".$this->table_name."
            SET
            folder_id = ?,
            filename = ?,
            filesize = ?,
            filetype = ?,
            user_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        $stmt->bindParam(2, $this->filename);
        $stmt->bindParam(3, $this->filesize);
        $stmt->bindParam(4, $this->filetype);
        $stmt->bindParam(5, $this->user_id);
        if($stmt->execute()){ //if successful
            return true;
        } 
        return false;
    }
    
    public function delete($fullDelete){
        if($fullDelete){
            $query = "DELETE FROM".$this->table."
            WHERE file_id=?
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->file_id);
            if($stmt->execute()){
                return true;
            }
        }else{
            $query = "UPDATE FROM".$this->table."
            SET
            deleted = 1
            WHERE file_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->file_id);
            if($stmt->execute()){
                return true;
            }
        }
        return false;
    }
    public function updateTRY(){
        $table = $this->table;
        $query = "UPDATE".$table." 
            SET filetype = ?, folder_id=?, modified_at=?, filesize=?, filename=?
            WHERE file_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->filetype, PDO::PARAM_STR); 
    }
}
?>