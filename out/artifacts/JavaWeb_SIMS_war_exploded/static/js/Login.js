
var random=null;
window.onload = function(){
    if(localStorage.jzzh!=null){
        var json2 = localStorage.jzzh;
        var obj = JSON.parse(json2);
        $("#LAY-user-login-username").val(obj.accout);
        $("#LAY-user-login-password").val(obj.pass);
    }
}
$(function () {

    // random=Math.random().toString(36).slice(-4);
    // $(".RandomCode").html(random);
    RandomCode();
    $(".RandomCode").click(function () {
        RandomCode();
    })
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#btn-login").trigger("click");
        }
    });
    $("button[lay-filter=LAY-user-login-submit]").click(function () {
        var username=$("#LAY-user-login-username").val();
        var password=$("#LAY-user-login-password").val();
        var state=$("li[class=layui-this]").attr("name");
        var randomcode=$("#LAY-user-login-vercode").val();
        if(randomcode!=random&&randomcode!=""){
            layer.msg('验证码错误', {
                icon: 5,
                anim: 6,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });

            RandomCode();
        }
        if(randomcode==random&&username!=""&&password!="") {
            var str = {"code": username, "pwd": password, "stateId": state};
            var url = "/JavaWeb_SIMS_war_exploded/login";
            var Menu = Ajax(url, str);
            if (Menu.code==1) {
                CheckSave(username,password,state);
                //登入成功的提示与跳转
                layer.msg(Menu.data, {
                    offset: '15px'
                    , icon: 1
                    , time: 1000
                }, function () {
                    location.href = "/JavaWeb_SIMS_war_exploded/"
                });
            }else{
                layer.msg(Menu.data, {
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
function RandomCode(){
    random=Math.random().toString(36).slice(-4);
    $(".RandomCode").html(random);
}
function CheckSave(username,password,state){
    var json1 = {};
    json1.stateId=state;
    if($("input[type=checkbox]").prop("checked")){
        json1.accout =username;
        json1.pass = password;
        var str1 = JSON.stringify(json1);
        localStorage.jzzh = str1;
    }else{
        json1.accout = "";
        json1.pass = "";
        var str1 = JSON.stringify(json1);
        localStorage.jzzh = str1;
    }
}


layui.use('element', function(){
    var $ = layui.jquery,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //触发事件
    var active = {
        tabAdd: function(){
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项'+ (Math.random()*1000|0) //用于演示
                ,content: '内容'+ (Math.random()*1000|0)
                ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }

        ,tabChange: function(){
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    element.on('tab(test)', function(elem){
        location.hash = 'test='+ $(this).attr('lay-id');
    });

});