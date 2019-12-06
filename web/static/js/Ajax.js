

function Ajax(url, data) {
    var num={};
    $.ajax({
        url:url,
        data:data,
        type: "post",
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success: function(e) {
                num=e;
        },
    });
    return num;
}
