/**
 * 年级管理js
 * **/
//查看班级初始化
function ShowClass() {
    var grade=getGrade(0);
    var Class=getClass(1,"","");
    if (Class.code == 1) {
        ClassTable(grade.data.list,Class.data.list);
        Refresh();
        Page("test1", Class.data.pageCount, Class.data.dataCount);
        ClassFunction();
    }
}
//获取年级
function getGrade(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Grade', "gradeId": "", 'currentPage': page});
    return data;
}

//获取班级
function getClass(page,code,name) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Class','code':code,'name':name,  "gradeId": "", 'currentPage': page});
    return data;
}

//班级功能模块
function ClassFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code = $("#code").val();
            var name = $("#name").val();
            var Class = getClass(0,code,name);
            var grade=getGrade(0);
            if (Class.code == 1) {
                ClassTable(grade.data.list,Class.data.list);
                Refresh();
                Page("test1", Class.data.pageCount, Class.data.dataCount);
                ClassFunction();
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
            var subid = $(this).parent().attr('name');
            Move(subid);
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
            Delete(codeList);
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
        data.tableName = 'Class';
        data.codeList = JSON.stringify(codeList);
        var url = "/JavaWeb_SIMS_war_exploded/delete";
        var Delete = Ajax(url, data);
        Callback(Delete);
        layer.close(index);
    });

}
//回调功能
function Callback(Callback) {
    if (Callback.code == 1) {
        ShowClass();
        layer.msg(Callback.message, {
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
//分页
function Page(id, limit, count) {
    var index = 0;
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
                    var grade=getGrade(0);
                    var Class=getClass(obj.curr);
                    if (Class.code == 1) {
                        ClassTable(grade.data.list,Class.data.list);
                        Refresh();
                        ClassFunction();
                    }
                }
            }
        });
    });

}

//年级表格
function ClassTable(grade,Class) {
    var data = Class;
    if (data != null) {
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>年级编号</th><th>年级名称</th><th>创建人</th><th>创建时间</th>><th>所属年级编号</th><th>所属年级</th><th style='min-width: 240px'>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < grade.length; j++) {
                if (data[i].gradeId == grade[j].id) {
                    text += "<tr name=\'" + data[i].classCode+ "\'>";
                    text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
                    text += "</div></td>";
                    text += "<td>" + data[i].classCode + "</td>";
                    text += "<td>" + data[i].className + "</td>";
                    text += "<td>" + data[i].createMessage + "</td>";
                    text += "<td>" + data[i].createTime + "</td>";
                    text += "<td>" + grade[j].gradeCode + "</td>";
                    text += "<td>" + grade[j].gradeName+ "</td>";
                    text += "<td  name=\'" + data[i].id + "\'>";
                    text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\" name=\"modify\">修改</button>";
                    text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
                    text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-green\" name=\"moveClass\">分配班级</button>";
                    text += "</td>";
                    text += "</tr>";
                    break;
                }
            }
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