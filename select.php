<?php
include "db.php";
$sql="select * from xinxi";
$res=$db->query($sql);
$arr=array();
while ($row=$res->fetch_assoc()){
//    var_dump($row);
    $arr[]=$row;
}
echo json_encode($arr);


