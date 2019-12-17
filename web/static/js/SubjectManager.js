/**
 * 科目管理js
 *
 * **/

/**NO.1科目添加与删除**/
//添加科目
//预加载
function Submanage() {
    Addsub();
}

//弹出添加科目页面
function Addsub() {
    $(function () {
        $("#Addbut").click(function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.open({
                    type: 1
                    , closeBtn: 2
                    ,shade: [0.1, '#ffffff']
                    , title: ['添加科目', 'color:#ffffff;background-color:#009688;']
                    , content: $('#AddTan')
                    , area: ['350px', '120px']
                });
            });
        });
    });
}

//表格主体
