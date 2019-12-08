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
                            $(window).height() / 3+"px"
                            ,$(window).width() / 3+"px"
                        ]
                        ,time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                    $("input[type='file']").val("");
                }

            });

        });

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
}