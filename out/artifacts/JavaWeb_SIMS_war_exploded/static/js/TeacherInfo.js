<!--  页面加载完成就自动生成教师账号-->
function addCode(){
    //获取标签
    var TeacherCode = document.getElementById("TeacherCode");
    //添加随机账号
    TeacherCode.value="t123456";
}
<!--    表单验证-->
layui.use(['form'], function () {
    var form = layui.form;
    //仅输入中文
    var reg = /^[\u4e00-\u9fa5\u3001]+$/;
    //密码包含 数字,英文,字符中的两种以上，长度6-20
    var regs = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    //要放在form.on外面，千万不能放在提交步骤中，否则会不触发
    form.verify({
        title: function (value) {
            if (reg.test(value)) {
                //    验证通过
            } else {
                return '请输入姓名(仅中文汉字)！';
            }
        }
    });
    form.verify({
        pwd: function (value) {
            if (value == "") {
                return '密码不能为空';
            }
            else {
                if (regs.test(value)) {
                    //    验证通过
                } else {
                    return '密码包含:数字,英文,字符中的两种以上，长度6-20！';
                }

            }
        }
    });

    // 应该没有用form.on("submit(submit_button)", function (data) {
    //     return false;
    // });
});