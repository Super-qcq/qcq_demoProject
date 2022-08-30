
    //定义一个函数 将动态效果封装起来
    /*obj:要进行移动的对象
      speed:移动的速度
     target:需要到达的目标地点 
     attr:需要变换的样式
     callback:回调函数 在函数的最后执行（可传参数也可以不传参数）
     */
     function move(obj,speed,target,attr,callback){
        // 获取元素最开始的位置并判断往左移动还是往右移动（一定要在计时器之前最开始获取）
        var current=parseInt(getStyle(obj,attr));
        if(current>target){
            speed=-speed;
        }
        // 防止不断点击开启更多的计时器（用于取消上一个计时器）
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            // 获取元素一开始的位置
            var oldValue=parseInt(getStyle(obj,attr));
            var newValue=oldValue+speed;
            // 如果速度方向是负的 并且当最终新值小于目标值时 让这个新值等于目标值  （反之亦然）
            if(speed<0 && newValue<target||speed>0 && newValue>target){
                newValue=target;
            }
            // 改变元素样式等于新值
            obj.style[attr]=newValue+"px";
            // 当新值等于目标值时关闭定时器
            if(newValue==target){
                clearInterval(obj.timer);
                // 函数最后执行回掉函数，有则执行，没有则不执行
                callback&&callback();
            }
           
        },30);
      

    }
    // 读取样式
    function getStyle(obj,name){
        if(window.getComputedStyle){
            return getComputedStyle(obj,null)[name];
        }else{
            return obj.currentStyle[name];
        }

    }