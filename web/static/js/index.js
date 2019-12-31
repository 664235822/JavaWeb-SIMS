/**
 * 首页js
 * **/
$(function () {
    //判断菜单权级
    if (localStorage.Login != null) {
        var json2 = localStorage.Login;
        var obj = JSON.parse(json2);
    } else {
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
    var name = "<span class=\"glyphicon glyphicon-user\"></span>  " + obj.name;
    $("nav ul.layui-nav li:first-of-type>a").html(name);
    LogOut();
    var str = {"character": CharacterMenu, "currentPage": "0", "getId": 'false'};
    var url = "/JavaWeb_SIMS_war_exploded/menu";
    var menu = Ajax(url, str);
    Menu(menu);
    $("a.userlist").click(function () {
        var url = "/JavaWeb_SIMS_war_exploded/static/html/" + $(this).attr("name");
        if ($(this).attr("name") != undefined) {
            $(".layui-body>iframe").attr("src", url);
        } else {

        }
    })
    About();
});

//权限
function Authority(menuName) {
    var text = "";
    var json2 = localStorage.Login;
    var obj = JSON.parse(json2);
    if (obj.stateId == 2) {
        if (menuName.menuId == 9) {
            text = "UpdateInfo.html";
            GetUserName(obj);
        } else {
            text = menuName.url;
        }

    } else if (obj.stateId == 3) {
        if (menuName.menuId == 28) {
            text = "UpdateStudent.html";
            GetUserName(obj);
        } else {
            text = menuName.url;
        }
    } else {
        text = menuName.url;
    }
    return text;
}

//储存用户名
function GetUserName(obj) {
    var json1 = {};
    json1.teacherId = obj.accout;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId = str1;
}

//生成菜单
function Menu(Menu) {
    var menuName = Menu.data;
    var text = "";
    text += "<ul class=\"layui-nav layui-nav-tree\" id=\"menu\">";
    for (var i = 0; i < menuName.length; i++) {
        text += "<li class=\"layui-nav-item\" id=\"Menu" + i + "\"><a >";
        text += menuName[i].menuName;
        text += "</a>";
        text += "<dl class=\"layui-nav-child\" id=\"Menu" + i + "_Submenu\">";
        for (var j = 0; j < menuName[i].items.length; j++) {
            text += "<dd><a class='userlist' name=\"" + Authority(menuName[i].items[j]) + "\">";
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
function LogOut() {
    $(function () {
        $("#LogOut").click(function () {
            localStorage.removeItem('Login');
            location.href = "/JavaWeb_SIMS_war_exploded/static/html/login.html";
        });
    });
}

$(function () {
    var Contral = null;
    $(".menu #menu>li").click(function () {
        var menuId = "#" + $(this).attr("id");
        $("li").not(menuId).removeClass("layui-nav-itemed");
    });
});
//修改密码
   $(function () {
       var text = "";
       text += "<div class=\"layui-form\" style=\"height: 300px;height:300px; \">";
       text += "<div class=\"layui-form-item\" style=\"padding-right: 15px;\">";
       text += "<label class=\"layui-form-label\"style=\"padding: 9px 0px;text-align: center\">旧密码:</label>";
       text += "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" placeholder=\"请输入标题\" autocomplete=\"off\" class=\"layui-input\">";
       text += "</div></div>";
       text += "<div class=\"layui-form-item\" style=\"padding-right: 15px;\">";
       text += "<label class=\"layui-form-label\"style=\"padding: 9px 0px;text-align: center\">新密码:</label>";
       text += "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" placeholder=\"请输入标题\" autocomplete=\"off\" class=\"layui-input\">";
       text += "</div></div>";
       text += "<div class=\"layui-form-item\" style=\"padding-right: 15px;\">";
       text += "<label class=\"layui-form-label\"style=\"padding: 9px 0px;text-align: center\">确认密码:</label>";
       text += "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" placeholder=\"请输入标题\" autocomplete=\"off\" class=\"layui-input\">";
       text += "</div></div>";
       text += "</div>";
        $("#Reset").click(function () {
            layui.use(['layer'], function () {
                layer.open({
                    type: 1,
                    content: text //这里content是一个普通的String
                });
            })
        })
   });



//关于
function About() {
    $("#about").click(function () {
        layui.use(['layer'], function () {
            layer.open({
                type: 1
                ,
                title: false //不显示标题栏
                ,
                closeBtn: true
                ,
                area: '400px;'
                ,
                shade: 0.8
                ,
                id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,
                btn: ['确定']
                ,
                btnAlign: 'c'
                ,
                moveType: 1 //拖拽模式，0或者1
                ,
                content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">' +
                    '学生信息管理系统 v1.0<br/><br/>' +
                    '版权声明 夕阳红小组 2019<br/>' +
                    '四川水利职业技术学院 软件1831<br/>' +
                    '北大青鸟信息技术有限公司' +
                    '</div>'
            });
        })
    })
}