/**
 *
 * 考勤管理js
 * **/
var ClassList = {};
var tableName = {};
var classId = 0;
var SubjectsId = 0;
var gradeId = 0;
var code = "";
var name = "";

//考勤列表
function Attendance() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll", 'currentPage': 0});
    var data = Data("", "", 0, 0, 0);
    var table = getPage(data);
    if (table.code == 1) {
        AttendanceTable(table.data.list);
        Refresh();
        tableName = "AttendanceTable";
        Page("test1", table.data.pageCount, table.data.dataCount);
        AttendanceFunction();
        GetGrades();
    }

}

//查看考勤列表
function ShowAttendance() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll", 'currentPage': 0});
    Admin();
    var data = Data("", "", 0, 0, 0);
    var table = getPage(data);
    if (table.code == 1) {
        ShowAttendanceTable(table.data.list);
        Refresh();
        tableName = "ShowAttendanceTable";
        Page("test1", table.data.pageCount, table.data.dataCount);
        AttendanceFunction();
        $("#Select").click();
    }

}

//添加考勤
function ShowAddAttendance() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll", 'currentPage': 0});
    var data = {
        "tableName": "AddAttendance",
        "gradeId": 0,
        "classId": 0,
        "subjectId": 0,
        "currentPage": 1
    };
    var table = getPage(data);
    if (table.code == 1) {
        AddAttendanceTable(table.data.list);
        AddPage("test1", table.data.pageCount, table.data.dataCount);
        AddAttendanceFunction();
        Refresh();
    }
}

function AddAttendanceFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var data = {
                "tableName": "AddAttendance",
                "gradeId": gradeId,
                "classId": classId,
                "subjectId": SubjectsId,
                "currentPage": 1
            };
            var table = getPage(data);
            if (table.code == 1) {
                AddAttendanceTable(table.data.list);
                AddPage("test1", table.data.pageCount, table.data.dataCount);
                AddAttendanceFunction();
                Refresh();
            }
        });
        $("#SubmitAttendance").click(function () {
            SubmitAttendance();
        });
    })
}

//返回添加成绩表格
function AddAttendanceTable(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级名称</th><th>班级名称</th><th>学生学号</th><th>学生姓名</th><th>科目名称</th><th>添加考勤</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td name='classId' value='" + data[i].classId + "'>" + data[i].className + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td name='studentId' value='" + data[i].sId + "'>" + data[i].name + "</td>";
            text += "<td name='subjectId' value='" + data[i].subId + "'>" + data[i].subjectName + "</td>";
            text += "<td name='type' contenteditable='true'></td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

function AddPage(id, limit, count) {
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
                    var data = {
                        "tableName": "AddAttendance",
                        "gradeId": gradeId,
                        "classId": classId,
                        "subjectId": SubjectsId,
                        "currentPage": obj.curr
                    };
                    var table = getPage(data);
                    if (table.code == 1) {
                        AddAttendanceTable(table.data.list);
                        Refresh();
                        AddAttendanceFunction();
                    }
                }
            }
        });
    });
}

//保存成绩
function SubmitAttendance() {
    var list = new Array();
    $("#table").find("tr").each(function () {
        var obj = new Object();
        $(this).find("td").each(function () {
            switch ($(this).attr("name")) {
                case "classId":
                    obj.classId = $(this).attr("value");
                    break;
                case "studentId":
                    obj.sId = $(this).attr("value");
                    break;
                case "subjectId":
                    obj.subId = $(this).attr("value");
                    break;
                case "type":
                    obj.type = $(this).html();
                    break;
            }
        })
        if (obj.type !== "") {
            list.push(obj);
        }
    })

    var data = {
        "tableName": "Attendance",
        "info": JSON.stringify(list)
    }
    var url = "/JavaWeb_SIMS_war_exploded/insert"
    var Menu = Ajax(url, data);
    if (Menu.code == 1) {
        //操作成功的提示
        layer.msg(Menu.message, {
            offset: '15px'
            , icon: 1
            , time: 1000
        })
    } else {
        layer.msg(Menu.message, {
            icon: 5
            , anim: 6
            , time: 1000
        })
    }
}

/**
 * 权限区分
 *
 * **/
function Admin() {
    if (localStorage.Login != null) {
        var json = localStorage.Login;
        var obj = JSON.parse(json);
        var stateId = 0;
        stateId = obj.stateId;
        if (stateId == 3) {
            var code = obj.accout;
            var name = obj.name;
            var data = {"tableName": "StudentOnly", "code": code, "name": name, "currentPage": 1};
            var table = getPage(data);
            var list = table.data.list[0];
            var text = "";
            text += Grade();
            $("#Grades").html(text);
            for (var i = 0; i < ClassList.data.length; i++) {
                for (var j = 0; j < ClassList.data[i].classes.length; j++) {
                    if (ClassList.data[i].classes[j].id == list.classId) {
                        var gradeCode = ClassList.data[i].id;
                        break;
                    }
                }
            }
            gradeId = gradeCode;
            classId = list.classId;
            var text = MoveClass(gradeCode);
            $("#Class").html(text);
            $("#Grades").find("option[value=" + gradeCode + "]").prop("selected", true);
            $("#Class").find("option[value=" + list.classId + "]").prop("selected", true);
            $("#Grades").attr("disabled", true);
            $("#Class").attr("disabled", true);
            $("#code").val(code).attr("readonly", "true");
            $("#name").val(name).attr("readonly", "true");
            var text = Subjects(classId);
            $("#Subjects").html(text);
            layui.use('form', function () {
                var form = layui.form;
                form.on('select(Subjects)', function (data) {
                    SubjectsId = data.value;
                });
            })
            Refresh();
        } else {
            GetGrades();
        }
    } else {
        GetGrades();
    }
}

function Data(code, name, gradeId, classId, SubjectsId) {
    var data = {
        "tableName": "Attendance",
        "code": code,
        "name": name,
        "gradeId": gradeId,
        "classId": classId,
        "subjectId": SubjectsId,
        "currentPage": 1
    };
    return data;
}

function AttendanceFunction() {
    //查询
    $("#Select").click(function () {
        var code = $("#code").val();
        var name = $("#name").val();
        var gradeId = $("#Grades option:selected").val();
        var classId = $("#Class option:selected").val();
        var SubjectsId = $("#Subjects  option:selected").val();
        var data = Data(code, name, gradeId, classId, SubjectsId);
        var table = getPage(data);
        if (tableName == "AttendanceTable") {
            if (table.code == 1) {
                ResultTable(table.data.list);
            }
        }
        if (tableName == "ShowAttendanceTable") {
            if (table.code == 1) {
                ShowAttendanceTable(table.data.list);
            }
        }
        Refresh();
        Page("test1", table.data.pageCount, table.data.dataCount);

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
    //单个操作
    $("table tbody").find("button[name]").click(function () {
        var id = $(this).parent().parent().attr('name');
        if ($(this).attr("name") == "modify") {
            var codeList = new Array();
            codeList[0] = id;
            AttendanceMove(codeList);
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
        if (codeList.length == 0) {
            layer.msg("请选择", {
                icon: 5
                , anim: 6
                , time: 1000
            });
        } else {
            AttendanceMove(codeList);
        }
    });
}

//回调功能
function Callback(Delete) {
    if (Delete.code == 1) {
        $("#Select").click();
        layer.msg(Delete.message, {
            icon: 1
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

//更改考勤操作
function AttendanceMove(codeList) {
    var Attendance = 0;
    var text = "";
    text += "<div class=\"layui-form\">";
    text += "<select name=\"city\"  lay-filter=\"test\">";
    text += "<option value=\"0\">请选择</option>";
    text += "<option value=\"1\">签到</option>";
    text += "<option value=\"2\">迟到</option>";
    text += "<option value=\"3\">缺勤</option>";
    text += "</select>";
    text += "</div>";
    layer.open({
        title: '考勤管理',
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
                obj.id = codeList[i];
                obj.type = Attendance;
                list.push(obj);
            }
            var url = "/JavaWeb_SIMS_war_exploded/update";
            data.tableName = "AttendanceType";
            data.info = JSON.stringify(list);
            var table = Ajax(url, data);
            Callback(table);
            layer.close(index);
        }

    });
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            Attendance = data.value;
        });
    });


}

//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

//获取下拉框
function GetGrades() {
    var text = Grade();
    $("#Grades").html(text);
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            gradeId = data.value;
            var text = MoveClass();
            $("#Class").html(text);
            if (gradeId == "") {
                classId = "";
            }
            var text = Subjects();
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(quiz)', function (data) {
            classId = data.value;
            var text = Subjects(classId);
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(Subjects)', function (data) {
            SubjectsId = data.value;
        });
    })
}

//科目下拉框
function Subjects(classId) {
    var text = "";
    var subjectsId = 0;
    text += "  <option value=\"0\">请选择科目</option>";
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == gradeId) {
                for (var j = 0; j < list[i].classes.length; j++) {
                    if (list[i].classes[j].id == classId) {
                        if (list[i].classes[j].subjects != undefined) {
                            for (var k = 0; k < list[i].classes[j].subjects.length; k++) {
                                if (subjectsId != list[i].classes[j].subjects[k].id) {
                                    subjectsId = list[i].classes[j].subjects[k].id;
                                    text += " <option value=\"" + list[i].classes[j].subjects[k].id + "\">";
                                    text += list[i].classes[j].subjects[k].subjectName + "</option>";
                                }
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    return text;
}

//班级下拉框
function MoveClass() {
    var text = "";
    text += " <option value=\"0\">请选择班级</option>";
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
function Grade() {
    var text = "";
    text += "<option value=\"0\" selected=\"\">请选择年级</option>"
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            text += " <option value=\"" + list[i].id + "\" >";
            text += list[i].gradeName + "</option>";
        }
    }
    return text;
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
                    var gradeId = $("#Grades option:selected").val();
                    var classId = $("#Class option:selected").val();
                    var SubjectsId = $("#Subjects  option:selected").val();
                    var data = {
                        "tableName": "Result",
                        "code": code,
                        "name": name,
                        "gradeId": gradeId,
                        "classId": classId,
                        "subjectId": SubjectsId,
                        "currentPage": obj.curr
                    };
                    var table = getPage(data);
                    if (tableName == "AttendanceTable") {
                        if (table.code == 1) {
                            ResultTable(table.data.list);
                        }
                    }
                    if (tableName == "ShowAttendanceTable") {
                        if (table.code == 1) {
                            ShowAttendanceTable(table.data.list);
                        }
                    }
                    Refresh();
                    ResultFunction();
                }
            }
        });
    });
}

//返回考勤表格
function ShowAttendanceTable(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级</th><th>班级</th><th>课程</th><th>学号</th><th>姓名</th><th>考勤</th><th >考勤时间</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].id + "\'>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td>" + data[i].name + "</td>";
            text += "<td>" + data[i].type + "</td>";
            text += "<td>" + data[i].time + "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

//返回考勤表格
function AttendanceTable(data) {
    if (data != null) {
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>年级</th><th>班级</th><th>课程</th><th>学号</th><th>姓名</th><th>考勤</th><th >考勤时间</th><th >操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].id + "\'>";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td>" + data[i].name + "</td>";
            text += "<td>" + data[i].type + "</td>";
            text += "<td>" + data[i].time + "</td>";
            text += "<td><button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\" name=\"modify\">修改考勤</button></td>";
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
