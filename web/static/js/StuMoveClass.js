//表格
layui.use('table', function(){
    var table = layui.table;

    //方法级渲染
    table.render({
        elem: '#LAY_table_user',
        url: '/demo/table/user/',
        cols: [[
            //以下命名不准确，以实际数据库为准
            {checkbox: true, fixed: true},
            {field:'id', title: '学生编号',  sort: true, fixed: true},
            {field:'username', title: '学生姓名', align: 'center'},
            {field:'year', title: '学生年龄',align: 'center'},
            {field:'sex', title: '性别',   sort: true} ,
            {field:'grade', title: '当前年级'},
            {field:'class', title: '当前班级'},
            {field:'teacher', title: '班级教师',align: 'center'},
            {fixed: 'right', title:'操作', toolbar: '#barDemo', align: 'center'}
        ]],
        id: 'testReload',
        page: true,
        height: 310
    });

    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');

            //执行重载
            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,
                where: {
                    key: {
                        id: demoReload.val()
                    }
                }
            }, 'data');
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});

