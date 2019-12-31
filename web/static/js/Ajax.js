/**
 * 接口
 * **/
//
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
        var index = layer.load(2, {time: 100000});
    });

}
//关闭弹窗
function closeLoad() {
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.closeAll('loading');
    });
}
//记住密码
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
