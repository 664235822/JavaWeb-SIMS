function TeacherInfo() {
        $(function() {
            $("#test1").click(function() {
                $("#btn_file").click();
            });
            $("#btn_file").change(function() {
                var file = $("input[type='file']").val();
                var filename = file.replace(/.*(\/|\\)/, "");
                var fileExt = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase()) : '';
                if (isPicFile(fileExt)) {
                    layer.confirm('确定上传文件吗？', {
                        icon: 3,
                        title: '提示',
                        offset: [
                            ($(window).height()/4) + "px", ($(window).width()/3) + "px"
                        ]
                    }, function(index) {
                        var url = "/JavaWeb_SIMS_war_exploded/uploadExcel";
                        var fileToUpload = $("input[type=file]").attr("id");
                        var data = {"tableName": "Teacher"};
                        ajaxFileUpload(url, fileToUpload, data);
                        layer.close(index);
                    });

                } else {
                    layer.msg('只支持上传.xlsx .xls文件', {
                        icon: 2,
                        anim: 6,
                        offset: [
                            $(window).height() / 4+"px"
                            ,$(window).width() / 3+"px"
                        ]
                        ,time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                    $("input[type='file']").val("");
                }

            });

        });

        $(function () {
            $("#test2").click(function() {
                document.getElementById("Download").click();
            });
            $("#Download").click(function (e) {
                layer.msg("请注意查看必读文档", {
                    icon: 6
                    ,time: 2000
                    , offset: [
                        $(window).height() / 4+"px"
                        ,$(window).width() / 3+"px"
                    ]
                }, function(index) {
                    var herf=$("#Download").attr('herf');
                    location.href =herf;
                });
            });
        });

}
//上传数据
function UpTeacher() {
            var data={};
            var Info={};
            data.tableName="Teacher";
            Info.code=Serch("tCode");
            Info.name=Serch("tName");
            Info.sex=$("input[type='radio']:checked").val();
            Info.age=Serch("tAge");
            Info.education=  $("#tEducation option:selected").text();
            Info.goodAt=Serch("tGoodAt");
            Info.phone=Serch("tPone");
            Info.QQ=Serch("tQQ");
            Info.email=Serch("tEmail");
            Info.address=Serch("tAddress");
            Info.introduction=Serch("tIntorduction");

            data.pwd=Serch("tPwd");
            data.info=JSON.stringify(Info);
            var url = "/JavaWeb_SIMS_war_exploded/insert";
            var Menu = Ajax(url, data);
            if (Menu.code==1) {
                //成功的
                layer.msg(Menu.data.message, {
                    offset: '15px'
                    , icon: 1
                    , time: 1000
                });
            }else{
                layer.msg(Menu.data, {
                    icon: 5
                    ,anim: 6
                    , time: 1000
                });

            }

}
//查看数据
function Serch(id) {
    return $("#"+id).val();
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