<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/1/11
 * Time: 14:07
 */
include "db.php";
$id=$_GET["id"];
$attr=$_GET["attr"];
$val=$_GET["val"];
$sql="update xinxi set $attr='{$val}' where id={$id}";
$db->query($sql);
if($db->affected_rows>0){
    echo "ok";
}