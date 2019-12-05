function Ajax(url, data) {
    $.ajax({
        url: url,
        type: "post",
        data: data,
        dataType: "json",
        success: function(e) {
            return e;
        },
    });
}