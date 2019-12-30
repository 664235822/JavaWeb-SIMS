
$(function () {
    $("#modul div[name]").click(function () {
        var svg=$(this).attr("name");
        if (svg=="addmodul"){
            if(localStorage.Login!=null){
                var json2 = localStorage.Login;
                var obj = JSON.parse(json2);

            }else {
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
            var str = {"character":CharacterMenu,"currentPage":"0","getId":'false'};
            var url = "/JavaWeb_SIMS_war_exploded/menu";
            var menu = Ajax(url, str);
            if(menu.code==1){
                var table=Table(menu.data);
                Cbox(table,menu);
            }

        }
    })
});
//弹窗
function Cbox(table,menu) {
    var arry=[];
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.open({
            title:'将快捷入口添加到首页',
            skin: 'demo-class',
            content: table,
            btn:['添加','取消'],
            area:'400px',
            yes: function(index, layero){



            }
        });
    })

    layui.use('form', function() {
        var form = layui.form;
        form.on('checkbox()', function(data) {
            var checked=data.elem.checked; //是否被选中，true或者false
            var value=data.value; //复选框value值，也可以通过data.elem.value得到
            arry=Addmodule(checked,value);
        });
    });
        Refresh();

}
function Addmodule(checked,value) {
    var arry=[0,0,0,0,0,0,0];
    if(checked){
        var num=-1;
        for(var i=0;i<arry.length;i++){
            if(arry[i]==0){
                arry[i]=value;
                break;
            }
            num++;
        }
        if(num==6){
            $("input[name=checkbox]").filter("[value="+arry[num]+"]").prop("checked",false);
            Refresh();
            arry[num]=value;
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
function Table(table) {
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
            text += "<tr name=\""+ table[i].items[j].url+"\">";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" value='"+table[i].items[j].menuId+"' name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>"+table[i].items[j].menuName+"</td>";
            text += "</tr>";
            //123123123
            // text += "<tr name=\""+ table[i].items[j].url+"\">";
            // text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            // text += "</div></td>"
            // text += "<td>"+table[i].items[j].menuName+"</td>";
            // text += "</tr>";
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