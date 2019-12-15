/**
 * 权限管理js
 *
 *
 * **/
//权限管理
$(function () {
    Refresh();
    var str = {"character":"AdminMenu","currentPage":1,"getId":'false'};
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var menu = Ajax(url, str);
    if (menu.code == 1) {
        StateTable(menu.data,0);
        Refresh();
        Page("test1",menu.data.pageCount,menu.data.dataCount);
        // TeacherFunction();
    }

})
//分页
function Page(id,limit,count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count:count //数据总数，从服务端得到
            , limit:10
            ,layout:['prev', 'page', 'next','skip']
            ,jump: function(obj, first){
                //首次不执行
                if(!first){
                    var data = {"character":"AdminMenu","currentPage":obj.curr,"getId":'false'};
                    var url = "/JavaWeb_SIMS_war_exploded/menu";
                    var table = Ajax(url, data);
                    if (table.code == 1) {
                        StateTable(table.data,obj.curr);
                        Refresh();

                    }
                }
            }
        });
    });
}
//权限表格
function StateTable(menu,limit) {
    var text = "";
    if(menu!=null){
        text += " <colgroup><col width=\"150\"><col width=\"200\"><col width=\"200\"><col width=\"200\"></colgroup>";
        text += "<thead>";
        text += "<tr><th>ID</th><th>权限主菜单</th><th>权限子菜单</th><th>操作</th></tr>";
        text += "</thead>";
        text += "<tbody>";
        var num=limit*10+1;
        for(var i=0;i<10;i++){
            text += "<tr>";
            text += "<td>"+menu[i].menuId+"</td>";
            text += "<td>"+menu[i].menuName+"</td>";
            text += "<td></td>";
            text += "<td>";
            text += "<div class=\"layui-form\">";
            text += "<input type=\"checkbox\" name=\"\" lay-skin=\"switch\" lay-text=\"开启|关闭\">";
            text += "</div>";
            text += " </td>";
            text += "</tr>";

        }
        text += "</tbody>";
        $("#table").html(text);
    }

}
//刷新
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}