<?php
require_once ("config.php");

try{
    if(!check(@$_GET["BookId"])){
        throw new Exception("数据丢失");
    }
    $str="select * from  caption WHERE BookId='{$_GET["BookId"]}'";
    $row=select_all($str);
    if(empty($row)){
        throw new Exception("0");
    }
    $arry['data']=$row;

    echo json_encode($arry);
}catch (Exception $e){
    echo $e->getMessage();
}