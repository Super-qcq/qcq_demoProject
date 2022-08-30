
NavLink组件：
NavLink可以实现路由链接的高亮,list-group-item他两是标签本身统一的类名   activeStyle是高亮类名，当点击哪个时 activeStyle就会给谁加到身上 加到统一类名的后面
V6:
 <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/about">About</NavLink>

 <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/home">Home</NavLink>
V5:
 <NavLink activeClassName="activeStyle" className="list-group-item" to="/about">About</NavLink>
