/**
 *
 * 教师管理js
 * **/

var ClassList={};
//添加教师
function TeacherInfo() {
    $(function() {
        $("#test1").click(function() {
            $("input[type='file']").val("");
            $("#btn_file").click();
        });
        $("#btn_file").change(function() {
            uploadExcel('Teacher');
        });

    });



        $(function () {
            $("#test2").click(function() {
                document.getElementById("Download").click();
            });
            $("#Download").click(function (e) {
                layer.msg("请注意查看必读文档", {
                    icon: 6
                    ,time: 2000
                    , offset: [
                        $(window).height() / 4+"px"
                        ,$(window).width() / 3+"px"
                    ]
                }, function(index) {
                    var herf=$("#Download").attr('herf');
                    location.href =herf;
                });
            });
        });

}
//上传数据
function UpTeacher() {
            var data={};
            var Info={};
            data.tableName="Teacher";
            Info.code=Serch("tCode");
            Info.name=Serch("tName");
            Info.sex=$("input[type='radio']:checked").val();
            Info.age=Serch("tAge");
            Info.education=  $("#tClass option:selected").text();
            Info.goodAt=Serch("tGoodAt");
            Info.phone=Serch("tPone");
            Info.QQ=Serch("tQQ");
            Info.email=Serch("tEmail");
            Info.address=Serch("tAddress");
            Info.introduction=Serch("tIntorduction");
            Info.pwd=Serch("tPwd");
            data.info=JSON.stringify(Info);
            var url = "/JavaWeb_SIMS_war_exploded/insert";
            var Menu = Ajax(url, data);
            if (Menu.code==1) {
                //成功的
                layer.msg(Menu.message, {
                     icon: 1
                    , time: 1000
                });
            }else{
                layer.msg(Menu.message, {
                    icon: 5
                    ,anim: 6
                    , time: 1000
                });

            }

}
//查看数据
function Serch(id) {
    return $("#"+id).val();
}

//查看教师列表
function ShowTeachers() {
    this.ClassList=Ajax("/JavaWeb_SIMS_war_exploded/getClass","");
    var data = {"tableName": "Teacher", "code": "", "name": "","currentPage":1};
    var table=getPage(data);
    if (table.code == 1) {
        TeachresTable(table.data.list);
        layui.use('form', function () {
            var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
            form.render();
        });
        Page("test1",table.data.pageCount,table.data.dataCount);
        TeacherFunction();
    }
}
//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}
function TeacherFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code=$("#code").val();
            var name=$("#name").val();
            var data = {"tableName": "Teacher", "code": code, "name": name,"currentPage":1};
            var table=getPage(data);
            if (table.code == 1) {
                TeachresTable(table.data.list);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
                Page("test1",table.data.pageCount,table.data.dataCount);
                TeacherFunction();
            }
        });

        //全选
        $("#allChoose").click(function () {
            if($("#allChoose>input").is(':checked')){
                $("input[name=checkbox]").prop("checked",true);
            }else{
                $("input[name=checkbox]").prop("checked",false);
            }
            layui.use('form', function () {
                var form = layui.form;
                form.render();
            });
        });
    });
    //单个操作
    $("table tbody").find("button[name]").click(function() {
        var id=$(this).parent().parent().attr('name');
        if($(this).attr("name")=="delete"){
            var codeList=new Array();
            codeList[0]=id;
            Delete(codeList);
        }
        if($(this).attr("name")=="moveClass"){
            var subid=$(this).parent().attr('name');
            Move(subid);
        }
        if($(this).attr("name")=="modify"){

            ShowModify(id);
        }

    });
    //批量操作
    $("#moveClassAll").click(function() {
        var codeList=new Array();
        var num=0;
        $("input[name=checkbox]:checked").each(function() {
            codeList[num]=$(this).parent().parent().parent().attr('name');
            num++;
        });
        if($(this).attr("name")=="delete"){
            Delete(codeList);
        }
        if($(this).attr("name")=="moveClass"){
            Move(codeList);
        }
    });
}
function Modify() {
    if(localStorage.ModifyId!=null){
        var json2 = localStorage.ModifyId;
        var obj = JSON.parse(json2);
    }
    var data = {"tableName": "Teacher", "code": obj.teacherId, "name": "","currentPage":1};
    var table=getPage(data);
    var list=table.data.list[0];
    $("#tCode").val(list.code);
    $("#tName").val(list.name);
    var sex=list.sex;
    if(sex=="女")
    {
        $("input[type='radio']").eq(0).attr("checked", false);
        $("input[type='radio']").eq(1).attr("checked", true);
    }
    $("#tAge").val(list.age);
    $("#tGoodAt").val(list.goodAt);
    $("#tPone").val(list.phone);
    $("#tQQ").val(list.qQ);
    $("#tEmail").val(list.email);
    $("#tAddress").val(list.address);
    $("#tIntorduction").val(list.introduction);
    $("#tPwd").val(list.pwd);
    $("#tEducation option:contains("+list.education+")").prop("selected",true);
    Refresh();
}


//显示修改信息页面
function ShowModify(id) {
    var json1 = {};
    json1.teacherId=id;
    var str1 = JSON.stringify(json1);
    localStorage.ModifyId= str1;
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.open({
            type: 2
            ,closeBtn: 2
            ,title:['查看信息','color:#ffffff;background-color:#009688;']
            ,content:'/JavaWeb_SIMS_war_exploded/static/html/UpdateInfo.html'
            ,area:['650px','500px']
        });
    });
}
//删除
function Delete(codeList) {
    layer.confirm('确认删除', {
        icon: 7,
        title: '提示',
        fixed: false,
    }, function(index) {
        var data={}
        data.tableName='Student';
        data.codeList=JSON.stringify(codeList);
        var url = "/JavaWeb_SIMS_war_exploded/delete";
        var Delete = Ajax(url, data);
        DeleteEnd(Delete);
        layer.close(index);
    });

}
//转班操作
function Move(codeList) {
    var classId=0;
    var SubjectsId=0;
    var gradeCode=0;
    var text = "";
    text += " <div class=\"layui-form\">";
    text += "<select name=\"city\"  lay-filter=\"test\">";
    text += "  <option value=\"\">请选择年级</option>";
    text += grade();
    text += "</select>";
    text += "<select name=\"quiz\" id=\"Class\"  lay-filter=\"quiz\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择班级</option>";
    text += "</select> ";
    text += "</select>";
    text += "<select name=\"subjects\" id=\"Subjects\"  lay-filter=\"Subjects\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择科目</option>";
    text += "</select> ";
    text += "    </div>";
    layer.open({
        title: '分配班级',
        btn: ['确定', '取消'],
        content: text,
        skin: 'demo-class',
        btnAlign: 'c',
        shade: [0.1, '#ffffff'],
        yes: function (index) {
            var data={};
            var url = "/JavaWeb_SIMS_war_exploded/insert";
            data.tableName="TeacherClass";
            var info={};
            info.id=codeList;
            info.ClassId=classId;
            info.SubId=SubjectsId;
            data.info=JSON.stringify(info);
            var table = Ajax(url, data);
            DeleteEnd(table);
            layer.close(index);
        }

    })
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        form.on('select(test)', function(data){
            gradeCode=data.value;
            var text=MoveClass(gradeCode);
            $("#Class").html(text);
            Refresh();
        });
        form.on('select(quiz)', function(data){
            classId=data.value;
            var text=Subjects(gradeCode);
            $("#Subjects").html(text);
            Refresh();
        });
        form.on('select(Subjects)', function(data){
            SubjectsId=data.value;
        });
    })


}
//科目下拉框
function Subjects(gradeCode) {
    var text = "";
    text += "  <option value=\"\">请选择科目</option>";
    if(ClassList.code==1){
        var list=ClassList.data;
        for(var i=0;i<list.length;i++){
            if(list[i].gradeCode==gradeCode){
                if(list[i].subjects!=undefined){
                    for(var j=0;j<list[i].subjects.length;j++){
                        text += " <option value=\""+list[i].subjects[j].id+"\">";
                        text += list[i].subjects[j].subjectName+"</option>";
                    }
                }

            }
        }
    }
    return text;
}
//班级下拉框
function MoveClass(gradeCode) {
    var text = "";
    text += "  <option value=\"\">请选择班级</option>";
    if(ClassList.code==1){
        var list=ClassList.data;
        for(var i=0;i<list.length;i++){
            if(list[i].gradeCode==gradeCode){
                for(var j=0;j<list[i].classes.length;j++){
                    text += " <option value=\""+list[i].classes[j].id+"\">";
                    text += list[i].classes[j].className+"</option>";
                }

            }
        }
    }
    return text;
}
//年级下拉框
function grade() {
    var text = "";
    if(ClassList.code==1){
        var list=ClassList.data;
        for(var i=0;i<list.length;i++){
            text += " <option value=\""+list[i].gradeCode+"\" >";
            text += list[i].gradeName+"</option>";
        }
        $("#layui-layer1 [name=quiz1]").html(text);
    }
    return text;
}

//删除回调
function DeleteEnd(Delete) {
    if(Delete.code==1){
        var code=$("#code").val();
        var name=$("#name").val();
        var data = {"tableName": "Teacher", "code": code, "name": name,"currentPage":1};
        var table=getPage(data);
        TeachresTable(table.data.list);
        Refresh();
        Page("test1",table.data.pageCount,table.data.dataCount);
        TeacherFunction();
        layer.msg(Delete.message, {
            offset: '15px'
            , icon: 1
            , time: 1000
        });
    }else {
        layer.msg(Delete.message, {
            icon: 5
            ,anim: 6
            , time: 1000
        });

    }

}

//分页
function Page(id,limit,count) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count:count //数据总数，从服务端得到
            , limit:10
            ,layout:['prev', 'page', 'next','skip']
            ,jump: function(obj, first){
            //首次不执行
            if(!first){
                var code=$("#code").val();
                var name=$("#name").val();
                var data = {"tableName": "Teacher", "code": code, "name": name,"currentPage":obj.curr};
                var table=getPage(data);
                if (table.code == 1) {
                    TeachresTable(table.data.list);
                    Refresh();
                    TeacherFunction();
                }
            }
        }
        });
    });
}
function TeachresTable(data) {
   if(data!=null){
       var text = "";
       text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
       text += "<thead><tr>";
       text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input  type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
       text += "</div></th>"
       text += "<th>账号</th><th>名字</th><th>年龄</th><th>性别</th><th>E-mail</th><th>联系电话</th><th style='min-width: 240px'>操作</th>";
       text += "</tr></thead>";
       text += "<tbody>";
       for(var i=0;i<data.length;i++){
           text += "<tr name=\'"+data[i].code+"\'>";
           text += "<td><div class=\"layui-form\"> <input type=\"checkbox\" name=\"checkbox\" title=\"\" lay-skin=\"primary\" >";
           text += "</div></td>"
           text += "<td>"+data[i].code+"</td>";
           text += "<td>"+data[i].name+"</td>";
           text += "<td>"+data[i].age+"</td>";
           text += "<td>"+data[i].sex+"</td>";
           text += "<td>"+data[i].email+"</td>";
           text += "<td>"+data[i].phone+"</td>";
           text += "<td  name=\'"+data[i].id+"\'>";
           text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\" name=\"modify\">修改</button>";
           text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-danger\" name=\"delete\">删除</button>";
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