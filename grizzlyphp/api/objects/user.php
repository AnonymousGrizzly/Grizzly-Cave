<?php
class User{
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $user_id;
    public $username;
    public $email;
    public $password;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
 
    // create user
    function create(){
        $query = "INSERT INTO " . $this->table_name . "
            SET
                username = :username,
                email = :email,
                password = :password";
 
        $stmt = $this->conn->prepare($query);
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        // hash
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
        if($stmt->execute()){ //if successful
            return true;
        } 
        return false;
    }
    //check email
    function assignUserData(){
        $stmt=$this->getUserByUsername();
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($stmt->rowCount()>0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->user_id = $row['user_id'];
            $this->password = $row['password'];
            return true;
        }
        return false;
    }

    public function getUserByEmail(){
        $query = "SELECT user_id, username, password
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0, 1";
     
        $stmt = $this->conn->prepare( $query );
        $this->email=htmlspecialchars(strip_tags($this->email));
     
        // bind given email value
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        return $stmt;
    }

    public function getUserByUsername(){
        $query = "SELECT user_id, username, password
                FROM " . $this->table_name . "
                WHERE username = ?
                LIMIT 0, 1";
     
        $stmt = $this->conn->prepare( $query );
        $this->username=htmlspecialchars(strip_tags($this->username));
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        return $stmt;
    }

    public function getUserByUserId(){
        $query = "SELECT username, email 
                FROM" . $this->table_name ."
                WHERE user_id = ?
                LIMIT 0, 1";
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        return $stmt; 
    }

    public function update(){
        $query = "UPDATE".$this->table_name."
            SET 
                username = ?,
                email = ?,
                password = ?
                WHERE id = ?
            ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->email);
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(3, $this->$password_hash);
        $stmt->bindParam(4, $this->id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function update2(){
        $password_set=!empty($this->password) ? ", password = :password" : "";
        $query = "UPDATE " . $this->table_name . "
                SET
                    username = :username,
                    email = :email
                    {$password_set}
                WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
     
        // hash password before saving to database
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }
     
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->user_id);
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }
}

?>