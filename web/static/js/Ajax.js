/**
 * @fileOverview ajax与保存密码
 * @author y
 * @version 0.1
 */


/**
 * @description ajax请求
 * @param  url 请求地址
 * @param data  请求数据参数
 * @return  num 访问到的数据
 */
function Ajax(url, data) {
    var num = {};
    showLoad();
    $.ajax({
        url: url,
        data: data,
        type: "post",
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success: function (e) {
            closeLoad();
            num = e;
        },
    });
    return num;
}

//加载时弹窗
function showLoad() {
    layui.use('layer', function(){
        var layer = layui.layer;
        var index = layer.load(2, {time: 10000});
    });

}
//关闭弹窗
function closeLoad() {
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.closeAll('loading');
    });
}
/**
 * @description localStorage记住密码
 * @param  username 用户名
 * @param password  密码
 * @param state  权限
 * @param name  姓名
 *
 */
function CheckSave(username, password, state, name) {
    var json1 = {};
    json1.stateId = state;
    json1.accout = username;
    json1.name = name;
    if ($("input[type=checkbox]").prop("checked")) {
        json1.pass = password;
    } else {
        json1.pass = "";
    }
    var str1 = JSON.stringify(json1);
    localStorage.Login = str1;
}
