<?php
require_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check(@$_SESSION['UserId'])||!check(@$_SESSION['UserName'])){
        throw new Exception("Please Sign In first.");
    }
    if(!check($data['Content'])||!check($data['Title'])){
        throw new Exception("Title and Introduction must be filled.");
    }
    $time=date("y-m-d h:i:s");
    $str="insert into Book (Authur,Name,About,Time)VALUES ('{$_SESSION['UserId']}','{$data['Title']}','{$data['Content']}','$time')";
    insert($str);
    echo 1;
}catch(Exception $e) {
    echo $e->getMessage();
}
