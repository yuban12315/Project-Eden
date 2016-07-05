<?php
include_once ("config.php");

if(check(@$_SESSION["UserId"])){
    echo 1;
}else{
    echo 0;
}
