/**
 * 接口
 * **/
//
function Ajax(url, data) {
    var num = {};
    $.ajax({
        url: url,
        data: data,
        type: "post",
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success: function (e) {
            num = e;
        },
    });
    return num;
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
