

1. 封装NavLink组件：
NavLink可以实现路由链接的高亮,list-group-item他两是标签本身统一的类名   activeStyle是高亮类名，当点击哪个时 activeStyle就会给谁加到身上 加到统一类名的后面
 <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/about">About</NavLink>

 <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/home">Home</NavLink>

 V5:
<NavLink activeClassName="activeStyle" className=""list-group-item"" to="/about">About</NavLink>


单独写一个MyNavLink组件 暴露出去，这个组件里面还要用NavLink标签    
在NavLink中传一个to="/About" 和一个title
在MyNavlink封装中要接受一个this.props.to  和一个this.props.title表示往哪里跳转和导航栏的名字

可以将原来NavLink中传的所有的参数 在MyNavLink组件中用{...this.props}展开
但是要将MyNavLink不写成自结束的标签 要写成普通的标签形式  ，有一个特点是 标签体内容也可以通过props传过去是一个特殊的标签体属性 比如在<MyNavLink>about</MyNavLink>
标签体也是一个特殊的标签属性：标签体就是<div>about</div>中的about,可以这样写：
<div children="about"/>  。<MyNavLink>about</MyNavLink>这样写的时候 在MyNavLink组件中的props中可以收到 一个属性名为children且属性值为about的内容，所以可以将所引用的NavLink写成自结束的形式 里面的标签体内容可以用{...this,props}直接展开，标签体内容 自动赋值给key为children value为所附的值。
about也会在NavLink中通过props中接收到会放在一个自动创建的key为children上   所以可以将NavLink写成自结束标签 所有的属性通过 {...this.props}收到
通过this.props.children可以获取 到标签体内容



2. Switch组件：当一个路径对应多个组件时   会发生系统按照所注册的路由路径一直匹配 会把同一路径下的不同组件都匹配上并且展示出来，
                     用switch之后只会在一个路径里匹配一次
                    导入Switch组件 from 'react-router-dom'
                   将所有注册的路由用Switch组件包起来  注册路由数量在一个以上再包
                   但是v6版本已经解决了这个问题，所以不再写Switch标签
    （V5版本）
                   <Switch>
                     <Route path="/about" component={About}/>
									  <Route path="/home" component={Home}/>
                  </Switch>
               

3. 解决样式丢失问题：public文件是localhost:3000内置服务器dev-server下的根路径  请求啥就给啥  如果我们所访问的地址（localhost:3000/qcq/home）根本就不存在那就默认访问public中index.html，index.html是默认兜底的

                             问题：当路由是多级结构时 一点刷新样式可能会丢失   是因为会认为多级结构中的目录名都是 这个主机名下的地址 但是如果你所给的路径不存在的话 ，他会在你给出的主机名路径下去寻找，找不到这个路径从而展示index页面兜底

解决：办法1.在index.html中去掉引用css路径的点  href="/css/bootstrap.css"意思就是不在当前路径下去寻找，不写的话就是直接去localhost:3000下去请求     办法2.在/css的/前面加%PUBLIC_URL%最终为 %PUBLIC_URL%/css/bootstrap.css  由于用这个的话css的路径是绝对路径 所以请求css路径时不会有问题  
         办法3在入口index.js中用HashRouter包裹 路径后面会出现#  #后面的东西不会再看   所以请求是成功的




4. 模糊匹配 注册路由和实现路由 的路径默认是模糊匹配的（输入的路径必须包含匹配的路径，且顺序一致） 要实现精准匹配  则 在注册路由中加一个属性 exact={true}
如果页面东西正常不要开启严格匹配，，如果出现诡异状况 好多东西都往一个地方跳  则是模糊匹配引发的问题 ，开启严格匹配。v5版本用exact开启精准匹配，默认模糊匹配 ，v6有了Routes后，默认开启精准匹配，但是加"/*"可以开启模糊匹配




5. Redirect:重定向
当页面打开导航栏默认勾选一个借助 react-dom内置组件Redirect，将Redirect组件放在注册路由的最下面 指定一个路径
如果Redirect上面的路由匹配不上  就走Redirect指定的to="about" 自结束标签  也就是一打开的默认勾选的组件，
但是v6的写法为：
导入Navigate， <Route path="*" element={<Navigate to="/About" />} /> 
我们一般将他写在注册路由的最下方，当其他所有路由都无法匹配时，那么自动跳转到它所指定的路由
v5: <Redirect to="/home"/>
