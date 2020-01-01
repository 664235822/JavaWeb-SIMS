/**
 *
 * 成绩管理js
 * **/
//班级年级科目数据
var ClassList = {};
//班级id
var classId = 0;
//科目id
var SubjectsId = 0;
//年级id
var gradeId = 0;
//编号
var code = "";
//姓名
var name = "";

/**
 * @description 查看成绩页面初始化
 *
 */
function ShowResult() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll", 'currentPage': 0});
    Admin();
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

}

/**
 * @description 处理不同角色的权限问题
 *
 */
function Admin() {
    if (localStorage.Login != null) {
        var json = localStorage.Login;
        var obj = JSON.parse(json);
        var stateId = 0;
        stateId = obj.stateId;
        if (stateId == 3) {
            code = obj.accout;
            name = obj.name;
            data = {"tableName": "StudentOnly", "code": code, "name": "", "currentPage": 1};
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
            var text = Subjects();
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

/**
 * @description 添加成绩页面初始化
 *
 */
function ResultInfo() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll", 'currentPage': 0});
    var data = {
        "tableName": "AddResult",
        "gradeId": gradeId,
        "classId": classId,
        "subjectId": SubjectsId,
        "currentPage": 1
    };
    var table = getPage(data);
    if (table.code == 1) {
        AddResultTable(table.data.list);
        Refresh();
        AddPage("test1", table.data.pageCount, table.data.dataCount);
        AddResultFunction();
    }

    GetGrades();
}

/**
 * @description 查看成绩分页功能
 * @param  id 绑定id
 * @param limit  页数
 * @param count  数据总条数
 *
 */
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
                    code = $("#code").val();
                    name = $("#name").val();
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
/**
 * @description 添加成绩分页功能
 * @param  id 绑定id
 * @param limit  页数
 * @param count  数据总条数
 *
 */
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
                        "tableName": "AddResult",
                        "gradeId": gradeId,
                        "classId": classId,
                        "subjectId": SubjectsId,
                        "currentPage": obj.curr
                    };
                    var table = getPage(data);
                    if (table.code == 1) {
                        AddResultTable(table.data.list);
                        Refresh();
                        AddResultFunction();
                    }
                }
            }
        });
    });
}

/**
 * @description 查询数据
 * @param  data 请求的数据
 */
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}
/**
 * @description 成绩管理页面的模糊查询
 *
 */
function ResultFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            code = $("#code").val();
            name = $("#name").val();
            gradeId=$("#Grades option:selected").val();
            classId=$("#Class option:selected").val();
            SubjectsId=$("#Subjects  option:selected").val();
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
/**
 * @description 添加成绩页面的模糊查询
 *
 */
function AddResultFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var data = {
                "tableName": "AddResult",
                "gradeId": gradeId,
                "classId": classId,
                "subjectId": SubjectsId,
                "currentPage": 1
            };
            var table = getPage(data);
            if (table.code == 1) {
                AddResultTable(table.data.list);
                AddPage("test1", table.data.pageCount, table.data.dataCount);
                AddResultFunction();
                Refresh();
            }
        });
        //一键保存点击事件
        $("#SubmitResult").click(function () {
            SubmitResult();
        });
    })
}

/**
 * @description 生成科目下拉框
 * @return text科目下拉框代码
 */
function Subjects() {
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
/**
 * @description 生成班级下拉框
 * @return text 班级下拉框代码
 */
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

/**
 * @description 生成年级下拉框
 * @return text 年级下拉框代码
 */
function Grade() {
    var text = "";
    text += "<option value=\"\" selected=\"0\">请选择年级</option>"
    if (ClassList.code == 1) {
        var list = ClassList.data;
        for (var i = 0; i < list.length; i++) {
            text += " <option value=\"" + list[i].id + "\" >";
            text += list[i].gradeName + "</option>";
        }
    }
    return text;
}

/**
 * @description 生成成绩表格代码
 * @param data 成绩表格数据
 */
function ResultTable(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级名称</th><th>班级名称</th><th>学生学号</th><th>学生姓名</th><th>科目名称</th><th>时间</th><th>成绩</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].code + "\'>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td>" + data[i].name + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].time + "</td>";
            text += "<td>" + data[i].result + "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

/**
 * @description 生成添加成绩表格代码
 * @param data 成绩表格数据
 */
function AddResultTable(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级名称</th><th>班级名称</th><th>学生学号</th><th>学生姓名</th><th>科目名称</th><th>添加成绩</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].code + "</td>";
            text += "<td name='studentId' value='" + data[i].sId + "'>" + data[i].name + "</td>";
            text += "<td name='subjectId' value='" + data[i].subId + "'>" + data[i].subjectName + "</td>";
            text += "<td name='result' contenteditable='true'></td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}
/**
 * @description 对年级，班级 ，科目下拉框进行监听
 *
 */
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


/**
 * @description 获取添加成绩表格数据并提交
 *
 */
function SubmitResult() {
    var list = new Array();
    //循环遍历tr
    $("#table").find("tr").each(function () {
        var obj = new Object();
        $(this).find("td").each(function () {
            switch ($(this).attr("name")) {
                case "studentId":
                    obj.sId = $(this).attr("value");
                    break;
                case "subjectId":
                    obj.subId = $(this).attr("value");
                    break;
                case "result":
                    obj.result = $(this).html();
                    break;
            }
        })
        if (obj.result !== "") {
            list.push(obj);
        }
    })

    var data = {
        "tableName": "Result",
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
 * @description layui模块重新加载
 *
 */
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}
