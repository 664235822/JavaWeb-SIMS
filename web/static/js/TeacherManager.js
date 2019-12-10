//添加教师
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
//查看教师列表
function ShowTeachers() {
    var data = {"tableName": "Teacher", "code": "", "name": "","currentPage":1};
    var table=getPage(data);
    if (table.code == 1) {
        TeachresTable(table.data.list);
        layui.use('form', function () {
            var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
            form.render();
        });
        Page("test1",table.data.pageCount,table.data.dataCount);
        TeacherFunction();
    }
}
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}
function TeacherFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code=$("#code").val();
            var name=$("#name").val();
            var data = {"tableName": "Teacher", "code": code, "name": name,"currentPage":1};
            var table=getPage(data);
            if (table.code == 1) {
                TeachresTable(table.data.list);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
                Page("test1",table.data.pageCount,table.data.dataCount);
                TeacherFunction();
            }
        });

        //全选
        $("#allChoose").click(function () {
            if($("#allChoose>input").is(':checked')){
                $("input[name=checkbox]").prop("checked",true);
            }else{
                $("input[name=checkbox]").prop("checked",false);
            }
            layui.use('form', function () {
                var form = layui.form;
                form.render();
            });
        });
    });
    //删除
    $("table tbody").find("button[name=delete]").click(function() {
        var id=$(this).parent().parent().attr('name');
        layer.confirm('确认删除', {
            icon: 7,
            title: '提示',
            fixed: false,
        }, function(index) {

            layer.close(index);
        });
    });

}
function Page(id,limit,count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count:count //数据总数，从服务端得到
            , limit:10
            ,layout:['prev', 'page', 'next','skip']
            ,jump: function(obj, first){
            //首次不执行
            if(!first){
                var code=$("#code").val();
                var name=$("#name").val();
                var data = {"tableName": "Teacher", "code": code, "name": name,"currentPage":obj.curr};
                var table=getPage(data);
                if (table.code == 1) {
                    TeachresTable(table.data.list);
                    layui.use('form', function () {
                        var form = layui.form;
                        form.render();
                    });
                    TeacherFunction();
                }
            }
        }
        });
    });
}
function TeachresTable(data) {
    var text = "";
    text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
    text += "<thead><tr>";
    text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
    text += "</div></th>"
    text += "<th>账号</th><th>名字</th><th>年龄</th><th>性别</th><th>E-mail</th><th>练习电话</th><th>操作</th>";
    text += "</tr></thead>";
    text += "<tbody>";
    for(var i=0;i<data.length;i++){
        text += "<tr name=\'"+data[i].id+"\'>";
        text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></td>"
        text += "<td>"+data[i].code+"</td>";
        text += "<td>"+data[i].name+"</td>";
        text += "<td>"+data[i].age+"</td>";
        text += "<td>"+data[i].sex+"</td>";
        text += "<td>"+data[i].email+"</td>";
        text += "<td>"+data[i].phone+"</td>";
        text += "<td>";
        text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\">修改</button>";
        text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm\">查看</button>";
        text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
        text += "</td>";
        text += "</tr>";
    }
    text += "</tbody>";
    $("#table").html(text);

}