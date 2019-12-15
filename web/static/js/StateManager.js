/**
 * 权限管理js
 *
 *
 * **/
//权限管理
$(function () {
    Refresh();
    var TeacherMenu=getPage({"character":"TeacherMenu","currentPage":0,"getId":'true'});
    var str = {"character":"AdminMenu","currentPage":1,"getId":'false'};
    var menu = getPage(str);
    if (menu.code == 1) {
        StateTable(menu.data);
        Refresh();
        Page("test1",menu.data.pageCount,menu.data.dataCount);
        TeacherState(TeacherMenu)
    }

})
//教师权限
function TeacherState(TeacherMenu) {
    if(TeacherMenu.code==1){
        var menuId=TeacherMenu.data;
        $("#table tbody tr").each(function() {
            for(var i=0;i<menuId.length;i++){
                if($(this).attr("name")==menuId[i]){
                    $("#table tr[name="+$(this).attr("name")+"]").find("input[type=checkbox]").attr("checked", true);
                    break;
                }
            }
        });
    }
}
//学生权限
function StudentState(StudentsMenu) {
    if(StudentsMenu.code==1){
        var menuId=StudentsMenu.data;
        $("#table tbody tr").each(function() {
            for(var i=0;i<menuId.length;i++){
                if($(this).attr("name")==menuId[i]){
                    $("#table tr[name="+$(this).attr("name")+"]").find("input[type=checkbox]").attr("checked", true);
                    break;
                }
            }
        });
    }
}

//权限内容区别
function StateIf(index) {
    $("#table tbody tr").each(function() {
        $("#table tr[name="+$(this).attr("name")+"]").find("input[type=checkbox]").attr("checked", false);
    });
    if(index==0){
        var TeacherMenu=getPage({"character":"TeacherMenu","currentPage":0,"getId":'true'});
        TeacherState(TeacherMenu);
    }
    if (index==1){
        var StudentsMenu=getPage({"character":"StudentMenu","currentPage":0,"getId":'true'})
        StudentState(StudentsMenu);
    }
}
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var table = Ajax(url, data);
    return table;
}
//分页
function Page(id,limit,count) {
    var index=0;
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
                        StateIf(index);
                        Refresh();
                    }
                }
            }
        });

    });
    layui.use('element', function(){
        var element = layui.element;
        element.render();
        element.on('tab(docDemoTabBrief)', function(data){
            index=data.index;
            StateIf(index);
            Refresh();
        });
    });
}
//权限表格
var tableMenu={};
function StateTable(menu) {
    var MenuTable=menu.list;
    var text = "";
    if(MenuTable!=null){
        text += " <colgroup><col width=\"150\"><col width=\"200\"><col width=\"200\"><col width=\"200\"></colgroup>";
        text += "<thead>";
        text += "<tr><th>ID</th><th>权限主菜单</th><th>权限子菜单</th><th>操作</th></tr>";
        text += "</thead>";
        text += "<tbody>";
        for(var i=0;i<MenuTable.length;i++){
            text += "<tr name=\""+MenuTable[i].menuId+"\">";
            text += "<td>"+MenuTable[i].menuId+"</td>";
            if(MenuTable[i].parent==0){
                var id=MenuTable[i].menuId
                tableMenu[id]=MenuTable[i].menuName;
                text += "<td>"+MenuTable[i].menuName+"</td>";
                text += "<td></td>";
            }else {
                for(var key in tableMenu){
                   if(key==MenuTable[i].parent){
                       text += "<td name="+key+">"+tableMenu[key]+"</td>";
                       text += "<td>"+MenuTable[i].menuName+"</td>";
                   }
                }
            }
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