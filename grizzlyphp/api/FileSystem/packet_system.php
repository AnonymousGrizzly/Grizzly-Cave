<?php
class PacketSystem{
    private $conn;
    private $table= "packets";

    //object ids
    public $packet_id;
    public $file_id;
    //users
    public $receiver_id;
    public $sender_id;
    //misc.
    public $edit_perm;
    public $created_packet;

    public function __construct($db){
        $this->conn = $db;
    }
    public function createPacket(){
        $query = "INSERT INTO ".$this->table."
        (file_id, receiver_id, sender_id)
        VALUES(?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->file_id);
        $stmt->bindParam(2, $this->receiver_id);
        $stmt->bindParam(3, $this->sender_id);
        if($stmt->execute()){ //if successful
            return true;
        } 
        return false;
    }
    public function getPacketDetails(){
        $query = "SELECT file_id, receiver_id, sender_id, edit_perm, created_packet FROM ".$this->table."
        WHERE packet_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->packet_id);
        $stmt->execute();
        return $stmt;
    }
}
?>