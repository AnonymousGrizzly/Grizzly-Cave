<?php
class FileSystem{
    private $conn;
    public $target_dir = "../fileUploads/";
    public $max_size = 500000000;
    private $table = "files";
    private $folder_table = "folders";
    
    //object properties
    public $file_id;
    public $filename;
    public $sanitized_name;
    public $filesize;
    public $filetype;
    
    //time
    public $created_at;
    public $modified_at;
    
    //owner
    public $user_id;

    //default
    public $deleted = 0;
    public $folder_id = NULL;

    public function __construct($db){
        $this->conn = $db;
    }

    public function createFile(){
        $query = "INSERT INTO ".$this->table." (folder_id, filename, filesize, filetype, user_id, sanitized_name)
            VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
        ";
        var_dump($this->user_id);
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        $stmt->bindParam(2, $this->filename);
        $stmt->bindParam(3, $this->filesize);
        $stmt->bindParam(4, $this->filetype);
        $stmt->bindParam(5, $this->user_id);
        $stmt->bindParam(6, $this->sanitized_name);
        if($stmt->execute()){ //if successful
            return true;
        } 
        return false;
    }
    
    public function deleteFile($fullDelete){
        if($fullDelete){
            $query = "DELETE FROM ".$this->table."
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
    public function deleteFileByFolder($fullDelete){
        if($fullDelete){
            $query = "DELETE FROM ".$this->table."
            WHERE folder_id=? AND deleted != 1
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->folder_id);
            if($stmt->execute()){
                return true;
            }
        }else{
            $query = "UPDATE FROM ".$this->table."
            SET
            deleted = 1
            WHERE folder_id = ? AND deleted != 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->folder_id);
            if($stmt->execute()){
                return true;
            }
        }
        return false;
    }

    public function getFiles(){
        $query = "SELECT file_id, filename, folder_id
            FROM ".$this->table."
            WHERE user_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        return $stmt;
    }
    
    public function getFilesByFolder(){
        $query = "SELECT file_id, filename, folder_id
            FROM ".$this->table."
            WHERE folder_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        $stmt->execute();
        return $stmt;
    }
    public function getPath(){
        $path = $this->target_dir . $this->user_id . '/';

        if ($this->folder_id === NULL) {
            return $path;
        }

        $condition = $this->file_id;
        $query = "SELECT folder_id FROM ".$this->table."
            WHERE file_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $condition);
        $stmt->execute();
        $stmt->bind_result($condition);
        while($stmt->rowCount()>0){
            $path .= $condition .'/';
            $query = "SELECT folder_id FROM ".$this->folder_table."
            WHERE folder_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $condition);
            $stmt->execute();
        }
        $path .= $condition .'/';
        return $path;
    }
    public function getSanitizedName(){
        $query = "SELECT sanitized_name FROM ".$this->table."
        WHERE filename = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->filename);
        $stmt->execute();
        return $stmt;
    }
}
?>