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

    public static $FETCH_DELETED_FOLDERS = 0;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getFolderByParentId($user_id, $parent_id) {
        $query = "SELECT * 
                    FROM folders 
            WHERE ((? IS NULL AND parentfolder_id IS NULL) OR (parentfolder_id = ?)) AND user_id = ? AND deleted = 0";

        
        $stmt  = $this->conn->prepare($query);
        $stmt->bindParam(1, $parent_id);
        $stmt->bindParam(2, $parent_id);
        $stmt->bindParam(3, $user_id);


        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC); //return associative table of files
        } 
        
        return [];
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
        $query = "DELETE FROM $this->table WHERE folder_id = ? AND user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->folder_id);
        $stmt->bindParam(2, $this->user_id);
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
    public function getParentFolder($n){
        $query = "SELECT parentfolder_id FROM ".$this->table."
            WHERE folder_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $n);
        $stmt->execute();
        return $stmt;
    }
}

?>