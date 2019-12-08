<!--  页面加载完成就自动生成教师账号-->
function addCode(){
    //获取1970到现在的时间（毫秒显示）
    var mydate= new Date();
   //截取后六位
    var Code = mydate.getTime().toString().slice(5,11);
    //获取教师账号标签
    var TeacherCode = document.getElementById("TeacherCode");
    //添加生成随机账号
    TeacherCode.value="t"+Code;
}
<!--    表单验证-->
layui.use(['form'], function () {
    var form = layui.form;
    //仅输入中文
    var reg = /^[\u4e00-\u9fa5\u3001]+$/;
    //密码必须包含数字和字母，长度6-16！
    var regs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
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
                return '密码不能为空！';
            }
            else {
                if (regs.test(value)) {
                    //    验证通过
                } else {
                    return '密码必须包含数字和字母，长度6-16！';
                }

            }
        }
    });

    // 应该没有用form.on("submit(submit_button)", function (data) {
    //     return false;
    // });
});