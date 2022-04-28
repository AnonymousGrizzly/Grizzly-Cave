<?php

class Details{
    private $conn;    
    private $table = "details";
  
    public $details_id;
    public $overall_time;
    public $last_time;
    public $storage_size;
    public $num_of_files;
    public $user_id;

    public function __construct($db){
        $this->conn = $db;
    }

    public function logout_procedure($overall_time, $storage_size, $user_id, $num_of_files){
        $query = "CALL logout_procedure(?, ?, ?, ?);";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $overall_time);
        $stmt->bindParam(2, $user_id);
        $stmt->bindParam(3, $storage_size);
        $stmt->bindParam(4, $num_of_files);
        $stmt->execute();
        return $stmt;
    }

    public function calculateTime($start){
        $query = "SELECT overall_time FROM ".$this->table."
            WHERE user_id = ? 
            ORDER BY details_id DESC
            LIMIT 0, 1
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        $diff = time()-$start;
        $calc = $stmt->fetch();
        $result = $diff + $calc['overall_time'];
        return $result;
    }

    public function storageSize(){
        $query = "SELECT storage_size from ".$this->table."
            WHERE user_id = ? 
            ORDER BY details_id DESC
            LIMIT 0, 1
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['storage_size'];
    }
}

?>