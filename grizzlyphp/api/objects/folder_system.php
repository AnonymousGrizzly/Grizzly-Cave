<?php

class FolderSystem{
    private $table = "folders";
    private $conn;
    //object properties
    public $folder_id;
    public $foldername;
    public $parentfolder_id;
    //time
    public $created_at;
    public $modified_at;
    //owner
    public $user_id;


    public function __construct($db){
        $this->conn = $db;
    }

    public function createFolder(){
        $query ="INSERT INTO ".$this->table."
        (foldername, parentfolder_id, user_id)
        VALUES (
        ?,
        ?,
        ?
        )";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->foldername);
        $stmt->bindParam(2, $this->parentfolder_id);
        $stmt->bindParam(3, $this->user_id);
        
        if($stmt->execute()){ 
            $this->folder_id = $this->conn->lastInsertId();
            return true;
        } 
        return false;
    }
    public function deleteFolder(){
        $query = "DELETE FROM".$this->table."
            WHERE folder_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function updateFolder(){
        $query = "UPDATE ".$this->table."
            SET
                foldername = ?,
                modified_at = ?
            WHERE folder_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->foldername);
        $stmt->bindParam(2, $this->modified_at);
        $stmt->bindParam(3, $this->folder_id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
}

?>