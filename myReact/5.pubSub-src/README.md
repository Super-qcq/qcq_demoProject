
消息订阅与发布机制：兄弟元素间传递数据 并且适用于任何组件间传递数据
订阅消息：1.消息名   2.发布消息  工具库PubSubJS
下载：cnpm install pubsub-js --save
使用：1.import PubSub from 'pubsub-js'//引入
          2. componentDidMount(){
                this.token = PubSub.subscribe('state',(_,stateObj)=>{//state是消息名, _也是消息名占位符
                this.setState(stateObj)
                })
              }
              componentWillUnmount(){
                 this.PubSub.unsubscrib(this.token)
              }//订阅 接收数据的组件去订阅消息，如果有人发布了state这个消息那么调用回调
                  token是可以通过这个值去清除此次订阅相当于id
                PubSub.unsubscrib(token)取消订阅
          3.PubSub.publish('state',{isFrist:false,isLoading:true})//发布消息  发布消息的同时把数据带过去


      把所有的状态数据放到展示数据的组件中,展示数据的组件中（谁接数据）只要一挂载就订阅消息，并且把数据处理放在消息订阅中,在componentWillUnmout中取消订阅.

       发送请求除了XHR还有fetch fetch是关注分离的思路  返回的是promise对象 可以用两个await处理 第一个接受是否成功，第二个才接受成功的返回数据 最后用async和try catch处理