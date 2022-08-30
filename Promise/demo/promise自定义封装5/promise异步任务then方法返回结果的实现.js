function Promise(executor){
    //保存回掉函数的对象（异步改变状态）
    this.callbacks = []
    //添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    //保存this
    const self = this
    //改变状态和值
    function resove(data){
        //状态只能修改一次（如果状态修改过了 就直接返回不再修改）
        if(self.PromiseState !== 'pending') return
        self.PromiseState = 'fulfilled'
        self.PromiseResult = data
        //异步改变状态后再执行 的执行回调过程 并且执行每个异步回调
        for(let i = 0;i < self.callbacks.length; i++){
            self.callbacks[i].Onresolved(data)
        }
    }
    function reject(data){
        //状态只能修改一次（如果状态修改过了 就直接返回不再修改）
        if(self.PromiseState !== 'pending') return
        self.PromiseState = 'rejected'
        self.PromiseResult = data

        //异步改变状态后再执行 的执行回调过程 并且执行每个异步回调
        for(let i = 0;i < self.callbacks.length; i++){
            self.callbacks[i].Onrejected(data)
        }
    }
    try{
        executor(resove,reject)
    }catch(e){
        reject(e)
    }
}
Promise.prototype.then = function(Onresolved,Onrejected){
   const that = this
   return new Promise((resove,reject)=>{//then方法返回的是一个Promise对象
        //调用哪个函数需要用实例对象的this.PromiseState来判断
        if(this.PromiseState == 'fulfilled'){
           try{
                //若已经进入了回调当中判断then的返回结果那么 状态已经是成功的所以在这个if中实现
                //获取回调函数中的执行结果
                let Result = Onresolved(this.PromiseResult)
                if(Result instanceof Promise){
                    //如果then方法的返回结果是一个Promise类型的结果 则状态为Promise的状态决定
                    Result.then(v=>resove(v),r=>reject(r))

                }else{
                    //如果then方法的返回结果是一个非Promise类型的结果 则为成功
                    resove(Result)
                }
           }catch(e){//抛出错误
               reject(e)
           }
        }
        if(this.PromiseState == 'rejected'){
            Onrejected(this.PromiseResult)
        }
        if(this.PromiseState == 'pending'){//当异步改变状态时 调用回调时 状态为pending
            this.callbacks.push({//将then方法里的函数保存起来,有几个需要的回掉函数 就压入几个
                Onresolved:function(){//由于pending的回调在上面执行 会强制调用保存的函数
                    //则异步判断pending时 可在此执行 获取返回值的方法同上面一样
                   try{
                        let Result = Onresolved(that.PromiseResult)
                        if(Result instanceof Promise){
                            Result.then(v=>resove(v),r=>reject(r))
                        }else{
                            resove(Result)
                        }
                   }catch(e){
                       reject(e)
                   }
                },
                Onrejected:function(){
                    //由于pending的回调在上面执行 会强制调用保存的函数
                    //则异步判断pending时 可在此执行 获取返回值的方法同上面一样
                   try{
                    let Result = Onrejected(that.PromiseResult)
                    if(Result instanceof Promise){
                        Result.then(v=>resove(v),r=>reject(r))
                    }else{
                        resove(Result)//函数return的是非Promise 所以then方法返回的哪个Promise对象的状态变成了成功
                    }
                    }catch(e){
                        reject(e)
                    }

                }
            })
        }
   })

}