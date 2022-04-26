<?php

class Details{

    private $table = "details"

    public function __construct($db){
        $this->conn = $db;
    }

    public function logout_procedure($overall_time, $storage_size, $user_id, $num_of_files){
        $query = "logout_procedure(?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $overall_time);
        $stmt->bindParam(2, $storage_size);
        $stmt->bindParam(3, $user_id);
        $stmt->bindParam(4, $num_of_files);
        $stmt->execute();
        return $stmt;
    }

}

?>