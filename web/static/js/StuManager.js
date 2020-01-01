/**
 * 学生管理js
 *
 * **/
//班级年级科目数据
var ClassList = {};


/**
 * @description 添加学生页面初始化
 * **/
function StuInfo() {
    getClassList();
    var text = "";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    $("#tGrade").html(text);
    //layui实例监听年级下拉框
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


/**
 * @description 获取班级年级科目数据
 * **/
function getClassList() {
    this.ClassList = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "GradeAll"});
}

/**
 * @description 获取添加学生页面表单数据
 * **/
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
/**
 * @description 获取当前id标签的value值、
 * @param id 标签的id
 * @return 当前id标签的value值
 * **/
function Serch(id) {
    return $("#" + id).val();
}

/**
 * @description 修改学生信息页面当前学生数据
 * **/
function Modify() {
    getClassList();
    //获取localStorage数据，查询当前学生数据
    if (localStorage.ModifyId != null) {
        var json2 = localStorage.ModifyId;
        var obj = JSON.parse(json2);
    }
    data = {"tableName": "StudentOnly", "code": obj.teacherId, "name": "", "currentPage": 1};
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
    //判断当前学生年级编号
    for (var i = 0; i < ClassList.data.length; i++) {
       for(var j=0;j<ClassList.data[i].classes.length;j++){
           if (ClassList.data[i].classes[j].id == list.classId) {
               var gradeCode = ClassList.data[i].id;
               break;
           }
       }
    }
    var text = MoveClass(gradeCode);
    $("#tClass").html(text);
    $("#tGrade").find("option[value="+gradeCode+"]").prop("selected", true);
    $("#tClass").find("option[value="+list.classId+"]").prop("selected", true);
    if (localStorage.Login != null) {
        var json = localStorage.Login;
        var obj = JSON.parse(json);
        var stateId = 0;
        stateId = obj.stateId;
        if (stateId == 3){
            $("#tGrade").attr("disabled",true);
            $("#tClass").attr("disabled",true);
        }
    }
    Refresh();
}

/**
 * @description 显示学生页面的layui弹窗
 * @param id 当前学生id
 * **/
function ShowModify(id) {
    //当前学生id存入localStorage
    var json1 = {};
    json1.teacherId = id;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId = str1;
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 2
            , closeBtn: 2
            , shade: [0.1, '#ffffff']
            , title: ['查看信息', 'color:#ffffff;background-color:#009688;']
            , content: '/JavaWeb_SIMS_war_exploded/static/html/UpdateStudent.html'
            , area: ['650px', '500px']
        });
    });
}


/**
 * @description 学生管理初始化
 * **/
function StuMoveClass() {
    getClassList();
    var data = "";
    data = {"tableName": "Student", "code": "", "name": "", "currentPage": 1};
    var Student = getPage(data);
    data = {"tableName": "StudentOnly", "code": "", "name": "", "currentPage": 1};
    var StudentOnly = getPage(data);
    if (StudentOnly.code == 1) {
        StuTable(Student.data.list, StudentOnly.data.list);
        Refresh();
        Page("test1", StudentOnly.data.pageCount, StudentOnly.data.dataCount);
        StuFunction();
    }
}

/**
 * @description 查询数据
 * @param data 请求的数据
 * @return table 查询到的数据
 * **/
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

/**
 * @description 学生管理页面的查询，单行，多行操作
 * **/
function StuFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code = $("#code").val();
            var name = $("#name").val();
            var data = "";
            data = {"tableName": "Student", "code": code, "name": name, "currentPage": 1};
            var Student = getPage(data);
            data = {"tableName": "StudentOnly", "code": code, "name": name, "currentPage": 1};
            var StudentOnly = getPage(data);
            if (Student.code == 1) {
                StuTable(Student.data.list, StudentOnly.data.list);
                Refresh();
                Page("test1", StudentOnly.data.pageCount, StudentOnly.data.dataCount);
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
    //单行操作
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
    //多行操作
    $("#LAY_preview>div>div div").click(function () {
        var codeList = new Array();
        var num = 0;
        $("input[name=checkbox]:checked").each(function () {
            codeList[num] = $(this).parent().parent().parent().attr('name');
            num++;
        });
        if(codeList.length==0){
            layer.msg("请选择", {
                icon: 5
                , anim: 6
                , time: 1000
            });
        }else {
            var Id = $(this).attr("id");
            if (Id == "DeleteAll") {
                Delete(codeList);
            }
            if (Id == "moveClassAll") {
                Move(codeList);
            }
        }

    });


}

/**
 * @description 删除操作的确认弹窗
 * @param codeList 要删除行的name数据
 * **/
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


/**
 * @description 学生转班时的弹窗内容
 * @param codeList 要转班行的name数据
 * **/
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
            data.tableName = "ClassId";
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

/**
 * @description 班级下拉框
 * @param gradeId 年级id
 * @return   text 下拉框代码
 */
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

/**
 * @description 年级下拉框
 * @return   text 下拉框代码
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
 * @description 操作成功后回调
 * @param Data 转班请求后后台发送回来的数据
 *
 * **/
function MoveEnd(Data) {
    if (Data.code == 1) {
        var code = $("#code").val();
        var name = $("#name").val();
        var data = "";
        data = {"tableName": "Student", "code": code, "name": name, "currentPage": 1};
        var Student = getPage(data);
        data = {"tableName": "StudentOnly", "code": code, "name": name, "currentPage": 1};
        var StudentOnly = getPage(data);
        StuTable(Student.data.list, StudentOnly.data.list);
        Refresh();
        Page("test1", StudentOnly.data.pageCount, StudentOnly.data.dataCount);
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
                    var code = $("#code").val();
                    var name = $("#name").val();
                    var data = "";
                    data = {"tableName": "Student", "code": code, "name": name, "currentPage": 1};
                    var Student = getPage(data);
                    data = {"tableName": "StudentOnly", "code": code, "name": name, "currentPage": 1};
                    var StudentOnly = getPage(data);
                    if (StudentOnly.code == 1) {
                        StuTable(Student.data.list, StudentOnly.data.list);
                        Refresh();
                        StuFunction();
                    }
                }
            }
        });
    });
}


/**
 * @description 学生数据表格
 * @param data 学生与班级，年级数据
 * @param StudentOnly 学生数据
 * **/
function StuTable(data, StudentOnly) {
    if (data != null && StudentOnly != null) {
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>学号</th><th>名字</th><th>年龄</th><th>性别</th><th>当前年级</th><th>当前班级</th><th  style='min-width: 207px'>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < StudentOnly.length; i++) {
            text += "<tr name=\'" + StudentOnly[i].code + "\'>";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>" + StudentOnly[i].code + "</td>";
            text += "<td>" + StudentOnly[i].name + "</td>";
            text += "<td>" + StudentOnly[i].age + "</td>";
            text += "<td>" + StudentOnly[i].sex + "</td>";
            //获取当前学生的班级年级信息
            for (var j = 0; j < ClassList.data.length; j++) {
                for (var k = 0; k < ClassList.data[j].classes.length; k++) {
                    if (StudentOnly[i].classId == ClassList.data[j].classes[k].id) {
                        text += "<td>" + ClassList.data[j].gradeName + "</td>";
                        text += "<td>" + ClassList.data[j].classes[k].className + "</td>";
                        break;
                    }
                }
            }
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