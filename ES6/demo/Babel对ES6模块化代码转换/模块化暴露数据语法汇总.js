//1.分别暴露
export let name = '李蕊'
export function address(){
    console.log('陕西宝鸡')
}
//2.统一暴露
let name1 = 'qcq'
function school(){
    console.log('陕西理工大学')
}
export{name1,school}
//3.默认导出模块
export const person={
    name2:'张三',
    age:18,
    setName:function(){
        console.log('我叫张三')
    }
}
