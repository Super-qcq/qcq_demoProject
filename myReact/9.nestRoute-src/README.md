
1.多级路由或者嵌套路由：
   react中路由的注册是有顺序的，页面一打开看到的主导航的路由注册先注册，每当你点击一个路由链接要改地址的时候也就是说要跳转到当前主导航路由下的下一个路由，系统都会从最开始注册的路由进行逐层匹配，也就是说当第二次改变路由地址时  和任何一个注册的路由都没有匹配上，就会跳转到那个兜底的路由链接上。路由的匹配都是从最开始注册 到最后注册这个流程走下去的。
   输入的是/home/news之后会在主导航栏里进行注册路由的匹配 主导航里有home所以模糊匹配上了，所以展示home组件 所以主导航栏home组件内的内容才没有丢失，所以home组件挂载上去，然后又注册路由 再进行匹配注册路由/home/news 完全匹配。
   所以当开启严格匹配模式时不能匹配多级路由，主导航栏的home组件也匹配不上 默认展示重定向的兜底路由。
   总而言之，子组件的注册路由地址中要将父组件的地址带着
   V6改了，一级注册路由在path后面加/*（"/*"可以开启模糊匹配），二级导航和老师一样路径写全，二级注册路由path只用写子路由
                         //一级注册
                   App中 <Route path="/home/*"element={<Home/>}> </Route>
                         //二级导航
                   Home中 <li>
                           <MyNavLink to="/home/message">Message</MyNavLink>
                         </li> 

                         //二级注册
                          <Route path="/message"element={<Message/>}></Route>
                           {/* 重定向 */}
                          <Route path="*" element={<Navigate to="/home/message" />} />
                    也可以在APP中直接写：
                   <MyNavLink className='list-group-item' to="/home/news">News</MyNavLink>
                      <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/home/*" element={<Home />}>
                          <Route path="news" element={<News />} />
                          <Route path="message" element={<Message />} />
                          <Route path="*" element={<Navigate to="/home/news" />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/about" />} />
                      </Routes> 

               V5:
               Home中    <li>
                           <MyNavLink to="/home/message">Message</MyNavLink>
                           <MyNavLink to="/home/news">News</MyNavLink>
                         </li> 

                        	<Switch>
							              <Route path="/home/news" component={News}/>
							              <Route path="/home/message" component={Message}/>
							              <Redirect to="/home/news"/>
						              </Switch>




    