<?php
class PacketSystem{
    private $conn;
    private $table = "packets";

    //object ids
    public $packet_id;
    public $file_id;
    //users
    public $receiver_id;
    public $sender_id;
    //misc.
    // public $edit_perm;
    public $created_packet;
    public $short_message;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getPacketsByRecieverId() {
        $query = "SELECT u.username, p.short_message, p.packet_id, p.created_packet, f.* 
                        FROM packets p 
                    LEFT JOIN files f ON f.file_id = p.file_id 
                    LEFT JOIN users u ON u.user_id = p.sender_id 
                        WHERE receiver_id = ? ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->receiver_id);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createPacket(){
        $query = "INSERT INTO $this->table (file_id, receiver_id, sender_id, short_message) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->file_id);
        $stmt->bindParam(2, $this->receiver_id);
        $stmt->bindParam(3, $this->sender_id);
        $stmt->bindParam(4, $this->short_message);

        if($stmt->execute()){
            return true;
        } 
        return false;
    }

    public function getPacketDetails(){
        $query = "SELECT packet_id, file_id, receiver_id, sender_id, edit_perm, created_packet FROM $this->table WHERE packet_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->packet_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deletePacket(){
        $query = "DELETE FROM ".$this->table." WHERE packet_id = ? AND receiver_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->packet_id);
        $stmt->bindParam(2, $this->receiver_id);
        $stmt->execute();
        return $stmt;
    }
}
?>