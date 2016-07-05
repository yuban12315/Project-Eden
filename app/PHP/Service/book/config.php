<?php
include_once ("../../DAO/DBconnect.php");
session_start();
function GetTime($time){
    $flag=0;
    $t='';
    for($i=0;$i<strlen($time);$i++){
        if($time[$i]==':'){
            $flag++;
        }
        if($flag==2) break;
        $t=$t.$time[$i];
    }
    return $t;
}