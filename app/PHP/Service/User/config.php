<?php
include_once ("../../DAO/DBconnect.php");
session_start();
function select_u($str){
    $query= "select * from user where UserName ="."\"$str\"";
    return select($query);
}

