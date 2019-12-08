

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