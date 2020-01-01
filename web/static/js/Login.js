/**
 * 登陆js
 *
 * **/
//随机验证码
var random=null;

/**
 * @description 页面加载完成，进行初始化
 *
 */
window.onload = function(){
    if(!localStorage){
        layer.msg('浏览器不支持记住密码', {
            icon: 5,
            anim: 6,
            time: 2000 //2秒关闭（如果不配置，默认是3秒）
        });
    }
    //判断是以前是否登陆过
    if(localStorage.jzzh!=null){
        var json2 = localStorage.jzzh;
        var obj = JSON.parse(json2);
        $("#LAY-user-login-username").val(obj.accout);
        $("#LAY-user-login-password").val(obj.pass);
    }
}

/**
 * @description 对页面点击事件进行处理
 *
 */
$(function () {
    RandomCode();
    //验证码图片点击更换验证码
    $(".RandomCode").click(function () {
        RandomCode();
    })
    //监听键盘回车
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#btn-login").trigger("click");
        }
    });
    //登陆按钮点击后
    $("button[lay-filter=LAY-user-login-submit]").click(function () {
        //获取用户名
        var username=$("#LAY-user-login-username").val();
        //获取密码
        var password=$("#LAY-user-login-password").val();
        //获取用户选中的角色
        var state=$("li[class=layui-this]").attr("name");
        //获取输入的验证码
        var randomcode=$("#LAY-user-login-vercode").val();
        var test=$("li[class=layui-this]").text();
        if(randomcode!=random&&randomcode!=""){
            layer.msg('验证码错误', {
                icon: 5,
                anim: 6,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
            RandomCode();
            $("#LAY-user-login-vercode").val("");
        }
        if(randomcode==random&&username!=""&&password!="") {
            var str = {"code": username, "pwd": password, "stateId": state};
            var url = "/JavaWeb_SIMS_war_exploded/login";
            var Menu = Ajax(url, str);
            if (Menu.code==1) {
                CheckSave(username,password,state,Menu.data.username);
                //登入成功的提示与跳转
                layer.msg(Menu.message, {
                    offset: '15px'
                    , icon: 1
                    , time: 1000
                }, function () {
                    $("#LAY-user-login-vercode").val("");
                    location.href = "/JavaWeb_SIMS_war_exploded/"
                });
            }else{
                layer.msg("登陆失败", {
                    icon: 5
                    ,anim: 6
                    , time: 1000
                },function () {
                    RandomCode();
                    $("#LAY-user-login-password").val("");
                    $("#LAY-user-login-vercode").val("");
                });

            }
        }
    })
});

/**
 * @description 生成随机验证码
 *
 */
function RandomCode(){
    random=Math.random().toString(36).slice(-4);
    $(".RandomCode").html(random);
}


/**
 * @description layui对角色选项卡进行监听
 *
 */
layui.use('element', function(){
    var $ = layui.jquery,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
});