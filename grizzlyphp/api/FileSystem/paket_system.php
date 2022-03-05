<?php
class PacketSystem{
    private $conn;
    private $table= "packets";

    public $packet_id;
    public $file_id;
    public $receiver_id;
    public $sender_id;
    public $edit_perm;
    public $created_packet;
}
?>