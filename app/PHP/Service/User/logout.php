<?php

include_once("config.php");

try {
    $sessionName = session_name();
    $sessionCookie = session_get_cookie_params();
    $_SESSION = array();
    if (!check(@$_SESSION["UserId"]))
    echo 1;
    else {
        throw new Exception("error");
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
