// jquery==$
// $("选择器")
// $(function(){})==window.onload()
// $("<div>12</div>")   ==  createElement("div")

$(function(){
    $.ajax({
        url:"select.php",
        dataType:"json",
        success:function(data){
            // console.log(data);
            for(let i=0;i<data.length;i++){
                let str=`
                <tr num="${data[i].id}">
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].num}</td>
                <td>${data[i].age}</td>
                <td>
                <button type="button" class="btn btn-danger">删除</button>
</td>
</tr>
                `;
                $("table tbody").append(str);
            }
        }
    })



//    点击加号，页面中要出现一行tr
//    数据库中插入一条数据
    $(".plus").click(function(){
        $(".wait").show();
        $.ajax({
            url:"add1.php",
            success:function(data){
                if(data>0){
                    let str=`
                    <tr>
                    <td>${data}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                     <button type="button" class="btn btn-danger">删除</button>
</td>
</tr>
                    `;
                    $("table tbody").append(str);
                    $(".wait").hide();
                }
            }
        })
    })








//     $(".plus").click(function () {
//         $(".wait").show();
//
//         $.ajax({
//             url:"add.php",
//             success:function(data){
//                 if(data>0){
//                     let str=`
//                     <tr num="${data}">
//         <td>${data}</td>
//         <td attr="name">姓名</td>
//         <td attr="num">学号</td>
//         <td attr="age">年龄</td>
//         <td>
//         <button type="button" class="btn btn-danger">删除</button>
// </td>
//     </tr>
//                     `;
//                     $("table tbody").append(str);
//                     $(".wait").hide();
//                 }
//             }
//         })
//     })

    // $("table").click(function (e) {
    //     e.stopPropagation();
    //     if(e.target.className.includes("btn-danger")){
    //         let that=$(e.target);
    //         $.ajax({
    //            url:"del.php",
    //            data:{id:$(e.target).parents("tr").attr("num")},
    //            success:function (data) {
    //         if (data=="ok"){
    //                 $(that).parents("tr").remove();
    //         }
    //            }
    //        })
    //     }
    //
    // })
    $("table").on("click","td .btn-danger",function () {
        let that=$(this);

        $.ajax({
            url:"del.php",
            data:{id:$(this).parents("tr").attr("num")},
            success:function (data) {
                if(data=="ok"){
                    $(that).parents("tr").remove();
                }
            }
        })
    })

    $("table").on("dblclick","td:not(.btn-danger)",function () {
        let td=$(this);
        let oldv=$(this).html();
        $(this).html("");
        let input1=$("<input>").appendTo($(this)).focus().val(oldv);
        input1.blur(function(){
            let inputs=$(this);
            let newv=$(this).val();
            if(newv==oldv){
                $(this).remove();
                td.html(oldv);
            }else{
                let ids=td.parent("tr").attr("num");
                let attrs=td.attr("attr");
                $.ajax({
                    url:"edit.php",
                    data:{id:ids,attr:attrs,val:newv},
                    success:function(data){
                if(data=="ok"){
                    inputs.remove();
                    td.html(newv);
                }
                    }
                })

            }
        })



    })

})