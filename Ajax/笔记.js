/**1.AJAX简介：
  AJAX全称Asynchronous JavaScript And XML,就是异步的JS和XML
  通过AJAX可以在浏览器中向服务器发送异步请求，
  最大的优势：无刷新获取数据
  AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式
  2.XML简介：
  XML可扩展标记语言
  XML被设计用来传输和存储数据
  XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
  比如学生数据用XML表示<name>孙悟空</name>
  但是XML已经被JSON取代了用JSON表示为{"name","孙悟空","age":18}
  3.AJAX的特点
    优点：可以无需刷新页面与服务器端进行通信。
          允许你根据用户时间来更新部分页面内容
    缺点：没有浏览历史，不能回退
          存在跨域问题（浏览器同源策略，是浏览器施加的安全限制造成的，简单来说就是当前域名的网站下不能请求非同源的地址（同源指 域名、协议、端口均相同，有一个不同就是跨域））
          SEO不友好（搜索引擎优化）
  4.HTML页面是一个响应体
  5.HTTP(hypertext transport protocol)协议（超文本传输协议），协议详细规定了浏览器和万维网之间的互通规则，约定
    *请求报文*
    行  POST /s?ie=uft-8 HTTP/1.1
    头  Host:atguigu.com
        Cookie:name=guigu
        Content-type:application/x-www-fore-urlencoded
        User-Agent:chrom 83
    空行    
    体  username=admin&password&admin
    *响应报文*
    行  HTTP/1.1  200  OK
    头  Content-Type:text/html;charset=uft-8
        Content-length:2048
        Content-encoding:gzip     
    空行    
    体  <html>
            <head>
            </head>
            <body>
                 <h1>qcq</h1>
            </body>
        </html>
  6.post请求和get请求的异同：
  http://www.imooc.com?a=1&b=2&c=3(问号之后称为参数 &是和的意思.?是解析时的开始点 ，&是连接参数的符号)
  总结：URL结构协议：//域名 or IP地址：端口号/目录/文件名.文件后缀？参数=值
    *传输数据的大小：get的URL会有长度上的限制，则POST上的数据可以非常大
    *安全性：post比GET安全（get数据会显示在url中所有人都是可见的 有ur参数，还会保存在浏览器历史中post则相反）
    *传输数据类型：get请求 只允许ASCII字符，post请求支持多种数据类型
    *对服务器影响：get请求从服务器上获取数据  也就是查找，不能进行修改。而post请求可以更改服务器数据
    get比post的好处：*get比post更快（get有缓存，post不能进行管道化传输，post会先将请求头发送给服务器
                   进行确认然后才真正发送数据，而get会在建立连接后将请求头和请求数据一起发送）
                 追求速度用get，追求安全用post
  7.用浏览器查看请求和响应数据
    Response Headers 响应行头 Response响应体
    Request Headers请求行头   Form Data请求体
  8.状态码：404找不到，403被禁止，401未授权，500内部错误，2开头表示成功
  9. udp（用户数据报协议面向传输层）和tcp的区别：
     *TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
     *TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
     *TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的
     *UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
     *每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
     *TCP首部开销20字节;UDP的首部开销小，只有8个字节
     *TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道
  10.get请求体设置xhr.open('GET','http://localhost:8080/server?a=100&b=200&c=300')//server后可以设置get请求体
     post请求体设置 xhr.send('a=100&b=200&c=300')//post在这里设置请求体
  11.请求头设置 //设置请求头（身份校验信息放在头信息里面）
              //Content-Type设置请求体内容类型
              //application/x-www-form-urlencoded参数查询字符串类型
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
  12.自定义请求头设置  //自定义请求头
            xhr.setRequestHeader('name','qcq')//服务器里需要响应头
            服务器端 //all可以接收任意类型的请求
                      app.all('/server',(request,response) =>{
                    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
                    //设置响应头设置允许跨域
                    response.setHeader('Access-Control-Allow-Origin','*')
                    //设置响应头
                    response.setHeader('Access-Control-Allow-Headers','*')
                    response.send('hello post请求头信息')
                  })
  13.服务器端响应json数据
    服务器端： //响应一个json数据（send方法里只能接受字符串）
                const data = {
                    name:'qcq',
                    age:18
                }
                let str = JSON.stringify(data)
                response.send(str)
    html端：自动转换：       //自动 设置响应体数据的类型
                             xhr.responseType = 'json'
            手动转换：         let data = JSON.parse(xhr,response)
                              console.log(data)
  14.解决IE缓存问题：xhr.open('GET','http://localhost:8080/ie?t='+Date.now())
     IE浏览器由于缓存问题不能获取到最新数据，所以用时间戳的方式来发送两次不同的请求 会出现不同的url  这样会发新的请求而不会走本地缓存
  15.解决网络超时或者异常：  html端 //超时2s设置
                                    xhr.timeout = 2000
                                    xhr.ontimeout = function(){
                                        alert("网络异常，请稍后重试")
                                    }
                                    //网络异常回调
                                    xhr.onerror = function(){
                                        alert('你的网络似乎出了点问题')
                                    }
                            服务器端：
                                   setTimeout(function(){
                                    response.send('hello 延迟响应')
                                   },3000)
  16.取消请求
        服务器端：
                                   setTimeout(function(){
                                    response.send('hello 延迟响应')
                                   },3000)
        HTML端
        let xhr = null
        //绑定事件
        btn[0].onclick = function(){
            //1.创建对象
            xhr = new XMLHttpRequest()
            //2.初始化 设置请求方法和url
            xhr.open('GET','http://localhost:8080/delay')
            //3.发送
            xhr.send()//post在这里设置请求体
        }
        //abort
        btn[1].onclick = function(){
            xhr.abort()
        }
        在控制台看是200显示请求完成 abort ajax的方法需要在里面写一个回调函数，但是要在外部用ajax的对象xhr  所以将xhr放在外部 不能使用const 要用let
  17.解决请求重复发送（节流阀）
      服务器端：
                                   setTimeout(function(){
                                    response.send('hello 延迟响应')
                                   },3000)
      HTML端
     *let xhr = null在外面定义
     *发送ajax数据前 let issending = false
     *创建对象后，修改标识变量的值 issending = true
     *当readyState = 4说明发送完毕 issending = false
     *当点击事件发生时  判断是否正在发送如果正在发送 则取消发送   if(issending) xhr.abort()
  18.jQuery通用方法发送AJAX
      服务器端：app.all('/Jquery-server',(request,response) =>{
                //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
                //设置响应头设置允许跨域
                response.setHeader('Access-Control-Allow-Origin','*')
                const data={
                    name:'hello Jquery'
                }
                response.send(JSON.stringify(data))

            })
      html端：  $('button').eq(0).click(function(){
                  $.get('http://localhost:8080/Jquery-server',{a:100,b:200},function(data){
                      console.log(data)
                      $('.result').html(data.name)
                      
                  },'json')//如果是post只需要将get改成post
              })
  19.jQuery发送AJAX
           HTMl端：
                 $('button').eq(1).click(function(){
                    $.ajax({
                        //url
                        url:'http://localhost:8080/Jquery-server',
                        //参数
                        data:{a:100,b:200},
                        //请求类型
                        type:'GET',
                        //响应体结果的设置
                        dataType:'json',
                        //成功的回调
                        success:function(data){
                            console.log(data)
                        },
                        //超出时间
                        timeout:2000,
                        //超时回调
                        error:function(){
                            console.log('出错啦')
                        },
                        //头信息
                        Headers:{c:300,d:400}
                    })
                })
           服务器端：app.all('/Jquery-server',(request,response) =>{
                    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
                    //设置响应头设置允许跨域
                    response.setHeader('Access-Control-Allow-Origin','*')
                    response.setHeader('Access-Control-Allow-Headers','*')
                    const data={
                        name:'hello Jquery'
                    }
                    setTimeout(function(){
                        response.send(JSON.stringify(data)+'延迟响应')
                    },1000)
                  })
   20.axios通用方法发送AJAX
             get请求：   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                        <script>
                        var btn = document.getElementsByTagName('button')
                        //配置baseURL
                        axios.defaults.baseURL = 'http://localhost:8080'
                        btn[0].onclick=function(){
                            //  //get请求
                            axios.get('/axios-server',{
                                //url参数
                                params:{
                                    id:100,
                                    vip:7

                                },
                                //请求头信息
                                headers:{
                                    name:'qcq',
                                    age:18
                                }
                            }).then(value => {//回调函数
                                console.log(value)
                            })
             post请求：   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                          <script>
                          var btn = document.getElementsByTagName('button')
                          //配置baseURL
                          axios.defaults.baseURL = 'http://localhost:8080'
                          btn[0].onclick=function(){
                              //post请求
                              axios.post('/axios-server',{//第二个参数是请求体
                                      username:'qcq',
                                      password:'qcq'
                                  },{
                                  //url参数
                                  params:{
                                      id:100,
                                      vip:7

                                  },
                                  //请求头信息
                                  headers:{
                                      name:'qcq',
                                      age:18
                                  }
                              }).then(value => {//回调函数
                                  console.log(value)
                              })
                          }
  21.axios发送AJAX   
                            axios({
                                      //请求方法
                                      method:'POST',
                                      //url
                                      url:'/axios-server',
                                      //url参数
                                      params:{
                                          id:100,
                                          vip:100

                                      },
                                      //请求头信息
                                      headers:{
                                          name:'qcq',
                                          age:24
                                      },
                                      //请求体
                                      data:{
                                          username:'qcq',
                                          password:'qcq'
                                      }
                                  }).then(value => {//回调函数
                                      //响应状态码
                                      console.log(value.status)
                                      //响应状态字符串
                                      console.log(value.statusText)
                                      //头信息
                                      console.log(value.headers)
                                      //响应体
                                      console.log(value.data)
                              })
      22.fetch发送AJAX              fetch('http://localhost:8080/fetch-server?vip=10'//url参数
                                      ,{
                                          method:'POST',
                                          //请求头信息
                                          headers:{
                                              name:'qcq'
                                          },
                                          //请求体
                                          body:'username=qcq&password=qcq'
                                      }).then(value => {//回调函数
                                          return value.json()
                                      }).then(value => {//回调函数
                                        console.log(value)
                                      })
                                  }
      23.jsonp解决跨域问题          1)JSONP 是什么JSONP(JSON with Padding)，是一个非官方的跨域解决方案，服务器返回一个函数调用并且把参数传回来，只支持get请求。
                                   2)JSONP怎么工作的?
                                  在网页有一些标签天生具有跨域能力，比如:img,link iframe script。
                                  JSONP就是利用script标签的跨域能力来发送请求的。
                                  3)ISONP的使用
                                     1.动态的创建一个script标签var script= document.createElement("script");
                                     2.设置script的src,设置回掉函数
                                  引入cdn本身就是跨域请求

                                  服务端代码；//1.引入express
                                              const { response } = require('express')
                                              const express = require('express')
                                              const { request } = require('http')
                                              const app = express()
                                              //jsonp服务 返回前端解析的js代码
                                              app.all('/jsonp-server',(request,response) =>{
                                                  const data={
                                                      name:'hello jsonp1'
                                                  }
                                                  //将数据转化为字符串
                                                  let str = JSON.stringify(data)
                                                  //返回结果
                                                  response.end(`handle(${str})`)//end不会加特殊响应头
                                                  // response.send("console.log('jsonp')")
                                              })
                                              app.listen(8080,() =>{
                                                  console.log('服务已经启动，8080，端口监听中')
                                              })


                                  HTML端代码：    <div class="result"></div>
                                                  <button>点击发送请求</button>
                                                  <script>
                                                      //处理数据
                                                      function handle(data){
                                                          //获取result元素
                                                          var result = document.getElementsByClassName('result')[0]
                                                          result.innerHTML = data.name
                                                      }
                                                  </script>
                                                  <script src="http://localhost:8080/jsonp-server"></script>
        24.原生jsonp实践
                              服务端：
                                   //1.引入express
                                    const { response } = require('express')
                                    const express = require('express')
                                    const { request } = require('http')
                                    const app = express()
                                    //jsonp服务 返回前端解析的js代码
                                    app.all('/jsonp-check',(request,response) =>{
                                        const data={
                                          msg:'用户名已经存在'
                                        }
                                        //将数据转化为字符串
                                        let str = JSON.stringify(data)
                                        //返回结果
                                        response.end(`handle(${str})`)//end不会加特殊响应头
                                        // response.send("console.log('jsonp')")
                                    })
                                    app.listen(8080,() =>{
                                        console.log('服务已经启动，8080，端口监听中')
                                    })
                              HTML端：
                                      用户名:<input type="text">
                                      <p></p>
                                        <script>
                                            var input = document.getElementsByTagName('input')[0]
                                            var p = document.getElementsByTagName('p')[0]
                                            //处理数据
                                            function handle(data){
                                                //获取result元素
                                                input.style.border = "solid red 1px"
                                                p.innerHTML = data.msg
                                            }
                                            input.onblur = function(){//获取焦点事件
                                                //获取用户的输入值
                                                var username = this.value
                                                //创建script
                                                var script = document.createElement('script')
                                                script.src = "http://localhost:8080/jsonp-check"
                                                document.body.appendChild(script)
                                            }
                                        </script>
     25.jQuery发送jsonp请求
                                    服务端：
                                         //1.引入express
                                          const { response } = require('express')
                                          const express = require('express')
                                          const { request } = require('http')
                                          const app = express()
                                          //jsonp服务 返回前端解析的js代码
                                          app.all('/jsonp-jQuery',(request,response) =>{
                                              const data={
                                                name:'qcq',
                                                city:['bj','sh','sx']
                                              }
                                              //将数据转化为字符串
                                              let str = JSON.stringify(data)
                                              //接收callback参数
                                              let cb = request.query.callback
                                              //返回结果
                                              response.end(`${cb}(${str})`)//end不会加特殊响应头
                                              // response.send("console.log('jsonp')")
                                          })
                                          app.listen(8080,() =>{
                                              console.log('服务已经启动，8080，端口监听中')
                                          })
                                    HTML端：
                                             <div class='result'></div>
                                            <button>点击发送请求</button>
                                            <script src="./jquery-1.10.1.js"></script>
                                            <script>
                                                $("button").click(function(){
                                                  $.getJSON('http://localhost:8080/jsonp-jQuery?callback=?',function(data){
                                                      $('.result').html(`
                                                      名称:${data.name},
                                                      城市:${data.city}
                                                      `
                                                      )
                                                  })
                                                })
                                            </script>
      26.CORS响应头实现跨域
                            1)CORS是什么?
                            coRS( Cross-Origin Resource Sharing),跨域资源共亨。CORS是官方的跨域解决方案,它的特点是不需要在客户端做任何特殊的操作,完全在服务器中进行处理,支持get和post请求。跨域资源共亨标准新增了一组Hp首部字段,允许服务器声明哪些源站通过浏览器有权限访问哪些资源
                            2)CORS怎么工作的?
                               CORS是通过设置一个应头来告诉浏览器,该请求允许跨域,浏览器收到该响应以后就会对响应放行。
                            3)CoRS的使用主要是服务器端的设置
                        设置：//服务器端设置响应头
                              response.setHeader('Access-Control-Allow-Origin','*')
                              response.setHeader('Access-Control-Allow-Headers','*')
                              response.setHeader('Access-Control-Allow-Method','*')
  **/
  