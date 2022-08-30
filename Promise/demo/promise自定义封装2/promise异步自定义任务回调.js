function Promise(executor){
    //保存回掉函数的对象（异步改变状态）
    this.callback = {}
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

        //异步改变状态后再执行 的执行回调过程
        if(self.callback.Onresolved){//此判断是如果是异步改变状态 then方法里的状态是pending的话 执行
            self.callback.Onresolved(data)
        }
    }
    function reject(data){
        //状态只能修改一次（如果状态修改过了 就直接返回不再修改）
        if(self.PromiseState !== 'pending') return
        self.PromiseState = 'rejected'
        self.PromiseResult = data

        //异步改变状态后再执行 的执行回调过程
        if(self.callback.Onrejected){//此判断是如果是异步改变状态 then方法里的状态是pending的话 执行
            self.callback.Onrejected(data)
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
        this.callback = {//将then方法里的函数保存起来
            Onresolved:Onresolved,
            Onrejected:Onrejected
        }
    }

}