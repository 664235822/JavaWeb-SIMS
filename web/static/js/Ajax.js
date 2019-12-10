
//
function Ajax(url, data) {
    var num={};
    $.ajax({
        url:url,
        data:data,
        type: "post",
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success: function(e) {
                num=e;
        },
    });
    return num;
}
//上传文件请求
function ajaxFileUpload(url,fileToUpload,data) {
    $.ajaxFileUpload({
        url : url,   // servlet请求路径【需要更改】
        secureuri : false,
        fileElementId : fileToUpload,   // 上传控件的id【需要更改】
        dataType : 'json',
        data : data,
        success : function(data, status) {

        },
        error : function(data, status, e) {

        }
    })
    return false;
}

//记住密码
function CheckSave(username,password,state,name){
    var json1 = {};
    json1.stateId=state;
    json1.name=name;
    if($("input[type=checkbox]").prop("checked")){
        json1.accout =username;
        json1.pass = password;
        var str1 = JSON.stringify(json1);
        localStorage.Login= str1;
    }else{
        json1.accout = "";
        json1.pass = "";
        var str1 = JSON.stringify(json1);
        localStorage.Login = str1;
    }
}