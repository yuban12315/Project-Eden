<?php
require_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    $str="select * from  book WHERE Authur='{$_SESSION['UserId']}'";
    $row=select_all($str);
    if(empty($row)){
        throw new Exception("0");
    }
    $arry['data']=$row;
    echo json_encode($arry);
}catch(Exception $e){
    echo $e->getMessage();
}

