/**
 * 年级管理js
 * **/

//年级初始化
function GradeInfo() {
    gradeFunction();
}

function gradeFunction() {
    var grande =Ajax("/JavaWeb_SIMS_war_exploded/getClass",{'tableName':'Grade'});
    if(grande.code==1){
        var num=parseInt(grande.data.list[grande.data.list.length-1].gradeCode);
        $("#gradeCode").val((num+1));
    }
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('submit(Info)', function(data){
            var data={};
            var Info={};
            Info.GradeCode=$("#gradeCode").val();
            Info.GradeName=$("#gradeName").val();
            Info.CreateMessage=JSON.parse(localStorage.Login).name;
            data.info=JSON.stringify(Info);
            data.tableName="Grade";
            var grande=Ajax("/JavaWeb_SIMS_war_exploded/insert",data);
            if (grande.code == 1) {
                //成功的
                layer.msg(Menu.message, {
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
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });
}
