//点击查看和修改后表单状态
$(function () {
    $("#Revise").click(function () {
        layui.$('input').attr('value',"");
        layui.$('input[id=tCode]').attr('disabled',true);
        layui.$('select').attr('value',"");
        layui.$('textarea').attr('value',"");
        layui.form.render()
    })
});
<!--    表单验证-->
layui.use(['form'], function () {
    var form = layui.form;
    //     //仅输入中文
    var reg = /^[\u4e00-\u9fa5\u3001]+$/;
    //密码必须包含数字和字母，长度6-16！
    var regs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    //QQ账号
    var regQQ = /^[1-9][0-9]{6,16}$/;
    //年龄
    var regage= /^[1-9][0-9]{1,3}$/;
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
                return '密码不能为空！';
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
        UpTeacher();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    // 应该没有用form.on("submit(submit_button)", function (data) {
    //     return false;
    // });
});