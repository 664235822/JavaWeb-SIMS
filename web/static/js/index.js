$(function () {
    if(localStorage.jzzh!=null){
        var json2 = localStorage.jzzh;
        var obj = JSON.parse(json2);
        // var str="<a class="bgclo" style="color: rgb(191, 197, 203);">";
        // str+="<span class=\"glyphicon glyphicon-user\"></span>";
        // str+="obj.stateId</a>"
        // $("nav ul>li:first-of-type").html(str);
    }else {
        return;
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
    var str = {"character":CharacterMenu};
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var menu = Ajax(url, str);
    Menu(menu);
});
function Menu(Menu) {
    var menuName=Menu.data;
    var text = "";
    text += "<ul class=\"firstnv nav nav-pills nav-stacked\">";
    for(var i=0;i<menuName.length;i++){
        text += "<li role=\"presentation\"><a id=\"Teacher\" href=\"#\">";
        text += "<span class=\"glyphicon glyphicon-list-alt Font-list\" aria-hidden=\"true\"></span>";
        text += menuName[i].menuName;
        text += "<div class=\"pull-right\"><span class=\"caret\"></span></div></a></li>";
        text += "<li role=\"presentation\" id=\"Scend-menue\"><div class=\"row\"><div class=\"col\">";
        text += "<ul class=\"nav nav-pills nav-stacked\">";
        for (var j=0;i<menuName.items.length;i++){
            text += "<li role=\"presentation\">";
            text += "<a class=\"userlist\" href=\"#\">";
            text += "<span class=\"glyphicon glyphicon-triangle-right Font-list\" aria-hidden=\"true\"></span>";
            text += menuName.items[0].menuName;
            text += "</a>";
            text += "</li>";
        }
        text += "</ul>";
        text += "</div></div></li>";
    }
    text += "</ul>";
    $(".menue-box .col").html(text);
}