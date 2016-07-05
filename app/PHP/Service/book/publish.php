<?php
require_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check(@$_SESSION['UserId'])||!check(@$_SESSION['UserName'])){
        throw new Exception("Please Sign In first.");
    }
    if(!check($data['Content'])||!check($data['Title'])){
        throw new Exception("Share your airticle.");
    }
    $time=date("y-m-d h:i:s");
    $str="insert into caption ( BookId,Content,Title,Time)VALUES ('{$data["BookId"]}','{$data["Content"]}','{$data["Title"]}','{$time}')";
    insert($str);
    echo 1;
}catch(Exception $e) {
    echo $e->getMessage();
}
