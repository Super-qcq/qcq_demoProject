/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页

 bug: 快速点击下一页时, 有问题
 */
$(function(){
    var $container = $('#container')
    var $list = $('#list')
    var $pointsDiv = $('#pointsDiv')
    var $next = $('#next')
    var $prev = $('#prev')
    var time = 1000//总的时间
    var itemsTime = 50//每个间隔的时间
    var pageWidth = 600
    var imgCount =  $pointsDiv.children().length//图片的个数
    var index = 0//记录圆点的下标
    var moving = false // bug: 快速点击下一页时, 有问题(标时是否正在翻页 默认没有)
    // 1. 点击向右(左)的图标, 平滑切换到下(上)一页
    $next.click(function(){
        nextPage(true)
    })
    $prev.click(function(){
        nextPage(false)
    })
    // 3. 每隔3s自动滑动到下一页
    var temer=setInterval(function(){
        nextPage(true)
    },3000)
    // 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
    $container.on('mouseenter',function(){
      clearInterval(temer)})
      .on('mouseleave',function(){
          temer=setInterval(function(){
              nextPage(true)
        },3000)
    })
    // 6. 点击圆点图标切换到对应的页
    $pointsDiv.children().click(function(){//获取圆点下标
      var tagetIndex = $(this).index()//获取点击圆点坐标
      if(tagetIndex!=index){//当两次点击下标不相同时才调用函数
        nextPage(tagetIndex)
    }
})
//翻页函数
function nextPage(flage){
        //如果正在翻页则直接结束
        if(moving){
            return
        }
        moving = true//标识正在翻页
        var offset = 0
        if(typeof flage=='boolean'){
            offset = flage ? -pageWidth : pageWidth//总的偏移量(判断600的正负)
        }else{
            offset = -(flage - index)*pageWidth//如果通过点击圆点调用 它的偏移量为 两个圆点坐标之差 * pageWidth
        }
      
        var itemOffset = offset / (time/itemsTime)//计算单元移动的偏移量
        var currentLeft = $list.position().left//得到当前的left值
        var tagetLeft = currentLeft + offset //得到目标值
        var timer = setInterval(function(){
            currentLeft = currentLeft + itemOffset//不断更新当前宽度
            if(currentLeft == tagetLeft){//如果当前的宽度等于目标的宽度说明到达 清除定时器
                clearInterval(timer)
                moving = false//标识翻页结束
                // 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
                if(currentLeft == -(imgCount+1)*pageWidth){//如果是第六章图片时，将图片改成第二张图片
                    currentLeft=-pageWidth
                }else if(currentLeft == 0){
                    currentLeft == -imgCount*pageWidth//如果是第一张章图片时，将图片改成第五张图片

                }
            }
            $list.css('left',currentLeft)//不断的改变left
        },itemsTime)
        //更新原点
        updatePoints(flage)
    }
    //圆点函数
function updatePoints(flage){
        var tagetIndex = 0
        if(typeof flage=='boolean'){
            if(flage){//如果是下一页 圆点索引+1
                tagetIndex = index + 1
                if(tagetIndex == imgCount){//当索引为5时说明是第一张图片 让其等于0
                    tagetIndex = 0
                }
    
            }else{//如果是上一页 圆点索引-1
                tagetIndex = index - 1
                if(tagetIndex == -1){//当索引为-1时说明是最后一张图片 让其等于4
                    tagetIndex = imgCount-1
                }
    
            }
        }else{//如果通过点击圆点调用 它的目标下标就是flage
            tagetIndex = flage
        }
        $pointsDiv.children().eq(index).removeClass('on')//去除和加上使圆点变色的类名
        $pointsDiv.children().eq(tagetIndex).addClass('on')
        index = tagetIndex//不断更新当前索引
    }
})