//设置页面高度
window.onload = function () {
    $("#bgbody").height(window.innerHeight);
}
//滚动条改变改变页面高度
window.onresize = function () {
    $("#bgbody").height(window.innerHeight);
}
$(function () {
    if(localStorage.Login!=null){
        var json2 = localStorage.Login;
        var obj = JSON.parse(json2);
    }else {
        layer.msg("浏览器不支持", {
            icon: 5
            , anim: 6
            , time: 1000
        });
        location.href = "/JavaWeb_SIMS_war_exploded/static/html/login.html";
    }
    var CharacterMenu = null;
    switch (obj.stateId) {
        case "1":
            CharacterMenu = "AdminMenu";
            break;
        case "2":
            CharacterMenu = "TeacherMenu";
            break;
        case "3":
            CharacterMenu = "StudentMenu";
            break;
    }
    var url="/JavaWeb_SIMS_war_exploded/select";
    var data={'tableName': "Habit", 'code': obj.accout};
    var arry=Ajax(url,data);
    url = "/JavaWeb_SIMS_war_exploded/menu";
    data = {"character":CharacterMenu,"currentPage":"0","getId":'false'};
    var menu = Ajax(url, data);
    if(arry.code!=0){
        arry=arry.data.cols;
        ModuleHtml(arry,menu);
    }else {
        arry=[0,0,0,0,0,0,0];
    }
    ModuleFunction(arry,menu);

});
//模块方法
function ModuleFunction(arry,menu) {
    $("#modul div[name]").click(function () {
        var svg=$(this).attr("name");
        if (svg=="addmodul"){
            odulEvent(arry,menu);
        }

    })
}
//添加快捷方式事件处理
function odulEvent(arry,menu) {
        if(menu.code==1){
            var table=Table(menu.data,arry);
            Cbox(table,menu,arry);
        }
}
//弹窗
function Cbox(table,menu,arry) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.open({
            title:'将快捷入口添加到首页',
            skin: 'demo-class',
            content: table,
            btn:['添加','取消'],
            area:'400px',
            yes: function(index, layero){
                ModuleHtml(arry,menu);
            }
        });
    })

    layui.use('form', function() {
        var form = layui.form;
        form.on('checkbox()', function(data) {
            var checked=data.elem.checked; //是否被选中，true或者false
            var value=data.value; //复选框value值，也可以通过data.elem.value得到
            arry=Addmodule(checked,value,arry);
        });
    });
        Refresh();

}
//判断菜单id
function Addmodule(checked,value,arry) {
    if(checked){
        var num=-1;
        for(var i=0;i<arry.length;i++){
            if(arry[i]==0){
                arry[i]=parseInt(value);
                break;
            }
            num++;
        }
        if(num==6){
            $("input[name=checkbox]").filter("[value="+arry[num]+"]").prop("checked",false);
            Refresh();
            arry[num]=parseInt(value);
        }
    }else {
        for(var i=0;i<arry.length;i++){
            if(arry[i]==value){
                arry[i]=0;
                break;
            }
        }

    }
    return arry;
}
//快捷方式hmtl
function ModuleHtml(arry,menu) {
    var menuName = menu.data;
    var text = "";
    for(var i=0;i<menuName.length;i++){
        for (var j=0;j<menuName[i].items.length;j++){
            for(var k=0;k<arry.length;k++){
                if(arry[k]==menuName[i].items[j].menuId){
                    text += "<div class=\"layui-col-md3\">";
                    text += "<div class=\"box\" name=\"menuName[i].items[j].url\">";
                    text += "<div class=\"icon-box\"><p class=\"iconp\">";
                    text += "<i class=\"layui-icon "+menuName[i].items[j].icon+"\" style=\"font-size: 70px;\"></i>";
                    text += "</p></div><div class=\"text-box\">";
                    text += "<p class=\"text-t\">"+menuName[i].items[j].menuName+"</p>";
                    text += "</div></div></div>";
                    break;
                }
            }
        }
    }
    text += "<div class=\"layui-col-md3\"><div class=\"box\" name=\"addmodul\">";
    text += "<div class=\"icon-box\"><p class=\"iconp\">";
    text += "<i class=\"layui-icon layui-icon-add-1\" style=\"font-size: 70px;\"></i>";
    text += "</p></div><div class=\"text-box\">";
    text += "<p class=\"text-t\">添加快捷方式</p>";
    text += "</div></div></div>";
    $("#modul").html(text);
    ModuleFunction(arry,menu);
}
function Table(table,arry) {
    var text="";
    text += "<div class=\"layui-container\" style='width: 350px;'>";
    text += "<table class=\"layui-table layui-form\">";
    text += "<colgroup>";
    text += "<col width=\"80px\">";
    text += "<col>";
    text += "<col>";
    text += "</colgroup>";
    text += " <thead>";
    text += "<tr>";
    text += " <th>勾选</th>";
    text += "<th>菜单名名称</th>";
    text += "</tr>";
    text += "</thead>";
    text += "<tbody>";
    for(var i=0;i<table.length;i++){
        for (var j=0;j<table[i].items.length;j++){
            var If=true;
            text += "<tr name=\""+ table[i].items[j].url+"\">";
            for(var k=0;k<arry.length;k++){
                if(arry[k]==table[i].items[j].menuId){
                    text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" value='"+table[i].items[j].menuId+"' name=\"checkbox\" title=\"\" lay-skin=\"primary\" checked>";
                    text += "</div></td>";
                    If=false;
                    break;
                }
            }
            if(If){
                text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" value='"+table[i].items[j].menuId+"' name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
                text += "</div></td>";
            }
            text += "<td>"+table[i].items[j].menuName+"</td>";
            text += "</tr>";
        }
    }
    text += "</tbody>";
    text += "</table>";
    text += "</div>";
    return text;
}
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}