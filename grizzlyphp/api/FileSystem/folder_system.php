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
        $query ="INSERT INTO".$this->table_name."
        SET
        foldername = ?,
        parentfolder_id =?,
        user_id = ?
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->foldername);
        $stmt->bindParam(2, $this->parentfolder_id);
        if($stmt->execute()){ //if successful
            return true;
        } 
        return false;
    }
    public function deleteFolder(){
        $query = "DELETE FROM".$this->table."
            WHERE folder_id = ?
        ";
    }

}

?>