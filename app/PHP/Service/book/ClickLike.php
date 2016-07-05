<?php
require_once ("config.php");
$data=file_get_contents('php://input', true);
$data=json_decode($data,true);

try{
    if(!check(@$_SESSION['UserId'])||!check(@$_SESSION['UserName'])){
        throw new Exception("Please Sign In first.");
    }
    if(!check($data['Chapter'])){
        throw new Exception("Excalibur.");
    }

}catch(Exception $e){
    echo $e->getMessage();
}