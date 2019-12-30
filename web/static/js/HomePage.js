
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
                Cbox(table);
            }

        }
    })
});
//弹窗
function Cbox(table) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.open({
            title:'将快捷入口添加到首页',
            skin: 'demo-class',
            content: table,
            btn:['添加','取消'],
            area:'400px'
        });
    })
        Refresh();

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
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
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