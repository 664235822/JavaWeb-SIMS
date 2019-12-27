/**
 * 科目管理js
 *
 * **/

/**NO.1科目管理**/
//预加载
function Submanage() {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = {"tableName": "Subject", "code": "", "name": "", "currentPage": 1};
    var dataa = Ajax(url, data);
    if (dataa.code == 1) {
        Tabsub(dataa.data.list);
        Page("test1", dataa.data.pageCount, dataa.data.dataCount);
        Refresh()
    }
    Addsub();
    generalmang();
}

//获取科目
function getsub(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Subject',"code": "", "name": "", 'currentPage': page});
    return data;
}

//添加科目页面
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
            text += "  <option value=\"\">请选择年级</option>";
            text += gradesub();
            text += "</select>";
            text += "    </div>";
            //提交验证
            layer.open({
                anim: 1
                , shade: [0.1, '#ffffff']
                , title: ['添加科目', 'color:#ffffff;background-color:#009688;']
                , content: text
                ,skin: 'demo-class'
                , area: '330px'
                , btn: ['提交', '取消']
                , yes: function (index) {
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
                        info.SubjectCode = subjectCode;
                        info.SubjectName = classname;
                        info.GradeId = geaid;
                        info.CreateMessage = JSON.parse(localStorage.Login).name;
                        data.info = JSON.stringify(info);
                        var table = Ajax(url, data);
                        Callback(table);
                        layer.close(index);
                    }
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

//获取年级
function getgradsub(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Grade', "gradeId": "", 'currentPage': page});
    return data;
};

//年级下拉框
function gradesub() {
    var grade = getgradsub(0);
    var strVar = "";
    if (grade.code == 1) {
        var lis = grade.data.list;
        for (var i = 0; i < lis.length; i++) {
            strVar += " <option value=\"" + lis[i].id + "\" >";
            strVar += lis[i].gradeName + "</option>";
        }
    }
    return strVar;
}

//表格主体
var subjectCode = 0;

function Tabsub(data) {
    var sub=getsub(0);
    sub=sub.data.list;
    subjectCode = parseInt(sub[sub.length - 1].subjectCode) + 1;
    if (data!=null) {
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>科目编号</th><th>科目名称</th><th>创建人</th><th>创建时间</th><th>科目当前年级</th><th>操作</th>";
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
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
            text += " <button type=\"button\" class=\"layui-btn  layui-btn-sm  layui-btn-warm\" name=\"gradman\">年级管理</button>"
            text += "</td>";
            text += "</tr>";
            text += "</tbody>";
            $("#subtable").html(text);
        }
    }
}

//综合操作
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
                Delsub(codeList);
            }
        });
        //单个操作
        $("table tbody").find("button[name]").click(function () {
            var id = $(this).parent().parent().attr('name');
            if ($(this).attr("name") == "delete") {
                var codeList = new Array();
                codeList[0] = id;
                Delsub(codeList);
            }
            if ($(this).attr("name") == "gradman") {
                var subid = $(this).parent().parent().attr('name');
                var codeList = new Array();
                codeList[0] = subid;
                gradesmana(codeList);
            }
        })
    })
}

//删除
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

//删除回调
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
        layer.msg(Delete.message, {
            icon: 5
            , anim: 6
            , time: 1000
        });
    }
}
//年级管理
function gradesmana(codeList) {
    var gradId=-1;
        var text = "";
        text += " <div class=\"layui-form\">";
        text += "<select name=\"city\"  lay-filter=\"test\">";
        text += "  <option value=\"\">请选择年级</option>";
        text += gradesub();
        text += "</select>";
        text += "    </div>";
        layer.open({
            anim: 1,
            shade: [0.1, '#ffffff'],
            title: ['更改年级', 'color:#ffffff;background-color:#009688;'],
            btn: ['确定', '取消'],
            content: text,
            skin: 'demo-class',
            shade: [0.1, '#ffffff'],
            yes:function (index) {
                var data = {};
                var list = new Array;
                for (var i = 0; i < codeList.length; i++) {
                    var info={};
                    info.gradeId=gradId;
                    info.subjectCode=codeList[i];
                    list.push(info);
                }
                var url = "/JavaWeb_SIMS_war_exploded/update";
                data.tableName= "SubjectId";
                data.info=JSON.stringify(list);
                var table=Ajax(url,data);
                Callback(table);
                Refresh();
                layer.close(index);
            }
        });
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            gradId = data.value;
        });

    });

}

//科目管理分页
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
                    var name = $("#LAY_sub").val();
                    var data = {"tableName": "Subject", "code": "", "name": name, "currentPage": obj.curr};
                    var table = getPage(data);
                    if (table.code == 1) {
                        Tabsub(table.data.list);
                        Refresh();
                        Addsub();
                        generalmang();
                    }
                }
            }
        });
    });
}

//回调
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


/**  科目与教师管理js   **/

//预加载
function Subteacher() {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = {"tableName": "TeacherClass", "code": "", "name": "", "currentPage": 1};
    var dataa = Ajax(url, data);
    if (dataa.code == 1) {
        tabsubt(dataa.data.list);
        //Page1("test1", dataa.data.pageCount, dataa.data.dataCount);
        Refresh();
        Teachmang();
    }

}

//表格主体
function tabsubt(data) {
    var text = "";
    text += "<thead><tr>";
    text += "<th>科目编号</th><th>科目名称</th><th>所在年级</th><th>科目当前教师</th><th>操作</th>";
    text += "</tr></thead>";
    text += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        text += "<tr name=\'" + data[i].subjectCode + "\'>";
        text += "<td>" + data[i].subjectCode + "</td>";
        text += "<td>" + data[i].subjectName + "</td>";
        text += "<td>" + data[i].gradeName + "</td>";
        if (data[i].name==undefined){
            text += "<td>暂未分配</td>";
        }else {
            text += "<td>" + data[i].name + "</td>";
        }
        text += "<td name=\'" + data[i].id + "\'>";
        text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm\" name=\"teaman\">教师管理</button>";
        text += "</td>";
        text += "</tr>";
        text += "</tbody>";
        $("#subteatable").html(text);
    }
}
//表格操作
function Teachmang() {
    //单个操作
    $("table tbody").find("button[name]").click(function () {
        if ($(this).attr("name") == "teaman") {
            var subid = $(this).parent().attr('name');
            var codeList = new Array();
            codeList[0] = subid;
            var tong =  $(this).parent().siblings("td").eq(3).text();
            teachmag(codeList,tong);
        }
    })
}

//添加教师或更改教师(中转)
function teachmag(codeList,tong) {
    if (tong=="暂未分配"){
        //添加教师
        Addteach(codeList);
    }else {
        //修改教师
        updateteach();
    }
}

var teid=0;
//添加教师弹出层
function Addteach(codeList) {
    var TeachAll = Ajax("/JavaWeb_SIMS_war_exploded/select", {'tableName': "Teacher",  "name": "", "code":"",'currentPage': 0});
    var text = "";
    text += " <div class=\"layui-form\">";
    text +=" <input type=\"text\" id='MoveGradeId' required  lay-verify=\"required\" disabled placeholder=\"教师编号(选中后显示)\" autocomplete=\"off\" class=\"layui-input\">"
    text += "<select name=\"city\"  lay-filter=\"test\">";
    text += "  <option value=\"\">请选择教师</option>";
    text += teasub();
    text += "</select>";
    text += "</div>";
    layer.open({
        title: '添加教师',
        btn: ['确定', '取消'],
        content: text,
        skin: 'demo-class',
        btnAlign: 'c',
        move: false,
        shade: [0.1, '#ffffff'],
        yes: function (index) {
            var data = {};
            var Info = {};
            Info.SubjectId = codeList[0];
            Info.TeacherId = teid;
            var url = "/JavaWeb_SIMS_war_exploded/insert";
            data.tableName = "TeacherClass";
            data.info = JSON.stringify(Info);
            var table = Ajax(url, data);
            TCallback(table);
            Refresh();
            layer.close(index);
        }
    });
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function (data) {
            tid = data.value;
            var num=0;
            for (var i = 0; i < TeachAll.data.list.length; i++) {
                if (TeachAll.data.list[i].id == tid) {
                    num =TeachAll.data.list[i].code;
                    teid=TeachAll.data.list[i].id;
                    $("#MoveGradeId").val(num);
                    break;
                }


            }
        });
    })
}

//修改教师弹出层
function updateteach() {

}

//获取教师
function getteasub(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Teacher', "name": "", "code":"",'currentPage': page});
    return data;
};

//教师下拉框
function teasub() {
    //年级下拉框
        var grade = getteasub(0);
        var svrt = "";
        if (grade.code == 1) {
            var list = grade.data.list;
            for (var i = 0; i < list.length; i++) {
                svrt += " <option value=\"" + list[i].id + "\" >";
                svrt += list[i].name + "</option>";
            }
        }
        return svrt;
}

//回调
function TCallback(Callback) {
    if (Callback.code == 1) {
        Subteacher();
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


/**         查看科任老师信息**/
//预加载
function showteachifo() {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = {"tableName": "SubjectTeacher", "gradeId": 0, "classId": 0,"subjectId":0, "currentPage": 1};
    var dataa = Ajax(url, data);
    if (dataa.code == 1) {
        tabteainfo(dataa.data.list);
        Page2("test1", dataa.data.pageCount, dataa.data.dataCount);
        Refresh();
    }
}
//表格主体
function tabteainfo(data) {
    var text = "";
    text += "<thead><tr>";
    text += "<th>教师编号</th><th>教师姓名</th><th>教师性别</th><th>所教科目</th><th>教师学历</th><th>教师年龄</th>";
    text += "</tr></thead>";
    text += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        text += "<tr name=\'" + data[i].teacherId + "\'>";
        text += "<td>" + data[i].code + "</td>";
        text += "<td>" + data[i].name + "</td>";
        text += "<td>" + data[i].sex + "</td>";
        text += "<td>" + data[i].subjectName+ "</td>";
        text += "<td>" + data[i].education + "</td>";
        text += "<td>" + data[i]. age + "</td>";
        text += "</tr>";
        text += "</tbody>";
        $("#subteatable").html(text);
    }
}

//查看科任教师分页
function Page2(id, limit, count) {
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
                    var name = $("#sous").val();
                    var data = {"tableName": "SubjectTeacher", "gradeId": 0, "classId": 0,"subjectId":0, "currentPage": obj.curr};
                    var table = getPage(data);
                    if (table.code == 1) {
                        tabteainfo(dataa.data.list);
                        Page2("test1", dataa.data.pageCount, dataa.data.dataCount);
                        Refresh();
                    }
                }
            }
        });
    });
}
//内联搜索
function checktab() {

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
    });
}

//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

//刷新
function Refresh() {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}