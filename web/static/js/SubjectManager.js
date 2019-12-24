/**
 * 科目管理js
 *
 * **/

/**NO.1科目添加与删除**/
//预加载
function Submanage() {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data={"tableName": "Subject", "code": "", "name": "", "currentPage": 1};
    var data=Ajax(url,data);
    if(data.code==1){
        Tabsub(data.data.list);
        Page("test1", data.data.pageCount, data.data.dataCount);
        Refresh()
    }
    Addsub();
    getsub();
    Showsub();
    Delsub();
}

//获取科目
function getsub(page) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var data = Ajax(url, {'tableName': 'Subject', "gradeId": "", 'currentPage': page});
    return data;
}

//添加科目页面
function Addsub() {
    $(function () {
        $("#Addbut").click(function () {
            var strVar="";
            strVar += "<div class=\"layui-inline\">";
            strVar += "<input class=\"layui-input\" style=\"margin-left: 20px;margin-top: 10px;width: 280px\" " +
                "name=\"id\" id=\"asub\" lay-verify=\"required\" autocomplete=\"off\" placeholder=\"请输入添加科目名称\" >";
            strVar += " <div class=\"layui-form\" style=\"margin-left: 20px;margin-top: 5px;width: 280px\">";
            strVar += "<select name=\"grade\"  lay-filter=\"test\" id=\"batu\">";
            strVar += "  <option value=\"\">请选择年级</option>";
            strVar += gradesub();
            strVar += "</select>";
            strVar += "<\/div>";
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.open({
                    type: 1
                    , closeBtn: 0
                    ,shade: [0.1, '#ffffff']
                    , title: ['添加科目', 'color:#ffffff;background-color:#009688;']
                    , content:strVar
                    ,area:'330px'
                    ,btn: ['提交', '取消']
                    , yes: function (index) {
                        var classname=$("#asub").val();
                        if (classname=="") {
                            layer.msg("请正确输入", {
                                icon: 5
                                , anim: 6
                                , time: 1000
                            });
                        } else {
                            layui.use('form', function() {
                                var form = layui.form;
                                form.render();
                                form.on('select', function (data) {
                                    //alert(data.value);
                                    console.log(data.value);
                                });
                            })
                            var grade=getgradsub(0);
                            var graded=grade.data.list;
                            for(var i=0;j<graded.length;i++){
                                if(graded[i].gradeName==data.value){
                                   return gradeId;
                                }
                            }
                            var data = {};
                            var url = "/JavaWeb_SIMS_war_exploded/insert";
                            data.tableName = "Subject";
                            var info = {};
                            info.SubjectName = classname;
                            info.GradeId=gradeId;
                            data.info = JSON.stringify(info);
                            var table = Ajax(url, data);
                            Callback(table);
                            layer.close(index);
                        }
                    }
                });
            });
            Refresh();
        });
    });
}
//获取年级
function getgradsub(page) {
    var url= "/JavaWeb_SIMS_war_exploded/select";
    var data=Ajax(url,{'tableName':'Grade',"gradeId": "", 'currentPage': page});
    return data;
};

//年级下拉框
function gradesub() {
    var grade = getgradsub(0);
    var strVar = "";
    if (grade.code == 1) {
        var lis = grade.data.list;
        for (var i = 0; i <lis.length; i++) {
            strVar += " <option value=\"" + lis[i].id + "\" >";
            strVar += lis[i].gradeName + "</option>";
        }
    }
    return strVar;
}
//搜索
    function Showsub() {
        $(function () {
            $("#subsea1").click(function () {
                var subse = $("#LAY_sub").val();
                if (subse == "") {

                }
            })
        })
    }

//删除
    function Delsub() {

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
                        var data = {"tableName": "Subject", "code": "", "name": name, "currentPage": obj.curr};
                        var table = getPage(data);
                        if (table.code == 1) {
                            Tabsub(data.data.list);
                            Page("test1", data.data.pageCount, data.data.dataCount);
                            Refresh()
                        }
                    }
                }
            });
        });
    }

//表格主体
    function Tabsub(data) {
        var grade=getgradsub(0);
        var gradeid=grade.data.list;
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>科目编号</th><th>科目名称</th><th>创建人</th><th>创建时间</th><th>科目当前年级</th><th>操作</th>";
        text += "</tr></thead>";
        text += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            text += "<tr name=\'" + data[i].code + "\'>";
            text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
            text += "</div></td>"
            text += "<td>" + data[i].subjectCode + "</td>";
            text += "<td>" + data[i].subjectName + "</td>";
            text += "<td>" + data[i].createMessage + "</td>";
            text += "<td>" + data[i].createTime + "</td>";
            for(var j=0;j<gradeid.length;j++){
                if(gradeid[j].id==data[i].gradeId){
                    text += "<td>" + gradeid[j].gradeName + "</td>";
                }
            }
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
            text += " <button type=\"button\" class=\"layui-btn  layui-btn-sm  layui-btn-warm\">年级管理</button>"
            text += "</td>";
            text += "</tr>";
            text += "</tbody>";
            $("#subtable").html(text);
        }
    }

//刷新
    function Refresh() {
        layui.use('form', function () {
            var form = layui.form;
            form.render();
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