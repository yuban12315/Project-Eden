<?php
include_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check(@$data['UserName'])||!check(@$data['PassWord'])){
        throw new Exception("登录信息不能留空");
    }
    $conn=connect();
    if(!$conn){
        throw  new Exception("连接数据库失败，请联系天泽近卫");
    }
    $row=select_u($data['UserName']);
    if(empty($row)||$row["PassWord"]!=$data["PassWord"]){
        throw new  Exception("用户名或密码错误");
    }
    $_SESSION['UserId']=$row['Id'];
    $_SESSION['UserName']=$row['UserName'];

    echo 1;
}catch (Exception $error){
    print $error->getMessage();
}
