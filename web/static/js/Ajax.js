

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
        url : url,   // servlet请求路径
        secureuri : false,
        fileElementId : fileToUpload,   // 上传控件的id
        dataType : 'json',
        data :data,
        success : function(data, status) {

        },
        error : function(data, status, e) {
            alert('上传出错');
        }
    });
    return false;
}
//记住密码
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