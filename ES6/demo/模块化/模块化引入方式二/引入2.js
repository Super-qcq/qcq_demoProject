//as后是一个对于模块js的重命名
        //引入分别暴露
        import * as modle from "./模块化暴露数据语法汇总.js"
        console.log(modle.name)
        modle.address()
        //引入统一导入
        import * as modle1 from "./模块化暴露数据语法汇总.js"
        console.log(modle1.name1)
        modle1.school()
        //引入默认导入
        import * as modle2 from "./模块化暴露数据语法汇总.js"
        console.log(modle2.person.name2)//注意这里导入时要加上对象名
        modle2.person.setName()