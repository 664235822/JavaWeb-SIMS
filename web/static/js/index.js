/**
 * 首页js
 * **/
$(function () {
    //判断菜单权级
    if(localStorage.Login!=null){
        var json2 = localStorage.Login;
        var obj = JSON.parse(json2);
        // var str="<a class="bgclo" style="color: rgb(191, 197, 203);">";
        // str+="<span class=\"glyphicon glyphicon-user\"></span>";
        // str+="obj.stateId</a>"
        // $("nav ul>li:first-of-type").html(str);
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
    var name="<span class=\"glyphicon glyphicon-user\"></span>"+obj.name;
    $(".nav li:first-of-type a").html(name);
    var str = {"character":CharacterMenu};
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var menu = Ajax(url, str);
    Menu(menu);
    $(".nav a.userlist").click(function () {
        var url="/JavaWeb_SIMS_war_exploded/static/html/"+$(this).attr("name");
        if($(this).attr("name")!=undefined){
            $(".layui-body>iframe").attr("src",url);
        }else {

        }


    })
});
//生成菜单
function Menu(Menu) {
    var menuName=Menu.data;
    var text = "";
    text += "<ul class=\"firstnv nav nav-pills nav-stacked\" id=\"menu\">";
    for(var i=0;i<menuName.length;i++){
        text += "<li role=\"presentation\" id=\"Menu"+i+"\"><a  href=\"#\">";
        text += "<span class=\"glyphicon glyphicon-list-alt Font-list\" aria-hidden=\"true\"></span>";
        text += menuName[i].menuName;
        text += "<div class=\"pull-right\"><span class=\"caret\"></span></div></a></li>";
        text += "<li role=\"presentation\" id=\"Menu"+i+"_Submenu\" style=\"display: none;\"><div class=\"row\"><div class=\"col\">";
        text += "<ul class=\"nav nav-pills nav-stacked\">";
        for (var j=0;j<menuName[i].items.length;j++){
            text += "<li role=\"presentation\">";
            text += "<a class=\"userlist\" name=\""+ menuName[i].items[j].url+"\" href=\"#\">";
            text += "<span class=\"glyphicon glyphicon-triangle-right Font-list\" aria-hidden=\"true\"></span>";
            text += menuName[i].items[j].menuName;
            text += "</a>";
            text += "</li>";
        }
        text += "</ul>";
        text += "</div></div></li>";
    }
    text += "</ul>";
    $(".menue-box .col").html(text);
}
$(function () {
    var Contral=null;
    $(".menue-box #menu>li:nth-of-type(odd)").click(function () {
        var menuId=$(this).attr("id")+"_Submenu";
        if(Contral!=null && Contral!=menuId){
            $("#"+Contral).toggle();
        }
        Contral=menuId;
        $("#"+menuId).toggle();
    });
});