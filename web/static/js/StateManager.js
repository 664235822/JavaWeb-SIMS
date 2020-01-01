/**
 * 权限管理js
 *
 *
 * **/
/**
 * @description 权限管理页面初始化
 *
 */
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
/**
 * @description 教师菜单与所有菜单进行对比
 * @param TeacherMenu 教师菜单
 */
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
/**
 * @description 学生菜单与所有菜单进行对比
 * @param StudentsMenu 学生菜单
 */
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

/**
 * @description 区分角色选项卡来生成对应的表格
 * @param index 角色对应值0教师 1学生
 * **/
function StateIf(index) {
    //把所有行的开关改为未选中状态
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
/**
 * @description 获取年级信息
 * @param  page 页数
 * @return data  访问到的数据
 */
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var table = Ajax(url, data);
    return table;
}
/**
 * @description layui分页功能
 * @param  id 绑定id
 * @param limit  页数
 * @param count  数据总条数
 *
 */
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
    //监听选项卡
    layui.use('element', function(){
        var element = layui.element;
        element.render();
        element.on('tab(docDemoTabBrief)', function(data){
            index=data.index;
            StateIf(index);
            Refresh();
        });
    });
    //监听开关
    layui.use('form', function () {
        var form = layui.form;
        form.on('switch(filter)', function(data){
            var Switch=data.elem.checked;//开关是否开启，true或者false
            State(data.value,index,Switch);
            Refresh();
        });
    })

}
/**
 * @description layui分页功能
 * @param  menuId 菜单id
 * @param index 角色对应值0教师 1学生
 * @param Switch  开关状态
 *
 */
function State(menuId,index,Switch) {
    var close={};//关
    var open={};//开
    close.update=false;
    open.update=true;
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var str={};
    str.currentPage=0;
    str.getId='false';
    str.character = 'AdminMenu';
    var OpenMenu = Ajax(url, str);
    if(index==0){
        close.character="TeacherMenu";
        open.character="TeacherMenu";
        str.character = 'TeacherMenu';
        var ClosMenu = Ajax(url, str);
    }
    if(index==1){
        close.character='StudentMenu';
        open.character='StudentMenu';
        str.character = 'StudentMenu';
        var ClosMenu = Ajax(url, str);
    }
    if(Switch){
        Open(OpenMenu,menuId,open,ClosMenu);
    }else {
        Close(ClosMenu,menuId,close);
    }

}
/**
 * @description 开关开启后的操作
 * @param  OpenMenu 所有菜单
 * @param menuId 菜单id
 * @param open  开起菜单的角色与boolean值
 * @param menu  角色的菜单信息
 */
function Open(OpenMenu,menuId,open,menu) {
    var Judge=true;
    if(OpenMenu.code==1){
        OpenMenu=OpenMenu.data;
        //循环所有菜单，判断是否是父级菜单开启
        for(var i=0;i<OpenMenu.length;i++){
            if(OpenMenu[i].menuId==menuId){
                //开启所有子级菜单
                for (var j=0;j<OpenMenu[i].items.length;j++){
                    open.menuId=OpenMenu[i].items[j].menuId;
                    AjaxAsync(open);
                    $("#table tr[name="+OpenMenu[i].items[j].menuId+"]").find("input[type=checkbox]").attr("checked", true);
                }
                open.menuId=OpenMenu[i].menuId;
                AjaxAsync(open);
                Judge=false;
                break;
            }
        }
        //子级菜单的开启
        if(Judge){
            for(var i=0;i<OpenMenu.length;i++){
                for (var j=0;j<OpenMenu[i].items.length;j++){
                    //判断要开启那个子级菜单
                    if(OpenMenu[i].items[j].menuId==menuId){
                        open.menuId=OpenMenu[i].items[j].menuId;
                        AjaxAsync(open);
                        //判断是否开启所有子级菜单
                        for(var k=0;k<menu.data.length;k++){
                            if(menu.data[k].menuId==OpenMenu[i].menuId){
                                Judge=false;
                                break;
                            }
                        }
                        if(Judge){
                            open.menuId=OpenMenu[i].menuId;
                            AjaxAsync(open);
                            $("#table tr[name="+OpenMenu[i].menuId+"]").find("input[type=checkbox]").attr("checked", true);
                        }
                        break;
                    }
                }
            }
        }
    }
}
/**
 * @description 开关关闭后的操作
 * @param  menu 所有菜单
 * @param menuId 菜单id
 * @param close  关闭菜单的角色与boolean值
 */
function Close(menu,menuId,close) {
    var Judge=true;
    if(menu.code==1){
        menu=menu.data;
        for(var i=0;i<menu.length;i++){
            //判断是否关闭的是父级菜单
            if(menu[i].menuId==menuId){
                for (var j=0;j<menu[i].items.length;j++){
                    close.menuId=menu[i].items[j].menuId;
                    AjaxAsync(close);
                    $("#table tr[name="+menu[i].items[j].menuId+"]").find("input[type=checkbox]").attr("checked", false);
                }
                close.menuId=menu[i].menuId;
                AjaxAsync(close);
                Judge=false;
                break;
            }
        }
        //关闭子级菜单
        if(Judge){
            for(var i=0;i<menu.length;i++){
                for (var j=0;j<menu[i].items.length;j++){
                    if(menu[i].items[j].menuId==menuId){
                        close.menuId=menu[i].items[j].menuId;
                        AjaxAsync(close);
                        if(menu[i].items.length==1){
                            close.menuId=menu[i].menuId;
                            AjaxAsync(close);
                            $("#table tr[name="+menu[i].menuId+"]").find("input[type=checkbox]").attr("checked", false);
                        }
                        break;
                    }
                }
            }
        }
    }
}
/**
 * @description ajax异步提交菜单更改数据
 * @param data 提交的菜单数据
 */
function AjaxAsync(data) {
    $.ajax({
        url:"/JavaWeb_SIMS_war_exploded/updateMenu",
        data:data,
        type: "post",
        dataType: "json",
        // contentType: "application/json;charset=utf-8",
        success: function(e) {
            num=e;
        },
    });
}
//表格的菜单数据
var tableMenu={};
/**
 * @description 生成菜单表格
 * @param  menu 所有菜单
 */
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
            text += "<input type=\"checkbox\" name=\"\" lay-filter=\"filter\" value=\""+MenuTable[i].menuId+"\" lay-skin=\"switch\" lay-text=\"开启|关闭\">";
            text += "</div>";
            text += " </td>";
            text += "</tr>";

        }
        text += "</tbody>";
        $("#table").html(text);
    }

}
/**
 * @description layui模块重新加载
 *
 */
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}