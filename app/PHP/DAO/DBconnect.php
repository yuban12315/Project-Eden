<?php
ini_set("session.cookie_httponly", 1);
function Json_s()
{
    echo ")]}',\n";
}

function connect()
{
    //$Url = "183.175.14.254";
    $Url="127.0.0.1";
    $User = "root_me";
    $Pass = "";
    $DB = "eden";
    try {
        @$conn = mysqli_connect($Url, $User, $Pass, $DB);
        if (!$conn) {
            throw new Exception("connect error");
        }
        return $conn;
    } catch (Exception $e) {
        $e->getMessage();
        return 0;
    }
}

function select($str)
{
    $conn = connect();
    $result = mysqli_query($conn, $str);
    $row = mysqli_fetch_assoc($result);
    mysqli_close($conn);
    return $row;
}

function select_all($str)
{
    $conn = connect();
    $i = 0;
    $result = mysqli_query($conn, $str);
    $row = mysqli_fetch_assoc($result);
    if (empty($row)) {
        return $row;
    }
    $array[$i] = $row;
    while (1) {
        $i++;
        $row = mysqli_fetch_assoc($result);
        if (empty($row)) {
            break;
        }
        $array[$i] = $row;
    }
    mysqli_close($conn);
    return $array;
}

function insert($str)
{
    $conn = connect();
    if (mysqli_query($conn, $str)) {
        mysqli_close($conn);
        return true;
    } else {
        echo 'error';
        die();
    }
}

function update($str)
{
    $conn = connect();
    if (mysqli_query($conn, $str)) {
        mysqli_close($conn);
        return true;
    } else {
        echo 'error';
        die();
    }
}

function del($str)
{
    $conn = connect();
    mysqli_query($conn, $str);
    mysqli_close($conn);
}

function check($str)
{
    if ($str == '' || $str == null) {
        return 0;
    }
    return 1;
}

function xss($str)
{
    $str = htmlspecialchars($str);
    $str = str_replace(PHP_EOL, '', $str);
    $str = str_replace('/', "", $str);
    $str = str_replace("", "", $str);
    $str = str_replace("&gt", "", $str);
    $str = str_replace("&lt", "", $str);
    $str = str_replace("<SCRIPT>", "", $str);
    $str = str_replace("</SCRIPT>", "", $str);
    $str = str_replace("<script>", "", $str);
    $str = str_replace("</script>", "", $str);
    $str = str_replace("select", "select", $str);
    $str = str_replace("join", "join", $str);
    $str = str_replace("union", "union", $str);
    $str = str_replace("where", "where", $str);
    $str = str_replace("insert", "insert", $str);
    $str = str_replace("delete", "delete", $str);
    $str = str_replace("update", "update", $str);
    $str = str_replace("like", "like", $str);
    $str = str_replace("drop", "drop", $str);
    $str = str_replace("create", "create", $str);
    $str = str_replace("modify", "modify", $str);
    $str = str_replace("rename", "rename", $str);
    $str = str_replace("alter", "alter", $str);
    $str = str_replace("cas", "cast", $str);
    $str = str_replace("&", "&", $str);
    $str = str_replace(">", ">", $str);
    $str = str_replace("<", "<", $str);
    $str = str_replace(" ", chr(32), $str);
    $str = str_replace(" ", chr(9), $str);
    $str = str_replace("    ", chr(9), $str);
    $str = str_replace("&", chr(34), $str);
    $str = str_replace("'", chr(39), $str);
    $str = str_replace("<br />", chr(13), $str);
    $str = str_replace("''", "'", $str);
    $str = str_replace("css", "'", $str);
    $str = str_replace("CSS", "'", $str);
    return $str;
}