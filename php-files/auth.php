<?php
    require_once("connection.php");
    $username=$_POST['user'];
    $password=$_POST['password'];

    //injection prevention
    $username = stripclashes($username);
    $username = mysqli_real_escape_string($con, $username);

    $password = stripclashes($password);
    $password = mysqli_real_escape_string($con, $password);
    
    //pass to MySQL
    $sql = "SELECT * FROM LOGIN WHERE username ='$username' AND password = '$password' "
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
    $count = mysqli_num_rows($result); 
    

    //check connection
    if($count == 1){
        console.log("login: success");
    }else{
        console.log("login: fail");
    }
?>