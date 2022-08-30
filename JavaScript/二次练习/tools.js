            /*
                定义一个移动函数，可以自己控制速度，方向，停止目标
                1.obj:定义给那个元素执行动画
                2.speed:执行动画的速度
                3.target:定义动画停止的目标
                4.attr:定义需要改变的样式属性可以是：width,height,top,left(变量需要写在括号里obj.style[attr])
                5.callback:当动画执行完毕时会执行回掉函数中的代码，为了完成其他的操作，比如一个弹窗 或者是其他动画。需要注意的是如果回掉函数不传参可能会报错所以需要判断 callback && callback()
                6.由于多个box公用一个timer，在一个box执行动画时会将另一个box的动画关掉，不能共同执行。是因为避免开启多个定时器功能
                  所以需要将timer设置为自己独有的定时器，给自己的对象加属性obj.timer
                7.将这个变换方式储存为工具方法

             */

                function move(obj,speed,attr,target,callback){
                    //首先判断速度的正负：如果目标值大于原始值则速度为正，反之为负
                    var oldTag = parseInt(getStyle(obj,attr))
                    if(target < oldTag){
                        speed = -speed
                    }
                    clearInterval(obj.timer)//避免开启多个定时器
                    obj.timer = setInterval(function(){
                        var oldValue = parseInt(getStyle(obj,attr))//取出有效原始值
                        newValue = oldValue + speed 
                        //如果向左跑，且新值减到小于目标值 则将新值等于目标值。向右跑，新值加到大于目标值，则新值等于目标值
                        if((speed < 0 && newValue < target) || (speed > 0 && newValue > target) ){
                            newValue = target
                        }
                        obj.style[attr] = newValue+'px'
                        if(newValue === target){
                            clearInterval(obj.timer)
                            callback && callback()
                        }   
    
                    },50)
    
                }
                //由于需要通过此方法来操作任何样式所以需要调用getStyle方法来获取当前所需要的css值
                function getStyle(obj,name){
                    if(window.getComputedStyle){
                        return getComputedStyle(obj,null)[name]
                    }else{
                        return obj.currentStyle[name]
                    }
    
                }



            /* 切换类的方法 */
            // obj是要改变类的元素对象
            // classNames是要改变的类名
            function addClass(obj,classNames){
                if(!hasClass(obj,classNames)){
                    obj.className += ' '+classNames
                }
            }
            //查看是否有此类名
            function hasClass(obj,classNames){
                //用正则表达式判断，由于传进的表达式是变量，所以要用构造函数的形式
                var reg = new RegExp("\\b"+classNames+"\\b")
                return reg.test(obj.className)
            }
            //删除此类名
            function removeClass(obj,classNames){
                var reg = new RegExp("\\b"+classNames+"\\b")
                obj.className = obj.className.replace(reg,"")
            }
            //切换类
            function toggleClass(obj,classNames){
                if(hasClass(obj,classNames)){
                    removeClass(obj,classNames)
                }else{
                    addClass(obj,classNames)
                }
            }