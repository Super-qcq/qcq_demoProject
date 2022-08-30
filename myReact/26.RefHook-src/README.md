(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const myRef = React.useRef()  取出数据myRef.current.value    标签：<input type="text" ref={myRef}/>
读取值：myRef.current.value
(3). 作用:保存标签对象,功能与React.createRef()一样