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

//上传文件请求
function ajaxFileUpload(url, fileToUpload, data) {
    $.ajaxFileUpload({
        url: url,   // servlet请求路径【需要更改】
        secureuri: false,
        fileElementId: fileToUpload,   // 上传控件的id【需要更改】
        dataType: 'json',
        data: data,
        success: function (data, status) {

        },
        error: function (data, status, e) {

        }
    })
    return false;
}

//上传功能
function uploadExcel(tableName) {

    var file = $("input[type='file']").val();
    var filename = file.replace(/.*(\/|\\)/, "");
    var fileExt = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase()) : '';
    if (isPicFile(fileExt)) {
        layer.confirm('确定上传文件吗？', {
            icon: 3,
            title: '提示',
            offset: [
                ($(window).height() / 4) + "px", ($(window).width() / 3) + "px"
            ]
        }, function (index) {
            var url = "/JavaWeb_SIMS_war_exploded/uploadExcel";
            var fileToUpload = $("input[type=file]").attr("id");
            var data = {"tableName": tableName};
            ajaxFileUpload(url, fileToUpload, data);
            layer.close(index);
        });

    } else {
        layer.msg('只支持上传.xlsx .xls文件', {
            icon: 2,
            anim: 6,
            offset: [
                $(window).height() / 4 + "px"
                , $(window).width() / 3 + "px"
            ]
            , time: 2000 //2秒关闭（如果不配置，默认是3秒）
        });
        $("input[type='file']").val("");
    }
}

//判断文件类型
function isPicFile(fileExt) {
    var suppotFile = new Array();
    // 存储格式类型
    suppotFile[0] = "xlsx";
    suppotFile[1] = "xls";
    for (var i = 0; i < suppotFile.length; i++) {
        if (suppotFile[i] == fileExt) {
            return true;
        }
    }
    return false;

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
