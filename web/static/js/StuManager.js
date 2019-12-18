/**
 * 学生管理js
 *
 * **/
var ClassList = {};

//添加学生
function StuInfo() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName':"GradeAll"});
    $(function () {
        $("#test1").click(function () {
            $("input[type='file']").val("");
            $("#btn_file").click();
        });
        $("#btn_file").change(function () {
            uploadExcel('Student');
        });

    });
    var text = "";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    $("#tGrade").html(text);
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            var gradeCode = data.value;
            var text = MoveClass(gradeCode);
            $("#tClass").html(text);
            Refresh();
        });

    });


}

//获取学生信息
function UpStudent() {
    var data = {};
    var Info = {};
    data.tableName = "Student";
    Info.code = Serch("tCode");
    Info.name = Serch("tName");
    Info.sex = $("input[type='radio']:checked").val();
    Info.age = Serch("tAge");
    Info.classId = $("#tClass option:selected").val();
    Info.phone = Serch("tPone");
    Info.QQ = Serch("tQQ");
    Info.address = Serch("tAddress");
    Info.pwd = Serch("tPwd");
    data.info = JSON.stringify(Info);
    var url = "/JavaWeb_SIMS_war_exploded/insert";
    var Menu = Ajax(url, data);
    if (Menu.code == 1) {
        //成功的
        layer.msg(Menu.message, {
            icon: 1
            , time: 1000
        });
    } else {
        layer.msg(Menu.message, {
            icon: 5
            , anim: 6
            , time: 1000
        });

    }
}

//查看数据
function Serch(id) {
    return $("#" + id).val();
}
//显示信息数据
function Modify() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName':"GradeAll"});
    if (localStorage.ModifyId != null) {
        var json2 = localStorage.ModifyId;
        var obj = JSON.parse(json2);
    }
    var data = {"tableName": "Student", "code": obj.teacherId, "name": "", "currentPage": 1};
    var table = getPage(data);
    var list = table.data.list[0];
    $("#tCode").val(list.code);
    $("#tName").val(list.name);
    var sex = list.sex;
    if (sex == "女") {
        $("input[type='radio']").eq(0).attr("checked", false);
        $("input[type='radio']").eq(1).attr("checked", true);
    }
    $("#tAge").val(list.age);
    $("#tPone").val(list.phone);
    $("#tQQ").val(list.qQ);
    $("#tAddress").val(list.address);
    $("#tPwd").val(list.pwd);
    var text = "";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    $("#tGrade").html(text);
    $("#tGrade option:contains(" + list.gradeName + ")").prop("selected", true);
    for(var i=0;i<ClassList.data.length; i++){
        if(ClassList.data[i].gradeName==list.gradeName){
            var gradeCode =ClassList.data[i].id;
            break;
        }
    }
    var text = MoveClass(gradeCode);
    $("#tClass").html(text);
    $("#tClass option:contains(" + list.className + ")").prop("selected", true);
    Refresh();
}


//显示修改信息页面
function ShowModify(id) {
    var json1 = {};
    json1.teacherId = id;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId = str1;
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 2
            , closeBtn: 2
            ,shade: [0.1, '#ffffff']
            , title: ['查看信息', 'color:#ffffff;background-color:#009688;']
            , content: '/JavaWeb_SIMS_war_exploded/static/html/UpdateStudent.html'
            , area: ['650px', '500px']
        });
    });
}

//学生管理初始化
function StuMoveClass() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName':"GradeAll"});
    var data = {"tableName": "Student", "code": "", "name": "", "currentPage": 1};
    var table = getPage(data);
    if (table.code == 1) {
        StuTable(table.data.list);
        Refresh();
        Page("test1", table.data.pageCount, table.data.dataCount);
        StuFunction();
    }
}

//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

//功能
function StuFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code = $("#code").val();
            var name = $("#name").val();
            var data = {"tableName": "Student", "code": code, "name": name, "currentPage": 1};
            var table = getPage(data);
            if (table.code == 1) {
                StuTable(table.data.list);
                Refresh();
                Page("test1", table.data.pageCount, table.data.dataCount);
                StuFunction();
            }
        });

        //全选
        $("#allChoose").click(function () {
            if ($("#allChoose>input").is(':checked')) {
                $("input[name=checkbox]").prop("checked", true);
            } else {
                $("input[name=checkbox]").prop("checked", false);
            }
            layui.use('form', function () {
                var form = layui.form;
                form.render();
            });
        });
    });
    //单个操作
    $("table tbody").find("button[name]").click(function () {
        var id = $(this).parent().parent().attr('name');
        if ($(this).attr("name") == "delete") {
            var codeList = new Array();
            codeList[0] = id;
            Delete(codeList);
        }
        if ($(this).attr("name") == "moveClass") {
            var codeList = new Array();
            codeList[0] = id;
            Move(codeList);
        }
        if ($(this).attr("name") == "modify") {
            ShowModify(id);
        }

    });
    //批量操作
    $("#moveClassAll").click(function () {
        var codeList = new Array();
        var num = 0;
        $("input[name=checkbox]:checked").each(function () {
            codeList[num] = $(this).parent().parent().parent().attr('name');
            num++;
        });
        if ($(this).attr("name") == "delete") {
            Delete(codeList);
        }
        if ($(this).attr("name") == "moveClass") {
            Move(codeList);
        }
    });


}

//删除
function Delete(codeList) {
    layer.confirm('确认删除', {
        icon: 7,
        title: '提示',
        fixed: false,
    }, function (index) {
        var data = {}
        data.tableName = 'Student';
        data.codeList = JSON.stringify(codeList);
        var url = "/JavaWeb_SIMS_war_exploded/delete";
        var Delete = Ajax(url, data);
        MoveEnd(Delete);
        layer.close(index);
    });

}

//转班操作
function Move(codeList) {
    var classId = 0;
    var text = "";
    text += " <div class=\"layui-form\">";
    text += "<select name=\"city\"  lay-filter=\"test\">";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    text += "</select>  ";
    text += "<select name=\"quiz\" id=\"Class\"  lay-filter=\"quiz\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择班级</option>";
    text += "</select>    ";
    text += "    </div>";
    layer.open({
        title: '转班',
        btn: ['确定', '取消'],
        content: text,
        skin: 'demo-class',
        btnAlign: 'c',
        move: false,
        shade: [0.1, '#ffffff'],
        yes: function (index) {
            var list = new Array;
            var obj = {};
            var data = {};
            for (var i = 0; i < codeList.length; i++) {
                obj.code = codeList[i];
                obj.classId = classId;
                list.push(obj);
            }
            var url = "/JavaWeb_SIMS_war_exploded/update";
            data.tableName = "StudentClass";
            data.info = JSON.stringify(list);
            var table = Ajax(url, data);
            MoveEnd(table);
            layer.close(index);
        }

    })
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            var gradeId = data.value;
            var text = MoveClass(gradeId);
            $("#Class").html(text);
            Refresh();
        });
        form.on('select(quiz)', function (data) {
            classId = data.value;
        });
    })


}

//班级下拉框
function MoveClass(gradeId) {
    var text = "";
    text += "  <option value=\"\">请选择班级</option>";
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == gradeId) {
                for (var j = 0; j < list[i].classes.length; j++) {
                    text += " <option value=\"" + list[i].classes[j].id + "\">";
                    text += list[i].classes[j].className + "</option>";
                }

            }
        }
    }
    return text;
}

//年级下拉框
function grade() {
    var text = "";
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            text += " <option value=\"" + list[i].id + "\" >";
            text += list[i].gradeName + "</option>";
        }
    }
    return text;
}

//转班回调
function MoveEnd(Data) {
    if (Data.code == 1) {
        var code = $("#code").val();
        var name = $("#name").val();
        var data = {"tableName": "Student", "code": code, "name": name, "currentPage": 1};
        var table = getPage(data);
        StuTable(table.data.list);
        Refresh();
        Page("test1", table.data.pageCount, table.data.dataCount);
        StuFunction();
        layer.msg(Data.message, {
            offset: '15px'
            , icon: 1
            , time: 1000
        });
    } else {
        layer.msg("操作失败", {
            icon: 5
            , anim: 6
            , time: 1000
        });

    }

}

//分页
function Page(id, limit, count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: count //数据总数，从服务端得到
            , limit: 10
            , layout: ['prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                //首次不执行
                if (!first) {
                    var code = $("#code").val();
                    var name = $("#name").val();
                    var data = {"tableName": "Student", "code": code, "name": name, "currentPage": obj.curr};
                    var table = getPage(data);
                    if (table.code == 1) {
                        StuTable(table.data.list);
                        Refresh();
                        StuFunction();
                    }
                }
            }
        });
    });
}

//表格
function StuTable(data) {
    if (data != null) {
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>学号</th><th>名字</th><th>年龄</th><th>性别</th><th>当前年级</th><th>当前班级</th><th>班级教师</th><th  style='min-width: 207px'>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].code + "\'>";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>" + data[i].code + "</td>";
            text += "<td>" + data[i].name + "</td>";
            text += "<td>" + data[i].age + "</td>";
            text += "<td>" + data[i].sex + "</td>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].teacherName + "</td>";
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\" name=\"modify\">修改</button>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-red\" name=\"delete\">删除</button>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-green\" name=\"moveClass\">转班</button>";
            text += "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

//刷新
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}