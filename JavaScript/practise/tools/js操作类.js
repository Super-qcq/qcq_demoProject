 // 当元素中没有这个类时就给加上这个类
 function addClass(obj,str){
    if(!hasClass(obj,str)){
        obj.className+=" "+str;
    }
}
 // 判断元素中有没有这个类
function hasClass(obj,str){
    var reg=new RegExp("\\b"+str+"\\b");
    return reg.test(obj.className);
}
// 移除元素中的这个类
function removeClass(obj,str){
    var reg=new RegExp("\\b"+str+"\\b");
    obj.className=obj.className.replace(reg,"");
    obj.className=obj.className.replace(" ","");
}
// 切换 当元素有这个类时删掉这个类，当没有时再加上
function toggleClass(obj,str){
    if(hasClass(obj,str)){
        removeClass(obj,str);
    }else{
        addClass(obj,str);
    }
}
