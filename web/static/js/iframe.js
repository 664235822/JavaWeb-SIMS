/**
 * @description 判断浏览器是否支持localStorage，页面是否在首页面
 *
 */
$(function(){
    if(localStorage.Login==null || window==window.top){
        location.href = "/JavaWeb_SIMS_war_exploded/static/html/login.html";
    }
})
