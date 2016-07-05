<?php
include_once ("config.php");

@$way=$_GET['way'];
//$way="Lastest";
//$way="Hot";
//$way="Authurs";
try{
    switch($way){
        case  "Lastest": {
            $str="select * from caption order by Id desc";
            $row=select_ten($str);
            if(empty($row)){
                throw new Exception("0");
            }
            $arry['data']=$row;
            //echo Json_s();
            echo json_encode($arry);
            break;
        }
        case "Hot":{
            echo $way;
            break;
        }
        case "Authurs":{
            echo $way;
            break;
        }
        default:{
            echo "Empty";
        }
    }
}catch(Exception $e){
    $e->getMessage();
}
function select_ten($str){
    $conn = connect();
    $i=0;
    $result = mysqli_query($conn, $str);
    /* $row = mysqli_fetch_assoc($result);
     if(empty($row)){
         return $row;
     }
     $array[$i]=$row;*/
    $array=array();
    $like=array("Like"=>"☆");
    while(1){
        if($i>10){
            break;
        }
        $row=mysqli_fetch_assoc($result);
        if(empty($row)){
            break;
        }
        //$string=$row["Content"];
        //$row["Content"]=substr($string,0,150);
       // $row["Content"]= str_replace("<","&nbsp;",$row["Content"]);
       // $row["Content"]= str_replace(">","&nbsp;",$row["Content"]);
        //$row["Content"]= str_replace("\n","<br>",$row["Content"]);
       // $row["Content"]= str_replace(" ","&nbsp;",$row["Content"]);
        //  $row["Content"]= str_replace("\t","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",$row["Content"]);
       // unset($row['Id']);
        $array[$i]=$row;
        $t="select * from book WHERE Id = {$row['BookId']}";
        $row=select($t);
        unset($row['About'],$row['Id']);
        $array[$i]+=$row;
        $t="select * from user WHERE Id ={$row['Authur']}";
        $row=select($t);
        unset($row['PassWord'],$row['Id'],$row['Status']);
        $array[$i]+=$row;
        $array[$i]+=$like;
        $i++;
    }
    mysqli_close($conn);
    return $array;
}