<?php
class Database{
    private $host = "localhost"; //name of host
    private $db_name = "grizzlybase"; //name of database
    private $username = "root"; //name of username
    private $password = ""; //password
    public $conn; //connection
 
    // get the database connection
    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>