<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/1/11
 * Time: 15:50
 */
//延迟1s再执行php代码
sleep(1);
include "db.php";
$sql="insert into xinxi(name,num,age) values ('','','') ";
$db->query($sql);
if($db->affected_rows>0){
//    数据库可以返回上一条插入数据的id号
    echo $db->insert_id;
}