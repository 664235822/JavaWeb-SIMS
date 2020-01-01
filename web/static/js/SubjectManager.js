/**
 * 科目管理js
 *
 * **/
//班级年级科目数据
var ClassList = {};
//页面表格名
var tableName = "";
//新增科目
/**
 * @description 科目管理初始化
 * **/
function Submanage() {
    getClassList();
    var data = getpage({'tableName': 'Subject', "code": "", "name": "", 'currentPage': 1});
    if (data.code == 1) {
        Tabsub(data.data.list);
        tableName = "addSubject";
        Page("test1", data.data.pageCount, data.data.dataCount);
        Refresh();
    }
    Addsub();
    generalmang();
}

/**
 * @description 查看科任老师页面初始化
 * **/
function showteachifo() {
    getClassList();
    var data = getpage({'tableName': 'TeacherClass', 'gradeId': 0, 'classId': 0, 'subjectId': 0, 'currentPage': 1});
    if (data.code == 1) {
        SubjectTeacher(data.data.list);
        tableName = "SubjectTeacher";
        Page("test1", data.data.pageCount, data.data.dataCount);
        Refresh();
        GetGrades();
        TeacherSub();
    }

}
/**
 * @description 获取班级年级科目数据
 * **/
function getClassList() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll"});
}
/**
 * @description 查询数据
 * @param data 请求的数据
 * @return data 查询到的数据
 * **/
function getpage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, data,);
    return data;
}


/**
 * @description 添加科目的弹窗
 * **/
function Addsub() {
    var geaid = 0;
    $(function () {
        $("#Addbut").click(function () {
            var text = "";
            text += " <div class=\"layui-form\">";
            text += "<div class=\"layui-form-item\">";
            text += "<div class=\"layui-input-block\">";
            text += "<input type=\"text\" id=\"asub\" name=\"title\" placeholder=\"请输入添加科目名称\"  autocomplete=\"off\" class=\"layui-input\">";
            text += "</div></div>";
            text += "<select name=\"city\" id=\"batu\" lay-filter=\"test\">";
            text += "<option value=\"0\">请选择年级(供参考使用)</option>";
            text += grade();
            text += "</select>";
            text += "    </div>";
            //提交验证
            layer.open({
                anim: 1
                , shade: [0.1, '#ffffff']
                , title: ['添加科目', 'color:#ffffff;background-color:#009688;']
                , content: text
                , skin: 'demo-class'
                , area: '330px'
                , btn: ['提交', '取消']
                , yes: function (index) {
                    addSubject(geaid);
                    layer.close(index);
                }
            });
            //获取下拉框年级ID
            layui.use('form', function () {
                var form = layui.form;
                form.render();
                form.on('select', function (data) {
                    geaid = data.value;
                });
            });
        });
    });
}

/**
 * @description 添加科目点击确认后处理数据
 * @param geaid 年级id
 * **/
function addSubject(geaid) {
    var classname = $("#asub").val();
    if (classname == "") {
        layer.msg("请正确输入", {
            icon: 5
            , anim: 6
            , time: 1000
        });
    } else {
        var data = {};
        var url = "/JavaWeb_SIMS_war_exploded/insert";
        data.tableName = "Subject";
        var info = {};
        info.SubjectName = classname;
        info.GradeId = geaid;
        info.CreateMessage = JSON.parse(localStorage.Login).name;
        data.info = JSON.stringify(info);
        var table = Ajax(url, data);
        Callback(table);

    }
}
/**
 * @description 生成科目下拉框
 * @param classId 班级id
 * @return text科目下拉框代码
 */
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
/**
 * @description 生成年级下拉框
 * @return text科目下拉框代码
 */
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
/**
 * @description 生成班级下拉框
 * @param gradeId 年级id
 * @return text科目下拉框代码
 */
function MoveClass(gradeId) {
    var text = "";
    text += "  <option value=\"0\">请选择班级</option>";
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
 * @description 生成教师下拉框
 * @param gradeId 年级id
 * @return text科目下拉框代码
 */
function teacher(gradeId) {
    var data = getpage({'tableName': 'Teacher', 'code': "", 'name': "", 'currentPage': 0});
    var text = "";
    text += "  <option value=\"0\">请选择教师</option>";
    if (data.code == 1) {
        var list = data.data.list;
        if (gradeId != 0) {
            for (var i = 0; i < list.length; i++) {
                text += " <option value=\"" + list[i].id + "\" name=\"" + list[i].code + "\">";
                text += list[i].name + "</option>";
            }
        }
    }
    return text;
}

/**
 * @description 查看科任老师页面的查询功能
 * **/
function TeacherSub() {
    $(function () {
        //查询
        $("#subsea1").click(function () {
            var gradeId=$("#Grades option:selected").val();
            var classId=$("#Class option:selected").val();
            var SubjectsId=$("#Subjects  option:selected").val();
            var data = {
                "tableName": "TeacherClass",
                "gradeId": gradeId,
                "classId": classId,
                "subjectId": SubjectsId,
                "currentPage": 1
            };
            var table = getpage(data);
            if (table.code == 1) {
                SubjectTeacher(table.data.list);
                Refresh();
                Page("test1", table.data.pageCount, table.data.dataCount);
                TeacherSub();
            }

        });
    });
}
/**
 * @description 给下拉框添加监听事件
 *
 */
function GetGrades() {
    var text = "";
    text += "<option value=\"0\">请选择班级</option>";
    text +=grade();
    $("#Grades").html(text);
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            gradeId = data.value;
            var text = MoveClass(gradeId);
            $("#Class").html(text);
            var text = Subjects(gradeId);
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(quiz)', function (data) {
            classId = data.value;
            var text = Subjects(gradeId);
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(Subjects)', function (data) {
            SubjectsId = data.value;
        });
    })
}
/**
 * @description 科目管理页面查询 单行，多行操作
 *
 */
function generalmang() {
    $(function () {
        //查询
        $("#subsea1").click(function () {
            var name = $("#LAY_sub").val();
            var data = {"tableName": "Subject", "code": "", "name": name, "currentPage": 1};
            var table = getPage(data);
            if (table.code == 1) {
                Tabsub(table.data.list);
                Refresh();
                Page("test1", table.data.pageCount, table.data.dataCount);
                generalmang();
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
        //多行操作
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
                Delsub(codeList);
            }
        });
        //单行操作
        $("table tbody").find("button[name]").click(function () {
            var id = $(this).parent().parent().attr('name');
            if ($(this).attr("name") == "delete") {
                var codeList = new Array();
                codeList[0] = id;
                Delsub(codeList);
            }
            if ($(this).attr("name") == "subTeacher") {
                var subid = $(this).parent().attr('name');
                SubTeacher(subid);
            }
        })
    })
}

/**
 * @description 给科目建立老师班级关系
 * @param subid 当前行的name值（科目id）
 *
 */
function SubTeacher(subid) {
    var gradeId = 0;
    var classId = 0;
    var tid = 0;
    var text = "";
    text += " <div class=\"layui-form\">";
    text += "<select name=\"city\"  lay-filter=\"test\">";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    text += "</select>";
    text += "<select name=\"quiz\" id=\"Class\"  lay-filter=\"quiz\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择班级</option>";
    text += "</select> ";
    text +=" <input type=\"text\" id='TeacherCode' required  lay-verify=\"required\" disabled placeholder=\"教师编号（选择教师后显示）\" autocomplete=\"off\" class=\"layui-input\">"
    text += "<select name=\"subjects\" id=\"teacher\"  lay-filter=\"Subjects\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择教师</option>";
    text += "</select> ";
    text += "</div>";
    layer.open({
        title: '年级教师管理',
        btn: ['确定', '取消'],
        content: text,
        skin: 'demo-class',
        btnAlign: 'c',
        move: false,
        shade: [0.1, '#ffffff'],
        yes: function (index) {
            DistributionClass(tid, classId, subid);
            layer.close(index);
        }
    });
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            gradeId = data.value;
            var text = MoveClass(gradeId);
            $("#Class").html(text);
            var text = teacher(gradeId);
            $("#teacher").html(text);
            Refresh();
        });
        form.on('select(quiz)', function (data) {
            classId = data.value;
            var text = teacher(gradeId);
            $("#teacher").html(text);
            Refresh();
        });
        form.on('select(Subjects)', function (data) {
            tid = data.value;
            //把教师的编号显示在文本框内
            var code = $("#teacher").find("[value="+tid+"]").attr('name');
            $("#TeacherCode").val(code);
        });
    });
}

/**
 * @description 给科目建立老师班级关系确认后操作
 * @param tid 教师id
 * @param classId 班级id
 * @param subid 科目id
 */
function DistributionClass(tid, classId, subid) {
    var data = {};
    var url = "/JavaWeb_SIMS_war_exploded/insert";
    data.tableName = "TeacherClass";
    var info = {};
    info.teacherId = tid;
    info.classId = classId;
    info.subjectId = subid;
    data.info = JSON.stringify(info);
    var table = Ajax(url, data);
    DeleteEnd(table);
}
/**
 * @description 删除操作的确认弹窗
 * @param codeList 要删除行的name数据
 * **/
function Delsub(codeList) {
    layer.confirm('确认删除', {
        icon: 7,
        title: '提示',
        fixed: false,
    }, function (index) {
        var data = {}
        data.tableName = 'Subject';
        data.codeList = JSON.stringify(codeList);
        var url = "/JavaWeb_SIMS_war_exploded/delete";
        var Delete = Ajax(url, data);
        DeleteEnd(Delete);
        layer.close(index);
    });
}


/**
 * @description 删除后回调
 * @param Data 删除请求后后台发送回来的数据
 *
 * **/
function DeleteEnd(Delete) {
    if (Delete.code == 1) {
        var name = $("#LAY_sub").val();
        var data = {"tableName": "Subject", "code": "", "name": name, "currentPage": 1};
        var table = getPage(data);
        Tabsub(table.data.list);
        Refresh();
        Page("test1", table.data.pageCount, table.data.dataCount);
        generalmang();
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
/**
 * @description 操作之后对ajax请求回来的数据进行处理
 * @param Callback ajax请求回来的数据
 * **/
function Callback(Callback) {
    if (Callback.code == 1) {
        Submanage();
        layer.msg("操作成功", {
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


/**
 * @description layui分页功能
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
                    if (tableName == "addSubject") {
                        var name = $("#name").val();
                        var code = $("#code").val();
                        var data = {"tableName": "Subject", "code": code, "name": name, "currentPage": obj.curr};
                        var table = getPage(data);
                        if (table.code == 1) {
                            Tabsub(table.data.list);
                            Refresh();
                            Addsub();
                            generalmang();
                        }
                    }
                    if (tableName == "SubjectTeacher") {
                        var gradeId=$("#Grades option:selected").val();
                        var classId=$("#Class option:selected").val();
                        var SubjectsId=$("#Subjects  option:selected").val();
                        var data = {
                            "tableName": "TeacherClass",
                            "gradeId": gradeId,
                            "classId": classId,
                            "subjectId": SubjectsId,
                            "currentPage": obj.curr
                        };
                        var table = getPage(data);
                        if (table.code == 1) {
                            SubjectTeacher(table.data.list);
                            Refresh();
                            Page("test1", table.data.pageCount, table.data.dataCount);
                            TeacherSub();
                        }

                    }

                }
            }
        });
    });
}


/**
 * @description 科目教师表格
 * @param  data 教师科目年级班级数据
 *
 * */
function SubjectTeacher(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>科目编号</th><th>科目名称</th><th>年级</th><th>班级</th><th>教师编号</th><th>教师</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].teacherId + "\'>";
            text += "<td>" + data[i].subjectCode + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].className + "</td>";
            text += "<td>" + data[i].teacherCode + "</td>";
            text += "<td>" + data[i].teacherName + "</td>";
            text += "</tr>";
            text += "</tbody>";
            $("#table").html(text);
        }
    }
}

/**
 * @description 科目表格
 * @param  data 科目数据
 *
 * */
function Tabsub(data) {
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>科目编号</th><th>科目名称</th><th>创建人</th><th>创建时间</th><th>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].subjectCode + "\'>";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>" + data[i].subjectCode + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].createMessage + "</td>";
            text += "<td>" + data[i].createTime + "</td>";
            text += "<td name=\'" + data[i].id + "\'>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
            text += "<button type=\"button\" class=\"layui-btn layui-btn-sm layui-btn-normal\" name=\"subTeacher\">年级教师管理</button>";
            text += "</td>";
            text += "</tr>";
            text += "</tbody>";
            $("#subtable").html(text);
        }
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