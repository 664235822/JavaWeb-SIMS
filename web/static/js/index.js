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
    var name="<span class=\"glyphicon glyphicon-user\"></span>  "+obj.name;
    $("nav ul.layui-nav li:first-of-type>a").html(name);
    LogOut();
    var str = {"character":CharacterMenu,"currentPage":"0","getId":'false'};
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var menu = Ajax(url, str);
    Menu(menu);
    $("a.userlist").click(function () {
        var url="/JavaWeb_SIMS_war_exploded/static/html/"+$(this).attr("name");
        if($(this).attr("name")!=undefined){
            $(".layui-body>iframe").attr("src",url);
        }else {

        }
    })
});
//权限
function Authority(menuName) {
    var text="";
    var json2 = localStorage.Login;
    var obj = JSON.parse(json2);
    if(obj.stateId==2){
      if(menuName.menuId==9){
          text="UpdateInfo.html";
          GetUserName();
      }else {
          text=menuName.url;
      }

    }else if(obj.stateId==28){
        if(menuName.menuId==11){
            text="UpdateStudent.html";
            GetUserName();
        }else {
            text=menuName.url;
        }
    }else {
        text=menuName.url;
    }
    return text;
}
//储存用户名
function GetUserName() {
    var json1 = {};
    json1.teacherId = obj.accout;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId = str1;
}
//生成菜单
function Menu(Menu) {
    var menuName=Menu.data;
    var text = "";
    text += "<ul class=\"layui-nav layui-nav-tree\" id=\"menu\">";
    for(var i=0;i<menuName.length;i++){
        text += "<li class=\"layui-nav-item\" id=\"Menu"+i+"\"><a >";
        text += menuName[i].menuName;
        text += "</a>";
        text += "<dl class=\"layui-nav-child\" id=\"Menu"+i+"_Submenu\">";
        for (var j=0;j<menuName[i].items.length;j++){
            text += "<dd><a class='userlist' name=\""+ Authority(menuName[i].items[j])+"\">";
            text += menuName[i].items[j].menuName;
            text += "</a>";
            text += "</dd>";
        }
        text += "</dl>";
        text += "</li>";
    }
    text += "</ul>";
    $(".layui-side-scroll").html(text);
}
//注销功能
function LogOut(){
    $(function () {
        $("#LogOut").click(function () {
            localStorage.removeItem('Login');
            location.href = "/JavaWeb_SIMS_war_exploded/static/html/login.html";
        });
    });
}
$(function () {
    var Contral=null;
    $(".menu #menu>li").click(function () {
        var menuId="#"+$(this).attr("id");
        $("li").not(menuId).removeClass("layui-nav-itemed");
    });
});