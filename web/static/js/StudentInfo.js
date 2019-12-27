//重置按钮会重启自动生成账号方法
$(function () {
    $("#Reset").click(function () {
        $("#tName").val("");
        $("#tAge").val("");
        $("#tGoodAt").val("");
        $("#tPone").val("");
        $("#tQQ").val("");
        $("#tEmail").val("");
        $("#tAddress").val("");
        $("#tPwd").val("123456");
        $("#tGrade option").eq(0).prop("selected",true);
        $("#tClass option").eq(0).prop("selected",true);
        Refresh();
    })
});
//自动生成账号
<!--  页面加载完成就自动生成学生账号-->
function addCode(){
    //获取1970到现在的时间（毫秒显示）
    var mydate= new Date();
    //截取后六位
    var Code = mydate.getTime().toString().slice(1,10);
    var scode= mydate.getFullYear();
    //获取教师账号标签
    var TeacherCode = document.getElementById("tCode");
    //添加生成随机账号
    TeacherCode.value="S"+scode+Code;
}

//表单验证
layui.use(['form'], function () {
    var form = layui.form;
    //     //仅输入中文
    var reg = /^[\u4e00-\u9fa5\u3001]+$/;
    //密码必须包含数字和字母，长度6-16！
    var regs = /^[0-9a-zA-Z]{6,16}$/;
    //QQ账号
    var regQQ = /^[1-9][0-9]{5,16}$/;
    //年龄
    var regage= /^[1-9][0-9]*$/;
    //要放在form.on外面，千万不能放在提交步骤中，否则会不触发
    form.verify({
        title: function (value) {
            if (reg.test(value)) {
                //    验证通过
            } else {
                return '请输入姓名(仅中文汉字)！';
            }
        },
        pwd: function (value) {
            if (value == "") {
                return '必填项不能为空！';
            }
            else {
                if (regs.test(value)) {
                    //    验证通过
                } else {
                    return '密码必须包含数字和字母，长度6-16！';
                }

            }
        },
        age: function (value) {
            if (regage.test(value)) {
                //    验证通过
            } else {
                return '请输入正确的年龄';
            }
        },
        QQ: function (value) {
            if (regQQ.test(value)) {
                //    验证通过
            } else {
                return '请输入正确的QQ号';
            }
        }

    });

    form.on('submit(component-form-element)', function(data){
        UpStudent();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.on('submit(modify)', function(data){
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
        var url = "/JavaWeb_SIMS_war_exploded/update";
        var Menu = Ajax(url, data);
        if (Menu.code == 1) {
            //成功的
            parent.layer.msg(Menu.message, {
                icon: 1
                , time: 1000
            });
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
            parent.$("#Select").click();
        } else {
            parent.layer.msg(Menu.message, {
                icon: 5
                , anim: 6
                , time: 1000
            });

        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    function Serch(id) {
        return $("#" + id).val();
    }
    // 应该没有用form.on("submit(submit_button)", function (data) {
    //     return false;
    // });
});