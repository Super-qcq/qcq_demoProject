// count_action.js该文件专门为Count组件生成action对象
import {ADD, UNADD} from '../constant'
export const addAction = (data) => ({type:ADD, data})
export const unaddAction = (data) => ({type:UNADD, data})