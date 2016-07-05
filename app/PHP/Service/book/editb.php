<?php
require_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check(@$_SESSION['UserId'])||!check(@$_SESSION['UserName'])){
        throw new Exception("Please Sign In first.");
    }
    if(!check($data['Content'])||!check($data['Title'])){
        throw new Exception("Can't be empty.");
    }
    $time=date("y-m-d h:i:s");
    $str="update book set Name='{$data['Title']}',About='{$data['Content']}' where Id='{$data['Id']}'";
    insert($str);
    //echo $str;
    echo 1;
}catch(Exception $e) {
    echo $e->getMessage();
}
