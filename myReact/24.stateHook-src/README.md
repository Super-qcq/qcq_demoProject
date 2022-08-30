Hook为函数式组件提供
(1).State Hook让函数组件也可以有state状态，并进行状态数据的读写操作    
(2).
  语法：const[name,setXxx] = React.useState(initValue)
(3).
    useState()说明：
    参数：第一次初始化指定的值在内作缓存返回值：包含2个元素的数组，第1个为当前状态值，第2个为更新状态值的函数
(4),setXxx2种写法：
    setXxx('Jack')：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
    setXxx(name => name='Jack'):参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值