window.onload = function(){
    if(localStorage.jzzh!=null){
        var json2 = localStorage.jzzh;
        var obj = JSON.parse(json2);
        alert(json2.stateId);
    }
}