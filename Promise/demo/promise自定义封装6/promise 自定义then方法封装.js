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
   return new Promise((resove,reject)=>{
        function Callback(type){
            try{
                let Result = type(that.PromiseResult)//函数中的this指向window
                if(Result instanceof Promise){
                    Result.then(v=>resove(v),r=>reject(r))
                }else{
                    resove(Result)
                }
           }catch(e){//抛出错误
               reject(e)
           }
        }
        if(this.PromiseState == 'fulfilled'){
            Callback(Onresolved)
        }
        if(this.PromiseState == 'rejected'){
            Callback(Onrejected)
        }
        if(this.PromiseState == 'pending'){
            this.callbacks.push({
                Onresolved:function(){
                    Callback(Onresolved)
                },
                Onrejected:function(){
                    Callback(Onrejected)
                }
            })
        }
   })

}