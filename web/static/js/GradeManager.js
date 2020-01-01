/**
 * 年级管理js
 * **/
/**
 * @description 年级管理初始化
 *
 */
function GradeInfo() {
    var grande = getGrade(1);
    if (grande.code == 1) {
        GradeTable(grande);
        Refresh();
        Page("test1", grande.data.grande, grande.data.dataCount);
    }
    gradeFunction();
}

/**
 * @description 获取年级信息
 * @param  page 页数
 * @return data  访问到的数据
 */
function getGrade(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Grade', "gradeId": "", 'currentPage': page});
    return data;
}

/**
 * @description 获取班级信息
 * @param  page 页数
 * @return data  访问到的数据
 */
function getClass(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Class','code':"",'name':"", "gradeId": "", 'currentPage': page});
    return data;
}

/**
 * @description 年级添加操作
 *
 */
function gradeFunction() {
    //添加
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('submit(Info)', function (data) {
            var data = {};
            var Info = {};
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

/**
 * @description 选项卡切换
 * @param  index 选项卡的value
 * @param  page 页数
 */
function Change(index, page) {
    if (index == 0) {
        $("#test2").html("");
        GradeInfo();
    }
    if (index == 1) {
        var grande = getGrade(0);
        var Class = getClass(page);
        if (grande.code == 1) {
            GradeClass(grande.data.list, Class.data.list);
            Refresh();
            $("#test1").html("");
            ClassPage(Class.data.dataCount);
        }
        gradeFunction();
    }
}
/**
 * @description 班级分页功能
 * @param count  数据总条数
 *
 */
function ClassPage(count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'test2'
            , count: count
            , limit: 10
            , layout: ['prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                //首次不执行
                if (!first) {
                        var grande = getGrade(0);
                        var Class = getClass(obj.curr);
                        if (grande.code == 1) {
                            GradeClass(grande.data.list, Class.data.list);
                            Refresh();
                            gradeFunction();
                        }

                }
            }
        });
    });
}
/**
 * @description 访问后台的回调
 * @param  Callback 后台返回的数据
 *
 */
function Callback(Callback) {
    if (Callback.code == 1) {
        var grande = getGrade(0);
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
/**
 * @description layui分页功能
 * @param  id 绑定id
 * @param limit  页数
 * @param count  数据总条数
 *
 */
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
                        var grande = getGrade(obj.curr);
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
            Change(index, 1);
        });
    });
}

/**
 * @description 年级班级关系表
 * @param  grade 年级信息
 * @param Class  班级信息
 *
 */
function GradeClass(grade, Class) {
    var data = Class;
    if (data != null) {
        var text = "";
        text += "<thead><tr>";
        text += "<th>年级编号</th><th>年级名称</th><th>班级编号</th><th>班级名称</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < grade.length; j++) {
                if (data[i].gradeId == grade[j].id) {
                    text += "<tr name=\'" + data[i].id + "\'>";
                    text += "<td>" + grade[j].gradeCode + "</td>";
                    text += "<td>" + grade[j].gradeName + "</td>";
                    text += "<td>" + data[i].classCode + "</td>";
                    text += "<td>" + data[i].className + "</td>";
                    text += "</tr>";
                    break;
                }
            }
        }
        text += "</tbody>";
        $("#table").html(text);
    }
}

/**
 * @description 年级信息表
 * @param  data 年级信息
 */
function GradeTable(data) {
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