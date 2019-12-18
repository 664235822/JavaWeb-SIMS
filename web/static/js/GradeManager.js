/**
 * 年级管理js
 * **/

//年级初始化
function GradeInfo() {
    var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade'});
    if (grande.code == 1) {
        GradeTable(grande);
        Refresh();
        Page("test1", grande.data.grande, grande.data.dataCount);
        gradeFunction();
    }
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
    $(function () {
        //单个操作
        $("table tbody").find("button[name]").click(function () {
            var id = $(this).parent().parent().attr('name');
            if ($(this).attr("name") == "moveClass") {
                var subid = $(this).parent().attr('name');
                ShowGrabe(subid);
            }
        });
    });
}

//年级添加班级页面初始化
function Modify() {
    if (localStorage.ModifyId != null) {
        var json2 = localStorage.ModifyId;
        var obj = JSON.parse(json2);
    }
    var grade=Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade',"gradeId":1});
    var Class=Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Class'});
    ClassTable(grade,Class);
    Refresh();
}

//显示为年级添加班级页面
function ShowGrabe(id) {
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
            , content: '/JavaWeb_SIMS_war_exploded/static/html/ForGradeAddClass.html'
            , area: ['650px', '500px']
        });
    });
}


//回调功能
function Callback(Callback) {
    if (Callback.code == 1) {
        var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade'});
        GradeTable(grande);
        Refresh();
        Page("test1", grande.data.grande, grande.data.dataCount);
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
                    var grande = Ajax("/JavaWeb_SIMS_war_exploded/getClass", {'tableName': 'Grade'});
                    if (table.code == 1) {
                        GradeTable(grande);
                        Refresh();
                        gradeFunction();
                    }
                }
            }
        });
    });
}
//年级添加班级
function ClassTable(garade,Class) {
    var data=Class.data.list;
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级编号</th><th>年级名称</th><th>创建人</th><th>创建时间</th><th>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].id + "\'>";
            text += "<td>" + data[i].gradeCode + "</td>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].createMessage + "</td>";
            text += "<td>" + data[i].createTime + "</td>";
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-green\" name=\"moveClass\">分配班级</button>";
            text += "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }


}
function GradeTable(data) {
    var num = parseInt(data.data.list[data.data.list.length - 1].gradeCode);
    $("#gradeCode").val((num + 1));
    data = data.data.list;
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级编号</th><th>年级名称</th><th>创建人</th><th>创建时间</th><th>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].id + "\'>";
            text += "<td>" + data[i].gradeCode + "</td>";
            text += "<td>" + data[i].gradeName + "</td>";
            text += "<td>" + data[i].createMessage + "</td>";
            text += "<td>" + data[i].createTime + "</td>";
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-green\" name=\"moveClass\">分配班级</button>";
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