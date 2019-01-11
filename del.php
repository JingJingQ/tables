<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/1/11
 * Time: 17:38
 */
include "db.php";
$id=$_GET["ids"];
$sql="delete from xinxi where id={$id}";
$db->query($sql);
if($db->affected_rows>0){
    echo "ok";
}