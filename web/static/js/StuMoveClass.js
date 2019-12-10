//表格
layui.use('table', function(){
    var table = layui.table;

    //方法级渲染
    table.render({
        elem: '#LAY_table_user',
        url: '/demo/table/user/',
        cols: [[
            {checkbox: true, fixed: true},
            {field:'id', title: '学生编号', width:180, sort: true, fixed: true},
            {field:'username', title: '学生姓名', width:160},
            {field:'year', title: '学生年龄', width:160},
            {field:'sex', title: '性别', width:120, sort: true} ,
            {field:'grade', title: '当前年级', width:180},
            {field:'class', title: '当前班级', width:180},
            {fixed: 'right', title:'操作', toolbar: '#barDemo', width:160}
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

