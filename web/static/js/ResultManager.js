/**
 *
 * 成绩管理js
 * **/
var ClassList = {};
var classId = 0;
var SubjectsId = 0;
var gradeId = 0;

//查看成绩列表
function ShowResult() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/getClass", "");
    var data = {
        "tableName": "Result",
        "code": "",
        "name": "",
        "gradeId": gradeId,
        "classId": classId,
        "subjectId": SubjectsId,
        "currentPage": 1
    };
    var table = getPage(data);
    if (table.code == 1) {
        ResultTable(table.data.list);
        Refresh();
        Page("test1", table.data.pageCount, table.data.dataCount);
        ResultFunction();
    }

    GetGrades();
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
                    if (table.code == 1) {
                        ResultTable(table.data.list);
                        Refresh();
                        ResultFunction();
                    }
                }
            }
        });
    });
}

//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

function ResultFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code = $("#code").val();
            var name = $("#name").val();
            var data = {
                "tableName": "Result",
                "code": code,
                "name": name,
                "gradeId": gradeId,
                "classId": classId,
                "subjectId": SubjectsId,
                "currentPage": 1
            };
            var table = getPage(data);
            if (table.code == 1) {
                ResultTable(table.data.list);
                Refresh();
                Page("test1", table.data.pageCount, table.data.dataCount);
                ResultFunction();
            }
        });
    })
}

//科目下拉框
function Subjects() {
    var text = "";
    text += "  <option value=\"\">请选择科目</option>";
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == gradeId) {
                if (list[i].subjects != undefined) {
                    for (var j = 0; j < list[i].subjects.length; j++) {
                        text += " <option value=\"" + list[i].subjects[j].id + "\">";
                        text += list[i].subjects[j].subjectName + "</option>";
                    }
                }

            }
        }
    }
    return text;
}

//班级下拉框
function MoveClass() {
    var text = "";
    text += " <option value=\"\">请选择班级</option>";
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
    text += "<option value=\"\" selected=\"\">请选择年级</option>"
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            text += " <option value=\"" + list[i].id + "\" >";
            text += list[i].gradeName + "</option>";
        }
    }
    return text;
}

function ResultTable(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级名称</th><th>班级名称</th><th>学生学号</th><th>学生姓名</th><th>科目名称</th><th>成绩</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].code + "\'>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td>" + data[i].name + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].result + "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

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
            var text = Subjects();
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(quiz)', function (data) {
            classId = data.value;
            var text = Subjects();
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(Subjects)', function (data) {
            SubjectsId = data.value;
        });
    })
}

//刷新
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}