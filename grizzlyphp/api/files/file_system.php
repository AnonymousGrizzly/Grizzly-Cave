<?php
class FileSystem{
    private $target_dir = "../uploads/";
    private $max_size = 500000000;

    private $table = "files";
    private $creator_id;
    private $path;
    private $name;
	private $conn;
    private $id;
    private $modified_at;
    private $file_id;

    public function update(){
        try{
            $table = $this->table;
            $connection = $this->conn; 
            $query = "UPDATE".$table." 
                SET filetype = ?, folder_id=?, modified_at=?, filesize=?, filename=?
                WHERE file_id = ?";
            $stmt = $connection->prepare($query);
            $stmt->bindParam(1, $this->filetype, PDO::PARAM_STR);
            //$stmt->bindParam(2, $id, PDO::PARAM_STR);
            //$stmt->bindParam(3, $modified_at, PDO::PARAM_STR);
            //$stmt->bindParam(4, $this->, PDO::PARAM_STR);
        }catch(PDOException $e){
            return false;
        }
    }

    public function setFileId($id){
        $this->file_id = $id;
    }
   
}
?>