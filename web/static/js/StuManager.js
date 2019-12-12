/**
 * 学生管理js
 *
 * **/
var ClassList={};
//初始化
function StuMoveClass() {
    this.ClassList=Ajax("/JavaWeb_SIMS_war_exploded/getClass","");
    var data = {"tableName": "Student", "code": "", "name": "","currentPage":1};
    var table=getPage(data);
    if (table.code == 1) {
        StuTable(table.data.list);
        layui.use('form', function () {
            var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
            form.render();
        });
        Page("test1",table.data.pageCount,table.data.dataCount);
        StuFunction();
    }
}

//获取页面
function getPage(data) {
    var url = "/JavaWeb_SIMS_war_exploded/select";
    var table = Ajax(url, data);
    return table;
}

//功能
function StuFunction() {
    $(function () {
        //查询
        $("#Select").click(function () {
            var code=$("#code").val();
            var data = {"tableName": "Student", "code": code, "name": "","currentPage":1};
            var table=getPage(data);
            if (table.code == 1) {
                StuTable(table.data.list);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
                Page("test1",table.data.pageCount,table.data.dataCount);
                StuFunction();
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
    //单个转班
    $("table tbody").find("button[name=moveClass]").click(function() {
        var id=$(this).parent().parent().attr('name');
        Move();
    });
    //批量转班
    $("#moveClassAll").click(function() {
        var codeList=new Array();
        var num=0;
        $("input[name=checkbox]:checked").each(function() {
            codeList[num]=$(this).parent().parent().parent().attr('name');
            num++;
        });
        layer.confirm('', {
            icon: 7,
            title: '提示',
            fixed: false,
        }, function(index) {
            var data={}
            data.tableName='Teacher';
            data.codeList=JSON.stringify(codeList);
            var url = "/JavaWeb_SIMS_war_exploded/delete";
            var Data = Ajax(url, data);
            MoveEnd(Data);
            layer.close(index);
        });
    });
}
//转班操作
function Move() {
    var text = "";
    text += " <div class=\"layui-form\">";
    text += "<select name=\"city\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择一个城市</option>";
    text += "  <option value=\"010\">北京</option>";
    text += "  <option value=\"021\">上海</option>";
    text += "  <option value=\"0571\">杭州</option>";
    text += "</select>  ";
    text += "<select name=\"city\" lay-verify=\"\">";
    text += "  <option value=\"\">请选择一个城市</option>";
    text += "  <option value=\"010\">北京</option>";
    text += "  <option value=\"021\">上海</option>";
    text += "  <option value=\"0571\">杭州</option>";
    text += "</select>    ";
    text += "    </div>";
    layer.open({
        title: '影响范围',
        btn: ['确定', '取消'],
        content: text,
        skin: 'demo-class',
        btnAlign: 'c',
        yes: function (index) {
            layer.close(index);

        }

    })
    layui.use('form', function () {
        var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
        form.render();
    })


}
//班级下拉框
function MoveClass(gradeCode) {
    var text = "";
    if(ClassList.code==1){
        var list=ClassList.data;
        for(var i=0;i<list.length;i++){
            if(list[i].gradeCode==gradeCode){
                for(var j=0;j<list.classes.length;j++){
                    text += " <option value=\""+list[i].classes.id+"\">";
                    text += list[i].classes.className+"</option>";
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
//转班回调
function MoveEnd(Data) {
    if(Data.code==1){
        var code=$("#code").val();
        var name=$("#name").val();
        var data = {"tableName": "Student", "code": code, "name": name,"currentPage":1};
        var table=getPage(data);
        StuTable(table.data.list);
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
        Page("test1",table.data.pageCount,table.data.dataCount);
        StuFunction();
        layer.msg(Data.message, {
            offset: '15px'
            , icon: 1
            , time: 1000
        });
    }else {
        layer.msg(Data.message, {
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
                    var data = {"tableName": "Student", "code": code, "name": name,"currentPage":obj.curr};
                    var table=getPage(data);
                    if (table.code == 1) {
                        StuTable(table.data.list);
                        layui.use('form', function () {
                            var form = layui.form;
                            form.render();
                        });
                        StuFunction();
                    }
                }
            }
        });
    });
}

function StuTable(data) {
    if(data!=null){
        var text = "";
        text += " <colgroup> <col width=\"50\"><col width=\"150\"><col width=\"200\"><col></colgroup>";
        text += "<thead><tr>";
        text += "<th><div class=\"layui-form\" id=\"allChoose\"> <input type=\"checkbox\" name=\"delete\" title=\"\" lay-skin=\"primary\" >";
        text += "</div></th>"
        text += "<th>学号</th><th>名字</th><th>年龄</th><th>性别</th><th>当前年级</th><th>当前班级</th><th>班级教师</th><th>操作</th>";
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
            text += "<td>"+data[i].gradeName+"</td>";
            text += "<td>"+data[i].className+"</td>";
            text += "<td>"+data[i].teacherName+"</td>";
            text += "<td>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-btn-warm\" name=\"moveClass\">修改</button>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-red\" name=\"moveClass\">删除</button>";
            text += "<button type=\"button\" class=\"layui-btn  layui-btn-sm layui-bg-green\" name=\"moveClass\">转班</button>";
            text += "</td>";
            text += "</tr>";
        }
        text += "</tbody>";
        $("#table").html(text);
    }


}