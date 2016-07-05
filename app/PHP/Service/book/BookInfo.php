<?php
require_once("config.php");

try {
    if (!check(@$_GET["Id"])) {
        throw new Exception("数据丢失");
    }
    $str = "select * from  book WHERE Id='{$_GET["Id"]}'";
    $row = select($str);
    unset($row['Id']);
    if (empty($row)) {
        throw new Exception("0");
    }
    $arry['Book'] = $row;
    $str="select * from  user WHERE Id='{$row['Authur']}'";
    $row=select($str);
    unset($row['PassWord'],$row['Id'],$row['Status']);
    $arry['Book'] += $row;
    $str="select * from  caption WHERE BookId='{$_GET["Id"]}'";
    $row = select_all($str);
    $arry['Chapters']=array();
    foreach ($row as $i) {
        unset($i["Content"]);
        array_push($arry['Chapters'],$i);
    }
    echo json_encode($arry);
} catch (Exception $e) {
    echo $e->getMessage();
}