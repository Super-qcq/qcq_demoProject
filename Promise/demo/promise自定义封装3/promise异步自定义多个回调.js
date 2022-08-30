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
    //调用哪个函数需要用实例对象的this.PromiseState来判断
    if(this.PromiseState == 'fulfilled'){
        Onresolved(this.PromiseResult)
    }
    if(this.PromiseState == 'rejected'){
        Onrejected(this.PromiseResult)
    }
    if(this.PromiseState == 'pending'){//当异步改变状态时 调用回调时 状态为pending
        this.callbacks.push({//将then方法里的函数保存起来,有几个需要的回掉函数 就压入几个
            Onresolved:Onresolved,
            Onrejected:Onrejected
        })
    }

}