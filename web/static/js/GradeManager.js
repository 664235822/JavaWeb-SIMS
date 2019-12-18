/**
 * 年级管理js
 * **/

//年级初始化
function GradeInfo() {
    var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade', "gradeId": ""});
    if (grande.code == 1) {
        GradeTable(grande);
        Refresh();
        Page("test1", grande.data.grande, grande.data.dataCount);
    }
    gradeFunction();
}

//年级功能模块
function gradeFunction() {
    //添加
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('submit(Info)', function (data) {
            var data = {};
            var Info = {};
            Info.GradeCode = $("#gradeCode").val();
            Info.GradeName = $("#gradeName").val();
            Info.CreateMessage = JSON.parse(localStorage.Login).name;
            data.info = JSON.stringify(Info);
            data.tableName = "Grade";
            var grande = Ajax("/JavaWeb_SIMS_war_exploded/insert", data);
            Callback(grande);
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });

}

//选项卡切换
function Change(index) {
    if (index == 0) {
        GradeInfo();
    }
    if (index == 1) {
        var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'GradeAll'});
        if (grande.code == 1) {
            GradeClass(grande);
            Refresh();
            Page("", grande.data.grande, grande.data.dataCount);
        }
        gradeFunction();
    }
}


//回调功能
function Callback(Callback) {
    if (Callback.code == 1) {
        var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade', "gradeId": ""});
        GradeTable(grande);
        Refresh();
        Page("test1", "", );
        gradeFunction();
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
                    if (index == 0) {
                        var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade', "gradeId": ""});
                        if (grande.code == 1) {
                            GradeTable(grande);
                            Refresh();
                            gradeFunction();
                        }
                    }
                }
            }
        });
    });
    //监听选项卡
    layui.use('element', function () {
        var element = layui.element;
        element.render();
        element.on('tab(docDemoTabBrief)', function (data) {
            index = data.index;
            Change(index);
        });
    });
}

//年级班级表格
function GradeClass(data) {
    data = data.data;
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级编号</th><th>年级名称</th><th>班级编号</th><th>班级名称</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].classes.length; j++) {
                text += "<tr name=\'" + data[i].id + "\'>";
                text += "<td>" + data[i].gradeCode + "</td>";
                text += "<td>" + data[i].gradeName + "</td>";
                text += "<td>" + data[i].classes[j].classCode + "</td>";
                text += "<td>" + data[i].classes[j].className + "</td>";
                text += "</tr>";
            }
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

//年级表格
function GradeTable(data) {
    var num = parseInt(data.data.list[data.data.list.length - 1].gradeCode);
    $("#gradeCode").val((num + 1));
    data = data.data.list;
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级编号</th><th>年级名称</th><th>创建人</th><th>创建时间</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].id + "\'>";
            text += "<td>" + data[i].gradeCode + "</td>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].createMessage + "</td>";
            text += "<td>" + data[i].createTime + "</td>";
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