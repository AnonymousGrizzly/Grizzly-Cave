<?php
class FileSystem{
    private $conn;
    private $table = "files";
    
    public $target_dir = "../fileUploads/";
    public $max_size = 500000000;
    
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

    public function createFile(){ //creation of file
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
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        $stmt->bindParam(2, $this->filename);
        $stmt->bindParam(3, $this->filesize);
        $stmt->bindParam(4, $this->filetype);
        $stmt->bindParam(5, $this->user_id);
        $stmt->bindParam(6, $this->sanitized_name);
        if($stmt->execute()){ //if successful
            $this->file_id = $this->conn->lastInsertId();
            return true;
        } 
        return false;
    }
    
    public function deleteFile($fullDelete){ //same as by folder
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
            $query = "UPDATE ".$this->table." SET deleted = 1 WHERE file_id = ? AND user_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->file_id);
            $stmt->bindParam(2, $this->user_id);
            if($stmt->execute()){
                return true;
            }
        }
        return false;
    }
    public function deleteFileByFolder($fullDelete){ //I shouldn't full delete all the time
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

    public function getFiles(){ //files without folders
        $query = "SELECT file_id, filename, folder_id
            FROM ".$this->table."
            WHERE user_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        return $stmt;
    }
    
    public function getFilesByFolder($user_id, $folder_id){ //normal file system 
        $query = "SELECT 
        file_id,
        filename, 
        folder_id, 
        modified_at, 
        created_at, 
        filesize
            FROM ".$this->table."
            WHERE ((? IS NULL AND folder_id IS NULL) OR (folder_id = ?)) AND 
            user_id = ? AND deleted = 0
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $folder_id); //if parent folder id is root 
        $stmt->bindParam(2, $folder_id); //if not parent folder
        $stmt->bindParam(3, $user_id); //owner 
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); //return associative table of files
    }

    public function getPath(){
        $path = $this->target_dir . $this->user_id . '/';
        return $path . $this->sanitized_name;
    }

    public function getDir() {
        return $this->target_dir . $this->user_id;
    }

    public function getFileDetails($file_id, $user_id){ //all file details
        $query = "SELECT user_id, folder_id, filetype, filesize, filename, sanitized_name FROM $this->table
        WHERE file_id = ? AND user_id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $file_id);
        $stmt->bindParam(2, $user_id);
        $stmt->execute();
        return $stmt;
    }
    public function getNumberOfFiles($user_id){ //number of file for a user
        $query = "SELECT COUNT(file_id) FROM ".$this->table."
        WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        return $stmt;
    }
    
}
?>