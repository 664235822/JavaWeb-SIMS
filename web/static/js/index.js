/**
 * 首页js
 * **/

/**
 * @description 首页页面初始化
 *
 */
$(function () {
    //判断浏览器是否支持localStorage
    if (localStorage.Login != null) {
        var json2 = localStorage.Login;
        var obj = JSON.parse(json2);
    } else {
        layui.use('form', function () {
            var form = layui.form;
            layer.msg("浏览器不支持", {
                icon: 5
                , anim: 6
                , time: 1000
            });
        });

        location.href = "/JavaWeb_SIMS_war_exploded/";
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
    //生成当前用户用户名
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

/**
 * @description 处理不同权限同菜单不同地址
 * @param  menuName 当前菜单数据
 * @param name  姓名
 * @return  text 当前菜单src地址
 */
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


/**
 * @description 储存用户名用于个人数据查询
 * @param  obj localStorage的当前用户数据
 */
function GetUserName(obj) {
    var json1 = {};
    json1.teacherId = obj.accout;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId = str1;
}

/**
 * @description 生成侧边栏菜单
 * @param  Menu 菜单信息
 */
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

/**
 * @description 监听注销，修改密码的点击
 *
 */
function LogOut() {
    $(function () {
        //注销点击退出当前用户
        $("#LogOut").click(function () {
            location.href = "/JavaWeb_SIMS_war_exploded/static/html/login.html";
        });
        //修改密码点击出现弹窗
        $("#Reset").click(function () {
            ResetPwd();
        })
    });
}

/**
 * @description 监听菜单切换
 *
 */
$(function () {
    $(".menu #menu>li").click(function () {
        var menuId = "#" + $(this).attr("id");
        $("li").not(menuId).removeClass("layui-nav-itemed");
    });
});
/**
 * @description 修改密码的弹窗
 *
 */
function ResetPwd() {
    var text = "";
    text += "<div class=\"layui-form\">";
    text += "<input type=\"password\" id=\"OldPassword\" name=\"title\" placeholder=\"旧密码\"  autocomplete=\"off\" class=\"layui-input\">";
    text += "<input type=\"password\" id=\"NewPassword\" name=\"title\" placeholder=\"新密码\"  autocomplete=\"off\" class=\"layui-input\">";
    text += "<input type=\"password\" id=\"ConfirmPassword\" name=\"title\" placeholder=\"确认密码\"  autocomplete=\"off\" class=\"layui-input\">";
    text += "</div>";
    layer.open({
        anim: 1
        , shade: [0.1, '#ffffff']
        , title: ['修改密码', 'color:#ffffff;background-color:#009688;']
        , content: text
        , skin: 'demo-class'
        , area: '330px'
        , btn: ['提交', '取消']
        , yes: function (index) {
            //获取旧密码的值
            var OldPassword=$("#OldPassword").val();
            //获取新密码的值
            var NewPassword=$("#NewPassword").val();
            //获取确认密码的值
            var ConfirmPassword=$("#ConfirmPassword").val();
            if(RequiredPwd(OldPassword,NewPassword,ConfirmPassword)){
                layer.close(index);
            }

        }
    });
}

/**
 * @description 对密码进行判断，正确后在向后台发送请求
 * @param  OldPassword 旧密码
 * @param NewPassword  新密码
 * @param ConfirmPassword  确认密码
 * @return  If 返回一个boolean值
 */
function RequiredPwd(OldPassword,NewPassword,ConfirmPassword) {
    var If=false;
    //判断是否为空
    if (OldPassword == ""||NewPassword==""||ConfirmPassword=="") {
        layer.msg("请正确输入", {
            icon: 5
            , anim: 6
            , time: 1000
        });
        return;
    }
    //判断两个新密码是否一致
    if(NewPassword!=ConfirmPassword){
        layer.msg("两次密码不匹配", {
            icon: 5
            , anim: 6
            , time: 1000
        });
        $("#ConfirmPassword").val("");
    }else {
        var json2 = localStorage.Login;
        var obj = JSON.parse(json2);
        var data = {};
        var url = "/JavaWeb_SIMS_war_exploded/changePwd";
        data.code = obj.accout;
        data.pwd = OldPassword;
        data.newPwd = ConfirmPassword;
        var table = Ajax(url, data);
       if(table.code!=0){
           layer.msg(table.message, {
               icon: 1
               , time: 1000
           });
           If=true;
       } else {
           layer.msg(table.message, {
               icon: 5
               , anim: 6
               , time: 1000
           });

       }
    }
    return If;
}
/**
 * @description 关于点击弹窗信息提示框
 *
 */
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