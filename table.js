// jquery==$
// $("选择器")
// $(function(){})==window.onload()
// $("<div>12</div>")   ==  createElement("div")

$(function () {
    //获取数据
    $.ajax({
        url: "select.php",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                let str = `
                <tr num="${data[i].id}">
                    <td >${data[i].id}</td>
                    <td attr="name">${data[i].name}</td>
                    <td attr="num">${data[i].num}</td>
                    <td attr="age">${data[i].age}</td>
                    <td>
                    <button type="button" class="btn btn-danger">删除</button>
                    </td>
                </tr>
                `;
                $("table tbody").append(str);
            }
        }
    })

//  点击加号，页面中要出现一行tr
//  数据库中插入一条数据
    $(".plus").click(function () {
        $(".wait").show();
        $.ajax({
            url: "add1.php",
            success: function (data) {
                if (data > 0) {
                    let str = `
                    <tr num="${data}">
                        <td >${data}</td>
                        <td attr="name"></td>
                        <td attr="num"></td>
                        <td attr="age"></td>
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

//  删除
//     事件委派：将自身的事件委派给父元素执行
//     什么时候用：
//     1.子元素很多
//     2.要给动态创建的元素添加事件时
//
//     当点击删除按钮时，要将对应的一条数据删除（1.从页面中删除；2.从数据库中删除）

    $("table").on("click",".btn-danger",function(){
        let that=$(this);
        // alert(1);
        $.ajax({
            url:"del.php",
            //要删除的这一行的id号
            // id保存在每一行tr的num属性中
            data:{ids:$(this).parents("tr").attr("num")},
            success:function(data){
                // console.log(data);
                //如果data是ok，证明后台数据库已经删除成功
                if(data=="ok"){
                //    从页面中删除
                //    $(this)在函数中，谁调用this就是指谁，如果没有调用，this指向window，需要改变this的指向

                    that.parents("tr").remove();
                }
            }
        })
    })





    $("table").on("dblclick", "td:not(.btn-danger)", function () {
        let td = $(this);
        let oldv = $(this).html();
        $(this).html("");
        let input1 = $("<input>").appendTo($(this)).focus().val(oldv);
        input1.blur(function () {
            let inputs = $(this);
            let newv = $(this).val();
            if (newv == oldv) {
                $(this).remove();
                td.html(oldv);
            } else {
                let ids = td.parent("tr").attr("num");
                let attrs = td.attr("attr");
                $.ajax({
                    url: "edit.php",
                    data: {id: ids, attr: attrs, val: newv},
                    success: function (data) {
                        if (data == "ok") {
                            inputs.remove();
                            td.html(newv);
                        }
                    }
                })

            }
        })


    })

})