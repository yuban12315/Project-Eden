<?php

include_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check($data['UserName'])||!check($data['PassWord'])){
        throw new Exception("Information must be filled.");
    }
    $conn=connect();
    if(!$conn){
        throw  new Exception("DB connect failed.");
    }
    if(!empty(select_u($data['UserName']))){
        throw new Exception('UserName had been used.');
    }
    $str = "insert into user (UserName,PassWord,Status) VALUES ('{$data['UserName']}','{$data['PassWord']}',0)";
    insert($str);
    $row=select_u($data["UserName"]);
    $_SESSION['UserId']=$row['Id'];
    $_SESSION['UserName']=$row['UserName'];
    echo 1;
}catch (Exception $error){
    print $error->getMessage();
}
